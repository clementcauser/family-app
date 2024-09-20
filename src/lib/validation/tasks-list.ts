import { z } from "zod";

export const FetchAllProfileListsSchema = z
  .object({
    profileId: z.string().cuid(),
  })
  .required();
