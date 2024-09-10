import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@prisma/client";
import { getAllInvitationsFromProfileAction } from "./actions";
import InvitationsListItem from "./invitations-list-item";

interface Props {
  profileId: Profile["id"];
}

export default async function InvitationsList({ profileId }: Props) {
  const invitations = await getAllInvitationsFromProfileAction({
    guestId: profileId,
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
                key={invitation.id}
                family={invitation.family}
                invitationId={invitation.id}
                owner={invitation.createdBy}
                profileId={profileId}
              />
            ))}
          </ul>
        ) : (
          <p>Vous n&apos;avez reçu aucune invitation pour le moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
