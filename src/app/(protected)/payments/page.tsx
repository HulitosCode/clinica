import { PayButton } from "./_components/pay-button";

const Payments = () => {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Área de Pagamento</h1>
      <p className="mb-6 text-gray-700">
        Clique no botão abaixo para realizar o pagamento de R$ 5,00.
      </p>
      <PayButton />
    </div>
  );
};

export default Payments;
