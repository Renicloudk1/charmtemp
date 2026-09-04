Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const body = await req.text();
  const discordRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "CharmBot (https://charmbot.online, 1.0.0)",
    },
    body,
  });
  const data = await discordRes.text();
  return new Response(data, {
    status: discordRes.status,
    headers: { "Content-Type": "application/json" },
  });
});
