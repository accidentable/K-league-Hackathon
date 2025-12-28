// ActionEvent[]에서 주요 이벤트(GOAL, CARD 등)만 추출해 MatchEvent[]로 변환
import { MatchEvent } from './types';

// 주요 이벤트 추출 (type_name, result_name 등 기준)
function formatTimeSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function parseEventsFromActions(actions: ActionEvent[]): MatchEvent[] {
  return actions.map((a, idx) => {
    return {
      id: `evt-${a.action_id}`,
      time: formatTimeSec(a.time_seco),
      type: a.type_name,
      description: `${a.type_name} / ${a.result_name}: ${a.player_name}`,
      playerId: a.player_id,
      color: a.type_name?.toLowerCase() === 'pass' ? '#4fd1c5' : '#94a3b8',
      actionId: a.action_id,
      // trajectory, activePlayerIds는 필요시 handleEventClick에서 생성
    } as MatchEvent & { actionId: number };
  });
}
// csvUtils.ts
// CSV 파싱 및 이벤트 시퀀스 추출 유틸리티

export interface ActionEvent {
  action_id: number;
  time_seco: number;
  player_id: string;
  player_name: string;
  team_name: string;
  type_name: string;
  result_name: string; // G열
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
}

// CSV 텍스트를 ActionEvent[]로 파싱 (헤더 포함)
export function parseCsvToActions(csvText: string): ActionEvent[] {
  const lines = csvText.trim().split(/\r?\n/);
  const header = lines[0].split(',');
  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      action_id: Number(cols[1]), // action_id
      time_seco: Number(cols[3]), // time_seco
      player_id: cols[5],         // player_id
      result_name: cols[6],       // result_name
      start_x: Number(cols[7]),   // start_x
      start_y: Number(cols[8]),   // start_y
      end_x: Number(cols[9]),     // end_x
      end_y: Number(cols[10]),    // end_y
      type_name: cols[13],        // type_name
      player_name: cols[14],      // player_name
      team_name: cols[15],        // team_name
    };
  });
}

// 특정 action_id를 기준으로, 앞뒤 5초간의 액션 시퀀스 추출
export function getActionSequence(actions: ActionEvent[], centerActionId: number, windowSec = 5): ActionEvent[] {
  const center = actions.find(a => a.action_id === centerActionId);
  if (!center) return [];
  const startTime = center.time_seco - windowSec;
  const endTime = center.time_seco + 1; // 이벤트 직후까지
  return actions.filter(a => a.time_seco >= startTime && a.time_seco <= endTime);
}
