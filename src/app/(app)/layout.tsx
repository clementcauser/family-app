import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants/app";
import Navbar from "./navbar";

export const metadata: Metadata = {
  title: `Bienvenue sur ${APP_NAME}`,
  description: "L'application qui facilite votre quotidien à la maison",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
