import type FormPage from "@/pages/ssr/FormPage.tsx";
import Route from "@/router/Route.ts";
import { links } from "@/shared/links.ts";

type ServerHandler = (req: Request) => Promise<Response>;
type RouteHandlerInterface = Record<ReturnType<InstanceType<typeof Route>["getRoute"]>, () => Promise<Response>>;

const serverHandler: ServerHandler = async (req) => {
    const router = new Route(req);
    const { add, execute } = router;

    add([
        {
            path: "GET:/",
            handler: () => router.serveFile("/index.html"),
        },
        {
            path: "GET:/build-cv/form",
            handler: () =>
                router.serveSSRPage<typeof FormPage>({
                    fileName: "FormPage.tsx",
                    props: {
                        method: "POST",
                        action: "/build-cv/submit",
                        links,
                    },
                }),
        },
        {
            path: "POST:/build-cv/submit",
            handler: router.buildCvSubmit,
        },
    ]);

    return await execute();
};

export default serverHandler;
