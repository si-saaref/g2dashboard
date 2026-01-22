<script setup lang="ts">
import DeleteIcon from '@/assets/icons/delete.svg';
import EditIcon from '@/assets/icons/edit.svg';
import type { User } from '@/models/User.model';
import dayjs from 'dayjs';

defineProps<{
	listUser: User[];
	type?: 'grid' | 'list';
}>();

defineEmits<{
	(e: 'edit', user: User): void;
	(e: 'delete', id: string): void;
}>();
</script>

<template>
	<ul class="flex flex-col gap-4 p-10 pt-5">
		<li
			v-for="user in listUser"
			:key="user.id"
			class="text-black bg-white shadow-md rounded-md px-3 py-6 flex border border-slate-400 justify-between items-start"
		>
			<div class="text-left">
				<h1 class="max-w-96 truncate font-bold">{{ user.name }}</h1>
				<h2 class="max-w-96 truncate text-sm text-gray-600">{{ user.email }}</h2>
				<h2 class="">{{ user.gender }}</h2>
				<h2 class="">
					{{ dayjs(user.birthdate).format('DD/MM/YYYY') }}
				</h2>
			</div>
			<div class="flex flex-col gap-8">
				<div class="flex gap-2 self-end">
					<button @click="$emit('edit', user)" class="text-white w-6">
						<EditIcon class="hover:fill-blue-700 transition" />
					</button>
					<button @click="$emit('delete', user.id)" class="text-white w-6">
						<DeleteIcon class="hover:fill-red-700 transition" />
					</button>
				</div>
				<div class="flex flex-col items-start">
					<p class="text-xs text-gray-500">
						Created:
						{{ dayjs(user.createdAt?.toDate()).format('DD/MM/YYYY HH:mm') }}
					</p>
					<p class="text-xs text-gray-500">
						Updated:
						{{ user.updatedAt ? dayjs(user.updatedAt.toDate()).format('DD/MM/YYYY HH:mm') : 'N/A' }}
					</p>
				</div>
			</div>
		</li>
	</ul>
</template>
