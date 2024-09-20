"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createTaskAction, editTaskAction } from "@/lib/actions/tasks";
import { fetchAllProfileListsAction } from "@/lib/actions/tasks-list";
import { cn } from "@/lib/utils";
import { CreateOrEditTaskFormSchema } from "@/lib/validation/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, Task, TaskPriority, TaskStatus } from "@prisma/client";
import { format } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigRight,
  ArrowBigUp,
  CalendarIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function handleDateValues(date?: Date, time?: string) {
  if (date && time) {
    let hours: number;
    let minutes: number;

    hours = Number(time.split(":")[0]);
    minutes = Number(time.split(":")[1]);

    return new Date(new Date(date).setHours(hours)).setMinutes(minutes);
  } else {
    return undefined;
  }
}

type FormValues = z.infer<typeof CreateOrEditTaskFormSchema>;

const GET_INITIAL_VALUES = (profileId: Profile["id"]): FormValues => ({
  description: "",
  expiresAtDate: undefined,
  expiresAtTime: "",
  profileId,
  title: "",
  priority: undefined,
  status: TaskStatus.TODO,
  listId: null,
  taskId: undefined,
  hasExpiration: false,
  newListTitle: "",
});

interface Props {
  profileId: Profile["id"];
  taskId?: Task["id"];
  defaultValues?: FormValues;
  onSubmitSuccess: () => void;
}

export default function TaskForm({
  defaultValues,
  profileId,
  taskId,
  onSubmitSuccess,
}: Props) {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const { result: tasksLists } = useAction(fetchAllProfileListsAction, {
    executeOnMount: { input: { profileId } },
  });

  const { execute: createTask } = useAction(createTaskAction, {
    onSuccess() {
      toast({
        title: "C'est noté ✅",
        description: "Tâche créée avec succès !",
      });
      onSubmitSuccess();
    },
    onError({ error }) {
      toast({ title: "Erreur ❌", description: error.serverError });
    },
  });

  const { execute: editTask } = useAction(editTaskAction, {
    onSuccess() {
      toast({
        title: "Modification enregistrée ✅",
        description: "La tâche a été correctement modifiée",
      });
      onSubmitSuccess();
    },
    onError({ error }) {
      toast({ title: "Erreur ❌", description: error.serverError });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateOrEditTaskFormSchema),
    defaultValues: defaultValues ?? GET_INITIAL_VALUES(profileId),
  });

  const onSubmit = (values: FormValues) => {
    const {
      expiresAtDate,
      expiresAtTime,
      hasExpiration,
      listId,
      newListTitle,
      ...rest
    } = values;

    const expiresAt = handleDateValues(expiresAtDate, expiresAtTime);

    if (taskId) {
      editTask({
        ...rest,
        expiresAt: hasExpiration && expiresAt ? new Date(expiresAt) : undefined,
        ...(newListTitle ? { newListTitle } : { listId }),
        taskId,
        listId,
      });
    } else {
      createTask({
        ...rest,
        expiresAt: hasExpiration && expiresAt ? new Date(expiresAt) : undefined,
        ...(newListTitle ? { newListTitle } : { listId }),
        listId,
      });
    }
  };

  const listsOptions = (tasksLists?.data ?? []).map((list) => (
    <SelectItem key={list.id} value={list.id}>
      {list.title}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-1 space-y-6 overflow-y-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé *</FormLabel>
              <FormControl>
                <Input placeholder="Ranger la maison..." {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Commencer par remettre les coussins du canapé, puis..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Donnez des détails sur la tâche à réaliser
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Collapsible
          open={showDetails}
          onOpenChange={(isOpen) => setShowDetails(isOpen)}
        >
          <CollapsibleTrigger asChild className="flex">
            <Button variant="ghost" className="mr-0 ml-auto">
              {showDetails
                ? "Cacher les options supplémentaires"
                : "Montrer plus d'options..."}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 space-y-6">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une priorité..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={TaskPriority.HIGH}>
                            <div className="flex items-center gap-1">
                              <ArrowBigUp className="text-red-500" />
                              <span>Haute</span>
                            </div>
                          </SelectItem>
                          <SelectItem value={TaskPriority.MEDIUM}>
                            <div className="flex items-center gap-1">
                              <ArrowBigRight className="text-green-500" />
                              <span>Moyenne</span>
                            </div>
                          </SelectItem>
                          <SelectItem value={TaskPriority.LOW}>
                            <div className="flex items-center gap-1">
                              <ArrowBigDown className="text-blue-500" />
                              <span>Basse</span>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <div
                className={cn(
                  "border rounded-lg p-4",
                  form.watch("hasExpiration") ? "border-primary" : "border"
                )}
              >
                <h3 className="mb-4">Limite de temps</h3>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="hasExpiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="expiresAtDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col col-span-2 lg:col-span-1">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Sélectionnez une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(event) => {
                                  field.onChange(event);
                                  form.setValue("expiresAtTime", "00:00");
                                  form.setValue("hasExpiration", true);
                                }}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Date avant laquelle la tâche doit être réalisée
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expiresAtTime"
                      render={({ field }) => (
                        <FormItem className="col-span-2 lg:col-span-1">
                          <FormLabel>Heure</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={
                                form.watch("expiresAtDate") === undefined
                              }
                              onChange={field.onChange}
                              className="w-60"
                              type="time"
                            />
                          </FormControl>
                          <FormDescription>
                            Heure avant laquelle la tâche doit être réalisée
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="border rounded-lg p-4">
                <h3 className="mb-4">Ajouter à une liste</h3>
                <div className="flex flex-wrap gap-2">
                  <FormField
                    control={form.control}
                    name="listId"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full lg:w-60">
                        <FormLabel>Liste</FormLabel>
                        <Select
                          onValueChange={(event) => {
                            field.onChange(event);
                            form.setValue("newListTitle", "");
                          }}
                          defaultValue={field.value ?? undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Ajouter à la liste..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>{listsOptions}</SelectContent>
                        </Select>
                        <FormDescription>
                          Ajoutez cette tâche à une liste existante
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="w-full lg:w-auto text-center my-4 mx-8">
                    ou...
                  </p>
                  <FormField
                    control={form.control}
                    name="newListTitle"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full lg:w-60">
                        <FormLabel>Nouvelle liste</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={field.onChange}
                            placeholder="Ma nouvelle liste..."
                            type="text"
                          />
                        </FormControl>
                        <FormDescription>
                          Créez une nouvelle liste directement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button className="flex w-full" type="submit">
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
