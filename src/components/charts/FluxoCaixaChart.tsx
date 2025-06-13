
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { mes: 'Jan', receitas: 28400, despesas: 8200, saldo: 20200 },
  { mes: 'Fev', receitas: 31200, despesas: 9100, saldo: 22100 },
  { mes: 'Mar', receitas: 29800, despesas: 7800, saldo: 22000 },
  { mes: 'Abr', receitas: 33600, despesas: 10200, saldo: 23400 },
  { mes: 'Mai', receitas: 35200, despesas: 11500, saldo: 23700 },
  { mes: 'Jun', receitas: 32800, despesas: 9800, saldo: 23000 },
];

export const FluxoCaixaChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
        <Legend />
        <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} name="Receitas" />
        <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} name="Despesas" />
        <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={3} name="Saldo" />
      </LineChart>
    </ResponsiveContainer>
  );
};
