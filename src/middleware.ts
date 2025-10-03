import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const requireAuthPaths = ["/create-cv"];

export function middleware(req: NextRequest) {
  // Cookie control ?
  // const token = req.cookies.get("jwt");

  // if (!token && requireAuthPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
  // if (requireAuthPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/";
  //   url.searchParams.set("showLoginModal", "true");
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}
