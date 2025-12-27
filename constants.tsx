
import { Player, MatchEvent } from './types';

export const COLORS = {
  NAVY_DARK: '#050b18',
  NAVY_ACCENT: '#0a1428',
  GOLD: '#c5a059',
  GOLD_BRIGHT: '#f2d398',
  WHITE: '#ffffff',
  GRAY: '#94a3b8',
};

export const PLAYERS: Player[] = [
  {
    id: 'lee-kang-in',
    name: '이강인',
    engName: 'LEE KANG IN',
    position: 'RW',
    number: 10,
    team: 'SEOUL FC',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/K_League_1_logo.svg/1200px-K_League_1_logo.svg.png',
    photoUrl: 'https://picsum.photos/seed/player1/400/500',
    // Moved to Right Wing position (Top side of pitch in this view)
    x: 80,
    y: 20,
    stats: [
      { subject: 'PAC', value: 85, fullMark: 100 },
      { subject: 'SHO', value: 82, fullMark: 100 },
      { subject: 'PAS', value: 94, fullMark: 100 },
      { subject: 'DRI', value: 96, fullMark: 100 },
      { subject: 'DEF', value: 45, fullMark: 100 },
      { subject: 'PHY', value: 70, fullMark: 100 },
    ],
    preferredPlays: [
      '측면에서 중앙으로 파고듦',
      '결정적인 스루 패스 선호',
      '직접 프리킥 전담'
    ]
  },
  {
    id: 'ki-sung-yueng',
    name: '기성용',
    engName: 'KI SUNG YUENG',
    position: 'CDM',
    number: 6,
    team: 'SEOUL FC',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/K_League_1_logo.svg/1200px-K_League_1_logo.svg.png',
    photoUrl: 'https://picsum.photos/seed/player2/400/500',
    // Moved to Central Defensive Midfielder position (Deep Center)
    x: 42,
    y: 50,
    stats: [
      { subject: 'PAC', value: 65, fullMark: 100 },
      { subject: 'SHO', value: 78, fullMark: 100 },
      { subject: 'PAS', value: 92, fullMark: 100 },
      { subject: 'DRI', value: 75, fullMark: 100 },
      { subject: 'DEF', value: 80, fullMark: 100 },
      { subject: 'PHY', value: 82, fullMark: 100 },
    ],
    preferredPlays: [
      '롱패스로 방향 전환',
      '중거리 슛 시도',
      '조율 중심 경기'
    ]
  },
  {
    id: 'iljutcenko',
    name: '일류첸코',
    engName: 'S. ILJUTCENKO',
    position: 'ST',
    number: 9,
    team: 'SEOUL FC',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/K_League_1_logo.svg/1200px-K_League_1_logo.svg.png',
    photoUrl: 'https://picsum.photos/seed/player3/400/500',
    // Moved to Striker position (High Center)
    x: 88,
    y: 50,
    stats: [
      { subject: 'PAC', value: 75, fullMark: 100 },
      { subject: 'SHO', value: 90, fullMark: 100 },
      { subject: 'PAS', value: 70, fullMark: 100 },
      { subject: 'DRI', value: 72, fullMark: 100 },
      { subject: 'DEF', value: 35, fullMark: 100 },
      { subject: 'PHY', value: 92, fullMark: 100 },
    ],
    preferredPlays: [
      '포스트 플레이 강점',
      '헤더 득점 위주',
      '박스 안 침착성'
    ]
  }
];

export const MATCH_EVENTS: MatchEvent[] = [
  {
    id: 'evt-2',
    time: "28'",
    type: 'CARD',
    playerId: 'ki-sung-yueng',
    description: "Caution: Ki Sung-yueng (Persistent Infringement)",
    color: '#eab308', // Yellow
    trajectory: [
      { x: 42, y: 50 }, // Ki's position
      { x: 48, y: 55 }  // Foul location
    ]
  },
  {
    id: 'evt-1',
    time: "14'",
    type: 'GOAL',
    playerId: 'iljutcenko',
    description: "Goal Scored: Stanislav Iljutcenko",
    color: '#c5a059', // Gold
    trajectory: [
      { x: 75, y: 40 }, // Start of run
      { x: 88, y: 50 }, // Shot location (Iljutcenko pos)
      { x: 99, y: 50 }  // Goal
    ]
  }
];
