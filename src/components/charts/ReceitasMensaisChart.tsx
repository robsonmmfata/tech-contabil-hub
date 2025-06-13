
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', valor: 28400 },
  { mes: 'Fev', valor: 31200 },
  { mes: 'Mar', valor: 29800 },
  { mes: 'Abr', valor: 33600 },
  { mes: 'Mai', valor: 35200 },
  { mes: 'Jun', valor: 32800 },
];

export const ReceitasMensaisChart = () => {
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
