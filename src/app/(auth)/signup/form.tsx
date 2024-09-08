"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { signUpWithCredentialsAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { SignupFormSchema } from "@/lib/validation/auth";

type FormValues = z.infer<typeof SignupFormSchema>;

const DEFAULT_VALUES: FormValues = {
  confirm: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  displayName: "",
};

export function SignuUpForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { execute, isExecuting } = useAction(signUpWithCredentialsAction, {
    onSuccess() {
      toast({ title: "Succès 🎉", description: "Votre compte a été créé !" });
    },
    onError() {
      toast({
        title: "Erreur ❌",
        description:
          "Une erreur s'est produite pendant la création de votre compte. Réssayez.",
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
        <div className="md:grid grid-cols-1 md:grid-cols-2 md:gap-2 border-b pb-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Harry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
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
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Nom d&apos;utilisateur *</FormLabel>
                <FormControl>
                  <Input placeholder="Harry Potter" {...field} />
                </FormControl>
                <FormDescription>Correspond au nom affiché</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe *</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isExecuting} type="submit">
          {isExecuting ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
