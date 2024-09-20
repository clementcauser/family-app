import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchTodayTasksAction } from "@/lib/actions/tasks";
import ROUTES from "@/lib/constants/routes";
import { getNextDays } from "@/lib/utils/dates";
import { Plus } from "lucide-react";
import Link from "next/link";
import TaskItem from "./task-item";
import { Profile } from "@prisma/client";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import TaskFormDrawer, { CreateTaskFormDrawer } from "./task-form-drawer";

interface Props {
  profileId: Profile["id"];
}

export default async function HomeTasksList({ profileId }: Props) {
  const tasks = await fetchTodayTasksAction({
    profileId,
    tomorrowDate: getNextDays(),
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-primary">Tâches du jour</CardTitle>
        <CreateTaskFormDrawer profileId={profileId} />
      </CardHeader>
      <CardContent>
        {tasks?.data && tasks.data.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {tasks.data.map((task) => (
              <li key={task.id}>
                <TaskItem task={task} profileId={profileId} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">
            Vous n&apos;avez plus de tâche à faire pour aujourd&apos;hui 👏
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="pl-0">
          <Link href={ROUTES.todo_list}>Voir toutes les tâches</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
