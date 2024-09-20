"use server";

import { signIn } from "@/auth";
import ROUTES from "@/lib/constants/routes";
import { fetchProfileFamiliesByEmail } from "@/lib/db/families";
import { safeActionClient } from "@/lib/utils";
import { SigninFormSchema, SignupFormSchema } from "@/lib/validation/auth";
import { AuthError } from "next-auth";
import { createUserWithCredentials } from "../db/users";
import { redirect } from "next/navigation";

export const signInWithCredentialsAction = safeActionClient
  .schema(SigninFormSchema)
  .action(async ({ parsedInput }) => {
    try {
      const families = await fetchProfileFamiliesByEmail({
        email: parsedInput.email,
      });
      await signIn("credentials", {
        ...parsedInput,
        redirectTo: families.length > 0 ? ROUTES.home : ROUTES.invitations,
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

export const signUpWithCredentialsAction = safeActionClient
  .schema(SignupFormSchema)
  .action(
    async ({
      parsedInput: { password, email, displayName, firstName, lastName },
    }) => {
      try {
        await createUserWithCredentials({
          displayName,
          email,
          firstName,
          lastName,
          password,
        });

        redirect(ROUTES.signin);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials" };

            default:
              return { error: "Unkown error found" };
          }
        }
        throw error;
      }
    }
  );
