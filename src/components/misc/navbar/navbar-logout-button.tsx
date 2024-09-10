"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutAction } from "./action";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await logoutAction();
      }}
    >
      <LogOut className="mr-2" /> Se déconnecter
    </Button>
  );
}
