import { serveDir } from "@fs";
import Form, { FormPage } from "./components/Form/Page.tsx";
import Header from "./Header.ts";

export default class Route {
    /**
     * Return SSR form page
     */
    static ssrFormPage = async (props: {
        method: FormPage["method"];
        action: FormPage["action"];
        links: FormPage["links"];
    }) => {
        return new Response(await Form.page(props.method, props.action, props.links), {
            headers: {
                "Content-Type": "text/html",
            },
        });
    };

    /**
     * Serve static files (css, js, html) et set content type header
     * - Default content type is text/html
     * - Available content types: text/css, text/javascript, text/html
     */
    static serveStatic = async (fsRoot: string, pathname: string, req: Request): Promise<Response> => {
        const extension = pathname.split(".").pop() ?? "";
        let response = await serveDir(req, {
            fsRoot: fsRoot,
        });
        response = Header.setContentType(response, extension);
        return response;
    };

    static notFound = () => new Response("<h1>404 : Not Found</h1>", { status: 404 });
}
