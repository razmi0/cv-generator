/** @jsx h */
/** @jsxFrag Fragment */

import Head from "@/components/Head.tsx";
import Nav from "@/components/ui/Nav.tsx";
import { links } from "@/shared/links.ts";
import { h } from "@land/jsx";

export default () => {
    return (
        <html>
            <Head title="Home"></Head>
            <body class="container-fluid">
                <header>
                    <Nav links={links} />
                    <h1>Home</h1>
                </header>
                <hr />
            </body>
        </html>
    );
};
