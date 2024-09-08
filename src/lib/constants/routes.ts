type Route = "root" | "signin" | "signup" | "welcome" | "invitations";

const ROUTES: Record<Route, string> = {
  root: "/",
  welcome: "/welcome",
  signin: "/signin",
  signup: "/signup",
  invitations: "/invitations",
};

export default ROUTES;
