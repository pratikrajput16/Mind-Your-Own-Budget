"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Target } from "lucide-react"

type IconName = 'wallet' | 'trending-up' | 'piggy-bank' | 'target'

const iconMap = {
  'wallet': Wallet,
  'trending-up': TrendingUp,
  'piggy-bank': PiggyBank,
  'target': Target,
}

interface StatCardProps {
  title: string
  value: string
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  iconName: IconName
  iconColor?: string
  iconBgColor?: string
}

export function StatCard({
  title,
  value,
  change,
  iconName,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: StatCardProps) {
  const Icon = iconMap[iconName]
  return (
    <Card className="border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-2xl font-bold tracking-tight text-card-foreground">
              {value}
            </span>
            {change && (
              <div className="flex items-center gap-1 text-sm">
                {change.type === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-accent" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "font-medium",
                    change.type === 'increase' ? "text-accent" : "text-destructive"
                  )}
                >
                  {change.value}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn("rounded-lg p-3", iconBgColor)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
