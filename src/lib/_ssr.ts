import { htmlResponse, safeOrNotFound } from "./_response.ts";
import type { JsxFunction, SSRPageConfig } from "./_types.ts";
import { renderToString } from "./render.ts";

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
