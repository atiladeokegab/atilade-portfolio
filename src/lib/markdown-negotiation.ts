type AcceptEntry = {
  mediaType: string;
  q: number;
  index: number;
};

function parseAcceptHeader(acceptHeader: string | null): AcceptEntry[] {
  if (!acceptHeader) {
    return [];
  }

  return acceptHeader
    .split(",")
    .map((entry, index) => {
      const [rawMediaType, ...params] = entry.split(";").map((part) => part.trim());
      const qParam = params.find((param) => param.startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;

      return {
        mediaType: rawMediaType.toLowerCase(),
        q: Number.isFinite(q) ? q : 1,
        index,
      };
    })
    .filter((entry) => entry.mediaType.length > 0 && entry.q > 0)
    .sort((left, right) => {
      if (right.q !== left.q) {
        return right.q - left.q;
      }

      return left.index - right.index;
    });
}

export function requestPrefersMarkdown(acceptHeader: string | null): boolean {
  const acceptedTypes = parseAcceptHeader(acceptHeader);

  for (const entry of acceptedTypes) {
    if (entry.mediaType === "text/markdown" || entry.mediaType === "text/*") {
      return true;
    }

    if (entry.mediaType === "text/html" || entry.mediaType === "*/*") {
      return false;
    }
  }

  return false;
}

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}
