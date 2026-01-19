<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '@/composables/useUser';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';
import type { User } from '@/models/User.model';

const { listUsers, addUser, updateUser, deleteUser } = useUsers();
const selectedUser = ref<User | undefined>();
const formKey = ref(0);

const handleSubmit = (user: any) => {
	if (user.id) {
		updateUser(user);
	} else {
		addUser(user);
	}

	selectedUser.value = undefined;
	formKey.value++;
};
</script>

<template>
	<div
		class="bg-[#ebeced] min-h-screen shadow-xl overflow-y-scroll max-h-screen flex flex-col gap-6"
	>
		<div class="bg-[#ebeced] p-10 pb-10 flex flex-col gap-4 sticky top-0 border-b border-gray-300">
			<h1 class="text-black">User Management</h1>

			<UserForm :key="formKey" :user="selectedUser" @submit="handleSubmit" />
		</div>

		<UserList :users="listUsers" @edit="selectedUser = $event" @delete="deleteUser" />
	</div>
</template>
