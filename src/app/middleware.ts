import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "./utils/JWTUtils";
import { NextPageContext } from "next";

export function middleware(req: NextPageContext["req"]) {
  const tokenCookie = cookies().get("token") || "";

  if (!tokenCookie) {
    return NextResponse.redirect("/");
  }

  const userData = validateToken(tokenCookie.value);

  if (userData == null) {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}
