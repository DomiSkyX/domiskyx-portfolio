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
  const { userId } = await auth()

  if (!isPublicRoute(req) && !userId) {
    return auth().redirectToSignIn()
  }
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}