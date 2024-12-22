/** @jsx h */
/** @jsxFrag Fragment */

import Form, { FormProps } from "@/components/Form/Form.tsx";
import { default as FormParts } from "@/components/Form/Parts.tsx";
import Head from "@/components/Head.tsx";
import Article from "@/components/ui/Article.tsx";
import Heading from "@/components/ui/Heading.tsx";
import Nav from "@/components/ui/Nav.tsx";
import { h, renderToString } from "@land/jsx";

type FormPageProps = Pick<FormProps, "method" | "action"> & {
    links: string[];
};

function FormPage({ method, action, links }: FormPageProps): JSX.Element {
    return (
        <html>
            <Head title="CV Generator">
                <script type="module" src="form.js"></script>
            </Head>
            <body class="container-fluid">
                <header>
                    <Nav links={links} />
                    <h1>Form Generator</h1>
                </header>
                <hr />
                <p>Fill this form and generate the best CV ever :</p>
                <Form action={action} method={method}>
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
    page: async (method: FormPageProps["method"], action: FormPageProps["action"], links: FormPageProps["links"]) =>
        "<!DOCTYPE html>" + (await renderToString(<FormPage method={method} action={action} links={links} />)),
    header: () => renderToString(<FormParts.Header />),
    competences: () => renderToString(<FormParts.Competences />),
    experiences: () => renderToString(<FormParts.Experiences />),
    formations: () => renderToString(<FormParts.Formations />),
};
