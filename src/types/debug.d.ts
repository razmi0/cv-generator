declare global {
    /**
     *
     */
    let isDev: boolean;
    /*
     *
     */
    type Trace = {
        file: string;
        line: string;
        fnScope: string;
    };
    /**
     *
     */
    type DebugPrintable = string | number | boolean | string[] | undefined | null;
    /*
     *
     */

    /**
     *
     *
     *
     *
     */
    function getTrace(options: { depth: number }): Trace;
    /**
     *
     */
    function debugRecord(...args: [string, DebugPrintable][]): void;
    /**
     *
     */
    function debugLog(): void;
    /**
     *
     */
    function debugSetTrace(value: boolean): void;
}

export {};
