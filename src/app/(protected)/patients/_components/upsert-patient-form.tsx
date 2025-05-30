import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { upsertPatient } from "@/actions/upsert-patient";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientsTable } from "@/db/schema";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome e obrigatorio",
  }),
  email: z.string().email({
    message: "Email e obrigatorio",
  }),
  phoneNumber: z.string().trim().min(1, {
    message: "Numero de telefone e obrigatorio",
  }),
  sex: z.enum(["male", "female"], {
    required_error: "Sexo e obrigatorio",
  }),
});

interface UpsertPatientFormProps {
    isOpen: boolean,
    patient?: typeof patientsTable.$inferSelect,
    onSuccess?: () => void
}

const UpsertPatientForm = ({ isOpen, patient, onSuccess }: UpsertPatientFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patient?.name ?? "",
      email: patient?.email ?? "",
      phoneNumber: patient?.phoneNumber ?? "",
      sex: patient?.sex ?? undefined,
    },
  });
    
    useEffect(() => {
        if (isOpen) {
            form.reset(patient)
        }
    }, [isOpen, form, patient])
    
    const upsertPatientAction = useAction(upsertPatient, {
        onSuccess: () => {
            toast.success("Paciente salvo com sucesso")
            onSuccess?.()
        },
        onError: () => {
            toast.error("Erro ao salvar paciente.")
        }
    })
    
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertPatientAction.execute({
            ...values,
            id: patient?.id
        })
        console.log(values)
    }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Paciente</DialogTitle>
        <DialogDescription>Adicionar um novo paciente</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do paciente</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do paciente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="exemplo@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(####) ### ####"
                    mask="_"
                    placeholder="(+258) teu numero de telefone"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value.value);
                    }}
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertPatientForm;
