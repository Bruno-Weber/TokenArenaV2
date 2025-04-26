
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {currentStep === "kyc" ? "Verificação KYC" : "Criar Fan Token"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
