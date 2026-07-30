import { getQueryParam, sendJson } from "../_lib/http.js";
import { forwardMakeWebhook } from "../_lib/make.js";
import { getPhonePeOrderStatus } from "../_lib/phonepe.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { message: "Method not allowed." });
  }

  const merchantOrderId = getQueryParam(req, "merchantOrderId");
  if (!/^[A-Za-z0-9_-]{1,63}$/.test(merchantOrderId)) {
    return sendJson(res, 400, { message: "Invalid order id." });
  }

  try {
    const status = await getPhonePeOrderStatus(merchantOrderId);

    if (status.state === "COMPLETED" || status.state === "FAILED") {
      await forwardMakeWebhook("checkout.payment_status", {
        merchantOrderId,
        status,
      });
    }

    return sendJson(res, 200, status);
  } catch (error) {
    return sendJson(res, 502, {
      message: error instanceof Error ? error.message : "Payment status could not be checked.",
    });
  }
}
