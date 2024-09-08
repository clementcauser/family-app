import { z } from "zod";
import {
  AddFamilyMemberSchema,
  CreateFamilyFormSchema,
  FetchProfileFamiliesByEmailPayloadSchema,
  FetchProfileFamiliesSchema,
  GetProfileFamilySchema,
} from "../validation/families";
import prisma from "./prisma";

type CreateFamilyPayload = z.infer<typeof CreateFamilyFormSchema>;

export async function createFamily(payload: CreateFamilyPayload) {
  return prisma.family.create({
    data: {
      name: payload.name,
      owner: { connect: { id: payload.profileId } },
      profiles: { connect: { id: payload.profileId } },
    },
  });
}

type FetchProfileFamiliesPayload = z.infer<typeof FetchProfileFamiliesSchema>;

export async function fetchProfileFamilies(
  payload: FetchProfileFamiliesPayload
) {
  return prisma.family.findMany({
    where: { profiles: { some: { id: payload.profileId } } },
  });
}

type FetchProfileFamiliesByEmailPayload = z.infer<
  typeof FetchProfileFamiliesByEmailPayloadSchema
>;

export async function fetchProfileFamiliesByEmail(
  payload: FetchProfileFamiliesByEmailPayload
) {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (user) {
    return prisma.family.findMany({ where: { profiles: { some: { user } } } });
  } else {
    throw Error("User not found");
  }
}

type AddFamilyMemberByInvitationPayload = z.infer<typeof AddFamilyMemberSchema>;

export async function addFamilyMember(
  payload: AddFamilyMemberByInvitationPayload
) {
  return prisma.family.update({
    where: { id: payload.familyId },
    data: { profiles: { connect: { id: payload.guestId } } },
  });
}

type GetProfileFamilyPayload = z.infer<typeof GetProfileFamilySchema>;

export async function getProfileFamily(payload: GetProfileFamilyPayload) {
  return prisma.family.findFirst({
    where: { profiles: { some: { id: payload.profileId } } },
  });
}
