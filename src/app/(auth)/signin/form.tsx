"use client";

import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { signInWithCredentialsAction } from "@/lib/actions/auth";
import { SigninFormSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof SigninFormSchema>;

const DEFAULT_VALUES: FormValues = {
  email: "",
  password: "",
};

export function SignuInForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { execute, isExecuting } = useAction(signInWithCredentialsAction, {
    onSuccess() {
      toast({ title: "Succès 🎉", description: "Bienvenue !" });
    },
    onError() {
      toast({
        title: "Erreur ❌",
        description:
          "Une erreur s'est produite pendant la connexion à votre compte. Réssayez.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="harry.potter@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe *</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription>
                Doit contenir 6 caractères dont 1 chiffre et 1 lettre.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isExecuting} type="submit">
          {isExecuting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
