export const prerender = true;

export function GET({ site }) {
  const baseUrl = (site || "https://proveuswrong.io").toString();
  const sitemapUrl = new URL("/sitemap-0.xml", baseUrl);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap>\n` +
    `    <loc>${sitemapUrl}</loc>\n` +
    `  </sitemap>\n` +
    `</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
