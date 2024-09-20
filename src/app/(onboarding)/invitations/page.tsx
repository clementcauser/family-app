import { ReactNode, Suspense } from "react";
import CreateFamilyCard from "./create-family-card";
import CreateFamilyForm from "./create-family-form";
import InvitationsList from "./invitations-list";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import ROUTES from "@/lib/constants/routes";
import { Profile } from "@prisma/client";
import { checkIfProfileHasFamilyAction } from "@/lib/actions/families";

// TODO: improve loading display
export default async function Page() {
  return (
    <div className="max-w-5xl min-h-screen mx-auto px-6">
      <Suspense>
        <Guard>
          {(profileId) => (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Suspense>
                <InvitationsList profileId={profileId} />
              </Suspense>
              <Suspense fallback={"loading..."}>
                <CreateFamilyCard>
                  <CreateFamilyForm profileId={profileId} />
                </CreateFamilyCard>
              </Suspense>
            </div>
          )}
        </Guard>
      </Suspense>
    </div>
  );
}

interface GuardProps {
  children: (profileId: Profile["id"]) => ReactNode;
}

async function Guard({ children }: GuardProps) {
  const session = await auth();

  if (session?.user.id) {
    const response = await checkIfProfileHasFamilyAction({
      profileId: session.user.id,
    });

    const hasFamily = response?.data;

    if (hasFamily) {
      redirect(ROUTES.home);
    } else {
      return <>{children(session.user.id)}</>;
    }
  } else {
    await signOut();
  }
}
