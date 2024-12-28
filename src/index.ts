import FormPage from "@/pages/ssr/FormPage.tsx";
import Route from "@/router/Route.ts";
import { links } from "@/shared/links.ts";

type ServerHandler = (req: Request) => Promise<Response>;
type RouteHandlerInterface = Record<ReturnType<InstanceType<typeof Route>["getRoute"]>, () => Promise<Response>>;

const serverHandler: ServerHandler = async (req) => {
    const router = new Route(req);
    const route = router.getRoute();

    router.setSSRRoute<"FormPage", typeof FormPage>({
        label: "FormPage",
        fileName: "FormPage.tsx",
        props: {
            method: "POST",
            action: "/build-cv/submit",
            links,
        },
    });

    const routeHandlers: RouteHandlerInterface = {
        "GET:/": () => router.serveFile("/index.html"),
        "GET:/build-cv/form": () => router.serveSSRPage("FormPage"),
        "POST:/build-cv/submit": router.buildCvSubmit,
    };

    const routeHandler = routeHandlers[route] || router.serveFile;
    const response = await routeHandler();
    return response;
};

export default serverHandler;
