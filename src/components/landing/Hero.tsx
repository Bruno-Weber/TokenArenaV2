
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div 
      className="text-center py-20 px-4 max-w-4xl mx-auto animate-fade-in"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-chiliz-primary to-chiliz-secondary bg-clip-text text-transparent">
        Você decide o futuro do seu clube
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Participe das decisões importantes do seu time através dos Fan Tokens e faça parte dessa revolução digital no esporte.
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          size="lg"
          className="bg-chiliz-primary hover:bg-chiliz-primary/90"
        >
          Explorar Fan Tokens
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg"
          variant="outline"
          asChild
        >
          <Link to="/create-token">
            Criar Fan Token
            <SquarePlus className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
