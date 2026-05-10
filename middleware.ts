import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/projects",
  "/about",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn()
  }
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}