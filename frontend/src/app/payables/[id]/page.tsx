"use client";

import { Payable } from "@/@core/domain/entities/payable.entity";
import { PayableCard } from "@/components/cards/payable-card";
import withAuth from "@/components/with-auth";
import { usePayable } from "@/context/payable/use-payable";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PayableDetails = ({ params }: { params: { id: string } }) => {
  const { getPayable } = usePayable();
  const [payable, setPayable] = useState<Payable | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["payable", params.id],
    queryFn: async () => {
      const response = await getPayable(params.id);
      setPayable(response);
      return response;
    },
  });

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!payable) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <PayableCard
        id={payable.id}
        value={payable.value}
        emissionDate={new Date(payable.emissionDate)}
        assignorId={payable.assignorId}
      />
    </main>
  );
};

export default withAuth(PayableDetails);
