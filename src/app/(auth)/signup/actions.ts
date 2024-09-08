"use server";

import ROUTES from "@/lib/constants/routes";
import { createUserWithCredentials } from "@/lib/db/users";
import { safeActionClient } from "@/lib/utils";
import { SignupFormSchema } from "@/lib/validation/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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
