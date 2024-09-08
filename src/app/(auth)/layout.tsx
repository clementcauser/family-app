import { APP_NAME } from "@/lib/constants/app";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden bg-primary md:flex items-center justify-center">
        <div>
          <h1 className="text-4xl text-white font-bold">
            Bienvenue sur {APP_NAME}
          </h1>
          <p className="text-gray-100 italic">
            L&apos;application qui facilite votre quotidien à la maison
          </p>
        </div>
      </div>
      <div className="bg-gray-100 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
