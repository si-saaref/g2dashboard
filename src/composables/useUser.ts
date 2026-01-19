import { ref, onMounted } from 'vue';
import { userApi } from '@/api/user.api';
import type { User } from '@/models/User.model';

export function useUsers() {
	const listUsers = ref<User[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchUsers = async () => {
		loading.value = true;
		try {
			listUsers.value = await userApi.getAll();
		} catch {
			error.value = 'Failed to fetch users';
		} finally {
			loading.value = false;
		}
	};

	const addUser = async (user: Omit<User, 'id'>) => {
		const newUser = await userApi.create(user);
		listUsers.value.push(newUser);
	};

	const updateUser = async (user: User) => {
		const updated = await userApi.update(user);
		const index = listUsers.value.findIndex((u) => u.id === user.id);
		listUsers.value[index] = updated;
	};

	const deleteUser = async (id: number) => {
		await userApi.remove(id);
		listUsers.value = listUsers.value.filter((u) => u.id !== id);
	};

	onMounted(fetchUsers);

	return {
		listUsers,
		loading,
		error,
		addUser,
		updateUser,
		deleteUser,
	};
}
