/** @jsx h */
/** @jsxFrag Fragment */

import { h } from "@land/jsx";

export default function Heading({ title }: { title: string }): JSX.Element {
    return (
        <header>
            <h2>{title}</h2>
        </header>
    );
}
