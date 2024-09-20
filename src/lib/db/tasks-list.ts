import { z } from "zod";
import { FetchAllProfileListsSchema } from "../validation/tasks-list";
import prisma from "./prisma";

type FetchAllProfileListsPayload = z.infer<typeof FetchAllProfileListsSchema>;

export async function fetchAllProfileLists(
  payload: FetchAllProfileListsPayload
) {
  return prisma.tasksList.findMany({
    where: { createdBy: { id: payload.profileId } },
  });
}
