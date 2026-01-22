import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	QueryConstraint,
	where,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User, Gender } from '@/models/User.model';

export type UserSortBy = 'name' | 'email' | 'birthdate' | 'createdAt' | 'updatedAt';
export interface UserQuery {
	search?: string;
	gender?: Gender | 'all';
	sortBy?: UserSortBy;
	sortOrder?: 'asc' | 'desc';
}

const usersRef = collection(db, 'users');

export const userServices = {
	async getAll(params: UserQuery = {}): Promise<User[]> {
		try {
			const constraints: QueryConstraint[] = [];

			if (params.gender && params.gender !== 'all') {
				constraints.push(where('gender', '==', params.gender));
			}

			if (params.sortBy) {
				constraints.push(orderBy(params.sortBy, params.sortOrder ?? 'asc'));
			}

			const queryParam = constraints.length ? query(usersRef, ...constraints) : usersRef;

			const snapshot = await getDocs(queryParam);

			let users = snapshot.docs.map((doc) => {
				const data = doc.data() as Omit<User, 'id'>;
				return {
					id: doc.id,
					...data,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt,
				};
			});

			if (params.search) {
				const keyword = params.search.toLowerCase();
				users = users.filter(
					(u) => u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword),
				);
			}

			return users;
		} catch (err) {
			console.error(err);
			throw new Error('Failed to fetch users');
		}
	},

	async create(user: Omit<User, 'id'>): Promise<User> {
		try {
			const docRef = await addDoc(usersRef, {
				...user,
				createdAt: serverTimestamp(),
			});
			return {
				id: docRef.id,
				...user,
				createdAt: Timestamp.now(),
			} as User;
		} catch (err) {
			console.error('Firestore create failed', err);
			throw new Error('CREATE_USER_FAILED');
		}
	},

	async update(user: User): Promise<void> {
		try {
			const docRef = doc(db, 'users', user.id);
			await updateDoc(docRef, {
				name: user.name,
				email: user.email,
				gender: user.gender,
				birthdate: user.birthdate,
				updatedAt: serverTimestamp(),
			});
		} catch (err) {
			console.error('Firestore update failed', err);
			throw new Error('UPDATE_USER_FAILED');
		}
	},

	async remove(id: string): Promise<void> {
		try {
			await deleteDoc(doc(db, 'users', id));
		} catch (err) {
			console.error('Firestore delete failed', err);
			throw new Error('DELETE_USER_FAILED');
		}
	},
};
