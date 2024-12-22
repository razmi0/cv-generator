/** @jsx h */
/** @jsxFrag Fragment */

import { h } from "@land/jsx";

export default function Head({ title, children }: { title: string; children?: JSX.Element }): JSX.Element {
    return (
        <head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.sand.min.css" />
            <link rel="stylesheet" href="/index.css" />
            <link rel="stylesheet" href="/index.js" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300..700&display=swap" rel="stylesheet" />
            <title>{title}</title>
            {children && children}
        </head>
    );
}
