import { CvSchema } from "@/model/cv_schema.ts";
import { z } from "@land/zod";
import cvTemplate from "./src/components/CvTemplate.tsx";
import Route from "./src/Route.ts";

const askFileWithExtension = (pathname: string) => !!pathname.match(/\.\w+$/);

// const _formatFormData = <T>(data: FormData): T => {
//     const entries = Array.from(data.entries());
//     const obj = Object.fromEntries(entries) as Record<string, string | Record<string, string>>;
//     for (const key in obj) {
//         if (key.match(/coordonnees.*/)) {
//             obj["coordonnees"] = {
//                 // @ts-ignore-next-line
//                 ...obj["coordonnees"],
//                 [key.split(".")[1]]: obj[key],
//             };
//             delete obj[key];
//         }
//     }
//     return obj as T;
// };

Deno.serve(async (req) => {
    const pathname = new URL(req.url).pathname;
    const route = `${req.method.toUpperCase()}:${pathname}`;
    console.log(route);

    switch (route) {
        // SSR ROUTES
        case "GET:/build-cv/form":
            return Route.ssrFormPage({
                method: "POST",
                action: "/build-cv/form",
                links: ["index.html", "exercice.html"],
            });

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
