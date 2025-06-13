
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', receitas: 28400, despesas: 15200, liquido: 13200 },
  { mes: 'Fev', receitas: 31200, despesas: 16800, liquido: 14400 },
  { mes: 'Mar', receitas: 29800, despesas: 14500, liquido: 15300 },
  { mes: 'Abr', receitas: 33600, despesas: 17200, liquido: 16400 },
  { mes: 'Mai', receitas: 35200, despesas: 18000, liquido: 17200 },
  { mes: 'Jun', receitas: 32800, despesas: 16500, liquido: 16300 },
];

export const FluxoCaixaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
        <Legend />
        <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} name="Receitas" />
        <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} name="Despesas" />
        <Line type="monotone" dataKey="liquido" stroke="#3b82f6" strokeWidth={2} name="Líquido" />
      </LineChart>
    </ResponsiveContainer>
  );
};
