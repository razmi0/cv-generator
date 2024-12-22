import type { InputProps } from "@/components/Form/Input.tsx";

export default {
    header: [
        { label: "Photo url:", id: "photo", name: "photo" },
        { label: "Nom:", id: "nom", name: "nom" },
        { label: "Prenom:", id: "prenom", name: "prenom" },
        { label: "Age:", id: "age", name: "age" },
        { label: "Permis:", id: "permis", name: "permis" },
        { label: "Telephone:", id: "tel", name: "tel" },
        { label: "Adresse:", id: "adresse", name: "adresse" },
        { label: "E-mail:", id: "mail", name: "mail" },
    ],
    competences: [
        { label: "Outils:", id: "outils", name: "outils" },
        { label: "Langages:", id: "langages", name: "langages" },
        { label: "Logiciels:", id: "logiciels", name: "logiciels" },
        { label: "Base de donnees:", id: "baseDeDonnees", name: "baseDeDonnees" },
        { label: "Methodologie:", id: "methodologie", name: "methodologie" },
        { label: "Softskills:", id: "softskills", name: "softskills" },
    ],
    experiences: [
        { label: "Sous-titre:", id: "sousTitre", name: "sousTitre" },
        { label: "Poste:", id: "poste", name: "poste" },
        { label: "Contexte:", id: "contexte", name: "contexte" },
        { label: "Objectif:", id: "objectif", name: "objectif" },
        { label: "Taches:", id: "taches", name: "taches" },
        { label: "Environnement:", id: "environnement", name: "environnement" },
        { label: "Resultat:", id: "resultat", name: "resultat" },
    ],
    formations: [
        { label: "Niveau:", id: "niveau", name: "niveau" },
        { label: "Etablissement:", id: "etablissement", name: "etablissement" },
        { label: "Periode:", id: "periode", name: "periode" },
    ],
} as Record<keyof CvType, InputProps[]>;
