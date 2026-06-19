"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { healthScore } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function HealthScore() {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent"
    if (score >= 60) return "text-chart-4"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (healthScore / 100) * circumference

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Financial Health Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-0">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="-rotate-90 transform" width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="70"
              cy="70"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className={cn("transition-all duration-1000", getScoreColor(healthScore))}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={cn("text-3xl font-bold", getScoreColor(healthScore))}>
              {healthScore}
            </span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className={cn("text-sm font-semibold", getScoreColor(healthScore))}>
            {getScoreLabel(healthScore)}
          </span>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on your savings rate and spending habits
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
