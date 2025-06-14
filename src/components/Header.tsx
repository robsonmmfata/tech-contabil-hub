
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "./UserProfile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useAlertas } from "@/hooks/useAlertas";

export const Header = () => {
  const alertas = useAlertas();

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar clientes, serviços..."
            className="pl-10 w-80"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {alertas.length}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-3">
            <div className="font-semibold mb-2">Notificações</div>
            {alertas.length === 0 ? (
              <div className="text-gray-500 text-sm">Sem notificações recentes.</div>
            ) : (
              <ul className="space-y-3">
                {alertas.map((n) => (
                  <li key={n.id} className="flex items-start space-x-2">
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{n.title}</span>
                        {n.type === "alerta" && (
                          <Badge variant="destructive" className="ml-1 px-2 py-0 text-xs">Alerta</Badge>
                        )}
                        {n.type === "success" && (
                          <Badge variant="default" className="ml-1 px-2 py-0 text-xs bg-green-50 text-green-700 border-green-200">Recebido</Badge>
                        )}
                        {n.type === "info" && (
                          <Badge variant="outline" className="ml-1 px-2 py-0 text-xs">Info</Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {n.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </Popover>
        <UserProfile />
      </div>
    </header>
  );
};

