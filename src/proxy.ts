import { Roles } from "@/constants/role";
import { NextRequest, NextResponse } from "next/server";
import { userSerive } from "./services/userService";

export const proxy = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userSerive.geSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    isAdmin &&
    (pathName.startsWith("/dashboard") ||
      pathName.startsWith("/user-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  if (
    !isAdmin &&
    (pathName.startsWith("/dashboard") ||
      pathName.startsWith("/admin-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/user-dashboard",
    "/user-dashboard/:path*",
  ],
};
