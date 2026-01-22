import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { computed, watch, type Ref } from 'vue';
import z from 'zod';

import type { Gender, User } from '@/models/User.model';

const schema = z.object({
	name: z
		.string({
			required_error: 'Name cannot be empty',
		})
		.min(1, 'Name is required'),
	email: z
		.string({
			required_error: 'Email cannot be empty',
		})
		.email('Invalid email'),
	birthdate: z
		.number({
			required_error: 'Birthdate cannot be empty',
		})
		.min(1, 'Birthdate is required'),
	gender: z.enum(['male', 'female'], { required_error: 'Gender cannot be empty' }),
});

type FormValues = z.infer<typeof schema>;

export function useUserForm(
	user: Ref<User | undefined>,
	emit: (e: 'submit', payload: Omit<User, 'id'> | User) => void,
) {
	const { handleSubmit, resetForm, setValues } = useForm<FormValues>({
		validationSchema: toTypedSchema(schema),
	});

	const name = useField<string>('name');
	const email = useField<string>('email');
	const birthdate = useField<number>('birthdate');
	const gender = useField<Gender>('gender');

	const birthdateAsDate = computed<Date | null>({
		get: () => (birthdate.value.value ? new Date(birthdate.value.value) : null),
		set: (val) => {
			birthdate.value.value = val ? Math.floor(val.getTime()) : 0;
		},
	});

	watch(
		user,
		(u) => {
			if (u) {
				setValues({
					name: u.name,
					email: u.email,
					birthdate: u.birthdate,
					gender: u.gender,
				});
			} else {
				resetForm();
			}
		},
		{ immediate: true },
	);

	const submit = handleSubmit((values) => {
		emit('submit', {
			...values,
			...(user?.value?.id ? { id: user.value.id } : {}),
		});
	});

	const genderOptions = [
		{ label: 'Male', value: 'male' },
		{ label: 'Female', value: 'female' },
	];

	return {
		fields: {
			name: name.value,
			email: email.value,
			birthdate: birthdate.value,
			gender: gender.value,
		},
		errors: {
			name: name.errorMessage,
			email: email.errorMessage,
			birthdate: birthdate.errorMessage,
			gender: gender.errorMessage,
		},
		birthdateAsDate,
		genderOptions,
		submit,
		resetForm,
	};
}
