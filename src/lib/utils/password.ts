import { hash, genSalt, compare } from "bcryptjs";

export const saltAndHashPassword = async (plainPassword: string) => {
  const salt = await genSalt(10);
  const hashedPassword = hash(plainPassword, salt);

  return hashedPassword;
};

export const arePasswordsMatching = async (
  password1: string,
  password2: string
) => compare(password1, password2);
