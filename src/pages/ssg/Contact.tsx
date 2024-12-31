/** @jsx h */
/** @jsxFrag Fragment */

import Head from "@/components/Head.tsx";
import Nav from "@/components/ui/Nav.tsx";
import { links } from "@/shared/links.ts";
import { h } from "@land/jsx";

export default () => {
    return (
        <html>
            <Head title="Contact"></Head>
            <body class="container-fluid">
                <header>
                    <Nav links={links} />
                    <h1>Contact</h1>
                </header>
                <hr />
                <p>Contact page</p>
            </body>
        </html>
    );
};

// export default Contact;
