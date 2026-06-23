import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requestPrefersMarkdown } from "@/lib/markdown-negotiation";

export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  if (!requestPrefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname =
    request.nextUrl.pathname === "/"
      ? "/markdown-agent"
      : `/markdown-agent${request.nextUrl.pathname}`;

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/", "/about", "/projects", "/projects/:path*", "/resume", "/docs/agents"],
};
