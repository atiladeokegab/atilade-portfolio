import { NextRequest } from "next/server";

import { createMarkdownResponse, getMarkdownDocument } from "@/lib/agent-markdown";

function toExternalPath(slug: string[] | undefined) {
  if (!slug || slug.length === 0) {
    return "/";
  }

  return `/${slug.join("/")}`;
}

function buildResponse(slug: string[] | undefined) {
  const pathname = toExternalPath(slug);
  const markdown = getMarkdownDocument(pathname);

  if (!markdown) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return createMarkdownResponse(markdown);
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await context.params;
  return buildResponse(slug);
}

export async function HEAD(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await context.params;
  const response = buildResponse(slug);
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
}
