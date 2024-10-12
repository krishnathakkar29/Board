import { auth } from "@/auth";

export default auth((req) => {
  // Check if the user is authenticated
  if (!req.auth && req.nextUrl.pathname !== "/sign-in" && req.nextUrl.pathname !== "/sign-up") {
    // Redirect to the sign-in page if not authenticated and not on sign-in or sign-up pages
    const newUrl = new URL("/sign-up", req.nextUrl.origin); // Redirect to sign-in by default
    return Response.redirect(newUrl);
  }
});

// Configuration to define the routes the middleware applies to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
