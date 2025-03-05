import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    // server: {
    //     host: true,
    // },
    plugins: [react(), tailwindcss(), svgr()],
    base: '/interviewai/',
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
        },
    },
});
