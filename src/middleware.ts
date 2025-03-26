import { auth } from "./server/auth";

/**
 * NOTE: https://github.com/nextauthjs/next-auth/issues/12731
 * if we upgrade prima adapter it will break with next-auth
 */

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
