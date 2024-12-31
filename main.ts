import serverHandler from "@/index.ts";
import "@deno-debug-extension";

const port = parseInt(Deno.env.get("WEB_SERVER_PORT") || "5050");

Deno.serve({ port }, (req: Request) => {
    const response = serverHandler(req);
    debugLog();
    return response;
});
