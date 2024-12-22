import { z } from "@land/zod";

export const ExperiencesSchema = z.object({
    sousTitre: z.string(),
    poste: z.string(),
    contexte: z.string(),
    objectif: z.string(),
    taches: z.array(z.string()),
    environnement: z.array(z.string()),
    resultat: z.string(),
});

export const FormationsSchema = z.object({
    niveau: z.string(),
    etablissement: z.string(),
    periode: z.string(),
});

export const CompetencesSchema = z.object({
    outils: z.array(z.string()),
    langages: z.array(z.string()),
    logiciels: z.array(z.string()),
    baseDeDonnees: z.array(z.string()),
    methodologie: z.array(z.string()),
    softskills: z.array(z.string()),
});

export const HeaderSchema = z.object({
    photo: z.string(),
    nom: z.string(),
    prenom: z.string(),
    age: z.string(),
    permis: z.string(),
    tel: z.string(),
    adresse: z.string(),
    mail: z.string().email(),
});

export const CvSchema = z.object({
    header: HeaderSchema,
    competences: CompetencesSchema,
    experiences: z.array(ExperiencesSchema),
    formations: z.array(FormationsSchema),
});
