'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  color?: string;
  isLoading?: boolean;
}

export default function MetricsCard({
  title,
  value,
  description,
  change,
  trend = 'neutral',
  icon,
  color = 'blue',
  isLoading = false
}: MetricsCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100'
  };

  const trendIcons = {
    up: <TrendingUp className="w-3 h-3" />,
    down: <TrendingDown className="w-3 h-3" />,
    neutral: <Minus className="w-3 h-3" />
  };

  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    indigo: 'from-indigo-500 to-blue-500',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          {icon && (
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center`}>
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold mb-2">{value}</div>
            {(change !== undefined || description) && (
              <div className="flex items-center justify-between">
                {change !== undefined && (
                  <Badge className={cn("flex items-center gap-1", trendColors[trend])}>
                    {trendIcons[trend]}
                    {Math.abs(change)}%
                  </Badge>
                )}
                {description && (
                  <CardDescription className="text-sm">
                    {description}
                  </CardDescription>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}