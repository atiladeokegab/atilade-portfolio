const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://atilade.uk';

export function GET() {
  const robotsTxt = [
    'User-agent: *',
    'Content-Signal: ai-train=no, search=yes, ai-input=yes',
    'Allow: /',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
