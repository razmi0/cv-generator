// import { denoPlugins } from "@luca/esbuild-deno-loader";
// import { ensureFileSync } from "@std/fs";
// import { join } from "@std/path";
// import * as esbuild from "esbuild";
// import { renderToString } from "./render.ts";
// import term from "./term.ts";

// console.log("Building...");

// esbuild
//     .build({
//         plugins: [...denoPlugins()],
//         entryPoints: ["src/client/**/*.ts"],
//         outdir: "public/assets/form",
//         bundle: true,
//         format: "esm",
//         minify: true,
//         treeShaking: true,
//         target: "esnext",
//         splitting: true,
//     })
//     .then(() => {
//         toSSG();
//     })
//     .catch((err: Error) => {
//         console.error(err);
//     });
