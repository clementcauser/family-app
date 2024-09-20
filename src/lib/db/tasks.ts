import { z } from "zod";
import {
  FetchTodayTasksSchema,
  ChangeTaskStatusSchema,
  CreateOrEditTaskFormSchema,
  CreateOrEditTaskSchema,
} from "../validation/tasks";
import prisma from "./prisma";
import { Profile, Task, TaskStatus } from "@prisma/client";

type FetchTodayTasksPayload = z.infer<typeof FetchTodayTasksSchema>;

export async function fetchTodayTasks(payload: FetchTodayTasksPayload) {
  return prisma.task.findMany({
    where: {
      createdBy: { id: payload.profileId },
      status: { not: "DONE" },
      expiresAt: { lte: payload.tomorrowDate },
    },
  });
}

type ChangeTaskStatusPayload = z.infer<typeof ChangeTaskStatusSchema>;

export async function changeTaskStatus(payload: ChangeTaskStatusPayload) {
  const { profileId, taskId, newStatus } = payload;

  return prisma.task.update({
    where: { id: taskId, AND: [{ createdById: profileId }] },
    data: { status: newStatus },
  });
}

type CreateOrEditTaskPayload = z.infer<typeof CreateOrEditTaskSchema>;

export async function createTask(payload: CreateOrEditTaskPayload) {
  const {
    listId,
    newListTitle,
    description,
    expiresAt,
    priority,
    title,
    profileId,
  } = payload;

  return prisma.task.create({
    data: {
      title: title ?? "",
      description,
      createdBy: { connect: { id: profileId } },
      expiresAt,
      status: TaskStatus.TODO,
      priority,
      ...(listId
        ? {
            tasksList: {
              connectOrCreate: {
                where: { id: listId },
                create: { title: newListTitle ?? "", createdById: profileId },
              },
            },
          }
        : {}),
    },
  });
}

export async function editTask(payload: CreateOrEditTaskPayload) {
  const {
    listId,
    newListTitle,
    description,
    expiresAt,
    priority,
    title,
    taskId,
    profileId,
  } = payload;

  return prisma.task.update({
    where: { id: taskId },
    data: {
      title: title ?? "",
      description,
      createdBy: { connect: { id: profileId } },
      ...(listId
        ? {
            tasksList: {
              connectOrCreate: {
                where: { id: listId },
                create: { title: newListTitle ?? "", createdById: profileId },
              },
            },
          }
        : {}),
      expiresAt,
      status: TaskStatus.TODO,
      priority,
    },
  });
}
