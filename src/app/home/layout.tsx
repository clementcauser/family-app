import Navbar from "@/components/misc/navbar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className="mb-16 lg:mb-0">{children}</main>
    </div>
  );
}
