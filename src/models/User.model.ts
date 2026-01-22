import type { Timestamp } from 'firebase/firestore';

export type Gender = 'male' | 'female';
export interface User {
	id: string;
	name: string;
	email: string;
	birthdate: number;
	gender: Gender;
	profilePictureUrl?: string;
	createdAt?: Timestamp;
	updatedAt?: Timestamp;
}
