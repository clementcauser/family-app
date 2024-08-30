import { z } from "zod";

export const SignupFormSchema = z
  .object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().email("Doit être une adresse email valide").trim(),
    password: z
      .string()
      .min(6, "Doit contenir 6 caractères minimum")
      .regex(/[a-zA-Z]/, { message: "Doit contenir au moins 1 lettre" })
      .regex(/[0-9]/, { message: "Doit contenir au moins 1 chiffre" })
      .trim(),
    confirm: z
      .string()
      .min(6, "Doit contenir 6 caractères minimum")
      .regex(/[a-zA-Z]/, { message: "Doit contenir au moins 1 lettre" })
      .regex(/[0-9]/, { message: "Doit contenir au moins 1 chiffre" })
      .trim(),
  })
  .required({ firstName: true, email: true, lastName: true, password: true })
  .refine((data) => data.confirm === data.password, {
    message: "Les deux mots de passe doivent être identiques",
    path: ["confirm"],
  });
