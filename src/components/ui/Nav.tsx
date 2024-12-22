/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "@land/jsx";

export default function Nav({ links }: { links: string[] }) {
    return (
        <>
            <nav>
                {links.map((l) => (
                    <li>
                        <a href={l}>@{l}__</a>
                    </li>
                ))}
            </nav>
        </>
    );
}
