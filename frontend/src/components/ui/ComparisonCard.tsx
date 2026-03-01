import { type ReactNode } from 'react'; 
import { clsx } from 'clsx';

interface ComparisonCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  trendValue?: string;
}

export function ComparisonCard({
  title,
  icon,
  children,
  className,
  trend,
  trendValue
}: ComparisonCardProps) {
  return (
    <div className={clsx(
      "bg-white rounded-xl shadow-sm border border-ivory-600 p-6",
      "hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-ivory-100 rounded-lg text-terracotta-500">
            {icon}
          </div>
          <h3 className="font-semibold text-navy-500">{title}</h3>
        </div>
        
        {trend && trendValue && (
          <span className={clsx(
            "text-sm font-medium px-2 py-1 rounded-full",
            trend === 'positive' && "bg-green-100 text-success",
            trend === 'negative' && "bg-red-100 text-warning",
            trend === 'neutral' && "bg-ivory-200 text-navy-400"
          )}>
            {trendValue}
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}