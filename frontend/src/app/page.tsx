"use client";

import { useQuery } from "@tanstack/react-query";
import { usePayable } from "@/context/payable/use-payable";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import Link from "next/link";

export default function Home() {
  const { getAllPayables } = usePayable();
  const { status, data } = useQuery({
    queryKey: ["payables"],
    queryFn: getAllPayables,
  });

  if (status === "pending") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Carregando...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <p>Erro</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md m-3 bg-white rounded shadow-md ">
        <h1 className="mb-4 text-xl font-bold text-center sm:text-2xl">
          Listagem de recebíveis
        </h1>
        <div className="overflow-x-auto">
          <Table className="w-auto min-w-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto sm:w-auto">ID</TableHead>
                <TableHead>Data de emissão</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((payable) => (
                <TableRow key={payable.id}>
                  <TableCell className="font-medium">
                    <Link
                      className="text-bankmeBlue font-extrabold hover:underline"
                      href={`/payables/${payable.id}`}
                    >
                      {payable.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(payable.emissionDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    {payable.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
