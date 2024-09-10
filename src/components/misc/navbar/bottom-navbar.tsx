import ROUTES from "@/lib/constants/routes";
import { House, ListTodo, UserCog, Users } from "lucide-react";
import Link from "next/link";

interface Props {
  profileId: string;
}

export default function BottomNavbar({ profileId }: Props) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-gray-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link
          href={ROUTES.home}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <House className="group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Accueil
          </span>
        </Link>
        <Link
          href={ROUTES.todo_list}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <ListTodo className="group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary">
            Tâches
          </span>
        </Link>
        <Link
          href={ROUTES.family}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <Users className="group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary">
            Famille
          </span>
        </Link>
        <Link
          href={ROUTES.edit_profile.replace("[profileId]", profileId)}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <UserCog className="group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary">
            Profil
          </span>
        </Link>
      </div>
    </div>
  );
}
