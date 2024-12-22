/** @jsx h */
/** @jsxFrag Fragment */

import Head from "@/components/Head.tsx";
import { Fragment, h, renderToString } from "@land/jsx";

const CvTemplate = ({ cv }: { cv: CvType }): JSX.Element => {
    const { header, competences, experiences, formations } = cv;

    return (
        <html lang="fr">
            <Head title="Generated cv" />
            <body>
                {header && <CvHeader header={header} />}
                {competences && <CvCompetences competences={competences} />}
                {experiences && (
                    <>
                        <hr />
                        <h2>Experiences</h2>
                        {experiences.map((experience) => (
                            <CvExperience experience={experience} />
                        ))}
                        <hr />
                    </>
                )}

                {formations && (
                    <>
                        <hr />
                        <h2>Formations</h2>
                        <hr />
                        {formations.map((formation) => (
                            <CvFormation formation={formation} />
                        ))}
                    </>
                )}
            </body>
        </html>
    );
};

const CvHeader = ({ header }: { header: HeaderType }) => {
    const { nom, prenom, age, permis, tel, adresse, mail, photo } = header;

    return (
        <header>
            <img src={photo} alt="photo" />
            <div>
                <h1>
                    {nom} {prenom}
                </h1>
                <p>
                    {age} ans - Permis {permis}
                </p>
                <p>
                    {tel} - {adresse}
                </p>
                <p>{mail}</p>
            </div>
        </header>
    );
};

const CvCompetences = ({ competences }: { competences: CompetencesType }) => {
    const { outils, langages, logiciels, baseDeDonnees, methodologie, softskills } = competences;

    const List = ({ title, list }: { title: keyof CompetencesType; list: string[] }) => {
        return (
            <li>
                <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
                <ul>
                    {list.map((outil) => (
                        <li>${outil}</li>
                    ))}
                </ul>
            </li>
        );
    };

    return (
        <section>
            <h2>Compétences</h2>
            <ul>
                <List title="outils" list={outils} />
                <List title="langages" list={langages} />
                <List title="logiciels" list={logiciels} />
                <List title="baseDeDonnees" list={baseDeDonnees} />
                <List title="methodologie" list={methodologie} />
                <List title="softskills" list={softskills} />
            </ul>
        </section>
    );
};

const CvExperience = ({ experience }: { experience: ExperiencesType }) => {
    const { sousTitre, poste, contexte, objectif, taches, environnement, resultat } = experience;

    const List = ({ taches }: { taches: string[] }) => {
        return (
            <ul>
                {taches.map((t) => (
                    <li>{t}</li>
                ))}
            </ul>
        );
    };

    return (
        <section>
            <article>
                <h3>{sousTitre}</h3>
                <ul>
                    <li>{poste}</li>
                    <li>{contexte}</li>
                    <li>{objectif}</li>
                    <List taches={taches} />
                    <li>{environnement}</li>
                    <li>{resultat}</li>
                </ul>
            </article>
        </section>
    );
};

const CvFormation = ({ formation }: { formation: FormationsType }) => {
    const { niveau, etablissement, periode } = formation;

    return (
        <section>
            <h2>Formations</h2>
            <p>{niveau}</p>
            <p>
                {etablissement} | {periode}
            </p>
        </section>
    );
};

export default {
    page: (cvData: CvType) => "<!DOCTYPE html>" + renderToString(<CvTemplate cv={cvData} />),
    //
    cvHeader: (header: HeaderType) => renderToString(<CvHeader header={header} />),
    //
    cvCompetences: (competences: CompetencesType) => renderToString(<CvCompetences competences={competences} />),
    //
    cvExperience: (experience: ExperiencesType) => renderToString(<CvExperience experience={experience} />),
    //
    cvFormation: (formations: FormationsType) => renderToString(<CvFormation formation={formations} />),
};
