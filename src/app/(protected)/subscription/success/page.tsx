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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 to-white">
      <div className="animate-fade-in w-full max-w-md space-y-4 rounded-2xl bg-white p-8 text-center shadow-xl">
        <CheckCircle className="mx-auto h-14 w-14 text-zinc-900" />
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
