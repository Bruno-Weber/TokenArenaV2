
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FileText, Shield } from "lucide-react";

interface KYCVerificationProps {
  onSuccess: () => void;
}

interface KYCFormData {
  clubName: string;
  registrationNumber: string;
  description: string;
  documentUrl: string;
}

const KYCVerification = ({ onSuccess }: KYCVerificationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<KYCFormData>();

  const onSubmit = async (data: KYCFormData) => {
    setIsSubmitting(true);
    // Simula verificação KYC
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
        <Shield className="h-5 w-5" />
        <span>Verificação necessária antes de criar fan tokens</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="clubName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nome do Clube</FormLabel>
                <FormControl>
                  <Input 
                    required 
                    placeholder="Ex: Clube de Futebol Barcelona" 
                    {...field}
                    className="bg-token-background-light border-token-background text-white placeholder:text-gray-500" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Número de Registro</FormLabel>
                <FormControl>
                  <Input 
                    required 
                    placeholder="CNPJ ou registro internacional" 
                    {...field} 
                    className="bg-token-background-light border-token-background text-white placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Descrição do Clube</FormLabel>
                <FormControl>
                  <Textarea 
                    required
                    placeholder="Descreva brevemente a história e relevância do clube"
                    className="min-h-[100px] bg-token-background-light border-token-background text-white placeholder:text-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 items-center justify-center p-6 border-2 border-dashed border-token-background-light rounded-lg bg-token-background/50">
            <FileText className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-400">
              Faça upload dos documentos oficiais do clube
            </p>
            <Input
              type="file"
              className="max-w-xs bg-token-background-light border-token-background text-white cursor-pointer file:bg-token-purple file:text-white file:border-0"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  form.setValue("documentUrl", URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-token-purple hover:bg-token-purple-light text-white font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verificando..." : "Enviar para Verificação"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default KYCVerification;
