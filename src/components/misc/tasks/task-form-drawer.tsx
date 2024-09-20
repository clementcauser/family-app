"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateOrEditTaskFormSchema } from "@/lib/validation/tasks";
import { Edit, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { z } from "zod";
import TaskForm from "./task-form";

type FormValues = z.infer<typeof CreateOrEditTaskFormSchema>;

interface Props {
  profileId: string;
  defaultValues?: FormValues;
  children: (setIsOpen: (isOpen: boolean) => void) => ReactNode;
}

export default function TaskFormDrawer({
  profileId,
  defaultValues,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen}>
      <DrawerTrigger asChild>{children(setIsOpen)}</DrawerTrigger>
      <DrawerContent className="h-screen">
        <ScrollArea className="h-screen top-0">
          <DrawerHeader>
            <DrawerTitle>
              {defaultValues
                ? "Modification de la tâche"
                : "Création d'une tâche"}
            </DrawerTitle>
            <DrawerDescription className="hidden">
              Créez ou modifiez une tâche
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <TaskForm
              taskId={defaultValues?.taskId}
              profileId={profileId}
              defaultValues={defaultValues}
              onSubmitSuccess={() => setIsOpen(false)}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

interface CreateTaskFormDrawerProps {
  profileId: string;
}

export function CreateTaskFormDrawer({ profileId }: CreateTaskFormDrawerProps) {
  return (
    <TaskFormDrawer profileId={profileId}>
      {(setIsOpen) => (
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          <Plus className="md:mr-2 h-4 w-4" />{" "}
          <span className="hidden md:block">Ajouter une tâche</span>
        </Button>
      )}
    </TaskFormDrawer>
  );
}

interface EditTaskFormDrawerProps extends CreateTaskFormDrawerProps {
  defaultValues: FormValues;
}

export function EditTaskFormDrawer({
  defaultValues,
  profileId,
}: EditTaskFormDrawerProps) {
  return (
    <TaskFormDrawer profileId={profileId} defaultValues={defaultValues}>
      {(setIsOpen) => (
        <Button
          variant="secondary"
          onClick={() => setIsOpen(true)}
          className="flex flex-1 md:flex-auto"
        >
          <Edit className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">Modifier</span>
        </Button>
      )}
    </TaskFormDrawer>
  );
}
