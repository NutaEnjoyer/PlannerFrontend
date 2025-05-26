import {NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOAD_PAGES } from "./config/pages-url.config";

export async function middleware(
    request: NextRequest,
    response: NextResponse
) {
    const {url, cookies} = request

    const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

    const isAuthPage = url.includes('/auth')

    if (!refreshToken && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', url))
    }

    if (!isAuthPage) {
        return NextResponse.next()
    }

    if (isAuthPage && refreshToken) {
        return NextResponse.redirect(new URL(DASHBOAD_PAGES.HOME, url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/i/:path*', '/auth/:path*']
}