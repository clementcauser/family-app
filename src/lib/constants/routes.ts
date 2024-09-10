type Route =
  | "root"
  | "signin"
  | "signup"
  | "invitations"
  | "home"
  | "edit_profile"
  | "family"
  | "todo_list";

const ROUTES: Record<Route, string> = {
  root: "/",
  edit_profile: "/profile/[profileId]/edit",
  home: "/home",
  signin: "/signin",
  signup: "/signup",
  invitations: "/invitations",
  family: "/family",
  todo_list: "/tasks",
};

export default ROUTES;
