import {
  buildRedirectUrl,
  calculateCheckoutTotals,
  createMerchantOrderId,
  getCheckoutValidationErrors,
  normalizePhone,
  sanitizeMeta,
} from "../_lib/checkout.js";
import { getEnv } from "../_lib/env.js";
import { readJson, sendJson } from "../_lib/http.js";
import { forwardMakeWebhook } from "../_lib/make.js";
import { createPhonePePayment } from "../_lib/phonepe.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { message: "Method not allowed." });
  }

  try {
    const payload = await readJson(req);
    const errors = getCheckoutValidationErrors(payload);
    if (Object.keys(errors).length) return sendJson(res, 400, { message: "Invalid checkout details.", errors });

    const selected = payload.selected || [];
    const details = payload.details || {};
    const phoneNumber = normalizePhone(details.phone);
    const totals = calculateCheckoutTotals(selected);
    const merchantOrderId = createMerchantOrderId();
    const baseUrl = getEnv("BASE_URL", `https://${req.headers.host}`);
    const redirectUrl = buildRedirectUrl(baseUrl, merchantOrderId);
    const metaInfo = {
      udf1: sanitizeMeta(details.name),
      udf2: sanitizeMeta(details.email),
      udf3: sanitizeMeta(phoneNumber),
      udf4: "AttractiveMen Personalized Style Report",
      udf5: sanitizeMeta(totals.selectedBumps.map((bump) => bump.id).join(",")),
    };

    const payment = await createPhonePePayment({
      merchantOrderId,
      amountPaise: totals.amountPaise,
      redirectUrl,
      phoneNumber,
      metaInfo,
    });

    await forwardMakeWebhook("checkout.payment_initiated", {
      merchantOrderId,
      phonePeOrderId: payment.orderId,
      state: payment.state,
      totals,
      details: {
        name: sanitizeMeta(details.name),
        email: sanitizeMeta(details.email),
        phone: phoneNumber,
      },
    });

    return sendJson(res, 200, {
      merchantOrderId,
      phonePeOrderId: payment.orderId,
      state: payment.state,
      redirectUrl: payment.redirectUrl,
      amountPaise: totals.amountPaise,
    });
  } catch (error) {
    return sendJson(res, 502, {
      message: error instanceof Error ? error.message : "Payment could not be started.",
    });
  }
}
