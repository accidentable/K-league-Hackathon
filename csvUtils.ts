// csvUtils.ts
// CSV 파싱 및 이벤트 시퀀스 추출 유틸리티

export interface ActionEvent {
  action_id: number;
  time_seco: number;
  player_id: string;
  player_name: string;
  team_name: string;
  type_name: string;
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
      action_id: Number(cols[1]),
      time_seco: Number(cols[4]),
      player_id: cols[6],
      player_name: cols[14],
      team_name: cols[15],
      type_name: cols[12],
      start_x: Number(cols[7]),
      start_y: Number(cols[8]),
      end_x: Number(cols[9]),
      end_y: Number(cols[10]),
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
