// parse_goal_event.js
// action_id와 csv 경로를 받아 해당 이벤트 전 5개 볼터치 데이터를 반환하는 함수로 리팩터링

const fs = require('fs');
const Papa = require('papaparse');

/**
 * 특정 action_id(이벤트) 전 5개 볼터치 데이터를 반환
 * @param {string} csvFilePath - CSV 파일 경로
 * @param {number} eventActionId - 이벤트 action_id (예: 골 이벤트)
 * @returns {Promise<{touches: any[], trajectory: any[]}>}
 */
function getEventTouches(csvFilePath, eventActionId) {
  return new Promise((resolve, reject) => {
    fs.readFile(csvFilePath, 'utf8', (err, csvText) => {
      if (err) return reject(err);
      const { data } = Papa.parse(csvText, { header: true });
      const touches = data
        .filter(row => {
          const id = Number(row.action_id);
          return id >= eventActionId - 4 && id <= eventActionId;
        })
        .map(row => ({
          action_id: Number(row.action_id),
          player_id: row.player_id,
          player_name: row.player_name_ko,
          start_x: Number(row.start_x),
          start_y: Number(row.start_y),
          end_x: Number(row.end_x),
          end_y: Number(row.end_y),
          type_name: row.type_name,
        }));

      // trajectory: 각 볼터치의 start_x, start_y → end_x, end_y를 순서대로 배열로 만듦
      const trajectory = touches.map(t => ({ x: t.start_x, y: t.start_y }));
      if (touches.length > 0) {
        trajectory.push({
          x: touches[touches.length - 1].end_x,
          y: touches[touches.length - 1].end_y,
        });
      }
      resolve({ touches, trajectory });
    });
  });
}

// 예시: 단독 실행 시 goal_event.json 저장
if (require.main === module) {
  const csvFilePath = './csv/example.csv';
  const outputFilePath = './csv/goal_event.json';
  const goalActionId = 198;
  getEventTouches(csvFilePath, goalActionId)
    .then(result => {
      fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), err => {
        if (err) throw err;
        console.log('Saved:', outputFilePath);
      });
    })
    .catch(console.error);
}
    if (err) throw err;
    console.log('goal_event.json 파일이 생성되었습니다.');
  });
});
