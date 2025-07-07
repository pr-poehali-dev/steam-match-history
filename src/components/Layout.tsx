import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">CS Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="User" className="w-5 h-5" />
                <span className="text-sm font-medium">{user?.username}</span>
                {user?.role === "admin" && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <Icon name="LogOut" className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
