import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types";
import Icon from "@/components/ui/icon";

const addUserSchema = z.object({
  username: z
    .string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  role: z.enum(["admin", "user"]),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "admin",
      email: "admin@cs-tracker.com",
      role: "admin",
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      username: "user",
      email: "user@cs-tracker.com",
      role: "user",
      createdAt: new Date("2024-01-02"),
    },
  ]);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data: AddUserFormData) => {
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = users.find(
        (u) => u.username === data.username || u.email === data.email,
      );

      if (existingUser) {
        throw new Error("Пользователь с таким именем или email уже существует");
      }

      const newUser: User = {
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        role: data.role,
        createdAt: new Date(),
      };

      setUsers((prev) => [...prev, newUser]);
      setSuccess("Пользователь успешно добавлен");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = (userId: string) => {
    if (userId === user?.id) {
      setError("Нельзя удалить собственный аккаунт");
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setSuccess("Пользователь удален");
  };

  if (user?.role !== "admin") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center">
            <div>
              <Icon
                name="ShieldAlert"
                className="w-12 h-12 text-muted-foreground mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Доступ запрещен</h3>
              <p className="text-muted-foreground">
                Для доступа к админ-панели требуются права администратора
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Settings" className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Админ-панель</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Добавить пользователя</CardTitle>
            <CardDescription>
              Создайте новый аккаунт для доступа к системе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Введите имя пользователя"
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Введите email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Введите пароль"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль</Label>
                <select
                  id="role"
                  {...register("role")}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  disabled={isLoading}
                >
                  <option value="user">Пользователь</option>
                  <option value="admin">Администратор</option>
                </select>
                {errors.role && (
                  <p className="text-sm text-destructive">
                    {errors.role.message}
                  </p>
                )}
              </div>
              {success && (
                <Alert>
                  <Icon name="CheckCircle" className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive">
                  <Icon name="AlertCircle" className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon
                      name="Loader2"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    Создание...
                  </>
                ) : (
                  "Создать пользователя"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Пользователи системы</CardTitle>
            <CardDescription>
              Список всех зарегистрированных пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((userItem, index) => (
                <div key={userItem.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="User" className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{userItem.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {userItem.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          userItem.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {userItem.role === "admin" ? "Админ" : "Пользователь"}
                      </Badge>
                      {userItem.id !== user?.id && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteUser(userItem.id)}
                        >
                          <Icon name="Trash2" className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < users.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
