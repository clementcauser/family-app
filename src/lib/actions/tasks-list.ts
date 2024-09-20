"use server";

import { fetchAllProfileLists } from "../db/tasks-list";
import { safeActionClient } from "../utils";
import { FetchAllProfileListsSchema } from "../validation/tasks-list";

export const fetchAllProfileListsAction = safeActionClient
  .schema(FetchAllProfileListsSchema)
  .action(async ({ parsedInput }) => {
    try {
      const lists = await fetchAllProfileLists(parsedInput);

      return lists;
    } catch (error) {
      throw Error(error as string);
    }
  });
