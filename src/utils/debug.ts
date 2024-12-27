import term from "@/utils/term.ts";

const isDev = Deno.env.get("DENO_ENV") === "development";

type Printable = string | number | boolean | string[] | undefined | null;

type DebugLogData = Record<string, Printable>;
type DebugReturnType = {
    data: DebugLogData;
    log: () => void;
    record: (...args: [string, Printable][]) => void;
};

const explore = (obj: Record<string, unknown>, depth = 0): string => {
    let result = "";
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        const indent = "  ".repeat(depth);
        if (type === "object") {
            result += `\n${term("cyan", indent + key)}: \n${explore(value as Record<string, unknown>, depth + 1)}`;
        } else {
            result += `${depth === 1 ? "\n" : ""}${term("cyan", indent + key)}: ${format("value", value as string)}`;
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
                const type = getType(data[key]);
                const beautyKey = format("key", key);
                const beautyValue = getValue(type, key, data);

                console.log(`${beautyKey}: ${beautyValue}`);
            }
            console.log("---");
            data = {}; // Deno preserve reference to global Deno object between requests :brainwow:
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
