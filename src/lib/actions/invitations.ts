"use server";

import ROUTES from "@/lib/constants/routes";
import {
  deleteInvitationById,
  getAllProfileInvitations,
  removeAllFamilyInvitations,
} from "@/lib/db/invitations";
import { safeActionClient } from "@/lib/utils";
import {
  deleteAllInvitationFromFamilySchema,
  deleteInvitationByIdSchema,
  getAllInvitationPayloadSchema,
} from "@/lib/validation/invitations";
import { revalidatePath } from "next/cache";

export const getAllInvitationsFromProfileAction = safeActionClient
  .schema(getAllInvitationPayloadSchema)
  .action(async ({ parsedInput }) => {
    try {
      const invitations = await getAllProfileInvitations(parsedInput.guestId);

      return invitations;
    } catch (error) {
      throw Error(error as string);
    }
  });

export const deleteAllInvitationsFromFamilyAction = safeActionClient
  .schema(deleteAllInvitationFromFamilySchema)
  .action(async ({ parsedInput }) => {
    try {
      await removeAllFamilyInvitations(
        parsedInput.profileId,
        parsedInput.familyId
      );
    } catch (error) {
      throw Error(error as string);
    }
  });

export const deleteInvitation = safeActionClient
  .schema(deleteInvitationByIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      const removedInvitation = await deleteInvitationById(parsedInput);

      revalidatePath(ROUTES.invitations);

      return removedInvitation;
    } catch (error) {
      throw Error(error as string);
    }
  });
