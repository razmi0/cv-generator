import { CvSchema } from "@/model/cv_schema.ts";
import { z } from "@land/zod";
import cvTemplate from "./src/components/CvTemplate.tsx";
import Route from "./src/Route.ts";

const askFileWithExtension = (pathname: string) => !!pathname.match(/\.\w+$/);

Deno.serve(async (req) => {
    const links = ["/index.html", "/exercice.html", "/build-cv/form"];
    const pathname = new URL(req.url).pathname;

    const route = `${req.method.toUpperCase()}:${pathname}`;
    console.log(route);

    switch (route) {
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

        // STATIC ROUTES
        // --

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

        // Assets
        // - css, js
        default:
            if (askFileWithExtension(pathname)) {
                return await Route.serveStatic("public/assets", pathname, req);
            }
            return Route.notFound();
    }
});
