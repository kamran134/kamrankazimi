import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Разрешить доступ ко всем страницам кроме /dashboard
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return !!token; // Требуется авторизация для /dashboard
      }
      return true; // Все остальные страницы публичные
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
