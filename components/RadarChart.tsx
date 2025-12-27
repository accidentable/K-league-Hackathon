
import React from 'react';
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { PlayerStats } from '../types';
import { COLORS } from '../constants';

interface RadarChartProps {
  data: PlayerStats[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 mt-4 relative">
      <ResponsiveContainer width="100%" height="100%">
        <ReRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: COLORS.GRAY, fontSize: 12, fontWeight: 600 }}
          />
          <Radar
            name="Player"
            dataKey="value"
            stroke={COLORS.GOLD}
            fill={COLORS.GOLD}
            fillOpacity={0.6}
          />
        </ReRadarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
         <div className="w-32 h-32 border border-gold-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default RadarChart;
