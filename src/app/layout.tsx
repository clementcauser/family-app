import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Bienvenue sur ${APP_NAME}`,
  description: "L'application qui facilite votre quotidien à la maison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
