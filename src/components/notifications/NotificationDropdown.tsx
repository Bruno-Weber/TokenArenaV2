
import React, { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  clubLogo?: string;
  timestamp: Date;
  read: boolean;
  type: "vote" | "nft" | "news";
}

// Mock notifications - in a real app, these would come from a backend
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nova votação",
    message: "Barcelona criou uma nova votação sobre o uniforme da próxima temporada",
    clubLogo: "/images/barcelona.png",
    timestamp: new Date(2025, 3, 28),
    read: false,
    type: "vote"
  },
  {
    id: "2",
    title: "Lançamento de NFT",
    message: "Real Madrid lançou uma nova coleção de NFTs exclusivos",
    clubLogo: "/images/realmadrid.png",
    timestamp: new Date(2025, 3, 27),
    read: false,
    type: "nft"
  },
  {
    id: "3", 
    title: "Notícia importante",
    message: "Manchester United anuncia nova parceria com patrocinador",
    clubLogo: "/images/manchesterunited.png",
    timestamp: new Date(2025, 3, 26),
    read: true,
    type: "news"
  }
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
    toast({
      title: "Notificações",
      description: "Todas as notificações foram marcadas como lidas"
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <img 
            src="/lovable-uploads/73fade2f-34a4-4bcc-91a9-9a4556fb3cc3.png" 
            alt="Notificações" 
            className="h-5 w-5" 
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-background border border-token-purple/20">
        <div className="flex items-center justify-between p-4 pb-2">
          <h2 className="font-medium text-lg">Notificações</h2>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0">
                <div 
                  className={`w-full p-3 cursor-pointer ${notification.read ? 'opacity-70' : 'bg-muted/30'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {notification.clubLogo && (
                      <img 
                        src={notification.clubLogo} 
                        alt="Club logo" 
                        className="w-10 h-10 rounded-full object-cover mt-1" 
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs w-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              toast({
                title: "Notificações",
                description: "Configurações de notificação serão implementadas em breve"
              });
            }}
          >
            Configurar notificações
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
