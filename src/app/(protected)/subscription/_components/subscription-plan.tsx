// app/subscription/_components/subscription-plan.tsx
"use client";

import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { PayButton } from "../../payments/_components/pay-button";

const SubscriptionPlan = () => {
  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via Whatsapp",
  ];

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Essential</h3>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Atual
          </Badge>
        </div>
        <p className="text-gray-600">
          Para profissionais autônomos ou pequenas clínicas
        </p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">999 MZN</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-gray-200 pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <p className="ml-3 text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PayButton /> {/* ✅ Botão funcionando aqui */}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlan;
