
import React, { useState, useCallback } from 'react';
import { PLAYERS, MATCH_EVENTS } from './constants';
import PlayerCard from './components/PlayerCard';
import VideoPlayer from './components/VideoPlayer';
import PitchMap, { TrajectoryStep } from './components/PitchMap';
import { MatchInfo, Player, MatchEvent } from './types';

const App: React.FC = () => {
  const [matchInfo] = useState<MatchInfo>({
    homeTeam: 'SEOUL FC',
    awayTeam: 'ULSAN HD',
    homeScore: 1,
    awayScore: 0,
    time: '34:12',
    stadium: 'SEOUL WORLD CUP STADIUM'
  });

  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYERS[0]);
  const [activeEvent, setActiveEvent] = useState<MatchEvent | null>(null);
  const [trajectorySteps, setTrajectorySteps] = useState<TrajectoryStep[] | undefined>(undefined);

  // 예시: 택티컬 로그 클릭 시 trajectorySteps로 여러 액션 시퀀스 전달
  const handleEventClick = useCallback((event: MatchEvent) => {
    setActiveEvent(event);
    // 실제로는 CSV 파싱 후 getActionSequence로 추출해야 함
    // 여기서는 예시 trajectorySteps를 임의로 생성
    const exampleSteps: TrajectoryStep[] = [
      {
        color: '#c5a059',
        path: [ { x: 30, y: 50 }, { x: 40, y: 55 } ],
        label: '패스'
      },
      {
        color: '#c5a059',
        path: [ { x: 40, y: 55 }, { x: 55, y: 60 } ],
        label: '패스 리시브'
      },
      {
        color: '#c5a059',
        path: [ { x: 55, y: 60 }, { x: 70, y: 65 } ],
        label: '캐리'
      },
      {
        color: '#c5a059',
        path: [ { x: 70, y: 65 }, { x: 80, y: 50 } ],
        label: '슈팅'
      },
    ];
    setTrajectorySteps(exampleSteps);
    // 선수 카드도 변경
    const involvedPlayer = PLAYERS.find(p => p.id === event.playerId);
    if (involvedPlayer) {
      setCurrentPlayer(involvedPlayer);
    }
    // 5초 후 애니메이션 종료
    setTimeout(() => {
      setActiveEvent(null);
      setTrajectorySteps(undefined);
    }, exampleSteps.length * 1000 + 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050b18] text-white selection:bg-[#c5a059] selection:text-[#050b18]">
      {/* Global Navigation Header (Slim) */}
      <header className="h-14 flex items-center px-6 bg-[#0a1428] border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/K_League_1_logo.svg/1200px-K_League_1_logo.svg.png" 
            alt="K League" 
            className="h-8"
          />
          <div className="h-4 w-[1px] bg-white/20 mx-2"></div>
          <h1 className="text-sm font-black tracking-widest uppercase italic bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Match Center Pro
          </h1>
        </div>
        
        <div className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_green]"></span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Syncing Live</span>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#050b18] transition-all rounded">
            Switch Feed
          </button>
        </div>
      </header>

      {/* Main Content: 3:7 Ratio Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-10 h-[calc(100vh-3.5rem)]">
        
        {/* Left Side: Analytics Sidebar (3/10) */}
        <aside className="lg:col-span-3 h-full border-r border-[#c5a059]/30 flex flex-col overflow-hidden">
          {/* Top: Individual Player Stats (Scrollable if needed) */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <PlayerCard player={currentPlayer} />
          </div>

          {/* Bottom: Tactical Pitch Map (Fixed Aspect) */}
          <PitchMap 
            players={PLAYERS} 
            selectedId={currentPlayer.id} 
            onSelectPlayer={(player) => setCurrentPlayer(player)}
            trajectorySteps={trajectorySteps}
            activeEvent={activeEvent}
          />
        </aside>

        {/* Right Side: Broadcast & Analysis (7/10) */}
        <section className="lg:col-span-7 bg-[#050b18] p-6 lg:p-10 flex flex-col gap-8 overflow-y-auto">
          
          {/* Main Video Section */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em]">Live HD Stream</span>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">{matchInfo.homeTeam} VS {matchInfo.awayTeam}</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Viewers</p>
                  <p className="text-sm font-black">24,812</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <VideoPlayer matchInfo={matchInfo} />
          </div>

          {/* Quick Stats Ticker Below Video */}
          <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Possession', home: '54%', away: '46%' },
              { label: 'Expected Goals (xG)', home: '1.24', away: '0.88' },
              { label: 'Total Shots', home: '8', away: '5' },
              { label: 'Pass Accuracy', home: '88%', away: '82%' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#0a1428] p-4 rounded-lg border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059] opacity-50"></div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black group-hover:text-[#c5a059] transition-colors">{stat.home}</span>
                  <div className="h-0.5 flex-1 mx-3 mb-2 bg-white/10 relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059] to-blue-600 opacity-30"></div>
                  </div>
                  <span className="text-xl font-black text-gray-400">{stat.away}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Event Feed */}
          <div className="w-full max-w-6xl mx-auto mt-auto">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tactical Log</h3>
            <div className="space-y-2">
              {MATCH_EVENTS.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className={`flex items-center gap-4 px-6 py-3 rounded border-l-4 cursor-pointer transition-all hover:translate-x-1 active:scale-95
                    ${activeEvent?.id === event.id 
                      ? 'bg-white/10 ring-1 ring-white/20' 
                      : event.type === 'GOAL' ? 'bg-[#c5a059]/10' : 'bg-white/5'
                    }
                  `}
                  style={{ borderLeftColor: event.color }}
                >
                  <span className="text-sm font-black italic w-10" style={{ color: event.color }}>{event.time}</span>
                  {event.type === 'GOAL' ? (
                     <svg className="w-5 h-5" fill={event.color} viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    </svg>
                  ) : (
                    <span className="w-3 h-5 rounded-sm" style={{ backgroundColor: event.color }}></span>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{event.description}</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">Click to Replay</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Branding */}
      <footer className="h-8 bg-[#050b18] border-t border-white/5 flex items-center justify-between px-6">
        <p className="text-[9px] font-bold text-gray-600 tracking-[0.3em] uppercase">K-LEAGUE LIVE ANALYTICS HUB v4.0</p>
        <div className="flex gap-4">
           <span className="text-[9px] font-bold text-gray-500">TERMS</span>
           <span className="text-[9px] font-bold text-[#c5a059] animate-pulse uppercase tracking-widest">Active Data Feed</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
