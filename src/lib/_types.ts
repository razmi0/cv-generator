declare namespace JSX {
    interface Element {
        [key: string]: any;
    }
}

export type JsxFunction = (props: any) => JSX.Element;

export type JsxFunctionWithProps<P> = (props: P) => JSX.Element;

export type PageProps<T extends (props: any) => JSX.Element> = T extends (props: infer P) => JSX.Element ? P : never;

export type Method = Uppercase<"get" | "post" | "put" | "patch" | "delete">;

export type SSRPageConfig<P extends (props: any) => JSX.Element> = {
    // label: T;
    fileName: `${string}.tsx`;
    props: PageProps<P>;
};

export type ServerHandler = (req: Request) => Promise<Response> | Response;

export type RouteStackType = {
    route: RouteType;
    pattern: URLPattern;
};

export type RouteHandler = (req: Request, c: Context) => Promise<Response> | Response;

export type RouteType = {
    method: "GET" | "POST";
    path: string;
    handler: RouteHandler;
};

export type Context = {
    params: () => Record<string, string | undefined>;
};
