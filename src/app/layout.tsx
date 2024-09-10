import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from "@/lib/constants/app";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "900"],
});

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
      <body className={poppins.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
