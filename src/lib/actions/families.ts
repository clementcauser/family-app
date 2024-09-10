"use server";

import {
  addFamilyMember,
  getProfileFamily,
  fetchProfileFamilies,
  createFamily,
} from "../db/families";
import { deleteInvitationById } from "../db/invitations";
import { safeActionClient } from "../utils";
import {
  AddFamilyMemberFromInvitationSchema,
  GetProfileFamilySchema,
  CreateFamilyFormSchema,
} from "../validation/families";

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
