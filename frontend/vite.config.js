import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  content: {
    "./src/**/*.{js,jsx}": true,
    "./index.html": true,
  },
  theme: {
    extend: {
      colors: {
        'primary': "#5f6FFF",
      },
      gridTempleteColumns: {
        'auto': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
    },
  },
  plugins: [tailwindcss()],
  server:{port:5173}
});