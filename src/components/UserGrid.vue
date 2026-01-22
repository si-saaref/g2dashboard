<script setup lang="ts">
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
					<svg
						clip-rule="evenodd"
						fill-rule="evenodd"
						stroke-linejoin="round"
						stroke-miterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:fill-blue-700 transition"
					>
						<path
							d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-12.023-7.083c-1.334 3.916-1.48 4.232-1.48 4.587 0 .527.46.749.749.749.352 0 .668-.137 4.574-1.493zm1.06-1.061 3.846 3.846 8.824-8.814c.195-.195.293-.451.293-.707 0-.255-.098-.511-.293-.706-.692-.691-1.742-1.741-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
							fill-rule="nonzero"
						/>
					</svg>
				</button>
				<button @click="$emit('delete', user.id)" class="text-white w-6">
					<svg
						clip-rule="evenodd"
						fill-rule="evenodd"
						stroke-linejoin="round"
						stroke-miterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						class="hover:fill-red-700 transition"
					>
						<path
							d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
							fill-rule="nonzero"
						/>
					</svg>
				</button>
			</div>
		</li>
	</ul>
</template>
