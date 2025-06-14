
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ReceitasMensaisChartProps = {
  data: { mes: string; valor: number }[];
};

export const ReceitasMensaisChart = ({ data }: ReceitasMensaisChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
        <Bar dataKey="valor" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};
