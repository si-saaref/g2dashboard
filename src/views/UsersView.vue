<script setup lang="ts">
import UserForm from '@/components/UserForm.vue';
import UserGrid from '@/components/UserGrid.vue';
import UserList from '@/components/UserList.vue';
import { useUsers } from '@/composables/useUser';
import type { User } from '@/models/User.model';
import { Dropdown, FloatLabel, InputText } from 'primevue';
import { ref } from 'vue';

const {
	listUsers,
	addUser,
	updateUser,
	deleteUser,
	exportUsers,
	query,
	sortByOptions,
	genderOptions,
} = useUsers();
const selectedUser = ref<User | undefined>();
const selectedMenu = ref<'list' | 'grid'>('list');
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
	<div class="bg-white min-h-screen shadow-xl overflow-y-scroll max-h-screen flex flex-col gap-6">
		<div class="sticky top-0">
			<div class="bg-white p-10 pb-10 flex flex-col gap-4 border-b border-gray-300 z-10">
				<div class="flex items-center gap-4 justify-start">
					<img src="/src/assets/g2g-logo.png" alt="g2g-logo" class="bg-black" />
					<h1 class="text-black">User Management</h1>
				</div>

				<UserForm :key="formKey" :user="selectedUser" @submit="handleSubmit" />
			</div>

			<div class="flex flex-col gap-2 px-10 py-4 bg-white items-start justify-between">
				<div class="flex gap-2">
					<InputText placeholder="Search..." v-model="query.search" />

					<FloatLabel variant="on" class="w-full">
						<Dropdown
							:options="genderOptions"
							v-model="query.gender"
							optionLabel="label"
							optionValue="value"
							placeholder=""
							class="min-w-40 text-left"
							:disabled="listUsers.length === 0"
						/>
						<label>Gender</label>
					</FloatLabel>

					<FloatLabel variant="on" class="w-full">
						<Dropdown
							:options="sortByOptions"
							v-model="query.sortBy"
							optionLabel="label"
							optionValue="value"
							placeholder=""
							:disabled="listUsers.length === 0"
						/>
						<label>Sort By</label>
					</FloatLabel>
				</div>

				<div class="flex gap-2 self-end">
					<button
						class="p-button p-component p-button-secondary text-sm"
						@click="exportUsers"
						:disabled="listUsers.length === 0"
					>
						Export to CSV
					</button>
					<div class="border border-slate-300 w-fit self-end rounded-md flex">
						<button
							@click="selectedMenu = 'list'"
							:class="selectedMenu === 'list' ? 'bg-gray-200' : ''"
							class="p-1.5"
						>
							<svg
								clip-rule="evenodd"
								fill-rule="evenodd"
								stroke-linejoin="round"
								stroke-miterlimit="2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								class="fill-black w-7"
							>
								<path
									d="m22 17.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm-18.25-2.75c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75zm18.25-1.25c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm-18.25-3.75c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75zm18.25-.25c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75zm-18.25-4.75c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75-1.75-.784-1.75-1.75.784-1.75 1.75-1.75zm18.25.75c0-.414-.336-.75-.75-.75h-13.5c-.414 0-.75.336-.75.75s.336.75.75.75h13.5c.414 0 .75-.336.75-.75z"
									fill-rule="nonzero"
								/>
							</svg>
						</button>
						<button
							@click="selectedMenu = 'grid'"
							:class="selectedMenu === 'grid' ? 'bg-gray-200' : ''"
							class="p-1.5"
						>
							<svg
								clip-rule="evenodd"
								fill-rule="evenodd"
								stroke-linejoin="round"
								stroke-miterlimit="2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								class="fill-black w-7"
							>
								<path
									d="m8 16h-5v4c0 .621.52 1 1 1h4zm6.6 5v-5h-5.2v5zm6.4-5h-5v5h4c.478 0 1-.379 1-1zm0-1.4v-5.2h-5v5.2zm-18-5.2v5.2h5v-5.2zm11.6 0h-5.2v5.2h5.2zm1.4-6.4v5h5v-4c0-.478-.379-1-1-1zm-8 5v-5h-4c-.62 0-1 .519-1 1v4zm6.6-5h-5.2v5h5.2z"
									fill-rule="nonzero"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>

		<template v-if="listUsers.length === 0">
			<div class="min-h-96 flex justify-center items-center flex-col gap-2">
				<p class="text-black">There's no users found.</p>
				<p class="text-black">Please add new before continue</p>
			</div>
		</template>
		<template v-else-if="selectedMenu === 'list'">
			<UserList :list-user="listUsers" @edit="selectedUser = $event" @delete="deleteUser" />
		</template>
		<template v-else>
			<UserGrid :list-user="listUsers" @edit="selectedUser = $event" @delete="deleteUser" />
		</template>
	</div>
</template>
