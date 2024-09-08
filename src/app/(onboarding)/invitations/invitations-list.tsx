import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllInvitationsFromProfileAction } from "./actions";
import InvitationsListItem from "./invitations-list-item";
import { Profile } from "@prisma/client";

interface Props {
  profileId: Profile["id"];
}

export default async function InvitationsList({ profileId }: Props) {
  const session = await auth();

  if (session?.user?.id) {
    const invitations = await getAllInvitationsFromProfileAction({
      guestId: session?.user?.id,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Vos invitations</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations?.data && invitations.data?.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {invitations?.data?.map((invitation) => (
                <InvitationsListItem
                  family={invitation.family}
                  invitationId={invitation.id}
                  owner={invitation.createdBy}
                  profileId={session.user.id}
                />
              ))}
            </ul>
          ) : (
            <p>Vous n'avez reçu aucune invitation pour le moment.</p>
          )}
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
}
