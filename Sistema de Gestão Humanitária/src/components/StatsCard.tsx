import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <GlassCard variant="default" shine className="p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-white/90">{title}</h3>
        <div className="glass-button p-2 rounded-lg">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white drop-shadow-lg">{value}</div>
        {description && (
          <p className="text-xs text-white/70">{description}</p>
        )}
        {trend && (
          <p className="text-xs text-white/70">
            <span className={trend.value > 0 ? "text-green-300" : "text-red-300"}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>{" "}
            {trend.label}
          </p>
        )}
      </div>
    </GlassCard>
  );
}