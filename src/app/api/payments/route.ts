// app/api/payments/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("https://paysuite.tech/api/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSUITE_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount: body.amount,
      reference: body.reference,
      description: body.description,
      return_url: `${process.env.BASE_URL}/payment/success`,
      callback_url: `${process.env.BASE_URL}/api/paysuite/webhook`,
    }),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
