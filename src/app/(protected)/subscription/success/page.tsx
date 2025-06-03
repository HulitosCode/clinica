"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 4000); // redireciona em 4 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 to-white">
      <div className="bg-white shadow-xl p-8 rounded-2xl text-center space-y-4 max-w-md w-full animate-fade-in">
        <CheckCircle className="mx-auto text-zinc-900 w-14 h-14" />
        <h1 className="text-2xl font-semibold text-zinc-900">
          Plano assinado com sucesso!
        </h1>
        {/* <p className="text-gray-600">
          Você será redirecionado para o painel em alguns segundos.
        </p>
        <p className="text-sm text-gray-400">
          Se nada acontecer,{" "}
          <a href="/dashboard" className="text-blue-600 underline">
            clique aqui
          </a>
          .
        </p> */}
      </div>
    </div>
  );
}
