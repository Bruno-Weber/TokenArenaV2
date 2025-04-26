
import { ClubAction as ClubActionType } from "@/types/club";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ClubActionProps {
  action: ClubActionType;
}

const ClubAction = ({ action }: ClubActionProps) => {
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: "Ação Iniciada",
      description: `Iniciando ${action.title}`,
    });
  };

  return (
    <Card className="relative">
      {action.active && (
        <Badge className="absolute top-4 right-4 bg-green-500" variant="secondary">
          Ativo
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{action.title}</CardTitle>
        <CardDescription>{action.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleAction}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {action.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

interface ClubActionsProps {
  actions: ClubActionType[];
}

const ClubActions = ({ actions }: ClubActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action, index) => (
        <ClubAction key={index} action={action} />
      ))}
    </div>
  );
};

export default ClubActions;
