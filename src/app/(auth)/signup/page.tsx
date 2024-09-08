import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignuUpForm } from "./form";
import Link from "next/link";
import ROUTES from "@/lib/constants/routes";

export default function Page() {
  return (
    <main className="px-6">
      <Card className="w-full max-w-lg m-auto">
        <CardHeader>
          <CardTitle>Création de votre compte</CardTitle>
          <CardDescription>
            Entrez vos informations pour vous créer un compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignuUpForm />
        </CardContent>
        <CardContent>
          <div className="flex gap-1">
            <p>Vous posssédez déjà un compte ?</p>{" "}
            <Link className="text-blue-500" href={ROUTES.signin}>
              Connectez-vous.
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
