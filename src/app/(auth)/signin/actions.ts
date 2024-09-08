"use server";

import { signIn } from "@/auth";
import ROUTES from "@/lib/constants/routes";
import { fetchProfileFamiliesByEmail } from "@/lib/db/families";
import { safeActionClient } from "@/lib/utils";
import { SigninFormSchema } from "@/lib/validation/auth";
import { AuthError } from "next-auth";

export const signInWithCredentialsAction = safeActionClient
  .schema(SigninFormSchema)
  .action(async ({ parsedInput }) => {
    try {
      const families = await fetchProfileFamiliesByEmail({
        email: parsedInput.email,
      });
      await signIn("credentials", {
        ...parsedInput,
        redirectTo: families.length > 0 ? ROUTES.root : ROUTES.invitations,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "invalid creds" };

          default:
            return { error: "unknown error found" };
        }
      }
      throw error;
    }
  });
