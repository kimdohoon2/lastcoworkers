import React from 'react';
import { PieChart, Pie } from 'recharts';

interface ProgressChartProps {
  completionPercentage: number;
}

export default function ProgressChart({
  completionPercentage,
}: ProgressChartProps) {
  return (
    <PieChart width={140} height={140}>
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#A3E635" />
        </linearGradient>
      </defs>
      <Pie
        data={[{ name: 'Background', value: 100 }]}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        startAngle={270}
        endAngle={-90}
        fill="#334155"
        stroke="none"
      />
      <Pie
        data={[{ name: 'Completed', value: completionPercentage }]}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        startAngle={270}
        endAngle={270 + (completionPercentage * 360) / 100}
        fill="url(#progressGradient)"
        cornerRadius={24}
        stroke="none"
      />
      <text
        x="50%"
        y="44%"
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
        fill="#F8FAFC"
      >
        오늘
      </text>
      <text
        x="52%"
        y="60%"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="url(#progressGradient)"
      >
        {completionPercentage.toFixed(0)}%
      </text>
    </PieChart>
  );
}
