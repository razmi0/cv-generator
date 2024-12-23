import * as esbuild from "@esbuild";
import { denoPlugins } from "@esbuild-deno";

const result = await esbuild.build({
    plugins: [...denoPlugins()],
    entryPoints: ["src/client/**/*.ts"],
    outdir: "public/assets/form",
    bundle: true,
    format: "esm",
    minify: true,
    treeShaking: true,
    target: "esnext",
    splitting: true,
});

esbuild.stop();
