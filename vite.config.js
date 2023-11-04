import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');

	return {
		esbuild: {
			loader: 'jsx', // OR "jsx"
		},
		define: {
			// __APP_ENV__: JSON.stringify(env.APP_ENV),
			// here is the main update
			global: 'globalThis',
		},
		build: {
			outDir: 'build',
		},
		plugins: [
			react({
				jsxImportSource: '@emotion/react',
				babel: {
					plugins: ['@emotion/babel-plugin', 'react-html-attrs'],
				},
			}),
			svgr({ svgrOptions: { icon: true } }),
		],
		server: {
			port: 3000,
			proxy: {
				'/api': {
					target: env.VITE_APP_API_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
