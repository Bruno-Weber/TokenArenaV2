
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import AppLayout from "@/components/AppLayout";
import { NETWORKS } from "@/lib/web3";
import { Save, Bell, Shield, Globe, ChevronRight, Users, Check, Hexagon, Zap, Sliders, Network, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const [gasSettings, setGasSettings] = useState("standard");
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS.CHILIZ_MAINNET.chainId.toString());
  const [securityLevel, setSecurityLevel] = useState(75);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações Salvas",
        description: "Suas configurações foram atualizadas com sucesso.",
      });
    }, 1000);
  };
  
  return (
    <AppLayout>
      <div className="py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#8A2BE2] to-[#4B0082] bg-clip-text text-transparent animate-text-shimmer">
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Configure sua conta e preferências da aplicação
          </p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto p-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full">
              <TabsTrigger 
                value="general" 
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8A2BE2] data-[state=active]:to-[#4B0082] data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300"
              >
                <Globe className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Geral</span>
              </TabsTrigger>
              <TabsTrigger 
                value="network" 
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8A2BE2] data-[state=active]:to-[#4B0082] data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300"
              >
                <Network className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Rede</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8A2BE2] data-[state=active]:to-[#4B0082] data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300"
              >
                <Bell className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8A2BE2] data-[state=active]:to-[#4B0082] data-[state=active]:shadow-lg data-[state=active]:text-white transition-all duration-300"
              >
                <Shield className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                    <Globe className="h-5 w-5 text-purple-500" />
                    Idioma & Exibição
                  </CardTitle>
                  <CardDescription>Personalize sua experiência</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-purple-500" /> 
                      Idioma
                    </label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center">
                        <Hexagon className="h-4 w-4 mr-2 text-purple-500" /> 
                        Modo Escuro
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Alterne entre os temas claro e escuro
                      </div>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-purple-500" /> 
                      Mostrar Moeda
                    </label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50">
                        <SelectValue placeholder="Selecione a moeda" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="brl">BRL (R$)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border-0"
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Configurações
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                    <Users className="h-5 w-5 text-purple-500" />
                    Informações da Conta
                  </CardTitle>
                  <CardDescription>Atualize seus detalhes de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-500" /> 
                      Nome de Exibição
                    </label>
                    <Input 
                      defaultValue="Sports Fan" 
                      className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </label>
                    <Input 
                      defaultValue="fan@example.com" 
                      className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center">
                        <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Perfil Público
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Permitir que outros vejam sua atividade
                      </div>
                    </div>
                    <Switch 
                      defaultChecked 
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border-0"
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Perfil
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  <Network className="h-5 w-5 text-purple-500" />
                  Configurações de Rede
                </CardTitle>
                <CardDescription>Configure preferências de rede blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Network className="h-4 w-4 mr-2 text-purple-500" /> 
                    Rede
                  </label>
                  <Select 
                    value={selectedNetwork} 
                    onValueChange={setSelectedNetwork}
                  >
                    <SelectTrigger className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50">
                      <SelectValue placeholder="Selecione a rede" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                      <SelectItem value={NETWORKS.CHILIZ_MAINNET.chainId.toString()}>
                        {NETWORKS.CHILIZ_MAINNET.name} (Mainnet)
                      </SelectItem>
                      <SelectItem value={NETWORKS.CHILIZ_TESTNET.chainId.toString()}>
                        {NETWORKS.CHILIZ_TESTNET.name} (Testnet)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5 space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                    </svg>
                    Endpoint RPC
                  </label>
                  <Input 
                    value={selectedNetwork === NETWORKS.CHILIZ_MAINNET.chainId.toString() 
                      ? NETWORKS.CHILIZ_MAINNET.rpcUrl 
                      : NETWORKS.CHILIZ_TESTNET.rpcUrl} 
                    readOnly 
                    className="bg-black/60 border-white/10 text-xs font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Este é o endpoint RPC usado para se conectar à rede Chiliz.</p>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium flex items-center">
                    <Sliders className="h-4 w-4 mr-2 text-purple-500" /> 
                    Configuração de Preço do Gas
                  </label>
                  <Select value={gasSettings} onValueChange={setGasSettings}>
                    <SelectTrigger className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50">
                      <SelectValue placeholder="Selecione a configuração de preço do gas" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                      <SelectItem value="standard">Padrão (2500 gwei)</SelectItem>
                      <SelectItem value="fast">Rápido (3000 gwei)</SelectItem>
                      <SelectItem value="rapid">Ultra Rápido (3500 gwei)</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {gasSettings === "custom" && (
                  <div className="space-y-2 p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5">
                    <label className="text-sm font-medium flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-purple-500" /> 
                      Preço de Gas Personalizado (gwei)
                    </label>
                    <Input 
                      type="number" 
                      defaultValue="2500" 
                      className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Alternar Rede Automaticamente
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Alternar redes automaticamente quando necessário
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border-0"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações de Rede
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  <Bell className="h-5 w-5 text-purple-500" />
                  Configurações de Notificação
                </CardTitle>
                <CardDescription>Gerencie suas preferências de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-purple-500" /> 
                      Ativar Notificações
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Receba atualizações sobre transações e atividades da equipe
                    </div>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                  />
                </div>
                
                {notificationsEnabled && (
                  <>
                    <Alert className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
                      <Check className="h-4 w-4 text-green-400" />
                      <AlertDescription>
                        Notificações ativadas! Você receberá atualizações sobre suas atividades.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Atualizações de Transações
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Seja notificado sobre alterações de status de transações
                        </div>
                      </div>
                      <Switch 
                        defaultChecked 
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                          Votos da Equipe
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Seja notificado sobre novos votos da equipe
                        </div>
                      </div>
                      <Switch 
                        defaultChecked 
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Alertas de Preço
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Seja notificado sobre mudanças significativas de preço
                        </div>
                      </div>
                      <Switch 
                        defaultChecked 
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          Atualizações de Marketing
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Receba newsletters e conteúdo promocional
                        </div>
                      </div>
                      <Switch 
                        defaultChecked={false} 
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border-0"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações de Notificação
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Configurações de Segurança
                </CardTitle>
                <CardDescription>Gerencie suas preferências de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="font-medium">Nível de Segurança</span>
                    </div>
                    <span className="text-sm px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {securityLevel}%
                    </span>
                  </div>
                  
                  <Slider
                    defaultValue={[75]}
                    max={100}
                    step={1}
                    value={[securityLevel]}
                    onValueChange={(values) => setSecurityLevel(values[0])}
                    className="[&_[data-role=track]]:bg-gradient-to-r from-purple-600 to-blue-600"
                  />
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-center text-muted-foreground">
                    <div>Básico</div>
                    <div>Recomendado</div>
                    <div>Máximo</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Assinatura de Transação
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Exigir confirmação para todas as transações
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Timeout de Sessão
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Desconectar automaticamente após período de inatividade
                    </div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duração do Timeout de Sessão
                  </label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-black/60 border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50">
                      <SelectValue placeholder="Selecione a duração do timeout" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="never">Nunca expirar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/5">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center">
                      <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Limites de Gastos
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Definir valor máximo de transação
                    </div>
                  </div>
                  <Switch 
                    defaultChecked={false} 
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 border-0"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações de Segurança
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-between bg-black/40 backdrop-blur-lg border-white/10 hover:bg-black/60">
                  Configurações Avançadas de Segurança
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
