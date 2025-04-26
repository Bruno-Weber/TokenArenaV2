
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { NETWORKS } from "@/lib/web3";
import { Save, Bell, Shield, Globe, ChevronRight, Users } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [gasSettings, setGasSettings] = useState("standard");
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS.CHILIZ_MAINNET.chainId.toString());
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1500);
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Configure your account and application preferences</p>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Language & Display
                  </CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </div>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Currency</label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⭮</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <Input defaultValue="Sports Fan" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="fan@example.com" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Public Profile</div>
                      <div className="text-sm text-muted-foreground">
                        Allow others to see your activity
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
                    onClick={handleSaveSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⭮</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Network Settings</CardTitle>
                <CardDescription>Configure blockchain network preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Network</label>
                  <Select 
                    value={selectedNetwork} 
                    onValueChange={setSelectedNetwork}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NETWORKS.CHILIZ_MAINNET.chainId.toString()}>
                        {NETWORKS.CHILIZ_MAINNET.name} (Mainnet)
                      </SelectItem>
                      <SelectItem value={NETWORKS.CHILIZ_TESTNET.chainId.toString()}>
                        {NETWORKS.CHILIZ_TESTNET.name} (Testnet)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">RPC Endpoint</label>
                  <Input 
                    value={selectedNetwork === NETWORKS.CHILIZ_MAINNET.chainId.toString() 
                      ? NETWORKS.CHILIZ_MAINNET.rpcUrl 
                      : NETWORKS.CHILIZ_TESTNET.rpcUrl} 
                    readOnly 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gas Price Setting</label>
                  <Select value={gasSettings} onValueChange={setGasSettings}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gas price setting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (2500 gwei)</SelectItem>
                      <SelectItem value="fast">Fast (3000 gwei)</SelectItem>
                      <SelectItem value="rapid">Rapid (3500 gwei)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {gasSettings === "custom" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Custom Gas Price (gwei)</label>
                    <Input type="number" defaultValue="2500" />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-switch Network</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically switch networks when required
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⭮</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Network Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about transactions and team activities
                    </div>
                  </div>
                  <Switch 
                    checked={notificationsEnabled} 
                    onCheckedChange={setNotificationsEnabled} 
                  />
                </div>
                
                {notificationsEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Transaction Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about transaction status changes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Team Votes</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about new team votes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Price Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about significant price changes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Receive newsletters and promotional content
                        </div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⭮</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Notification Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Transaction Signing</div>
                    <div className="text-sm text-muted-foreground">
                      Require confirmation for all transactions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically disconnect after period of inactivity
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout Duration</label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never timeout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Spending Limits</div>
                    <div className="text-sm text-muted-foreground">
                      Set maximum transaction amount
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full bg-chiliz-primary hover:bg-chiliz-primary/90"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⭮</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-between">
                  Advanced Security Settings
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
