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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SearchResult,
  SteamProfile,
  FaceitProfile,
  CSMatch,
  FaceitMatch,
} from "@/types";
import Icon from "@/components/ui/icon";

const steamSearchSchema = z.object({
  steamId: z.string().min(1, "Введите Steam ID"),
});

const faceitSearchSchema = z.object({
  faceitNickname: z.string().min(1, "Введите Faceit никнейм"),
});

type SteamSearchFormData = z.infer<typeof steamSearchSchema>;
type FaceitSearchFormData = z.infer<typeof faceitSearchSchema>;

const SearchPanel: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    isLoading: false,
  });

  const steamForm = useForm<SteamSearchFormData>({
    resolver: zodResolver(steamSearchSchema),
  });

  const faceitForm = useForm<FaceitSearchFormData>({
    resolver: zodResolver(faceitSearchSchema),
  });

  const onSteamSearch = async (data: SteamSearchFormData) => {
    setSearchResult({ isLoading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockSteamProfile: SteamProfile = {
        steamId: data.steamId,
        personaName: "CS_Player_2024",
        profileUrl: `https://steamcommunity.com/profiles/${data.steamId}`,
        avatarUrl:
          "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
        realName: "Alex Petrov",
        countryCode: "RU",
      };

      const mockMatches: CSMatch[] = [
        {
          id: "1",
          date: new Date("2024-07-06"),
          map: "de_dust2",
          gameMode: "Competitive",
          duration: 2340,
          score: { team1: 16, team2: 14 },
          playerStats: {
            kills: 24,
            deaths: 18,
            assists: 6,
            kdr: 1.33,
            adr: 78.5,
            headshots: 12,
            mvps: 3,
          },
          result: "win",
        },
        {
          id: "2",
          date: new Date("2024-07-05"),
          map: "de_inferno",
          gameMode: "Competitive",
          duration: 2670,
          score: { team1: 13, team2: 16 },
          playerStats: {
            kills: 19,
            deaths: 21,
            assists: 4,
            kdr: 0.9,
            adr: 65.2,
            headshots: 8,
            mvps: 1,
          },
          result: "loss",
        },
      ];

      setSearchResult({
        steamProfile: mockSteamProfile,
        steamMatches: mockMatches,
        isLoading: false,
      });
    } catch (error) {
      setSearchResult({
        isLoading: false,
        error: "Ошибка при поиске игрока в Steam",
      });
    }
  };

  const onFaceitSearch = async (data: FaceitSearchFormData) => {
    setSearchResult({ isLoading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockFaceitProfile: FaceitProfile = {
        playerId: "faceit-123456",
        nickname: data.faceitNickname,
        avatarUrl:
          "https://assets.faceit-cdn.net/avatars/avatar-placeholder.png",
        country: "RU",
        steamId: "76561198123456789",
        faceitLevel: 8,
        faceitElo: 1847,
        membershipType: "premium",
        gamesPlayed: 245,
        winRate: 67.5,
        avgKDR: 1.24,
        avgHSP: 45.6,
      };

      const mockFaceitMatches: FaceitMatch[] = [
        {
          id: "1",
          date: new Date("2024-07-06"),
          map: "de_mirage",
          gameMode: "5v5",
          result: "win",
          score: { team1: 16, team2: 12 },
          stats: {
            kills: 26,
            deaths: 17,
            assists: 8,
            headshots: 14,
            kdr: 1.53,
            krRounds: 9,
            mvps: 7,
            tripleKills: 2,
            quadroKills: 1,
            pentaKills: 0,
          },
          elo: {
            before: 1823,
            after: 1847,
            change: +24,
          },
        },
        {
          id: "2",
          date: new Date("2024-07-05"),
          map: "de_cache",
          gameMode: "5v5",
          result: "loss",
          score: { team1: 14, team2: 16 },
          stats: {
            kills: 18,
            deaths: 20,
            assists: 5,
            headshots: 7,
            kdr: 0.9,
            krRounds: 6,
            mvps: 2,
            tripleKills: 1,
            quadroKills: 0,
            pentaKills: 0,
          },
          elo: {
            before: 1847,
            after: 1823,
            change: -24,
          },
        },
      ];

      setSearchResult({
        faceitProfile: mockFaceitProfile,
        faceitMatches: mockFaceitMatches,
        isLoading: false,
      });
    } catch (error) {
      setSearchResult({
        isLoading: false,
        error: "Ошибка при поиске игрока в Faceit",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Search" className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Поиск игроков</h2>
      </div>

      <Tabs defaultValue="steam" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="steam">Steam</TabsTrigger>
          <TabsTrigger value="faceit">Faceit</TabsTrigger>
        </TabsList>

        <TabsContent value="steam">
          <Card>
            <CardHeader>
              <CardTitle>Поиск по Steam ID</CardTitle>
              <CardDescription>
                Введите Steam ID игрока для поиска истории матчей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={steamForm.handleSubmit(onSteamSearch)}
                className="space-y-4"
              >
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="steamId">Steam ID</Label>
                    <Input
                      id="steamId"
                      {...steamForm.register("steamId")}
                      placeholder="76561198123456789"
                      disabled={searchResult.isLoading}
                    />
                    {steamForm.formState.errors.steamId && (
                      <p className="text-sm text-destructive mt-1">
                        {steamForm.formState.errors.steamId.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={searchResult.isLoading}
                    className="mt-6"
                  >
                    {searchResult.isLoading ? (
                      <>
                        <Icon
                          name="Loader2"
                          className="mr-2 h-4 w-4 animate-spin"
                        />
                        Поиск...
                      </>
                    ) : (
                      <>
                        <Icon name="Search" className="mr-2 h-4 w-4" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faceit">
          <Card>
            <CardHeader>
              <CardTitle>Поиск по Faceit</CardTitle>
              <CardDescription>
                Введите никнейм игрока на Faceit для поиска статистики
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={faceitForm.handleSubmit(onFaceitSearch)}
                className="space-y-4"
              >
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="faceitNickname">Faceit никнейм</Label>
                    <Input
                      id="faceitNickname"
                      {...faceitForm.register("faceitNickname")}
                      placeholder="player_name"
                      disabled={searchResult.isLoading}
                    />
                    {faceitForm.formState.errors.faceitNickname && (
                      <p className="text-sm text-destructive mt-1">
                        {faceitForm.formState.errors.faceitNickname.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={searchResult.isLoading}
                    className="mt-6"
                  >
                    {searchResult.isLoading ? (
                      <>
                        <Icon
                          name="Loader2"
                          className="mr-2 h-4 w-4 animate-spin"
                        />
                        Поиск...
                      </>
                    ) : (
                      <>
                        <Icon name="Search" className="mr-2 h-4 w-4" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {searchResult.error && (
        <Alert variant="destructive">
          <Icon name="AlertCircle" className="h-4 w-4" />
          <AlertDescription>{searchResult.error}</AlertDescription>
        </Alert>
      )}

      {(searchResult.steamProfile || searchResult.faceitProfile) && (
        <div className="grid gap-6 md:grid-cols-2">
          {searchResult.steamProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Профиль Steam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={searchResult.steamProfile.avatarUrl} />
                    <AvatarFallback>
                      <Icon name="User" className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {searchResult.steamProfile.personaName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {searchResult.steamProfile.realName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {searchResult.steamProfile.countryCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {searchResult.faceitProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Профиль Faceit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={searchResult.faceitProfile.avatarUrl} />
                    <AvatarFallback>
                      <Icon name="User" className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {searchResult.faceitProfile.nickname}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">
                        Уровень {searchResult.faceitProfile.faceitLevel}
                      </Badge>
                      <Badge variant="outline">
                        {searchResult.faceitProfile.faceitElo} ELO
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Игр:</span>{" "}
                        {searchResult.faceitProfile.gamesPlayed}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Винрейт:</span>{" "}
                        {searchResult.faceitProfile.winRate}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">K/D:</span>{" "}
                        {searchResult.faceitProfile.avgKDR}
                      </div>
                      <div>
                        <span className="text-muted-foreground">HS%:</span>{" "}
                        {searchResult.faceitProfile.avgHSP}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {(searchResult.steamMatches || searchResult.faceitMatches) && (
        <Card>
          <CardHeader>
            <CardTitle>История матчей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResult.steamMatches?.map((match) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          match.result === "win" ? "default" : "destructive"
                        }
                      >
                        {match.result === "win" ? "Победа" : "Поражение"}
                      </Badge>
                      <span className="font-medium">{match.map}</span>
                      <span className="text-sm text-muted-foreground">
                        {match.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      {match.score.team1} : {match.score.team2}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">K/D/A:</span>{" "}
                      {match.playerStats.kills}/{match.playerStats.deaths}/
                      {match.playerStats.assists}
                    </div>
                    <div>
                      <span className="text-muted-foreground">K/D:</span>{" "}
                      {match.playerStats.kdr}
                    </div>
                    <div>
                      <span className="text-muted-foreground">ADR:</span>{" "}
                      {match.playerStats.adr}
                    </div>
                    <div>
                      <span className="text-muted-foreground">MVP:</span>{" "}
                      {match.playerStats.mvps}
                    </div>
                  </div>
                </div>
              ))}

              {searchResult.faceitMatches?.map((match) => (
                <div key={match.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          match.result === "win" ? "default" : "destructive"
                        }
                      >
                        {match.result === "win" ? "Победа" : "Поражение"}
                      </Badge>
                      <span className="font-medium">{match.map}</span>
                      <span className="text-sm text-muted-foreground">
                        {match.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {match.score.team1} : {match.score.team2}
                      </span>
                      <Badge
                        variant={
                          match.elo.change > 0 ? "default" : "destructive"
                        }
                      >
                        {match.elo.change > 0 ? "+" : ""}
                        {match.elo.change} ELO
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">K/D/A:</span>{" "}
                      {match.stats.kills}/{match.stats.deaths}/
                      {match.stats.assists}
                    </div>
                    <div>
                      <span className="text-muted-foreground">K/D:</span>{" "}
                      {match.stats.kdr}
                    </div>
                    <div>
                      <span className="text-muted-foreground">HS:</span>{" "}
                      {match.stats.headshots}
                    </div>
                    <div>
                      <span className="text-muted-foreground">MVP:</span>{" "}
                      {match.stats.mvps}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPanel;
