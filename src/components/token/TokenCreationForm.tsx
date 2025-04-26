
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert } from "lucide-react";

interface TokenFormData {
  name: string;
  symbol: string;
  supply: string;
  description: string;
  logo: string;
}

const TokenCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<TokenFormData>();

  const onSubmit = async (data: TokenFormData) => {
    setIsSubmitting(true);
    // Simula criação do token
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    toast({
      title: "Fan Token Criado!",
      description: `O token ${data.symbol} foi criado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
        <ShieldAlert className="h-5 w-5" />
        <span>KYC Verificado - Você pode criar seu fan token</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Token</FormLabel>
                <FormControl>
                  <Input required placeholder="Ex: Barcelona Fan Token" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Símbolo</FormLabel>
                <FormControl>
                  <Input required placeholder="Ex: BAR" maxLength={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supply Total</FormLabel>
                <FormControl>
                  <Input 
                    required 
                    type="number" 
                    min="1"
                    placeholder="Ex: 1000000"
                    {...field}
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
                <FormLabel>Descrição do Token</FormLabel>
                <FormControl>
                  <Textarea 
                    required
                    placeholder="Descreva os benefícios e utilidades do token"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 items-center justify-center p-6 border-2 border-dashed rounded-lg">
            <p className="text-sm text-muted-foreground">
              Upload do logo do token
            </p>
            <Input
              type="file"
              className="max-w-xs"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  form.setValue("logo", URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando Token..." : "Criar Fan Token"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TokenCreationForm;
