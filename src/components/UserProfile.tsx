
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block">{user?.name || 'Admin'}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Perfil do Usuário</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Informações do Usuário */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold">{user?.name || 'Administrador'}</h3>
              <p className="text-sm text-gray-500">{user?.email || 'admin@sistema.com'}</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
              </span>
            </div>
          </div>

          {/* Formulário de Edição */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={user?.name || 'Administrador'} />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue={user?.email || 'admin@sistema.com'} />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="(11) 99999-9999" />
            </div>
            <div>
              <Label htmlFor="company">Escritório</Label>
              <Input id="company" placeholder="Nome do escritório contábil" />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <Button className="w-full" onClick={handleSaveProfile}>
              <Settings className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair do Sistema
            </Button>
          </div>

          {/* Informações do Sistema */}
          <div className="border-t pt-4 text-center text-sm text-gray-500">
            <p>Sistema Contábil v1.0</p>
            <p>Último acesso: Hoje às 14:30</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
