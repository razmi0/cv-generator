export function setContentType(response: Response, extension: string): Response {
    if (!/(css|js|html|ico)/.test(extension)) {
        return new Response(`Cannot set content type on unknown extension file : ${extension}`, {
            status: 404,
        });
    }
    let contentType = "text/html";
    switch (extension) {
        case "css":
            contentType = "text/css";
            break;
        case "js":
            contentType = "text/javascript";
            break;
        case "html":
            contentType = "text/html";
            break;
        case "ico":
            contentType = "image/x-icon";
            break;
        default:
            break;
    }
    response.headers.set("Content-Type", contentType);
    return response;
}

export function customHeader(response: Response, headers: Record<string, string>): Response {
    for (const key in headers) {
        response.headers.set(key, headers[key]);
    }
    return response;
}
