/** @jsx h */
/** @jsxFrag Fragment */

import { default as FormParts, default as Parts } from "@/components/Form/Parts.tsx";
import Head from "@/components/Head.tsx";
import Article from "@/components/ui/Article.tsx";
import Heading from "@/components/ui/Heading.tsx";
import { h, renderToString } from "@land/jsx";

type FormPageProps = {
    method: Uppercase<"get" | "post">;
    action: `/${string}`;
    links: string[];
};

function FormPage({ method, action, links }: FormPageProps): JSX.Element {
    const NavHeader = () => (
        <header>
            <nav>
                {links.map((l) => (
                    <li>
                        <a href={l}>{l}</a>
                    </li>
                ))}
            </nav>
            <h1>Form Generator</h1>
        </header>
    );

    const Form = ({ children, className }: { children: JSX.Element; className?: string }) => (
        <form method={method} action={action} class={className}>
            {children}
            <button type="submit">Submit</button>
        </form>
    );

    return (
        <html>
            <Head title="CV Generator">
                <script type="module" src="form.js"></script>
            </Head>
            <body class="container-fluid">
                <NavHeader links={links} />
                <p>Fill this form and generate the best CV ever :</p>
                <Form>
                    <div class="grid">
                        <Article>
                            <Heading title="Header" />
                            <FormParts.Header />
                        </Article>
                        <Article>
                            <Heading title="Competences" />
                            <FormParts.Competences />
                        </Article>
                    </div>
                    <div class="grid">
                        <Article>
                            <Heading title="Experiences" />
                            <FormParts.Experiences />
                        </Article>
                        <Article>
                            <Heading title="Formations" />
                            <FormParts.Formations />
                        </Article>
                    </div>
                </Form>
            </body>
        </html>
    );
}

export type FormPage = {
    method: FormPageProps["method"];
    action: FormPageProps["action"];
    links: FormPageProps["links"];
};
export default {
    page: (method: FormPageProps["method"], action: FormPageProps["action"], links: FormPageProps["links"]) =>
        "<!DOCTYPE html>" + renderToString(<FormPage method={method} action={action} links={links} />),
    header: () => renderToString(<Parts.Header />),
    competences: () => renderToString(<Parts.Competences />),
    experiences: () => renderToString(<Parts.Experiences />),
    formations: () => renderToString(<Parts.Formations />),
};
