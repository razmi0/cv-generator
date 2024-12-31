import { z } from "@land/zod";

export function setContentType(extension: string, response: Response): Response {
    const contentTypeMap: Record<string, string> = {
        html: "text/html",
        js: "application/javascript",
        css: "text/css",
        png: "image/png",
        jpg: "image/jpeg",
        svg: "image/svg+xml",
    };

    const contentType = contentTypeMap[extension] || "application/octet-stream";
    response.headers.set("Content-Type", contentType);
    return response;
}

export const setStatusCode = (statusCode: number, response: Response): Response => {
    return new Response(response.body, { ...response, status: statusCode });
};

export function customHeader(headers: Record<string, string>, response: Response): Response {
    for (const key in headers) {
        response.headers.set(key, headers[key]);
    }
    return response;
}

export function htmlResponse(body: string, init: ResponseInit = {}): Response {
    return new Response(body, {
        ...init,
        headers: {
            "Content-Type": "text/html",
            ...init.headers,
        },
    });
}

export const jsonResponse = (body: unknown, init: ResponseInit = {}): Response => {
    return new Response(JSON.stringify(body), {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init.headers,
        },
    });
};

export const zodSafe = (fn: () => Promise<Response>) => {
    try {
        return fn();
    } catch (e) {
        if (e instanceof z.ZodError) {
            return new Response(JSON.stringify(e.errors), { status: 400 });
        }
        console.error(e);
        return new Response("<h1>500 : Internal Server Error</h1>", { status: 500 });
    }
};

export const safeOrNotFound = async (fn: () => Promise<Response>) => {
    try {
        return await fn();
    } catch (e) {
        console.error(e);
        return notFound();
    }
};

export const notFound = () => htmlResponse("<h1>404 : Not Found</h1>", { status: 404 });
