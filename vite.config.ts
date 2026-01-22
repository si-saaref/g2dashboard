import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
	plugins: [vue(), tailwindcss(), svgLoader()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
