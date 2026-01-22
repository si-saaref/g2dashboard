import { ref, onMounted, watch } from 'vue';
import { userServices, type UserQuery } from '@/api/user.api';
import type { User } from '@/models/User.model';
import dayjs from 'dayjs';
import { exportToCsv } from '@/utils/exportToCSV';

function mapUsersForCsv(users: User[]) {
	return users.map((u) => ({
		Name: u.name,
		Email: u.email,
		Gender: u.gender,
		Birthdate: dayjs(u.birthdate).format('DD/MM/YYYY'),
	}));
}

const sortByOptions = [
	{ label: 'Name', value: 'name' },
	{ label: 'Email', value: 'email' },
	{ label: 'Birthdate', value: 'birthdate' },
	{ label: 'Created At', value: 'createdAt' },
	{ label: 'Updated At', value: 'updatedAt' },
];
const genderOptions = [
	{ label: 'All', value: 'all' },
	{ label: 'Male', value: 'male' },
	{ label: 'Female', value: 'female' },
];

export function useUsers() {
	const listUsers = ref<User[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const query = ref<UserQuery>({
		sortBy: 'name',
		sortOrder: 'asc',
		gender: 'all',
	});

	watch(
		query,
		() => {
			fetchUsers();
		},
		{ deep: true },
	);

	const fetchUsers = async () => {
		loading.value = true;
		error.value = null;

		try {
			const listUser = await userServices.getAll(query.value);
			listUsers.value = listUser;
		} catch (err) {
			error.value = 'Failed to fetch users';
		} finally {
			loading.value = false;
		}
	};

	const addUser = async (user: Omit<User, 'id'>) => {
		try {
			const newUser = await userServices.create(user);

			if (newUser.id) {
				await fetchUsers();
			}
		} catch {
			error.value = 'Failed to create user';
		}
	};

	const updateUser = async (user: User) => {
		try {
			await userServices.update(user);
			await fetchUsers();
		} catch {
			error.value = 'Failed to update user';
		}
	};

	const deleteUser = async (id: string) => {
		try {
			await userServices.remove(id);
			listUsers.value = listUsers.value.filter((u) => u.id !== id);
		} catch {
			error.value = 'Failed to delete user';
		}
	};

	const exportUsers = () => {
		exportToCsv('users', mapUsersForCsv(listUsers.value));
	};

	onMounted(fetchUsers);

	return {
		listUsers,
		loading,
		error,
		addUser,
		updateUser,
		deleteUser,
		exportUsers,
		query,
		genderOptions,
		sortByOptions,
	};
}
