// deno-lint-ignore-file no-explicit-any --reason: Any type is used for props in SSRPageConfig

import CvTemplate from "@/components/CvTemplate.tsx";
import { CvSchema } from "@/model/cv_schema.ts";
import { setContentType } from "@/services/response.ts";
import { serveDir } from "@fs";
import { renderToString } from "@land/jsx";
import { z } from "@land/zod";

const ROOT = Deno.cwd();

type PageProps<T extends (props: any) => JSX.Element> = T extends (props: infer P) => JSX.Element ? P : never;

type Method = Uppercase<"get" | "post">;

type SSRPageConfig<T extends string, P extends (props: any) => JSX.Element> = {
    label: T;
    fileName: `${T}.tsx`;
    props: PageProps<P>;
};

type SSRPageRegistry<T extends string, P extends (props: any) => JSX.Element> = {
    [key in T]: SSRPageConfig<T, P>;
};

export default class Route {
    private pathname: string;
    private req: Request;

    private SSRPages: SSRPageRegistry<string, (props: any) => JSX.Element> = {};

    constructor(req: Request) {
        this.req = req;
        this.pathname = new URL(this.req.url).pathname;
    }

    /**
     * Add SSR Page to the registry later to be served and identified by label
     */
    setSSRRoute = <T extends string, P extends (props: any) => JSX.Element>({
        label,
        props,
        fileName,
    }: SSRPageConfig<T, P>) => {
        this.SSRPages[label] = { label, props, fileName };
    };

    /**
     * Serve SSR Page from the registry by label
     */
    serveSSRPage = async <T extends string, P extends (props: any) => JSX.Element>(
        label: keyof SSRPageRegistry<T, P> & T
    ) => {
        try {
            const SSRPage = this.SSRPages[label];
            if (!SSRPage) {
                throw new Error(`SSR Page with label ${label} not found`);
            }
            const { fileName, props } = SSRPage;
            const module = await import(`${ROOT}/src/pages/ssr/${fileName}`);

            if (!module["default"]) {
                throw new Error("Default export not found in SSR Page");
            } else if (typeof module["default"] !== "function") {
                throw new Error("Default export is not a function");
            }

            const page = await renderToString(module["default"](props));

            if (!page) {
                throw new Error("Page not rendered");
            }

            return new Response(page, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        } catch (e) {
            console.error(e);
            return this.notFound();
        }
    };

    /**
     *
     * @returns Route in the form of "METHOD:PATH"
     */
    getRoute = () => {
        const route = `${this.req.method.toUpperCase()}:${this.pathname}`;
        return route as `${Method}:/${string}`;
    };

    /**
     * 404 Response in HTML
     * @returns 404 Response
     */
    notFound = () =>
        new Response("<h1>404 : Not Found</h1>", { status: 404, headers: { "Content-Type": "text/html" } });

    /**
     * Build CV from /build-cv/form submit to /build-cv/submit
     * @returns Response with the built CV
     */
    async buildCvSubmit() {
        try {
            const data = (await this.req.json()) as Partial<CvType>;
            const cvData = CvSchema.parse(data);
            const cvPage = CvTemplate.page(cvData);
            return new Response(cvPage, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        } catch (e) {
            if (e instanceof z.ZodError) {
                // Return validation error details
                return new Response(JSON.stringify(e.errors), { status: 400 });
            }
            throw e; // Re-throw if it's not a Zod error
        }
    }

    serveFile = async (path?: string) => {
        const pathname = path ?? this.pathname;
        const askFileWithExtension = () => !!pathname.match(/\.\w+$/);

        let response = this.notFound();

        if (!askFileWithExtension()) {
            return response;
        }

        const extension = pathname.split(".").pop() ?? "";
        const FS_ROOT = extension === "html" ? "public/pages" : "public/assets";

        return (response = setContentType(
            await serveDir(this.req, {
                fsRoot: FS_ROOT,
            }),
            extension
        ));
    };
}
