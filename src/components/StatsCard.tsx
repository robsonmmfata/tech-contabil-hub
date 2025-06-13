
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  color = 'blue' 
}: StatsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-sm mt-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
