import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./server/session";

const protectedRoutes = [
  "/dashboard",
  "/messages",
  "/messages/group",
  "/profile",
  "/projects",
  "/settings",
];

const publicRoutes = ["/auth/login", "/auth/signup", "/helloworld", "/"];

export default async function middleware(req: NextRequest) {
  const response = new NextResponse();
  const path = req.nextUrl.pathname;
  console.log(path);

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
