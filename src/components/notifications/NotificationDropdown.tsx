
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AmericanFootball, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "vote" | "nft" | "news";
  clubName: string;
  clubLogo: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Mock notifications for demo purposes
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "vote",
    clubName: "Barcelona",
    clubLogo: "/images/barcelona.png",
    message: "New voting opened: Should we change our away kit colors?",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "nft",
    clubName: "Los Angeles Lakers",
    clubLogo: "/images/lakers.png",
    message: "Limited edition NFT drop in 24 hours!",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "news",
    clubName: "Manchester United",
    clubLogo: "/images/manchesterunited.png",
    message: "Fan token holders: Exclusive stadium tour next month",
    timestamp: "3 days ago",
    read: true,
  },
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read."
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <AmericanFootball className="h-5 w-5 text-purple-600" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-purple-600 text-white text-[10px]" 
              variant="default"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 border-b hover:bg-muted/50 cursor-pointer flex gap-3 ${
                    notification.read ? 'opacity-70' : 'bg-purple-50/10'
                  }`}
                >
                  <img 
                    src={notification.clubLogo} 
                    alt={notification.clubName} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium">{notification.clubName}</p>
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                    {!notification.read && (
                      <Badge variant="secondary" className="mt-1.5 bg-purple-100 text-purple-700 text-xs">
                        {notification.type === 'vote' ? 'New Vote' : 
                         notification.type === 'nft' ? 'NFT Drop' : 'News'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
