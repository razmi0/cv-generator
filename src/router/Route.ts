import { serveFile } from "@/handlers/StaticFileHandler.ts";
import { htmlResponse } from "@/services/response.ts";

type RouteStackType = {
    route: RouteType;
    pattern: URLPattern;
};

export type RouteHandler = (req: Request, c: Context) => Promise<Response> | Response;

type RouteType = {
    method: "GET" | "POST";
    path: string;
    handler: RouteHandler;
};

type Context = {
    params: () => Record<string, string | undefined>;
};

export default class Route {
    private req: Request;

    private pathname: string;

    private stack: RouteStackType[] = [];

    constructor(req: Request) {
        this.req = req;
        this.pathname = new URL(req.url).pathname;
    }

    get = (path: RouteType["path"], handler: RouteType["handler"]) => {
        this.add("GET", path, handler);
    };

    post = (path: RouteType["path"], handler: RouteType["handler"]) => {
        this.add("POST", path, handler);
    };

    add = (method: RouteType["method"], path: RouteType["path"], handler: RouteType["handler"]) => {
        this.stack.push({
            route: {
                method,
                path,
                handler,
            },
            pattern: new URLPattern({ pathname: path }),
        });
    };

    execute = async () => {
        for (const { route, pattern } of this.stack) {
            const matchResult = pattern.exec(this.req.url);
            if (matchResult) {
                if (!this.checkMethod(route)) return htmlResponse("Method not allowed", { status: 405 });
                const params = () => matchResult.pathname.groups;
                return await route.handler(this.req, { params });
            }
        }
        debugRecord(["Serving file", this.pathname]);
        return await serveFile(this.req, this.pathname);
    };

    checkMethod = (route: RouteType) => {
        if (!(this.req.method.toUpperCase() === route.method)) {
            console.warn(
                "Method does not match : ",
                " route : ",
                route.method,
                "request : ",
                this.req.method.toUpperCase()
            );
            return false;
        }
        return true;
    };
}
