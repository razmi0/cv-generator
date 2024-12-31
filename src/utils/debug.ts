import term from "../lib/term.ts";

type DebugLogData = Record<string, DebugPrintable>;

type DebugReturnType = {
    trace: boolean;
    data: DebugLogData;
    log: () => void;
    record: (...args: [string, DebugPrintable][]) => void;
    setTrace: (value: boolean) => void;
};

const isDev = Deno.env.get("DENO_ENV") === "development";

globalThis.getTrace = (options: { depth: number }): Trace => {
    const e = new Error().stack?.split("\n")[options.depth];
    const [file, line] = e?.match(/(\w+\.[a-z]+\:[0-9]+)/)?.[0]?.split(":") || ["", ""];
    const fnScope = e?.match(/at\s(\w+)/)?.[1] || "";
    return { file, line, fnScope };
};

const debug = (options: { warn: boolean } = { warn: true }): DebugReturnType => {
    if (!isDev) {
        if (options.warn) {
            console.warn("Debug is disabled in production mode");
        }
        return {
            trace: false,
            data: {},
            log: () => {},
            record: () => {},
            setTrace: () => {},
        };
    }
    const explore = (obj: Record<string, unknown>, depth = 0): string => {
        let result = "";
        for (const key in obj) {
            const value = obj[key];
            const type = typeof value;
            const indent = "  ".repeat(depth);
            if (type === "object") {
                result += `\n${term("cyan", indent + key)}: \n${explore(value as Record<string, unknown>, depth + 1)}`;
            } else {
                result += `${depth === 1 ? "\n" : ""}${term("cyan", indent + key)}: ${format(
                    "value",
                    value as string
                )}`;
            }
        }
        return result + "";
    };

    const format = (type: "key" | "value", label: string): string => {
        return term(type === "key" ? "cyan" : "blue", type === "key" ? label.padEnd(15) : label);
    };

    type AllTypes =
        | "string"
        | "number"
        | "bigint"
        | "boolean"
        | "symbol"
        | "undefined"
        | "object"
        | "function"
        | "array"
        | "null";
    /**
     * Returns false if value is undefined or null, otherwise returns the type of the value
     */
    const getType = <T>(value: T): AllTypes => {
        const type = typeof value;
        switch (type) {
            case "object":
                return Array.isArray(value) ? "array" : value === null ? "null" : "object";
            default:
                return type;
        }
    };

    const getValue = (type: AllTypes, key: string, data: DebugLogData): string => {
        switch (type) {
            case "null":
                return term("red", "null");
            case "undefined":
                return term("red", "undefined");
            case "array": {
                return ["[", ...(data[key] as string[]).map((val) => term("blue", val)), "]"].join(" ");
            }
            case "object":
                return explore(data[key] as unknown as Record<string, unknown>, 1);
            default:
                return format("value", data[key] as string);
        }
    };

    // -- Dev

    let data: DebugLogData = {};
    let trace = false;
    return {
        trace,
        data,
        log: () => {
            if (Object.keys(data).length === 0) return;
            console.log("---");
            for (const key in data) {
                const type = getType(data[key]);
                const beautyKey = format("key", key);
                const beautyValue = getValue(type, key, data);

                console.log(`${beautyKey}: ${beautyValue}`);
            }
            data = {}; // Deno preserve reference to global Deno object between requests :brainwow:
        },
        record: (...args: [string, DebugPrintable][]) => {
            const { file, line, fnScope } = getTrace({ depth: 3 });
            const local = trace ? [["trace : ", `${file}:${line} ${fnScope} call`], ...args] : [...args];
            for (const [key, value] of local) {
                data[key] = value;
            }
        },
        setTrace: (value: boolean) => (trace = value),
    };
};

const { setTrace, record, log } = debug();

globalThis.debugSetTrace = setTrace;
globalThis.debugRecord = record;
globalThis.debugLog = log;

export type Debug = typeof debug;
