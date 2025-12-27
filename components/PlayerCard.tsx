
import React from 'react';
import { Player } from '../types';
import { COLORS } from '../constants';
import RadarChart from './RadarChart';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="flex flex-col h-full bg-[#0a1428] overflow-y-auto no-scrollbar">
      {/* Team & Logo Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-[#0a1428] to-[#12203a] shrink-0">
        <div className="flex items-center gap-3">
          <img src={player.teamLogo} alt={player.team} className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{player.team}</span>
        </div>
        <div className="px-1.5 py-0.5 bg-[#c5a059] text-[#050b18] text-[8px] font-black rounded italic">
          ACTIVE
        </div>
      </div>

      {/* Profile Section - Reduced height */}
      <div className="relative group overflow-hidden shrink-0">
        <img 
          src={player.photoUrl} 
          alt={player.name} 
          className="w-full h-48 object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1428] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-2 left-6">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-[#c5a059] italic leading-none">{player.number}</span>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{player.position}</span>
              <h2 className="text-xl font-black tracking-tighter text-white uppercase">{player.name}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Hexagon Stats - Compact */}
      <div className="px-6 py-4 shrink-0">
        <h3 className="text-[10px] font-bold text-[#c5a059] mb-1 uppercase tracking-widest border-l-2 border-[#c5a059] pl-2">
          Core Metrics
        </h3>
        <div className="scale-75 -mt-8 -mb-8 origin-center">
           <RadarChart data={player.stats} />
        </div>
      </div>

      {/* Preferred Plays */}
      <div className="px-6 py-4 mt-auto border-t border-white/5 bg-[#081122]/50">
        <h3 className="text-[10px] font-bold text-[#c5a059] mb-3 uppercase tracking-widest">Key Traits</h3>
        <ul className="space-y-2">
          {player.preferredPlays.map((play, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-1 w-1 h-1 rounded-full bg-[#c5a059] shadow-[0_0_4px_#c5a059]"></div>
              <span className="text-[11px] text-gray-300 font-medium leading-tight">{play}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerCard;
