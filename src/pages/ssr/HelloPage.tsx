/** @jsx h */
/** @jsxFrag Fragment */

import { h } from "@land/jsx";

const Hello = ({ name }: { name: string }) => {
    return (
        <html>
            <head>
                <title>Hello Page</title>
            </head>
            <body>
                <h1>Hello, {name}!</h1>
            </body>
        </html>
    );
};

export default Hello;
