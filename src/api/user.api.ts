import type { User } from '@/models/User.model';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const userApi = {
	async getAll(): Promise<User[]> {
		const res = await fetch(BASE_URL);
		return res.json();
	},

	async create(user: Omit<User, 'id'>): Promise<User> {
		const res = await fetch(BASE_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});
		return res.json();
	},

	async update(user: User): Promise<User> {
		const res = await fetch(`${BASE_URL}/${user.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});
		return res.json();
	},

	async remove(id: number): Promise<void> {
		await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
	},
};
