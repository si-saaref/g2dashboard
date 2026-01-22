<script setup lang="ts">
import type { User } from '@/models/User.model';
import dayjs from 'dayjs';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

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
	<ul class="grid grid-cols-2 gap-4 p-10 pt-5">
		<li
			v-for="user in listUser"
			:key="user.id"
			class="text-black bg-white shadow-md rounded-md px-3 py-6 flex border border-slate-400 justify-between items-start"
		>
			<div class="text-left">
				<h1 class="max-w-48 truncate font-bold">{{ user.name }}</h1>
				<h2 class="max-w-48 truncate text-sm text-gray-600">{{ user.email }}</h2>
				<h2 class="">{{ user.gender }}</h2>
				<h2 class="">
					{{ dayjs(user.birthdate).format('DD/MM/YYYY') }}
				</h2>
			</div>
			<div class="flex gap-2">
				<button @click="$emit('edit', user)" class="text-white w-6">
					<EditIcon class="hover:fill-blue-700 transition" />
				</button>
				<button @click="$emit('delete', user.id)" class="text-white w-6">
					<DeleteIcon class="hover:fill-red-700 transition" />
				</button>
			</div>
		</li>
	</ul>
</template>
