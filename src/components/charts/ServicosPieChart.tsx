
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'DAS', value: 35, color: '#3b82f6' },
  { name: 'IRPJ', value: 25, color: '#10b981' },
  { name: 'Folha', value: 20, color: '#f59e0b' },
  { name: 'Obrigações', value: 15, color: '#ef4444' },
  { name: 'Outros', value: 5, color: '#8b5cf6' },
];

export const ServicosPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
