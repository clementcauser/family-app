"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateFamilyFormSchema } from "@/lib/validation/families";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createFamilyAction } from "./actions";
import ROUTES from "@/lib/constants/routes";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type FormValues = z.infer<typeof CreateFamilyFormSchema>;

interface Props {
  profileId: string;
}

export default function CreateFamilyForm({ profileId }: Props) {
  const { push } = useRouter();
  const { toast } = useToast();

  const DEFAULT_VALUES: FormValues = { name: "", profileId };
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateFamilyFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { execute, isExecuting } = useAction(createFamilyAction, {
    onSuccess: () => {
      toast({
        title: "Félicitations 🎉",
        description: "Votre famille a été créée avec succès !",
      });
      push(ROUTES.root);
    },
    onError({ error }) {
      toast({
        title: "Erreur ❌",
        description: `Une erreur s'est produite pendant la création de votre famille. Erreur : ${
          error.serverError ?? "undefined"
        }`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: FormValues) => execute(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de famille</FormLabel>
              <FormControl>
                <Input placeholder="Potter" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isExecuting}
          className="mt-2 w-full lg:w-auto"
          type="submit"
        >
          {isExecuting ? "Création en cours..." : "Créer une nouvelle famille"}
        </Button>
      </form>
    </Form>
  );
}
