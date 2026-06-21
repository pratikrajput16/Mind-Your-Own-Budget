"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { insights, userProfile, categoryBreakdown, budgets } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Trophy,
  Lightbulb,
  Info,
  Home,
  TrendingUp,
  Sparkles,
  ArrowRight,
  DollarSign,
  Target,
  PiggyBank,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const iconMap: Record<string, React.ElementType> = {
  'alert-triangle': AlertTriangle,
  'trophy': Trophy,
  'lightbulb': Lightbulb,
  'info': Info,
  'home': Home,
  'trending-up': TrendingUp,
}

const typeStyles = {
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    icon: "text-warning",
    badge: "bg-warning/20 text-warning border-warning/30",
  },
  success: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
    badge: "bg-accent/20 text-accent border-accent/30",
  },
  tip: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
    badge: "bg-primary/20 text-primary border-primary/30",
  },
  info: {
    bg: "bg-muted",
    border: "border-border",
    icon: "text-muted-foreground",
    badge: "bg-muted text-muted-foreground border-border",
  },
}

export default function InsightsPage() {
  // Generate additional AI insights based on spending patterns
  const foodSpending = categoryBreakdown.find(c => c.name === 'Food')?.value || 0
  const housingSpending = categoryBreakdown.find(c => c.name === 'Housing')?.value || 0
  const monthlyIncome = userProfile.monthlyIncome + 1200

  const spendingAnalysis = [
    {
      category: "Food",
      current: foodSpending,
      recommended: monthlyIncome * 0.12,
      status: foodSpending > monthlyIncome * 0.12 ? 'over' : 'under',
    },
    {
      category: "Housing",
      current: housingSpending,
      recommended: monthlyIncome * 0.28,
      status: housingSpending > monthlyIncome * 0.28 ? 'over' : 'under',
    },
    {
      category: "Transportation",
      current: 97.30,
      recommended: monthlyIncome * 0.10,
      status: 'under',
    },
    {
      category: "Entertainment",
      current: 26.98,
      recommended: monthlyIncome * 0.05,
      status: 'under',
    },
  ]

  const totalPotentialSavings = insights
    .filter(i => i.savings)
    .reduce((sum, i) => sum + (i.savings || 0), 0)

  return (
    <div className="flex flex-col">
      <Header
        title="AI Insights"
        subtitle="Smart recommendations powered by AI"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* AI Summary Card */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Your Financial Overview</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  Great job! Your savings rate of <span className="font-semibold text-accent">{userProfile.savingsRate}%</span> is 
                  above the recommended 20%. Based on your spending patterns, I have identified{" "}
                  <span className="font-semibold text-primary">{insights.length} insights</span> and 
                  potential savings of <span className="font-semibold text-accent">${totalPotentialSavings}/month</span>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    <Trophy className="mr-1 h-3 w-3" />
                    Top 15% Savers
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Target className="mr-1 h-3 w-3" />
                    On Track for Goals
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-accent/20 bg-accent/5 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>
                <p className="text-2xl font-bold text-accent">${totalPotentialSavings}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Insights</p>
                <p className="text-2xl font-bold text-primary">{insights.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-chart-2/20 bg-chart-2/5 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-chart-2/20">
                <PiggyBank className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yearly Projection</p>
                <p className="text-2xl font-bold text-chart-2">${totalPotentialSavings * 12}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Detailed Insights */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
            {insights.map((insight) => {
              const IconComponent = iconMap[insight.icon] || Info
              const styles = typeStyles[insight.type]

              return (
                <Card
                  key={insight.id}
                  className={cn("border transition-all hover:shadow-md", styles.border, styles.bg)}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
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
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-card-foreground">{insight.title}</h4>
                          <Badge variant="outline" className={styles.badge}>
                            {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {insight.description}
                        </p>
                        {insight.savings && (
                          <div className="mt-3 flex items-center gap-2">
                            <Badge className="bg-accent text-accent-foreground">
                              Save ${insight.savings}/month
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-7 text-primary">
                              Learn More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Spending Analysis */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Spending Analysis</h3>
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Budget vs Recommended</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-0">
                {spendingAnalysis.map((item) => {
                  const percentage = Math.min((item.current / item.recommended) * 100, 150)
                  const isOver = item.status === 'over'

                  return (
                    <div key={item.category} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className={cn(
                          "text-sm",
                          isOver ? "text-warning" : "text-accent"
                        )}>
                          ${item.current.toFixed(0)} / ${item.recommended.toFixed(0)}
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className={cn(
                          "h-2",
                          isOver && "[&>div]:bg-warning"
                        )}
                      />
                      <span className={cn(
                        "text-xs",
                        isOver ? "text-warning" : "text-muted-foreground"
                      )}>
                        {isOver 
                          ? `${(percentage - 100).toFixed(0)}% over recommended` 
                          : `${(100 - percentage).toFixed(0)}% under budget`}
                      </span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* AI Tips Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Consider automating your savings - set up automatic transfers on payday
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Your emergency fund could cover 4.2 months of expenses - aim for 6 months
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Review your subscriptions quarterly to eliminate unused services
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    With your surplus, consider contributing to a retirement account
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Want personalized advice?</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Chat with our AI assistant for detailed financial guidance
                  </p>
                </div>
                <Link href="/dashboard/chat">
                  <Button>
                    Start Chat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
