import { htmlResponse, safeOrNotFound } from "@/services/response.ts";
import { renderToString } from "@land/jsx";

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

export const serveSSRPage = <P extends JsxFunction>({ props, fileName }: SSRPageConfig<P>) => {
    return safeOrNotFound(async () => {
        const namedModule = await getJsxModule<JsxFunction>(fileName, "default");
        const page = await renderPage(namedModule(props));
        return htmlResponse(page, { status: 200 });
    });
};
