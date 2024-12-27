import term from "@/utils/term.ts";

const isDev = Deno.env.get("DENO_ENV") === "development";
type Printable = string | number | boolean | undefined | null;
type DebugLogData = Record<string, Printable>;
type DebugReturnType = {
    data: DebugLogData;
    log: () => void;
    record: (...args: [string, Printable][]) => void;
};

export function debug(options: { warn: boolean } = { warn: true }): DebugReturnType {
    if (!isDev) {
        if (options.warn) {
            console.warn("Debug is disabled in production mode");
        }
        return {
            data: {},
            log: () => {},
            record: () => {},
        };
    }
    let data: DebugLogData = {};
    return {
        data,
        log: () => {
            console.log("---");
            for (const key in data) {
                const beautyKey = term("cyan", key.padEnd(15));
                const beautyValue = term("blue", data[key] as string);
                console.log(`${beautyKey}: ${beautyValue}`);
            }
            console.log("---");
            data = {}; // Deno preserve reference to global Deno object between requests
        },
        record: (...args: [string, Printable][]) => {
            const local = [...args];
            for (const [key, value] of local) {
                data[key] = value;
            }
        },
    };
}

const { record, log } = debug();

Deno.record = record;
Deno.log = log;
