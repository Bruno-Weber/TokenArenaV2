
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardFilter } from '@/types/gamification';

interface LeaderboardFiltersProps {
  filters: LeaderboardFilter;
  onChange: (filters: LeaderboardFilter) => void;
}

const LeaderboardFilters = ({ filters, onChange }: LeaderboardFiltersProps) => {
  const handlePeriodChange = (value: string) => {
    onChange({
      ...filters,
      period: value as LeaderboardFilter['period']
    });
  };

  const handleCategoryChange = (value: string) => {
    onChange({
      ...filters,
      category: value as LeaderboardFilter['category']
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Período</h4>
        <Tabs defaultValue={filters.period} className="w-full" onValueChange={handlePeriodChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="week">Esta semana</TabsTrigger>
            <TabsTrigger value="month">Este mês</TabsTrigger>
            <TabsTrigger value="allTime">Todos os tempos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Categoria</h4>
        <Tabs defaultValue={filters.category} className="w-full" onValueChange={handleCategoryChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overall">Geral</TabsTrigger>
            <TabsTrigger value="interactions">Interações</TabsTrigger>
            <TabsTrigger value="holders">Holders</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardFilters;
