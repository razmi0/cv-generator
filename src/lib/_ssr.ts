import { ensureFileSync } from "@std/fs";
import { join } from "@std/path";
import { htmlResponse, safeOrNotFound } from "./_response.ts";
import type { JsxFunction, SSRPageConfig } from "./_types.ts";
import { renderToString } from "./render.ts";
import term from "./term.ts";

const ROOT = Deno.cwd();

const getJsxModule = async <T>(fileName: string, name: string = "default"): Promise<T> => {
    const module = await import(`${ROOT}/src/pages/ssr/${fileName}`);

    if (!module[name]) {
        throw new Error("Default export not found in SSR Page");
    } else if (typeof module[name] !== "function") {
        throw new Error("Default export is not a function");
    }

    return module[name];
};

const renderPage = async (jsx: Parameters<typeof renderToString>[0]) => {
    const page = await renderToString(jsx);
    if (!page) {
        throw new Error("Page not rendered");
    }
    return page;
};

export const serveSSRPage = <P extends JsxFunction>({ props, fileName }: SSRPageConfig<P>): Promise<Response> => {
    return safeOrNotFound(async () => {
        const namedModule = await getJsxModule<JsxFunction>(fileName, "default");
        const page = await renderPage(namedModule(props) as any);
        return htmlResponse(page, { status: 200 });
    });
};

const SOURCE_PATH = "/src/pages/ssg";
const OUTPUT_PATH = "/public/pages";
const SSG_DIR_SOURCE = Deno.cwd() + SOURCE_PATH;
const SSG_DIR_OUTPUT = Deno.cwd() + OUTPUT_PATH;
const TARGET_MODULE = "default";

const log = {
    entries: [] as string[],
    push(entry: string) {
        this.entries.push(entry);
    },
    flush() {
        for (let i = this.entries.length - 1; i >= 0; i--) {
            console.log("[SSG] : " + this.entries[i]);
        }
        this.entries = [];
    },
};

const safe = (fn: () => void) => {
    try {
        fn();
    } catch (err) {
        console.error(err);
    }
};

const fileExists = async (path: string) => {
    const fileInfo = await Deno.stat(path).catch(() => null);
    if (!fileInfo) return false;
    return fileInfo.isFile;
};

/**
 * Grab the source file, the directory to write the output to, and the output file name from cmd args.
 * ex : deno run --allow-net --allow-read --allow-write --allow-env --allow-run --watch build/build.ts
 */
export function toSSG() {
    /**
     * Import the source file and render it to a string.
     */
    const files = Deno.readDirSync(SSG_DIR_SOURCE);
    safe(async () => {
        for (const file of files) {
            if (file.isFile && file.name.endsWith(".tsx")) {
                const targetFileName = file.name.replace(".tsx", ".html").toLowerCase();
                const outputPath = join(SSG_DIR_OUTPUT, targetFileName);

                const module = await import(`${SSG_DIR_SOURCE}/${file.name}`);
                const render = module[TARGET_MODULE];
                /**
                 * If the default export is not a function( that return JSX ), log an error and return.
                 */
                if (typeof render !== "function") {
                    throw new Error(`${TARGET_MODULE} export in ${SSG_DIR_SOURCE}/${file.name} is not a function.`);
                }
                /**
                 * Render the page and return the rendered content.
                 */
                const page = "<!DOCTYPE html>\n" + (await renderToString(render()));
                /**
                 * If the rendered content is not a JSX element or a string, log an error and return.
                 */
                if (!page) {
                    throw new Error(
                        term("red", `Rendered content in ${SSG_DIR_SOURCE}/${file.name} is not a JSX element.`)
                    );
                } else if (typeof page !== "string") {
                    throw new Error(term("red", `Rendered content in ${SSG_DIR_SOURCE}/${file.name} is not a string.`));
                }
                /**
                 * If the target .html file is already there, read his content and compare with the new one.
                 */
                if (await fileExists(outputPath)) {
                    const oldContent = Deno.readTextFileSync(outputPath);
                    if (oldContent === page) {
                        log.push(`${term("yellow", "/" + targetFileName)} - No changes`);
                        continue;
                    }
                }

                /**
                 * Write the rendered content to the output file.
                 */
                ensureFileSync(outputPath);
                log.push(`${term("green", "/" + targetFileName)}`);
                Deno.writeTextFileSync(outputPath, page);
            }
        }
        log.flush();
    });
}
