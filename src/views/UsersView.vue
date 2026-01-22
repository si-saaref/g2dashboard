<script setup lang="ts">
import GridIcon from '@/assets/icons/grid.svg';
import ListIcon from '@/assets/icons/list.svg';
import UserForm from '@/components/UserForm.vue';
import UserGrid from '@/components/UserGrid.vue';
import UserList from '@/components/UserList.vue';
import { useUsers } from '@/composables/useUser';
import { Dropdown, FloatLabel, InputText } from 'primevue';

const {
	listUsers,
	deleteUser,
	exportUsers,
	query,
	sortByOptions,
	genderOptions,
	handleSubmit,
	selectedMenu,
	selectedUser,
} = useUsers();
</script>

<template>
	<div class="bg-white min-h-screen shadow-xl overflow-y-scroll max-h-screen flex flex-col gap-6">
		<div class="sticky top-0">
			<div class="bg-white p-10 pb-10 flex flex-col gap-4 border-b border-gray-300 z-10">
				<div class="flex items-center gap-4 justify-start">
					<img src="/src/assets/g2g-logo.png" alt="g2g-logo" class="bg-black" />
					<h1 class="text-black">User Management</h1>
				</div>

				<UserForm :user="selectedUser" @submit="handleSubmit" />
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
							<ListIcon class="fill-black w-7" />
						</button>
						<button
							@click="selectedMenu = 'grid'"
							:class="selectedMenu === 'grid' ? 'bg-gray-200' : ''"
							class="p-1.5"
						>
							<GridIcon class="fill-black w-7" />
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
