import Navbar from "@/components/misc/navbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className="mb-16 md:mb-0 pt-0 md:pt-16 max-w-5xl mx-auto">
        <div className="py-4">{children}</div>
      </main>
    </div>
  );
}
