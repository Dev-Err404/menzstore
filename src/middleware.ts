import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/admin/:path*", // Only run this on admin routes
};

export function middleware(req: NextRequest) {
  // 1. Get the username/password from .env
  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    console.error("Admin credentials not set in .env");
    return NextResponse.next();
  }

  // 2. Check the "Authorization" header
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === validUser && pwd === validPass) {
      return NextResponse.next(); // Password correct -> Let them in!
    }
  }

  // 3. If no password or wrong password, ask for it
  return new NextResponse("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
    },
  });
}