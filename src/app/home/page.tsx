import { auth } from "@/auth";
import HomeTasksList from "@/components/misc/home-tasks-list";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl">Bonjour {session?.user.name}</h1>
      <HomeTasksList profileId={session?.user.id} />
    </div>
  );
}
