import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Define português como idioma padrão se nenhum idioma estiver definido
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('pt');
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Map of language codes to their display names
  const languages = {
    pt: 'Português',
    en: 'English',
    es: 'Español',
    fr: 'Français',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white focus:outline-none">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border border-white/10">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className={`cursor-pointer ${
              i18n.language === code || (i18n.language.startsWith(code) && code.length === 2) ? 'bg-token-purple/20 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
