import { serveFile as DenoServeFile } from "@std/http";
import { safeOrNotFound, setContentType, setStatusCode } from "./_response.ts";

const page_path = "public/pages";
const asset_path = "public/assets";
const fileTypeFallback = "html";

export const serveFile = (req: Request, path: string): Promise<Response> => {
    return safeOrNotFound(async () => {
        const extension = getFileType(path) || fileTypeFallback;
        const FS_ROOT = extension === fileTypeFallback ? page_path : asset_path;
        const response = await DenoServeFile(req, FS_ROOT + path);
        return setContentType(extension, setStatusCode(200, response));
    });
};

const getFileType = (path: string) => {
    const hasExtension = () => !!path.match(/\.\w+$/);
    if (!hasExtension()) {
        throw new Error("File not found");
    }
    return path.split(".").pop();
};
