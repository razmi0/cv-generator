console.log("Hello index.js");
const code = document.querySelector("#code");

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
      TITRE: "COMPETENCES",
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
      TITRE: "EXPERIENCES",
      sousTitre: "string", // Octobre 2024 - Novembre 2024 - Projet personnel
      poste: "string", // <li> Développeur Frontend
      contexte: "Activité ou Contexte", //  <li> Activité ou Contexte : Implémenter un game of life interactif
      objectif: "string", // <li> Objectif :  Créer un jeu de la vie interactif, gourmand, a quoi sa sert
      taches: [
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
        "string",
      ], // <ul>taches :<li> Création des différentes pages à l'aide de Twig
      environnement: ["string"], // <li> Environnement technique: XAMPP, MySQL, Php My Admin, Git, GitHub, Twig, Bootstrap, PHP, Symfony
      resultat: "string", // <li> Rétrospective : Site opérationnel. Fonctionnalité imprévue du systeme, .............
    },
  ],
  formations: [
    {
      TITRE: "FORMATION",
      niveau: "string", // Titre professionnel Concepteur Développeur D’application (RNCP de niveau 6 bac +3)
      // <p>
      etablissement: "string", // Centre de formation SOFIP
      periode: "string", //   | 07/2022 - 02/2023
      // </p>
    },
  ],
};
code.innerHTML = JSON.stringify(cvTemplate, null, 2);
