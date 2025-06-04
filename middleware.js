import { auth, clerkMiddleware } from '@clerk/nextjs/server';
import { createRouteMatcher } from '@clerk/nextjs/server';

// adding our protected routes
const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/events(.*)",
    "/meetings(.*)",
    "/availability(.*)",
])

export default clerkMiddleware(async(auth,req) => {

    // check for valid session before hitting a protected route, if not redirect to signin page
    if(!auth().userId && isProtectedRoute(req)){
        await auth.protect();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};