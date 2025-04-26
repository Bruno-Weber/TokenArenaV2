
import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundCarousel from "./BackgroundCarousel";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <BackgroundCarousel />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="animate-fade-in space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            <span className="inline-block hover-scale transition-all">Conectando </span>
            <span className="inline-block bg-gradient-to-r from-token-purple to-token-purple-light bg-clip-text text-transparent animate-text-shimmer hover-scale transition-all">
              Torcedores
            </span>
            <span className="inline-block hover-scale transition-all"> e </span>
            <span className="inline-block bg-gradient-to-r from-token-purple-light to-token-purple bg-clip-text text-transparent animate-text-shimmer hover-scale transition-all">
              Clubes
            </span>
            <span className="inline-block hover-scale transition-all"> pelo Mundo</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            Crie fan tokens verificados, engaje sua torcida e monetize sua paixão em uma plataforma segura e transparente.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button 
              size="lg"
              className="bg-token-purple hover:bg-token-purple-light text-white font-medium text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/market">
                <Rocket className="mr-2 h-5 w-5" />
                Explorar Fan Tokens
              </Link>
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="border-token-purple text-white hover:bg-token-purple/10 font-medium text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/create-token">
                <Plus className="mr-2 h-5 w-5" />
                Criar Fan Token
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-[1]" />
    </div>
  );
};

export default Hero;
