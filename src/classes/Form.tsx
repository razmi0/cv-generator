/** @jsx h */
/** @jsxFrag Fragment */

import { h, renderToString } from "@land/jsx";

function Heading({ title }: { title: string }): JSX.Element {
	return (
		<header>
			<h2>{title}</h2>
		</header>
	);
}

function Article({ children }: { children: JSX.Element }): JSX.Element {
	return <article>{children}</article>;
}

function FormHeader(): JSX.Element {
	return (
		<form>
			<label for="photo">Photo URL:</label>
			<input type="text" id="photo" name="photo" />
			<fieldset>
				<legend>Coordonnées</legend>

				<label for="nom">Nom:</label>
				<input type="text" id="nom" name="coordonnees.nom" />

				<label for="prenom">Prénom:</label>
				<input type="text" id="prenom" name="coordonnees.prenom" />

				<label for="age">Âge:</label>
				<input type="text" id="age" name="coordonnees.age" />

				<label for="permis">Permis:</label>
				<input type="text" id="permis" name="coordonnees.permis" />

				<label for="tel">Téléphone:</label>
				<input type="text" id="tel" name="coordonnees.tel" />

				<label for="adresse">Adresse:</label>
				<input type="text" id="adresse" name="coordonnees.adresse" />

				<label for="mail">E-mail:</label>
				<input type="email" id="mail" name="coordonnees.mail" />
			</fieldset>

			<label for="qrCode">QR Code:</label>
			<input type="text" id="qrCode" name="qrCode" />

			<button type="submit">Submit</button>
		</form>
	);
}

function FormCompetences(): JSX.Element {
	return (
		<form>
			<label for="outils">Outils:</label>
			<input type="text" id="outils" name="outils[]" />
			<br />
			<br />

			<label for="langages">Langages:</label>
			<input type="text" id="langages" name="langages[]" />
			<br />
			<br />

			<label for="logiciels">Logiciels:</label>
			<input type="text" id="logiciels" name="logiciels[]" />
			<br />
			<br />

			<label for="baseDeDonnees">Base de données:</label>
			<input type="text" id="baseDeDonnees" name="baseDeDonnees[]" />
			<br />
			<br />

			<label for="methodologie">Méthodologie:</label>
			<input type="text" id="methodologie" name="methodologie[]" />
			<br />
			<br />

			<label for="softskills">Soft skills:</label>
			<input type="text" id="softskills" name="softskills[]" />
			<br />
			<br />

			<button type="submit">Submit</button>
		</form>
	);
}

function FormExperiences(): JSX.Element {
	return (
		<form>
			<label for="sousTitre">Sous-titre:</label>
			<input type="text" id="sousTitre" name="sousTitre" />
			<br />
			<br />

			<label for="poste">Poste:</label>
			<input type="text" id="poste" name="poste" />
			<br />
			<br />

			<label for="contexte">Contexte:</label>
			<input type="text" id="contexte" name="contexte" />
			<br />
			<br />

			<label for="objectif">Objectif:</label>
			<input type="text" id="objectif" name="objectif" />
			<br />
			<br />

			<label for="taches">Tâches:</label>
			<input type="text" id="taches" name="taches[]" />
			<br />
			<br />

			<label for="environnement">Environnement:</label>
			<input type="text" id="environnement" name="environnement[]" />
			<br />
			<br />

			<label for="resultat">Résultat:</label>
			<input type="text" id="resultat" name="resultat" />
			<br />
			<br />

			<button type="submit">Submit</button>
		</form>
	);
}

function FormFormation(): JSX.Element {
	return (
		<form>
			<label for="niveau">Niveau:</label>
			<input type="text" id="niveau" name="niveau" />
			<br />
			<br />

			<label for="etablissement">Établissement:</label>
			<input type="text" id="etablissement" name="etablissement" />
			<br />
			<br />

			<label for="periode">Période:</label>
			<input type="text" id="periode" name="periode" />
			<br />
			<br />

			<button type="submit">Submit</button>
		</form>
	);
}

function FormPage(): JSX.Element {
	return (
		<html>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.sand.min.css"
				/>
				<title>CV Generator</title>
			</head>
			<body class="container">
				<form method="POST" action="/form">
					<header>
						<a href="index.html">@index.html__</a>
					</header>
					<h1>Form Generator</h1>
					<Article>
						<Heading title="Header" />
						<FormHeader />
					</Article>
					<Article>
						<Heading title="Competences" />
						<FormCompetences />
					</Article>
					<Article>
						<Heading title="Experiences" />
						<FormExperiences />
					</Article>
					<Article>
						<Heading title="Formations" />
						<FormFormation />
					</Article>
				</form>
			</body>
		</html>
	);
}

export default {
	page: () => renderToString(<FormPage />),
	header: () => renderToString(<FormHeader />),
	competence: () => renderToString(<FormCompetences />),
	experience: () => renderToString(<FormExperiences />),
	formation: () => renderToString(<FormFormation />),
};
