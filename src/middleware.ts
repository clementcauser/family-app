import { auth } from "@/auth";
import ROUTES from "./lib/constants/routes";
import { NextResponse } from "next/server";

const publicRoutes = [ROUTES.signin, ROUTES.signup, ROUTES.root];

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (!req.auth && !publicRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL(ROUTES.signin, req.nextUrl.origin);

    return NextResponse.redirect(newUrl);
  }
});
