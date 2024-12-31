import { serveSSRPage } from "./lib/SSRHandler.ts";
import { serveFile } from "./lib/StaticFileHandler.ts";
import { CvSchema, HeaderSchema } from "@/model/cv_schema.ts";
import CvPage from "@/pages/ssr/CvPage.tsx";
import type FormPage from "@/pages/ssr/FormPage.tsx";
import Route from "./lib/Route.ts";
import { jsonResponse, zodSafe } from "./lib/response.ts";
import { links } from "@/shared/links.ts";

const formPage = () => {
    return serveSSRPage<typeof FormPage>({
        fileName: "FormPage.tsx",
        props: {
            method: "POST",
            action: "/build-cv/submit",
            links,
        },
    });
};

const onSubmitHeader = async (req: Request) => {
    return await zodSafe(async () => {
        const headerData = (await req.json()) as HeaderType;
        const header = HeaderSchema.parse(headerData);
        return jsonResponse(header, { status: 200 });
    });
};

const onSubmitCv = async (req: Request) => {
    return await zodSafe(async () => {
        const data = (await req.json()) as Partial<CvType>;
        const cvData = CvSchema.parse(data);
        return serveSSRPage<typeof CvPage>({
            fileName: "CvPage.tsx",
            props: { ...cvData, links },
        });
    });
};

const homePage = async (req: Request) => await serveFile(req, "/home.html");

// const simpleJson: RouteHandler = (_req, c) => jsonResponse({ message: `Hello World, ${c.params().name}` });

const serverHandler: ServerHandler = async (req) => {
    const { get, post, execute } = new Route(req);

    // Routes
    // --
    get("/", homePage);
    get(`/build-cv/form`, formPage);
    post(`/build-cv/submit/header`, onSubmitHeader);
    post(`/build-cv/submit`, onSubmitCv);

    /**
     * debug routes
     */
    // get("/:name", simpleJson);

    return await execute();
};

export default serverHandler;
