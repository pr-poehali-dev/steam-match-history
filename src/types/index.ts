export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SteamProfile {
  steamId: string;
  personaName: string;
  profileUrl: string;
  avatarUrl: string;
  realName?: string;
  countryCode?: string;
}

export interface CSMatch {
  id: string;
  date: Date;
  map: string;
  gameMode: string;
  duration: number;
  score: {
    team1: number;
    team2: number;
  };
  playerStats: {
    kills: number;
    deaths: number;
    assists: number;
    kdr: number;
    adr: number;
    headshots: number;
    mvps: number;
  };
  result: "win" | "loss" | "tie";
}

export interface FaceitProfile {
  playerId: string;
  nickname: string;
  avatarUrl: string;
  country: string;
  steamId: string;
  faceitLevel: number;
  faceitElo: number;
  membershipType: string;
  gamesPlayed: number;
  winRate: number;
  avgKDR: number;
  avgHSP: number;
}

export interface FaceitMatch {
  id: string;
  date: Date;
  map: string;
  gameMode: string;
  result: "win" | "loss";
  score: {
    team1: number;
    team2: number;
  };
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    headshots: number;
    kdr: number;
    krRounds: number;
    mvps: number;
    tripleKills: number;
    quadroKills: number;
    pentaKills: number;
  };
  elo: {
    before: number;
    after: number;
    change: number;
  };
}

export interface SearchResult {
  steamProfile?: SteamProfile;
  faceitProfile?: FaceitProfile;
  steamMatches?: CSMatch[];
  faceitMatches?: FaceitMatch[];
  isLoading: boolean;
  error?: string;
}
