export const prerender = true;

export function GET({ site }) {
  const sitemapUrl = new URL("/sitemap.xml", site || "https://proveuswrong.io");

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
