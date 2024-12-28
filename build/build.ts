import * as esbuild from "@esbuild";
import { denoPlugins } from "@esbuild-deno";
import { renderToString } from "@land/jsx";
import { ensureFileSync } from "https://deno.land/std@0.224.0/fs/ensure_file.ts";
import { join } from "https://deno.land/std@0.224.0/path/join.ts";

const SSG_DIR_SOURCE = Deno.cwd() + "/src/pages/ssg";
const SSG_DIR_OUTPUT = Deno.cwd() + "/public/pages";

/**
 * Grab the source file, the directory to write the output to, and the output file name from cmd args.
 * ex : deno run --allow-net --allow-read --allow-write --allow-env --allow-run --watch build/build.ts
 */
async function toSSG() {
    /**
     * Import the source file and render it to a string.
     */
    const files = Deno.readDirSync(SSG_DIR_SOURCE);
    for (const file of files) {
        if (file.isFile && file.name.endsWith(".tsx")) {
            const content = await import(`${SSG_DIR_SOURCE}/${file.name}`)
                .then(async (module) => {
                    const render = module["default"];

                    /**
                     * If the default export is not a function( that return JSX ), log an error and return.
                     */
                    if (typeof render !== "function") {
                        throw new Error(`Default export in ${SSG_DIR_SOURCE}/${file.name} is not a function.`);
                    }

                    /**
                     * Render the page and return the rendered content.
                     */
                    const page = await renderToString(render());

                    /**
                     * If the rendered content is not a JSX element, log an error and return.
                     */
                    if (!page) {
                        throw new Error(`Rendered content in ${SSG_DIR_SOURCE}/${file.name} is not a JSX element.`);
                    }

                    return "<!DOCTYPE html>\n" + page;
                })
                .catch((err) => {
                    console.error(`Error importing ${SSG_DIR_SOURCE}/${file.name} & rendering to string.`);
                    console.error(err);
                });

            /**
             * If the exported content is not a string, log an error and return.
             */
            if (typeof content !== "string") {
                throw new Error(`Exported content in ${SSG_DIR_SOURCE}/${file.name} is not a string.`);
            }

            /**
             * Write the rendered content to the output file.
             */
            const outputPath = join(SSG_DIR_OUTPUT, file.name.replace(".tsx", ".html").toLowerCase());
            ensureFileSync(outputPath);
            console.log(`[SSG] : ${outputPath}`);
            Deno.writeTextFileSync(outputPath, content);
        }
    }
}

esbuild
    .build({
        plugins: [...denoPlugins()],
        entryPoints: ["src/client/**/*.ts"],
        outdir: "public/assets/form",
        bundle: true,
        format: "esm",
        minify: true,
        treeShaking: true,
        target: "esnext",
        splitting: true,
    })
    .then(() => {
        toSSG();
    })
    .catch((err) => {
        console.error(err);
    });
