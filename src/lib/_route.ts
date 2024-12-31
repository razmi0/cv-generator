import { htmlResponse } from "./_response.ts";
import { serveFile } from "./_static.ts";
import type { RouteStackType, RouteType } from "./_types.ts";

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
