
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, MatchEvent } from '../types';

interface PitchMapProps {
  players: Player[];
  selectedId: string;
  onSelectPlayer: (player: Player) => void;
  activeEvent: MatchEvent | null;
}

// 4-3-3 Formation Structure
// Coords: x (0-100 L->R), y (0-100 Top->Bottom)
// Assuming "Top" (y small) is Right Flank, "Bottom" (y large) is Left Flank
// Star Players: Ki(CDM: 42,50), Lee(RW: 80,20), Iljutcenko(ST: 88,50)
const GHOST_FORMATION = [
  { role: 'GK', x: 5, y: 50 },
  { role: 'RB', x: 25, y: 15 }, // Right Back (Top)
  { role: 'RCB', x: 22, y: 38 },
  { role: 'LCB', x: 22, y: 62 },
  { role: 'LB', x: 25, y: 85 }, // Left Back (Bottom)
  
  // Midfield Triangle
  // CDM is Ki (42, 50) - Real Player
  { role: 'RCM', x: 55, y: 30 },
  { role: 'LCM', x: 55, y: 70 },
  
  // Front 3
  // RW is Lee (80, 20) - Real Player
  // ST is Iljutcenko (88, 50) - Real Player
  { role: 'LW', x: 80, y: 80 }, // Left Wing
];

const PitchMap: React.FC<PitchMapProps> = ({ players, selectedId, onSelectPlayer, activeEvent }) => {
  const isOverlapping = (gx: number, gy: number) => {
    return players.some(p => {
      const distance = Math.hypot(p.x - gx, p.y - gy);
      return distance < 8; 
    });
  };

  return (
    <div className="w-full bg-[#0a1428] p-4 border-t border-[#c5a059]/30">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest flex items-center gap-2">
          {activeEvent ? (
            <>
              <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
              REPLAYING EVENT
            </>
          ) : (
            'Tactical Pitch View'
          )}
        </h3>
        <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest italic">SEOUL FC 4-3-3</span>
      </div>
      
      <div className="relative w-full aspect-[4/3] bg-[#1a2c4e] border border-white/5 rounded-lg overflow-hidden shadow-inner">
        {/* Pitch markings - Full Bleed */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        >
          {/* Grass stripes effect */}
          <defs>
            <pattern id="grass" x="0" y="0" width="10" height="100" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="100" fill="#ffffff" fillOpacity="0.05"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grass)" />

          {/* Lines */}
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="0.5" />
          
          {/* Penalty Areas */}
          <rect x="0" y="25" width="15" height="50" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="85" y="25" width="15" height="50" fill="none" stroke="white" strokeWidth="0.5" />
          
          {/* Goal Areas */}
          <rect x="0" y="40" width="5" height="20" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="95" y="40" width="5" height="20" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        {/* Formation Layer (Ghost Nodes) */}
        <div className={`transition-opacity duration-500 ${activeEvent ? 'opacity-0' : 'opacity-100'}`}>
           {GHOST_FORMATION.map((node, idx) => {
             if (isOverlapping(node.x, node.y)) return null;

             return (
               <div 
                 key={`ghost-${idx}`}
                 className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group"
                 style={{ left: `${node.x}%`, top: `${node.y}%` }}
               >
                 <div className="w-3 h-3 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                   <div className="w-0.5 h-0.5 bg-white/30 rounded-full"></div>
                 </div>
                 <span className="absolute top-full mt-1 text-[6px] font-bold text-gray-600 uppercase tracking-wider opacity-50">
                   {node.role}
                 </span>
               </div>
             );
           })}
        </div>

        {/* Real Player Nodes */}
        <div className={`transition-opacity duration-500 ${activeEvent ? 'opacity-30' : 'opacity-100'}`}>
          {players.map((player) => (
            <button
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-white/20 transition-all duration-300 flex items-center justify-center font-black text-[9px] shadow-lg z-10
                ${selectedId === player.id 
                  ? 'bg-[#c5a059] text-[#050b18] scale-125 shadow-[#c5a059]/50 z-20' 
                  : 'bg-[#0a1428] text-white hover:border-[#c5a059] hover:scale-110'
                }
              `}
            >
              {player.number}
            </button>
          ))}
        </div>

        {/* Event Animation Layer (원래대로) */}
        <AnimatePresence>
          {activeEvent && activeEvent.trajectory && (
            <div className="absolute inset-0 z-20 pointer-events-none">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                  <motion.path
                    d={`M ${activeEvent.trajectory.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                    fill="none"
                    stroke={activeEvent.color}
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                  <circle 
                    cx={activeEvent.trajectory[activeEvent.trajectory.length -1].x} 
                    cy={activeEvent.trajectory[activeEvent.trajectory.length -1].y} 
                    r="1.5" 
                    fill="none" 
                    stroke={activeEvent.color} 
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
               </svg>

               <motion.div
                  className="absolute w-3 h-3 rounded-full border border-white shadow-[0_0_10px_currentColor] flex items-center justify-center z-30"
                  style={{ 
                    backgroundColor: activeEvent.color, 
                    color: activeEvent.color,
                  }}
                  initial={{ 
                    left: `${activeEvent.trajectory[0].x}%`, 
                    top: `${activeEvent.trajectory[0].y}%`,
                    scale: 0 
                  }}
                  animate={{ 
                    left: activeEvent.trajectory.map(p => `${p.x}%`),
                    top: activeEvent.trajectory.map(p => `${p.y}%`),
                    scale: 1
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 5, 
                    ease: "easeInOut",
                    times: [0, 1] 
                  }}
               >
                 <div className="w-1 h-1 bg-[#050b18] rounded-full animate-ping" />
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#050b18]/90 border border-white/20 rounded backdrop-blur text-[7px] font-black uppercase tracking-widest text-white whitespace-nowrap"
               >
                 Replay
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PitchMap;
