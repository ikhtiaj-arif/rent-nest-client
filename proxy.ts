import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/payment-success",
  "/payment-cancel",
  "/contact",
  "/about",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("pathname:", pathname);
  const response = NextResponse.next();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Verify access token
  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  // Verify refresh token
  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  //?  Refresh access token if expired but refresh token is valid

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      accessToken = result.data.accessToken as string;

      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
      });

      decodedAccessToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  //? Remove invalid access token

  if (accessToken && !decodedAccessToken?.success) {
    response.cookies.delete("accessToken");
  }

  //? Extract user role

  const userRole =
    decodedAccessToken?.success && decodedAccessToken.data
      ? (decodedAccessToken.data as JwtPayload).role
      : null;

  //? Redirect authenticated users away from auth pages

  if (decodedAccessToken?.success && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    }
  }

  //? Check public/auth routes

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  //? Redirect unauthenticated users to login

  if (!decodedAccessToken?.success && !isPublic && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  //? Role-based authorization

  if (pathname.startsWith("/dashboard") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
