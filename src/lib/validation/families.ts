import { z } from "zod";

export const CreateFamilyFormSchema = z
  .object({
    name: z.string(),
    profileId: z.string().cuid(),
  })
  .required();

export const FetchProfileFamiliesSchema = z
  .object({
    profileId: z.string().cuid(),
  })
  .required();

export const FetchProfileFamiliesByEmailPayloadSchema = z
  .object({
    email: z.string().email(),
  })
  .required();

export const AddFamilyMemberSchema = z
  .object({
    guestId: z.string().cuid(),
    familyId: z.string().cuid(),
  })
  .required();

export const AddFamilyMemberFromInvitationSchema = z
  .object({
    guestId: z.string().cuid(),
    familyId: z.string().cuid(),
    invitationId: z.string().cuid(),
  })
  .required();

export const GetProfileFamilySchema = z
  .object({
    profileId: z.string().cuid(),
  })
  .required();
