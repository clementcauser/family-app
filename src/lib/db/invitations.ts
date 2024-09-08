import { z } from "zod";
import { deleteInvitationByIdSchema as DeleteInvitationByIdSchema } from "../validation/invitations";
import prisma from "./prisma";

export async function getAllProfileInvitations(profileId: string) {
  return prisma.invitation.findMany({
    where: { guest: { id: profileId } },
    select: { family: true, createdBy: true, id: true },
  });
}

export async function removeAllFamilyInvitations(
  profileId: string,
  familyId: string
) {
  return prisma.invitation.deleteMany({
    where: { familyId, guest: { id: profileId } },
  });
}

type DeleteInvitationByIdPayload = z.infer<typeof DeleteInvitationByIdSchema>;

export async function deleteInvitationById(
  payload: DeleteInvitationByIdPayload
) {
  return prisma.invitation.delete({ where: { id: payload.invitationId } });
}
