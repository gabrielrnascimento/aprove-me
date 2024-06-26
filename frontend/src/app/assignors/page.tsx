"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AssignorForm, assignorSchema } from "@/components/forms/assignor-form";
import { CreateAssignorInputDTO } from "@/@core/domain/dtos/assignor.dto";
import { useAssignor } from "@/context/assignor/use-assignor";
import withAuth from "@/components/with-auth";

const CreateAssignor = () => {
  const router = useRouter();
  const { createAssignor } = useAssignor();
  const { mutate } = useMutation({
    mutationFn: createAssignor,
    onSuccess: (response) => {
      router.push(`/assignors/${response.id}`);
    },
  });

  const handleSubmit = async (data: CreateAssignorInputDTO) => {
    const formData = assignorSchema.safeParse(data);
    if (formData.success) {
      mutate(formData.data);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md ">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Cadastrar cedente
        </h1>
        <AssignorForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default withAuth(CreateAssignor);
