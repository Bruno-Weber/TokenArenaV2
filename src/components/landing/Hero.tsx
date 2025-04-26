
import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles/component";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="rgba(155, 135, 245, 0.8)"
          speed={0.5}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/80 to-background/100 z-10" />
      
      <div className="relative z-20 max-w-4xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="inline-block">Conectando </span>
          <span className="inline-block bg-gradient-to-r from-token-purple to-token-purple-light bg-clip-text text-transparent animate-text-shimmer">
            Torcedores
          </span>
          <span className="inline-block"> e </span>
          <span className="inline-block bg-gradient-to-r from-token-purple-light to-token-purple bg-clip-text text-transparent animate-text-shimmer">
            Clubes
          </span>
          <span className="inline-block"> pelo Mundo</span>
        </h1>
        
        <p className="text-xl text-token-text-muted max-w-2xl mx-auto">
          Crie fan tokens verificados, engaje sua torcida e monetize sua paixão em uma plataforma segura e transparente.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            className="bg-token-purple hover:bg-token-purple-light text-white font-medium text-lg px-8 py-6 relative overflow-hidden group"
            asChild
          >
            <Link to="/market">
              <div className="absolute inset-0 bg-gradient-to-r from-token-purple-light/0 via-token-purple-light/30 to-token-purple-light/0 group-hover:translate-x
-full duration-1000 transition-transform" />
              <Rocket className="mr-2 h-5 w-5" />
              Explorar Fan Tokens
            </Link>
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-token-purple text-token-purple hover:bg-token-purple/10 font-medium text-lg px-8 py-6 relative overflow-hidden group"
            asChild
          >
            <Link to="/create-token">
              <div className="absolute inset-0 bg-gradient-to-r from-token-purple/0 via-token-purple/5 to-token-purple/0 group-hover:translate-x-full duration-1000 transition-transform" />
              <Plus className="mr-2 h-5 w-5" />
              Criar Fan Token
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
