export interface User {
	id: number;
	name: string;
	email: string;
	birthdate: Date;
	gender: 'male' | 'female';
	profilePictureUrl?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
