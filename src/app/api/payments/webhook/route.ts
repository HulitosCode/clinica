// app/api/paysuite/webhook/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("x-webhook-signature") || "";
  const secret = process.env.PAYSUITE_WEBHOOK_SECRET || "";

  const calculatedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  if (signature !== calculatedSignature) {
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  const event = JSON.parse(payload);

  if (event.event === "payment.success") {
    // Salvar ou atualizar status do pagamento no DB
    console.log("Pagamento bem-sucedido:", event.data);
  } else if (event.event === "payment.failed") {
    console.log("Pagamento falhou:", event.data);
  }

  return NextResponse.json({ received: true });
}
