"use server";

import ROUTES from "@/lib/constants/routes";
import {
  addFamilyMember,
  createFamily,
  fetchProfileFamilies,
  getProfileFamily,
} from "@/lib/db/families";
import {
  deleteInvitationById,
  getAllProfileInvitations,
  removeAllFamilyInvitations,
} from "@/lib/db/invitations";
import { safeActionClient } from "@/lib/utils";
import {
  AddFamilyMemberFromInvitationSchema,
  CreateFamilyFormSchema,
  GetProfileFamilySchema,
} from "@/lib/validation/families";
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

export const createFamilyAction = safeActionClient
  .schema(CreateFamilyFormSchema)
  .action(async ({ parsedInput }) => {
    try {
      const families = await fetchProfileFamilies(parsedInput);

      if (families.length === 0) {
        return createFamily(parsedInput);
      } else {
        throw Error("You are already in a family.");
      }
    } catch (error) {
      throw Error(error as string);
    }
  });

export const addFamilyMemberByInvitationAction = safeActionClient
  .schema(AddFamilyMemberFromInvitationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const updatedFamily = await addFamilyMember(parsedInput);

      if (updatedFamily) {
        return deleteInvitationById({ invitationId: parsedInput.invitationId });
      } else {
        throw Error(
          `Cannot add profile ("${parsedInput.guestId}") to this family ("${parsedInput.familyId}").`
        );
      }
    } catch (error) {
      throw Error(error as string);
    }
  });

export const checkIfProfileHasFamilyAction = safeActionClient
  .schema(GetProfileFamilySchema)
  .action(async ({ parsedInput }) => {
    try {
      const family = await getProfileFamily(parsedInput);

      return !!family;
    } catch (error) {
      throw Error(error as string);
    }
  });
