<script setup lang="ts">
import { ref, watch } from 'vue';
import type { User } from '@/models/User.model';

const props = defineProps<{
	user?: User;
}>();

const emit = defineEmits<{
	(e: 'submit', user: Omit<User, 'id'> | User): void;
}>();

const name = ref('');
const email = ref('');

watch(
	() => props.user,
	(user) => {
		console.log(user);
		if (user) {
			name.value = user.name;
			email.value = user.email;
		} else {
			name.value = '';
			email.value = '';
		}
	},
	{ immediate: true },
);

const submit = () => {
	emit('submit', {
		...(props.user?.id ? { id: props.user.id } : {}),
		name: name.value,
		email: email.value,
		birthdate: new Date(),
		gender: 'male',
		// createdAt: new Date(),
		// updatedAt: new Date(),
	});
	// name.value = '';
	// email.value = '';
};
</script>

<template>
	<form @submit.prevent="submit" class="text-black flex flex-col gap-2">
		<div class="relative">
			<input
				v-model="name"
				id="name"
				placeholder=" "
				required
				class="peer w-full px-4 pt-6 pb-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900 transition-all duration-200 ease-in-out focus:outline-none hover:border-gray-400"
			/>
			<label
				for="name"
				class="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 ease-in-out pointer-events-none peer-focus:-top-2 bg-white px-2 peer-focus:text-xs peer-focus:text-black peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600"
			>
				Name
			</label>
		</div>
		<div class="relative">
			<input
				v-model="email"
				id="email"
				placeholder=" "
				required
				class="peer w-full px-4 pt-6 pb-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900 transition-all duration-200 ease-in-out focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none hover:border-gray-400 autofill:bg-white! autofill:pt-6 autofill:pb-2 [-webkit-autofill&]:bg-white [-webkit-autofill&]:shadow-[0_0_0_30px_white_inset]"
			/>
			<label
				for="email"
				class="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 ease-in-out pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-autofill:top-2 peer-autofill:text-xs peer-autofill:text-gray-600"
			>
				Email
			</label>
		</div>
		<button
			type="submit"
			class="border rounded-lg px-6 py-2 bg-white cursor-pointer hover:bg-slate-200 transition"
		>
			Save
		</button>
	</form>
</template>
