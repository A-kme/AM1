import { getEnv } from "./env.js";

export async function forwardMakeWebhook(event, payload) {
  const webhookUrl = getEnv("MAKE_WEBHOOK_URL");
  if (!webhookUrl) return { sent: false };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        occurredAt: new Date().toISOString(),
        payload,
      }),
      signal: controller.signal,
    });

    return { sent: true, status: response.status, ok: response.ok };
  } catch {
    return { sent: false };
  } finally {
    clearTimeout(timeout);
  }
}
