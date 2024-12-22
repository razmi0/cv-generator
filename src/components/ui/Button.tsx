/** @jsx h */

import { h } from "@land/jsx";

export default function Button({ id, children }: { id: keyof CvType; children: JSX.Element }): JSX.Element {
    return (
        <button type={"button"} id={id}>
            {children}
        </button>
    );
}
