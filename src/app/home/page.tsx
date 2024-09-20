import { auth } from "@/auth";
import HomeTasksList from "@/components/misc/tasks/home-tasks-list";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl">Bonjour {session?.user.name} 👋</h1>
      <div className="flex flex-col gap-4 mt-4">
        <Suspense fallback="Loading...">
          <HomeTasksList profileId={session?.user.id} />
        </Suspense>
      </div>
    </div>
  );
}
