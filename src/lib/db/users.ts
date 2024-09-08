import { z } from "zod";
import prisma from "./prisma";
import { SignupFormSchema } from "../validation/auth";
import { saltAndHashPassword } from "../utils/password";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });
}

type CreateUserPayload = Omit<z.infer<typeof SignupFormSchema>, "confirm">;

export async function createUserWithCredentials({
  email,
  firstName,
  lastName,
  displayName,
  password: _password,
}: CreateUserPayload) {
  const password = await saltAndHashPassword(_password);

  return prisma.user.create({
    data: {
      email,
      password,
      name: displayName,
      profile: { create: { displayName, firstName, lastName } },
    },
  });
}
