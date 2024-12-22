/** @jsx h */
/** @jsxFrag Fragment */

import Fieldset from "@/components/Form/Fieldset.tsx";
import Head from "@/components/Head.tsx";
import Article from "@/components/ui/Article.tsx";
import Button from "@/components/ui/Button.tsx";
import Heading from "@/components/ui/Heading.tsx";
import { Fragment, h, renderToString } from "@land/jsx";

function FormHeader(): JSX.Element {
    const headerInputs = [
        { label: "Photo url:", id: "photo", name: "photo" },
        { label: "Nom:", id: "nom", name: "nom" },
        { label: "Prenom:", id: "prenom", name: "prenom" },
        { label: "Age:", id: "age", name: "age" },
        { label: "Permis:", id: "permis", name: "permis" },
        { label: "Telephone:", id: "tel", name: "tel" },
        { label: "Adresse:", id: "adresse", name: "adresse" },
        { label: "E-mail:", id: "mail", name: "mail" },
    ];
    return (
        <>
            <Fieldset _legend="Coordonnees" inputs={headerInputs} id="header" />
            <Button id={"header"}>Submit</Button>
        </>
    );
}

function FormCompetences(): JSX.Element {
    const competencesInputs = [
        { label: "Outils:", id: "outils", name: "outils" },
        { label: "Langages:", id: "langages", name: "langages" },
        { label: "Logiciels:", id: "logiciels", name: "logiciels" },
        { label: "Base de donnees:", id: "baseDeDonnees", name: "baseDeDonnees" },
        { label: "Methodologie:", id: "methodologie", name: "methodologie" },
        { label: "Softskills:", id: "softskills", name: "softskills" },
    ];
    return (
        <>
            <Fieldset _legend="Competences" inputs={competencesInputs} id="competences" />
            <Button id={"competences"}>Submit</Button>
        </>
    );
}

function FormExperiences(): JSX.Element {
    const experiencesInputs = [
        { label: "Sous-titre:", id: "sousTitre", name: "sousTitre" },
        { label: "Poste:", id: "poste", name: "poste" },
        { label: "Contexte:", id: "contexte", name: "contexte" },
        { label: "Objectif:", id: "objectif", name: "objectif" },
        { label: "Taches:", id: "taches", name: "taches" },
        { label: "Environnement:", id: "environnement", name: "environnement" },
        { label: "Resultat:", id: "resultat", name: "resultat" },
    ];
    return (
        <>
            <Fieldset _legend="Experiences" inputs={experiencesInputs} id={"experiences"} />
            <Button id="experiences">Submit</Button>
        </>
    );
}

function FormFormation(): JSX.Element {
    const formationInputs = [
        { label: "Niveau:", id: "niveau", name: "niveau" },
        { label: "Etablissement:", id: "etablissement", name: "etablissement" },
        { label: "Periode:", id: "periode", name: "periode" },
    ];
    return (
        <>
            <Fieldset _legend="Formations" inputs={formationInputs} id="formations" />
            <Button id={"formations"}>Submit</Button>
        </>
    );
}

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
                            <FormHeader />
                        </Article>
                        <Article>
                            <Heading title="Competences" />
                            <FormCompetences />
                        </Article>
                    </div>
                    <div class="grid">
                        <Article>
                            <Heading title="Experiences" />
                            <FormExperiences />
                        </Article>
                        <Article>
                            <Heading title="Formations" />
                            <FormFormation />
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
    header: () => renderToString(<FormHeader />),
    competence: () => renderToString(<FormCompetences />),
    experience: () => renderToString(<FormExperiences />),
    formation: () => renderToString(<FormFormation />),
};
