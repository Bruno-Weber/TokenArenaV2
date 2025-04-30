
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardFilter } from '@/types/gamification';
import { useLanguage } from '@/contexts/LanguageContext';

interface LeaderboardFiltersProps {
  filters: LeaderboardFilter;
  onChange: (filters: LeaderboardFilter) => void;
}

const LeaderboardFilters = ({ filters, onChange }: LeaderboardFiltersProps) => {
  const { t } = useLanguage();

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
        <h4 className="text-sm font-medium mb-2">{t('gamification.filters.period.label', 'Period')}</h4>
        <Tabs defaultValue={filters.period} className="w-full" onValueChange={handlePeriodChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="week">{t('gamification.filters.period.week', 'This week')}</TabsTrigger>
            <TabsTrigger value="month">{t('gamification.filters.period.month', 'This month')}</TabsTrigger>
            <TabsTrigger value="allTime">{t('gamification.filters.period.allTime', 'All time')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">{t('gamification.filters.category.label', 'Category')}</h4>
        <Tabs defaultValue={filters.category} className="w-full" onValueChange={handleCategoryChange}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overall">{t('gamification.filters.category.overall', 'Overall')}</TabsTrigger>
            <TabsTrigger value="interactions">{t('gamification.filters.category.interactions', 'Interactions')}</TabsTrigger>
            <TabsTrigger value="holders">{t('gamification.filters.category.holders', 'Holders')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardFilters;
