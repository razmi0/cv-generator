/** @jsx h */

import { h } from "@land/jsx";
export default function Article({
    children,
    dataType,
    className,
}: {
    children: JSX.Element;
    dataType?: string;
    className?: string;
}): JSX.Element {
    return (
        <article class={className} data-article={dataType}>
            {children}
        </article>
    );
}
