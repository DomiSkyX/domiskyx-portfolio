import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/projects(.*)",
  "/about",
  "/contact"
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn()
  }
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
}