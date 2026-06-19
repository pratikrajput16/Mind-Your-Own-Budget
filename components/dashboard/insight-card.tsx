"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Trophy,
  Lightbulb,
  Info,
  Home,
  TrendingUp,
} from "lucide-react"
import type { Insight } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  'alert-triangle': AlertTriangle,
  'trophy': Trophy,
  'lightbulb': Lightbulb,
  'info': Info,
  'home': Home,
  'trending-up': TrendingUp,
}

const typeStyles: Record<Insight['type'], { bg: string; border: string; icon: string }> = {
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: "text-warning",
  },
  success: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
  },
  tip: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
  },
  info: {
    bg: "bg-muted",
    border: "border-border",
    icon: "text-muted-foreground",
  },
}

interface InsightCardProps {
  insight: Insight
  compact?: boolean
}

export function InsightCard({ insight, compact = false }: InsightCardProps) {
  const IconComponent = iconMap[insight.icon] || Info
  const styles = typeStyles[insight.type]

  return (
    <Card
      className={cn(
        "border transition-all hover:shadow-md",
        styles.border,
        styles.bg
      )}
    >
      <CardContent className={cn("flex gap-4", compact ? "p-4" : "p-5")}>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            insight.type === 'warning' && "bg-warning/20",
            insight.type === 'success' && "bg-accent/20",
            insight.type === 'tip' && "bg-primary/20",
            insight.type === 'info' && "bg-muted-foreground/20"
          )}
        >
          <IconComponent className={cn("h-5 w-5", styles.icon)} />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-card-foreground">{insight.title}</h4>
          <p className={cn("text-muted-foreground", compact ? "text-sm" : "text-sm leading-relaxed")}>
            {insight.description}
          </p>
          {insight.savings && (
            <p className="mt-1 text-sm font-medium text-accent">
              Potential savings: ${insight.savings}/month
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
