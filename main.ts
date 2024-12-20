import Route from "@/classes/Route.ts";
import { createHeader, Header } from "@/cv_gen.ts";

const askFileWithExtension = (pathname: string) => pathname.match(/\.\w+$/);

const formatFormData = <T>(data: FormData): T => {
    const entries = Array.from(data.entries());
    const obj = Object.fromEntries(entries) as Record<string, string | Record<string, string>>;
    for (const key in obj) {
        if (key.match(/coordonnees.*/)) {
            obj["coordonnees"] = {
                // @ts-ignore-next-line
                ...obj["coordonnees"],
                [key.split(".")[1]]: obj[key],
            };
            delete obj[key];
        }
    }
    return obj as T;
};

Deno.serve(async (req) => {
    const pathname = new URL(req.url).pathname;
    console.log(req.method, pathname);
    const route = `${req.method.toUpperCase}:${pathname}`;

    switch (route) {
        // SSR ROUTES
        case "GET:/form":
            return Route.ssrFormPage();

        case "POST:/form": {
            const data = await req.formData();
            const header = formatFormData<Header>(data);
            const headerRendered = createHeader(header);
            return new Response(headerRendered, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        }
        // END SSR ROUTES

        // STATIC ROUTES
        case "GET:/":
        default:
            return askFileWithExtension(pathname) ? await Route.staticPublicRoute(pathname, req) : Route.notFound();
        // END STATIC ROUTES
    }
});
