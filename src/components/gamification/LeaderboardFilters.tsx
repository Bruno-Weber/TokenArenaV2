
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardFilter } from '@/types/gamification';
import { useTranslation } from 'react-i18next';

interface LeaderboardFiltersProps {
  filters: LeaderboardFilter;
  onChange: (filters: LeaderboardFilter) => void;
}

const LeaderboardFilters = ({ filters, onChange }: LeaderboardFiltersProps) => {
  const { t } = useTranslation();
  
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
        <h4 className="text-sm font-medium mb-2">{t('gamification.filterPeriod')}</h4>
        <Tabs defaultValue={filters.period} className="w-full" onValueChange={handlePeriodChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="week">{t('gamification.weekly')}</TabsTrigger>
            <TabsTrigger value="month">{t('gamification.monthly')}</TabsTrigger>
            <TabsTrigger value="allTime">{t('gamification.allTime')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">{t('gamification.filterCategory')}</h4>
        <Tabs defaultValue={filters.category} className="w-full" onValueChange={handleCategoryChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overall">{t('gamification.overall')}</TabsTrigger>
            <TabsTrigger value="interactions">{t('gamification.interactions')}</TabsTrigger>
            <TabsTrigger value="holders">{t('gamification.holders')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardFilters;
