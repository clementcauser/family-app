import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { APP_NAME } from "@/lib/constants/app";
import ROUTES from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import { ListTodo, User, Users } from "lucide-react";
import { forwardRef } from "react";
import BottomNavbar from "./bottom-navbar";
import LogoutButton from "./navbar-logout-button";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <>
      <div className="hidden md:flex h-16 items-center justify-between shadow px-6">
        <Link href={ROUTES.home}>
          <h1 className="text-primary font-bold text-2xl">{APP_NAME}</h1>
        </Link>
        <div className="flex items-center gap-24">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href={ROUTES.todo_list}
                >
                  <ListTodo className="mr-2" /> Mes tâches
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href={ROUTES.family}
                >
                  <Users className="mr-2" /> Ma famille
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              {session?.user?.id ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={session?.user?.image} />
                        <AvatarFallback>
                          {(session?.user?.name as string)
                            .charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p>{session?.user?.name}</p>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-2 p-4 md:w-[250px]">
                      <ListItem
                        href={ROUTES.edit_profile.replace(
                          "[profileId]",
                          session.user.id
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <User />
                          Mon Profil
                        </span>
                      </ListItem>
                      <ListItem>
                        <LogoutButton />
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink>Connexion</NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <BottomNavbar profileId={session?.user.id} />
    </>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
