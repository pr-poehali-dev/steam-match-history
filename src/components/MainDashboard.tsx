import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import AdminPanel from "./AdminPanel";
import SearchPanel from "./SearchPanel";
import Icon from "@/components/ui/icon";

const MainDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CS Tracker Dashboard</h1>
          <p className="text-muted-foreground">
            Добро пожаловать, {user?.username}! Отслеживайте матчи
            Counter-Strike.
          </p>
        </div>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Icon name="Search" className="w-4 h-4" />
            <span>Поиск игроков</span>
          </TabsTrigger>
          {user?.role === "admin" && (
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Icon name="Settings" className="w-4 h-4" />
              <span>Админ-панель</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="search" className="mt-6">
          <SearchPanel />
        </TabsContent>

        {user?.role === "admin" && (
          <TabsContent value="admin" className="mt-6">
            <AdminPanel />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MainDashboard;
