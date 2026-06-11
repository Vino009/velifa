import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin(.*)',           // Protection gérée côté composant uniquement
  '/tarifs(.*)',
  '/support(.*)',
  '/faq(.*)',
  '/a-propos(.*)',
  '/contact(.*)',
  '/fonctionnalites(.*)',
  '/mentions-legales(.*)',
  '/confidentialite(.*)',
  '/api/webhooks/(.*)',
  '/api/v1/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // /admin et routes publiques → jamais bloqué par le middleware
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
