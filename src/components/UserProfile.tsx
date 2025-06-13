
import React, { useState } from 'react';
import { User, Settings, LogOut, Bell, Shield, CreditCard } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contadorInfo = {
    nome: "João Silva",
    email: "joao.silva@contabilpro.com",
    crc: "CRC-SP 123456",
    telefone: "(11) 99999-9999",
    empresa: "Silva & Associados Contabilidade",
    avatar: "/placeholder.svg"
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={contadorInfo.avatar} alt={contadorInfo.nome} />
            <AvatarFallback>
              {contadorInfo.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:block">{contadorInfo.nome.split(' ')[0]}</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Perfil do Contador</SheetTitle>
          <SheetDescription>
            Gerencie suas informações pessoais e configurações da conta
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="configuracoes">Config</TabsTrigger>
              <TabsTrigger value="plano">Plano</TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="space-y-6 mt-6">
              {/* Avatar e Info Principal */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={contadorInfo.avatar} alt={contadorInfo.nome} />
                      <AvatarFallback className="text-lg">
                        {contadorInfo.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{contadorInfo.nome}</h3>
                      <p className="text-sm text-gray-500">{contadorInfo.crc}</p>
                      <p className="text-sm text-gray-500">{contadorInfo.empresa}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Alterar Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Informações Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" value={contadorInfo.nome} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" value={contadorInfo.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" value={contadorInfo.telefone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crc">CRC</Label>
                    <Input id="crc" value={contadorInfo.crc} readOnly />
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuracoes" className="space-y-6 mt-6">
              {/* Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Notificações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-mail de prazos</p>
                      <p className="text-sm text-gray-500">Receber alertas de vencimentos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Relatórios semanais</p>
                      <p className="text-sm text-gray-500">Resumo semanal das atividades</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novos clientes</p>
                      <p className="text-sm text-gray-500">Notificar sobre novos cadastros</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Segurança</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Ativar Autenticação 2FA
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Sessões Ativas
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plano" className="space-y-6 mt-6">
              {/* Plano Atual */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Plano Atual</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900">Plano Profissional</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">R$ 89,90/mês</p>
                    <p className="text-sm text-blue-700 mt-1">Até 50 clientes</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Clientes utilizados</span>
                      <span>15/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span>Próxima cobrança:</span>
                      <span>15/02/2024</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Método de pagamento:</span>
                      <span>••••4242</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Upgrade para Premium
                    </Button>
                    <Button variant="outline" className="w-full">
                      Gerenciar Assinatura
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botão de Logout */}
          <div className="mt-6 pt-6 border-t">
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setIsOpen(false)}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
