import { CompetencesSchema, CvSchema, ExperiencesSchema, FormationsSchema, HeaderSchema } from "@/model/cv_schema.ts";
import { z } from "@land/zod";

declare global {
    type CvType = z.infer<typeof CvSchema>;
    type ExperiencesType = z.infer<typeof ExperiencesSchema>;

    type FormationsType = z.infer<typeof FormationsSchema>;

    type CompetencesType = z.infer<typeof CompetencesSchema>;

    type HeaderType = z.infer<typeof HeaderSchema>;
}
