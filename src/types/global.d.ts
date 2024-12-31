// deno-lint-ignore-file no-explicit-any --reason: Any type is used for props inJSXFunction

declare global {
    type JsxFunction = (props: any) => JSX.Element;

    type JsxFunctionWithProps<P> = (props: P) => JSX.Element;

    type PageProps<T extends (props: any) => JSX.Element> = T extends (props: infer P) => JSX.Element ? P : never;

    type Method = Uppercase<"get" | "post">;

    type SSRPageConfig<P extends (props: any) => JSX.Element> = {
        // label: T;
        fileName: `${string}.tsx`;
        props: PageProps<P>;
    };

    type ServerHandler = (req: Request) => Promise<Response> | Response;
}

export {};
