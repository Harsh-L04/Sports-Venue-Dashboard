import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}


export function KPICard({ title, value, icon: Icon, iconColor = "text-primary" }: KPICardProps) {
  return (
    <div className="dashboard-card flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-card-foreground">{value}</p>
      </div>
      <div className={`p-2 rounded-lg bg-muted ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
