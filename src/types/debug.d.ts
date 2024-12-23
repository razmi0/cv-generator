import { debug } from "@/utils/debug.ts";

declare global {
    namespace Deno {
        let record: ReturnType<typeof debug>["record"];
        let log: ReturnType<typeof debug>["log"];
    }
}
