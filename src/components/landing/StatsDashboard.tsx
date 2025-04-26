import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Fan Tokens Stakeados",
    value: "2.5M+",
    icon: <Trophy className="h-6 w-6 text-purple-400" />,
    gradient: "from-purple-500/20 via-purple-500/10 to-purple-500/5",
    glowColor: "group-hover:shadow-purple-500/50",
  },
  {
    title: "Votações Ativas",
    value: "150+",
    icon: <Users className="h-6 w-6 text-blue-400" />,
    gradient: "from-blue-500/20 via-blue-500/10 to-blue-500/5",
    glowColor: "group-hover:shadow-blue-500/50",
  },
  {
    title: "Total de NFTs",
    value: "10K+",
    icon: <TrendingUp className="h-6 w-6 text-cyan-400" />,
    gradient: "from-cyan-500/20 via-cyan-500/10 to-cyan-500/5",
    glowColor: "group-hover:shadow-cyan-500/50",
  },
];

const StatsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-4 pt-2 md:pt-0">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.2 // Staggered animation
          }}
        >
          <Card className={`
            relative group transition-all duration-300
            bg-gradient-to-br ${stat.gradient}
            border border-white/10 backdrop-blur-sm
            hover:scale-105 hover:-translate-y-1
            hover:border-white/20
            ${stat.glowColor} hover:shadow-lg
            overflow-hidden
          `}>
            <CardContent className="flex items-center p-6 space-x-4">
              <div className="rounded-full bg-white/5 p-3 ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60 group-hover:to-white/90 transition-colors">
                  {stat.value}
                </h3>
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsDashboard;
