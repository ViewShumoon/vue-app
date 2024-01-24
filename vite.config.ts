import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const envConfig = loadEnv(mode, process.cwd());

    const VITE_PORT = Number(envConfig.VITE_PORT);
    const VITE_API_URL = envConfig.VITE_API_URL;

    return {
        base: "./",
        server: {
            open: false,
            port: VITE_PORT,
            host: "0.0.0.0",
            //host: "localhost",
            cors: true,
            proxy: {
                "/api": {
                    target: VITE_API_URL,
                    //target: "http://localhost:6030/",
                    ws: true,
                    secure: false,
                    changeOrigin: true, // 是否允许跨域代理
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
        plugins: [
            vue(),
            AutoImport({
                imports: [
                    "vue",
                    // {
                    //     "naive-ui": [
                    //         "useDialog",
                    //         //"useMessage",
                    //         //"useNotification",
                    //         //"useLoadingBar",
                    //     ],
                    // },
                ],
                resolvers: [NaiveUiResolver()],
                dts: path.resolve(resolve("src/auto-imports.d.ts")),
            }),
            Components({
                extensions: ["vue", "md"],
                dirs: ["src/components", "src/views", "src/layouts"],
                resolvers: [NaiveUiResolver()],
                dts: "src/components.d.ts",
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                types: [],
            }),
        ],
        build: {
            sourcemap: true,
        },
        resolve: {
            alias: {
                "@": resolve("./src"),
                "@api": resolve("./src/api"),
                "@models": resolve("./src/models"),
                //"@components": resolve("./src/components"),
                //"@views": resolve("./src/views"),
                "@services": resolve("./src/services"),
                //"@configurations": resolve("./src/configurations"),

                //'@router': resolve('./src/router'),
                //"@assets": resolve("./src/assets"),
                //"@stores": resolve("./src/stores"),

                //'@utils': resolve('./src/utils')
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
            define: {
                __APP_ENV__: envConfig.APP_ENV,
                __VUE_I18N_FULL_INSTALL__: true,
                __VUE_I18N_LEGACY_API__: false,
                __INTLIFY_PROD_DEVTOOLS__: false,
            },
        },
    };
});

function resolve(p: string) {
    return path.resolve(__dirname, p);
}
