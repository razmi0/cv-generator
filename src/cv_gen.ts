const cvTemplate = {
	// left to right, 400px height, top of the page
	header: {
		photo: "url",
		coordonnees: {
			nom: "string",
			prenom: "string",
			age: "number",
			permis: "string",
			tel: "string",
			adresse: "string",
			mail: "string",
		},
		qrCode: "url",
	},
	competences: [
		// compétences et un tableau rows = "outils, langages/framework, logiciels, base de données, méthodologies, softskills"
		{
			outils: ["string"], // Figma, Trello,Git Hub
			langages: ["string"], // HTML, CSS, Javascript, Typescript, PHP, SQL, Bash, C, R
			logiciels: ["string"], // Visual Studio Code, Vim, Postman, Git Bash, Apache, Docker
			baseDeDonnees: ["string"], // XAMPP, PHP My Admin, MySQL, SQLlite, serverless, KV
			methodologie: ["string"], // SCRUM, Agile, Kanban
			softskills: ["string"], // Autonome, Sérieux, Coopératif, Ouvert d’esprit
		},
	],
	experiences: [
		{
			sousTitre: "string", // Octobre 2024 - Novembre 2024 - Projet personnel
			poste: "string", // <li> Développeur Frontend
			contexte: "Activité ou Contexte", //  <li> Activité ou Contexte : Implémenter un game of life interactif
			objectif: "string", // <li> Objectif :  Créer un jeu de la vie interactif, gourmand, a quoi sa sert
			taches: ["string", "string", "string", "string", "string", "string", "string"], // <ul>taches :<li> Création des différentes pages à l'aide de Twig
			environnement: ["string"], // <li> Environnement technique: XAMPP, MySQL, Php My Admin, Git, GitHub, Twig, Bootstrap, PHP, Symfony
			resultat: "string", // <li> Rétrospective : Site opérationnel. Fonctionnalité imprévue du systeme, .............
		},
	],
	formations: [
		{
			niveau: "string", // Titre professionnel Concepteur Développeur D’application (RNCP de niveau 6 bac +3)
			// <p>
			etablissement: "string", // Centre de formation SOFIP
			periode: "string", //   | 07/2022 - 02/2023
			// </p>
		},
	],
};

export type Header = {
	photo: string;
	coordonnees: {
		nom: string;
		prenom: string;
		age: string;
		permis: string;
		tel: string;
		adresse: string;
		mail: string;
	};
	qrCode: string;
};

export type Competences = {
	outils: string[];
	langages: string[];
	logiciels: string[];
	baseDeDonnees: string[];
	methodologie: string[];
	softskills: string[];
};

export type Experiences = {
	sousTitre: string;
	poste: string;
	contexte: string;
	objectif: string;
	taches: string[];
	environnement: string[];
	resultat: string;
};

export type Formations = {
	niveau: string;
	etablissement: string;
	periode: string;
};

export type Cv = {
	header: Header;
	competences: Competences;
	experiences: Experiences;
	formations: Formations;
};

export interface CvGenerator {
	createCv: (cv: {
		header: Header;
		competences: Competences;
		experiences: Experiences[];
		formations: Formations[];
	}) => string;
}

export class CvGeneratorImpl implements CvGenerator {
	createCv(cv: {
		header: Header;
		competences: Competences;
		experiences: Experiences[];
		formations: Formations[];
	}) {
		return `
        <!DOCTYPE html>
        <html lang="fr">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css" />
            <title>CV</title>
            </head>
            <body>
            ${createHeader(cv.header)}
            ${createCompetences(cv.competences)}
            <hr />
            <h2>Experiences</h2>
            <hr />
            ${cv.experiences.map((experiences) => createExperiences(experiences)).join("")}
            <hr />
            <h2>Formations</h2>
            <hr />
            ${cv.formations.map((formations) => createFormations(formations)).join("")}
            </body>
        </html>
        `;
	}
}

export const createHeader = (header: Header) => {
	return `
      <header>
        <img src="${header.photo}" alt="photo">
        <div>
          <h1>${header.coordonnees.nom} ${header.coordonnees.prenom}</h1>
          <p>${header.coordonnees.age} ans - Permis ${header.coordonnees.permis}</p>
          <p>${header.coordonnees.tel} - ${header.coordonnees.adresse}</p>
          <p>${header.coordonnees.mail}</p>
        </div>
        <img src="${header.qrCode}" alt="qrCode">
      </header>
    `;
};

export const createCompetences = (competences: Competences) => {
	return `
      <section>
        <h2>Compétences</h2>
        <ul>
          <li>
            <h3>Outils</h3>
            <ul>
              ${competences.outils.map((outil) => `<li>${outil}</li>`).join("")}
            </ul>
          </li>
          <li>
            <h3>Langages/Framework</h3>
            <ul>
              ${competences.langages.map((langage) => `<li>${langage}</li>`).join("")}
            </ul>
          </li>
          <li>
            <h3>Logiciels</h3>
            <ul>
              ${competences.logiciels.map((logiciel) => `<li>${logiciel}</li>`).join("")}
            </ul>
          </li>
          <li>
            <h3>Base de données</h3>
            <ul>
              ${
		competences.baseDeDonnees
			.map((baseDeDonnees) => `<li>${baseDeDonnees}</li>`)
			.join("")
	}
            </ul>
          </li>
          <li>
            <h3>Méthodologies</h3>
            <ul>
              ${competences.methodologie.map((methodologie) => `<li>${methodologie}</li>`).join("")}
            </ul>
          </li>
          <li>
            <h3>Softskills</h3>
            <ul>
              ${competences.softskills.map((softskill) => `<li>${softskill}</li>`).join("")}
            </ul>
          </li>
        </ul>
      </section>
    `;
};

export const createExperiences = (experiences: Experiences) => {
	return `
      <section>
        <article>
          <h3>${experiences.sousTitre}</h3>
          <ul>
            <li>${experiences.poste}</li>
            <li>${experiences.contexte}</li>
            <li>${experiences.objectif}</li>
            <ul>
              ${experiences.taches.map((tache) => `<li>${tache}</li>`).join("")}
            </ul>
            <li>${experiences.environnement}</li>
            <li>${experiences.resultat}</li>
          </ul>
        </article>
      </section>
    `;
};

export const createFormations = (formations: (typeof cvTemplate.formations)[0]) => {
	return `
      <section>
        <h2>Formations</h2>
        <p>${formations.niveau}</p>
        <p>${formations.etablissement} | ${formations.periode}</p>
      </section>
    `;
};
