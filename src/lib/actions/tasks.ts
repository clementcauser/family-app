"use server";

import { revalidatePath } from "next/cache";
import {
  fetchTodayTasks,
  changeTaskStatus,
  createTask,
  editTask,
} from "../db/tasks";
import { safeActionClient } from "../utils";
import {
  FetchTodayTasksSchema,
  ChangeTaskStatusSchema,
  CreateOrEditTaskFormSchema,
  CreateOrEditTaskSchema,
} from "../validation/tasks";
import ROUTES from "../constants/routes";

export const fetchTodayTasksAction = safeActionClient
  .schema(FetchTodayTasksSchema)
  .action(async ({ parsedInput }) => {
    try {
      const tasks = await fetchTodayTasks(parsedInput);

      return tasks;
    } catch (error) {
      throw Error(error as string);
    }
  });

export const markTaskAsDoneAction = safeActionClient
  .schema(ChangeTaskStatusSchema)
  .action(async ({ parsedInput }) => {
    try {
      const task = await changeTaskStatus(parsedInput);

      return task;
    } catch (error) {
      throw Error(error as string);
    }
  });

export const createTaskAction = safeActionClient
  .schema(CreateOrEditTaskSchema)
  .action(async ({ parsedInput }) => {
    try {
      const task = await createTask(parsedInput);

      revalidatePath(ROUTES.home);

      return task;
    } catch (error) {
      throw Error(error as string);
    }
  });

export const editTaskAction = safeActionClient
  .schema(CreateOrEditTaskSchema)
  .action(async ({ parsedInput }) => {
    try {
      const task = await editTask(parsedInput);
      revalidatePath(ROUTES.home);

      return task;
    } catch (error) {
      throw Error(error as string);
    }
  });
