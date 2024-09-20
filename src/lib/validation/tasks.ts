import { TaskPriority, TaskStatus } from "@prisma/client";
import { z } from "zod";

export const FetchTodayTasksSchema = z
  .object({
    profileId: z.string().cuid(),
    tomorrowDate: z.date(),
  })
  .required();

export const ChangeTaskStatusSchema = z
  .object({
    profileId: z.string().cuid(),
    taskId: z.string().cuid(),
    newStatus: z.nativeEnum(TaskStatus),
  })
  .required();

const titleMaxCharacters = 256;

export const CreateOrEditTaskFormSchema = z
  .object({
    profileId: z.string().cuid(),
    title: z
      .string()
      .max(
        titleMaxCharacters,
        `Le titre doit comporter au maximum ${titleMaxCharacters} caractères`
      ),
    description: z.string().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
    hasExpiration: z.boolean(),
    expiresAtDate: z.date().optional(),
    expiresAtTime: z.string().optional(),
    listId: z.string().cuid().nullable(),
    status: z.nativeEnum(TaskStatus),
    taskId: z.string().cuid().optional(),
    newListTitle: z.string().optional(),
  })
  .required({ title: true, profileId: true });

export const CreateOrEditTaskSchema = z.object({
  profileId: z.string().cuid(),
  title: z
    .string()
    .max(
      titleMaxCharacters,
      `Le titre doit comporter au maximum ${titleMaxCharacters} caractères`
    ),
  description: z.string().optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  expiresAt: z.date().optional(),
  listId: z.string().cuid().nullable(),
  taskId: z.string().cuid().optional(),
  newListTitle: z.string().optional(),
});
