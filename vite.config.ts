import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typescript2({
            check: false,
            include: ['src/**/*.ts'],
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: true,
                    declaration: true,
                    declarationMap: true,
                },
            },
            //useTsconfigDeclarationDir: true,
            exclude: ['vite.config.ts', 'src/main.ts', 'src/**/*.test.ts'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        cssCodeSplit: true,
        lib: {
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
            name: 'mapped-ref-vue',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
