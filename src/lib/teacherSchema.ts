import { z } from "zod";

const subjectsEnum = z.enum([
  "MATH",
  "ENGLISH",
  "PHYSICS",
  "BIOLOGY",
  "GEOGRAPHY",
  "RUSSIAN",
]);

export const teacherSchema = z.object({
  subjects: z.array(subjectsEnum).min(1, "Выберите хотя бы один предмет"),
  hourlyRate: z
    .number()
    .min(1, "Ставка должна быть больше 0")
    .max(1000, "Слишком высокая ставка"),
  description: z
    .string()
    .max(500, "Описание не должно превышать 500 символов")
    .optional(),
});

export type TeacherFormData = z.infer<typeof teacherSchema>;
