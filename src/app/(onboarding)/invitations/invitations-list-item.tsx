"use client";

import { Family, Invitation, Profile } from "@prisma/client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ROUTES from "@/lib/constants/routes";
import { addFamilyMemberByInvitationAction } from "@/lib/actions/families";
import { deleteInvitation } from "@/lib/actions/invitations";

interface AcceptInvitationButtonProps {
  invitationId: string;
  guestId: string;
  familyId: string;
}

function AcceptInvitationButton(props: AcceptInvitationButtonProps) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { execute, isExecuting } = useAction(
    addFamilyMemberByInvitationAction,
    {
      onSuccess() {
        toast({
          title: "Bravo ! 🎉",
          description: "Vous faites maintenant parti(e) de la famille !",
        });

        push(ROUTES.root);
      },
      onError() {
        toast({
          title: "Une erreur est survenue",
          description:
            "Impossible de rejoindre cette famille. Actualisez la page et réessayez.",
          variant: "destructive",
        });
      },
    }
  );

  return (
    <Button
      disabled={isExecuting}
      variant="success"
      onClick={() => execute(props)}
    >
      <CheckIcon className="mr-2 h-4 w-4" /> Accepter
    </Button>
  );
}

interface DeleteInvitationButtonProps {
  invitationId: string;
}

function DeleteInvitationButton(props: DeleteInvitationButtonProps) {
  const { toast } = useToast();
  const { execute, isExecuting } = useAction(deleteInvitation, {
    onSuccess() {
      toast({
        title: "Succès !",
        description: "L'invitation a bien été supprimée !",
      });
    },
    onError() {
      toast({
        title: "Une erreur est survenue",
        description:
          "Impossible de supprimer cette invitation. Actualisez la page et réessayez.",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isExecuting}
      onClick={() => execute(props)}
    >
      <Cross1Icon className="mr-2 h-4 w-4" /> Refuser
    </Button>
  );
}

interface Props {
  profileId: Profile["id"];
  family: Family;
  owner: Profile;
  invitationId: Invitation["id"];
}

export default function InvitationsListItem(props: Props) {
  const { family, invitationId, owner, profileId } = props;

  return (
    <li key={invitationId} className="flex justify-between">
      <p>
        Vous avez été invité(e) par{" "}
        <span className="italic">{owner.displayName}</span> à rejoindre la
        famille <span className="font-bold">{family.name}</span>
      </p>
      <div className="flex gap-2 items-center">
        <AcceptInvitationButton
          familyId={family.id}
          guestId={profileId}
          invitationId={invitationId}
        />
        <DeleteInvitationButton invitationId={invitationId} />
      </div>
    </li>
  );
}
