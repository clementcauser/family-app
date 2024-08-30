"use server";

import { SignupFormSchema } from "../auth/definitions";

export async function signup(state, formData: FormData) {
  // 1. Validate fields
  const validationResult = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Create user
  // 3. Create session
}
