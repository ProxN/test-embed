const path = require('path');
const { defineConfig } = require('vite');
module.exports = defineConfig((configEnv) => {
  /** @type {import('vite').UserConfig} */
  const config = {
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: './src/main.ts',
        output: {
          format: 'iife',
          entryFileNames: '[name].js',
          dir: './dist',
        },
      },
    },
  };

  return config;
});
