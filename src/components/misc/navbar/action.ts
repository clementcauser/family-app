"use server";

import { signOut } from "@/auth";
import { safeActionClient } from "@/lib/utils";

export const logoutAction = safeActionClient.action(async () => signOut());
