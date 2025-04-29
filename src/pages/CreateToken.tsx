
import AppLayout from "@/components/AppLayout";
import CreateTokenFlow from "@/components/token/CreateTokenFlow";

const CreateToken = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Criar Fan Token</h1>
        <CreateTokenFlow />
      </div>
    </AppLayout>
  );
};

export default CreateToken;
