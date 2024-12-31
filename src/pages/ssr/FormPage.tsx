/** @jsx h */
/** @jsxFrag Fragment */

import Form, { FormProps } from "@/components/Form/Form.tsx";
import { default as FormParts } from "@/components/Form/Parts.tsx";
import Head from "@/components/Head.tsx";
import Article from "@/components/ui/Article.tsx";
import Heading from "@/components/ui/Heading.tsx";
import Nav from "@/components/ui/Nav.tsx";
import { h } from "@land/jsx";

type FormPageProps = Pick<FormProps, "method" | "action"> & {
    links: { label: string; href: string }[];
};

function FormPage({ method, action, links }: FormPageProps): JSX.Element {
    return (
        <html>
            <Head title="CV Generator">
                <script type="module" src="/form/form.js"></script>
            </Head>
            <body class="container-fluid">
                <header>
                    <Nav links={links} />
                    <h1>Form Generator</h1>
                </header>
                <hr />
                <p>Fill this form and generate the best CV ever :</p>
                <Form action={action} method={method} className="form">
                    <div class="form-articles">
                        <Article dataType="header">
                            <Heading title="Header" />
                            <FormParts.Header />
                        </Article>
                        <Article dataType="competences" className="hidden">
                            <Heading title="Competences" />
                            <FormParts.Competences />
                        </Article>
                        <Article dataType="experiences" className="hidden">
                            <Heading title="Experiences" />
                            <FormParts.Experiences />
                        </Article>
                        <Article dataType="formations" className="hidden">
                            <Heading title="Formations" />
                            <FormParts.Formations />
                        </Article>
                    </div>
                </Form>
            </body>
        </html>
    );
}

export type FormPageType = {
    method: FormPageProps["method"];
    action: FormPageProps["action"];
    links: FormPageProps["links"];
};

export default FormPage;
