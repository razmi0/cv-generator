/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "@land/jsx";

export type NavLink = {
    label: string;
    href: string;
};

export default function Nav({ links }: { links: NavLink[] }): JSX.Element {
    return (
        <>
            <nav>
                {links.map(({ label, href }) => (
                    <li>
                        <a href={href}>@{label}__</a>
                    </li>
                ))}
            </nav>
        </>
    );
}
