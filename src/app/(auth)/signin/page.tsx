import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ROUTES from "@/lib/constants/routes";
import Link from "next/link";
import { SignuInForm } from "./form";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);
  return (
    <main className="px-6">
      <Card className="w-full max-w-lg m-auto">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignuInForm />
        </CardContent>
        <CardContent>
          <div className="flex gap-1">
            <p>Vous n&apos;avez pas encore de compte ?</p>{" "}
            <Link className="text-blue-500" href={ROUTES.signup}>
              Inscrivez-vous.
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
