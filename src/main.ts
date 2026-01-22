import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			prefix: 'p',
			darkModeSelector: false,
			cssLayer: false,
		},
	},
});

app.mount('#app');
