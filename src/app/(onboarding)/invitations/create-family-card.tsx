import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default async function CreateFamilyCard({
  children,
}: PropsWithChildren) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer une famille</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
