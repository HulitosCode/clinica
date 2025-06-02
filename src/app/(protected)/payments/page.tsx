import { PayButton } from "./_components/pay-button";

const Payments = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Área de Pagamento</h1>
      <p className="mb-6 text-gray-700">
        Clique no botão abaixo para realizar o pagamento de R$ 5,00.
      </p>
      <PayButton />
    </div>
  );
};

export default Payments;
