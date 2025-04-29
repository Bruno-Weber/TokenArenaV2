
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KYCVerification from "./KYCVerification";
import TokenCreationForm from "./TokenCreationForm";

type Step = "kyc" | "creation";

const CreateTokenFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>("kyc");
  const [kycVerified, setKycVerified] = useState(false);

  const handleKYCSuccess = () => {
    setKycVerified(true);
    setCurrentStep("creation");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-token-background-light bg-token-background text-token-text">
      <CardHeader className="border-b border-token-background-light">
        <CardTitle className="text-2xl font-bold text-center text-white">
          {currentStep === "kyc" ? "Verificação KYC" : "Criar Fan Token"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {currentStep === "kyc" ? (
          <KYCVerification onSuccess={handleKYCSuccess} />
        ) : (
          <TokenCreationForm />
        )}
      </CardContent>
    </Card>
  );
};

export default CreateTokenFlow;
