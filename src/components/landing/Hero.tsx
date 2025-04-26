
import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="animate-fade-in space-y-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="inline-block hover-scale transition-all text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Conectando{" "}
            </span>
            <span className="inline-block bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] animate-text-shimmer hover-scale transition-all">
              Torcedores
            </span>
            <span className="inline-block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover-scale transition-all">
              {" "}e{" "}
            </span>
            <span className="inline-block bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,70,239,0.6)] animate-text-shimmer hover-scale transition-all">
              Clubes
            </span>
            <span className="inline-block text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover-scale transition-all">
              {" "}pelo Mundo
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up"
          >
            Crie fan tokens verificados, engaje sua torcida e monetize sua paixão em uma plataforma segura e transparente.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 animate-fade-in"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
