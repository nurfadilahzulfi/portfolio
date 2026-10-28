import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeCookie, localeFromAcceptLanguage, locales } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Browsers ask for /favicon.ico on their own and there isn't one. Without
  // this it would reach app/[lang] as a bogus language "favicon.ico".
  if (pathname === "/favicon.ico") return new NextResponse(null, { status: 404 });

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  // A language the visitor picked before wins over the browser setting.
  const saved = request.cookies.get(localeCookie)?.value;
  const locale = isLocale(saved)
    ? saved
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)", "/favicon.ico"],
};
