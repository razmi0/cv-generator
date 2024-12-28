/** @jsx h */
/** @jsxFrag Fragment */

import Head from "@/components/Head.tsx";
import Nav from "@/components/ui/Nav.tsx";
import { links } from "@/shared/links.ts";
import { h } from "@land/jsx";

export default () => {
    return (
        <html>
            <Head title="Analyse"></Head>
            <body class="container-fluid">
                <header>
                    <Nav links={links} />
                    <h1>Analyse de cv 2</h1>
                </header>
                <hr />

                <section id="notes">
                    <p>
                        Les cv ont tous la meme structure. La police centré est trés utilisé. Ils font plusieurs pages.
                        Les projet ou expériences sont décrites en détail à l'aide d'un patron de clé. Par exemple
                        expérience :
                    </p>
                    <ol>
                        <li>
                            <strong>Poste</strong>
                        </li>
                        <li>
                            <strong>Contexte / Activités</strong>
                        </li>
                        <li>
                            <strong>Objectif</strong>
                        </li>
                        <li>
                            <strong>Taches</strong>
                        </li>
                        <li>
                            <strong>Environnement Technique</strong>
                        </li>
                        <li>
                            <strong>Résultat</strong>
                        </li>
                    </ol>
                    <p>Ou encore comp&tences</p>
                    <ol>
                        <li>
                            <strong>Outils</strong>
                        </li>
                        <li>
                            <strong>Langages et Frameworks</strong>
                        </li>
                        <li>
                            <strong>Logiciels</strong>
                        </li>
                        <li>
                            <strong>Bases de Données</strong>
                        </li>
                        <li>
                            <strong>Méthodologies</strong>
                        </li>
                        <li>
                            <strong>Soft Skills</strong>
                        </li>
                    </ol>
                    <p>
                        Toutes les expériences sont trés détaillées. Projets personnel ou pro. Registre sémantique avec
                        des adverbe et peu personnalisé, par exemple :
                    </p>
                    <ul>
                        <li>Conception de ...</li>
                        <li>Develloppement de ...</li>
                        <li>Maintenance de ...</li>
                        <li>...</li>
                    </ul>
                </section>
            </body>
        </html>
    );
};
