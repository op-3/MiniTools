import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get("url");
  if (!targetUrl) {
    throw error(400, "URL parameter is required");
  }

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (e) {
    console.error("Error fetching URL:", e);
    throw error(500, "Failed to fetch the requested URL");
  }
};
