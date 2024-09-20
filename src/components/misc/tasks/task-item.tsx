"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { markTaskAsDoneAction } from "@/lib/actions/tasks";
import { cn } from "@/lib/utils";
import { Profile, Task, TaskStatus } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { EditTaskFormDrawer } from "./task-form-drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const DELAY = 4000;

interface DeleteTaskDialogProps {
  task: Task;
}

function DeleteTaskDialog({ task }: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => setIsOpen(true)}
          className="flex flex-1 md:flex-auto"
        >
          <Trash className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">Supprimer</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la tâche</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr.e de vouloir supprimer la tâche {task.title} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            <Trash className="h-4 w-4 md:mr-2" />
            <span>Supprimer définitivement</span>
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  task: Task;
  profileId: Profile["id"];
}

export default function TaskItem({ task, profileId }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isChecked, setIsChecked] = useState(task.status === TaskStatus.DONE);

  const { execute } = useAction(markTaskAsDoneAction);

  const handleOnSelect = (newStateIsChecked: boolean) => {
    if (newStateIsChecked) {
      setIsChecked(true);
      execute({ taskId: task.id, profileId, newStatus: TaskStatus.DONE });
      toast(`${task.title} ✅`, {
        duration: DELAY,
        action: {
          label: "Annuler",
          onClick: () => {
            execute({
              taskId: task.id,
              profileId,
              newStatus: TaskStatus.TODO,
            });
            setIsChecked(false);
            toast(`"${task.title}" rétablie ↩️`);
          },
        },
      });
    } else {
      execute({ taskId: task.id, profileId, newStatus: TaskStatus.TODO });
      setIsChecked(false);
    }
  };

  return (
    <div
      className="flex md:flex-row flex-col md:justify-between md:items-center p-2 bg-slate-50 rounded min-h-14"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex space-x-2">
        <Checkbox
          id={task.id}
          onFocus={() => setIsHovering(true)}
          checked={isChecked}
          onClick={() => handleOnSelect(!isChecked)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={task.id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer truncate",
              isChecked && "line-through"
            )}
          >
            {task.title}
          </label>
          {task?.description && (
            <p className="text-xs text-muted-foreground truncate">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div
        className={cn(
          "items-center gap-2 mt-4 md:mt-0 justify-end",
          isHovering ? "flex" : "flex md:hidden"
        )}
      >
        <EditTaskFormDrawer
          profileId={profileId}
          defaultValues={{
            ...task,
            taskId: task.id,
            title: task.title,
            listId: task.tasksListId,
            hasExpiration: !!task?.expiresAt,
            profileId,
            description: task?.description ?? undefined,
            priority: task?.priority ?? undefined,
            status: task.status,
            expiresAtTime: task.expiresAt
              ? `${task.expiresAt?.getHours()}:${task.expiresAt?.getMinutes()}`
              : undefined,
            expiresAtDate: task.expiresAt ?? undefined,
          }}
        />
        <DeleteTaskDialog task={task} />
      </div>
    </div>
  );
}
