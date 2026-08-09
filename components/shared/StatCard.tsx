import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  variant?: "primary" | "emerald" | "amber" | "purple" | "blue";
  href?: string;
  trend?: string;
}

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  variant = "primary",
  href,
  trend,
}: StatCardProps) {
  const content = (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/40",
      href && "cursor-pointer"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{value}</p>
              {trend && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {trend}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl border shrink-0", colorMap[variant])}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
