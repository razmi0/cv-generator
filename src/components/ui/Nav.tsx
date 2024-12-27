/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "@land/jsx";

export default function Nav({ links }: { links: string[] }) {
    const labels = links.map((l) => {
        return l.replace(/\//g, "");
    });

    return (
        <>
            <nav>
                {links.map((l, i) => (
                    <li>
                        <a href={l}>@{labels[i]}__</a>
                    </li>
                ))}
            </nav>
        </>
    );
}
