"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function PayButton() {
  const [loading, setLoading] = useState(false);

  // Função que dispara o processo de pagamento
  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 5,
          reference: "INV2025001",
          description: "Pagamento de serviços",
        }),
      });

      const data = await res.json();

      if (data?.data?.checkout_url) {
        window.location.href = data.data.checkout_url;
      } else {
        alert("Erro ao iniciar pagamento.");
      }
    } catch (error) {
      console.error("Erro no pagamento:", error);
      alert("Erro ao processar o pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="w-full">
      {loading ? "Processando..." : "Assinar plano"}
    </Button>
  );
}
