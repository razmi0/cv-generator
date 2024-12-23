import cvTemplate from "@/components/CvTemplate.tsx";
import { CvSchema } from "@/model/cv_schema.ts";
import Route from "@/Route.ts";
import { debug } from "@/utils/debug.ts";
import { z } from "@land/zod";

const { record, log } = debug();

Deno.record = record;
Deno.log = log;

const askFileWithExtension = (pathname: string) => !!pathname.match(/\.\w+$/);
const links = ["/index.html", "/exercice.html", "/build-cv/form"];

Deno.serve(async (req) => {
    //
    //
    const run = async (): Promise<Response> => {
        const pathname = new URL(req.url).pathname;
        const route = `${req.method.toUpperCase()}:${pathname}`;

        Deno.record(["route", route], ["pathname", pathname]);

        switch (route) {
            // Pages
            // - Home
            case "GET:/":
                return await Route.serveStatic("src/pages", "index.html", req);

            // - Home
            case "GET:/index.html":
                return await Route.serveStatic("src/pages", "index.html", req);

            // - Exercice
            case "GET:/exercice.html":
                return await Route.serveStatic("src/pages", "exercice.html", req);

            // SSR ROUTES
            case "GET:/build-cv/form": {
                const response = await Route.ssrFormPage({
                    method: "POST",
                    action: "/build-cv/submit",
                    links,
                });
                return response;
            }

            case "POST:/build-cv/submit": {
                try {
                    const data = (await req.json()) as Partial<CvType>;
                    const cvData = CvSchema.parse(data);
                    const cvPage = cvTemplate.page(cvData);
                    return new Response(cvPage, {
                        headers: {
                            "Content-Type": "text/html",
                        },
                    });
                } catch (e) {
                    if (e instanceof z.ZodError) {
                        // Return validation error details
                        console.log(e.errors);
                        return new Response(JSON.stringify(e.errors), { status: 400 });
                    }
                    throw e; // Re-throw if it's not a Zod error
                }
            }
            // END SSR ROUTES

            // Assets
            // - css, js
            default: {
                if (askFileWithExtension(pathname)) {
                    const response = await Route.serveStatic("public/assets", pathname, req);
                    Deno.record(["assets", "true"]);
                    return response;
                }
                Deno.record(["assets", "false"]);
                return Route.notFound();
            }
        }
    };

    //
    //

    const response = await run();
    Deno.record(["response", response.status]);
    Deno.log();
    return response;
});
