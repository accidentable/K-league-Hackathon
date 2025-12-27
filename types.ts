
export interface PlayerStats {
  subject: string;
  value: number;
  fullMark: number;
}

export interface Player {
  id: string;
  name: string;
  engName: string;
  position: string;
  number: number;
  team: string;
  teamLogo: string;
  photoUrl: string;
  stats: PlayerStats[];
  preferredPlays: string[];
  x: number; // Pitch map X coordinate (0-100)
  y: number; // Pitch map Y coordinate (0-100)
}

export interface MatchInfo {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  stadium: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface MatchEvent {
  id: string;
  time: string;
  type: 'GOAL' | 'CARD' | 'SUB' | 'FOUL';
  description: string;
  playerId: string;
  trajectory?: Coordinate[]; // Array of points for animation [start, end]
  color: string;
}
