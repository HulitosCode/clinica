"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertPatientForm from "./upsert-patient-form";

const AddPatientButton = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Paciente
        </Button>
      </DialogTrigger>
      <UpsertPatientForm onSuccess={() => setOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};

export default AddPatientButton;
