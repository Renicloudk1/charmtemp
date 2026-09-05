Deno.serve(async (req) => {
  const url = new URL(req.url);
  const discordUrl = "https://discord.com" + url.pathname + url.search;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const body = (req.method !== "GET" && req.method !== "HEAD")
    ? await req.text()
    : undefined;

  const discordRes = await fetch(discordUrl, {
    method: req.method,
    headers,
    body,
  });

  const data = await discordRes.text();
  return new Response(data, {
    status: discordRes.status,
    headers: { "Content-Type": discordRes.headers.get("content-type") || "application/json" },
  });
});
