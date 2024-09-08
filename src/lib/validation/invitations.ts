import { z } from "zod";

export const getAllInvitationPayloadSchema = z
  .object({
    guestId: z.string().cuid(),
  })
  .required();

export const deleteAllInvitationFromFamilySchema = z
  .object({
    profileId: z.string().cuid(),
    familyId: z.string().cuid(),
  })
  .required();

export const deleteInvitationByIdSchema = z
  .object({
    invitationId: z.string().cuid(),
  })
  .required();
