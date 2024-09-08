import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import ROUTES from "./lib/constants/routes";
import prisma from "./lib/db/prisma";
import { getUserByEmail as getUserByEmailWithProfiles } from "./lib/db/users";
import { arePasswordsMatching } from "./lib/utils/password";
import { SigninFormSchema } from "./lib/validation/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: { signIn: ROUTES.signin },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account, user, profile, session }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      // I skipped the line below coz it gave me a TypeError
      // session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials): Promise<any> => {
        try {
          const { email, password } = await SigninFormSchema.parseAsync(
            credentials
          );

          // logic to verify if the user exists
          const user = await getUserByEmailWithProfiles(email);

          if (!user) {
            throw new Error("User not found.");
          } else {
            if (user?.password) {
              const passwordsAreMatching = await arePasswordsMatching(
                password,
                user.password
              );
              if (passwordsAreMatching) {
                const { id, password, profile, ...withoutPassword } = user;

                return { ...withoutPassword, id: profile[0].id };
              } else {
                return null;
              }
            } else {
              return null;
            }
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
