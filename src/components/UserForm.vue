<script setup lang="ts">
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useUserForm } from '@/composables/useUserForm';
import type { User } from '@/models/User.model';
import { toRef } from 'vue';

const props = defineProps<{ user?: User }>();

const emit = defineEmits<{
	(e: 'submit', user: Omit<User, 'id'> | User): void;
}>();

const { fields, errors, birthdateAsDate, genderOptions, submit, resetForm } = useUserForm(
	toRef(props, 'user'),
	emit,
);
</script>

<template>
	<form @submit.prevent="submit" class="flex flex-col gap-4 text-black">
		<div class="flex gap-5">
			<div class="flex flex-col gap-1 w-full items-start">
				<FloatLabel variant="on" class="w-full">
					<InputText v-model="fields.name.value" class="w-full" />
					<label>Name</label>
				</FloatLabel>
				<small class="text-red-500 pl-3">{{ errors.name }}</small>
			</div>

			<div class="flex flex-col gap-1 w-full items-start">
				<FloatLabel variant="on" class="w-full">
					<InputText v-model="fields.email.value" class="w-full" />
					<label>Email</label>
				</FloatLabel>
				<small class="text-red-500 pl-3">{{ errors.email }}</small>
			</div>
		</div>

		<div class="flex gap-5">
			<div class="flex flex-col gap-1 w-full items-start">
				<FloatLabel variant="on" class="w-full">
					<DatePicker v-model="birthdateAsDate" showIcon class="w-full" :maxDate="new Date()" />
					<label>Birthdate</label>
				</FloatLabel>
				<small class="text-red-500 pl-3">{{ errors.birthdate }}</small>
			</div>

			<div class="flex flex-col gap-1 w-full items-start">
				<FloatLabel variant="on" class="w-full">
					<Dropdown
						v-model="fields.gender.value"
						:options="genderOptions"
						optionLabel="label"
						optionValue="value"
						placeholder=""
						class="w-full text-left"
					/>
					<label>Gender</label>
				</FloatLabel>
				<small class="text-red-500 pl-3">{{ errors.gender }}</small>
			</div>
		</div>

		<div class="self-end flex gap-3">
			<button
				class="border border-red-500 px-8 py-2 rounded-lg cursor-pointer hover:bg-red-400 transition-all hover:text-white"
				@click.prevent="resetForm()"
			>
				Reset
			</button>
			<Button type="submit" label="Save" class="w-fit px-8!" />
		</div>
	</form>
</template>
