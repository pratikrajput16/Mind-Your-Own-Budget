"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { budgets, userProfile, generateBudgetRecommendation } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Edit2,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  PiggyBank,
  Home,
  Utensils,
  Car,
  Tv,
  Zap,
  ShoppingBag,
  Heart,
} from "lucide-react"

const categoryIcons: Record<string, React.ElementType> = {
  Housing: Home,
  Food: Utensils,
  Transportation: Car,
  Entertainment: Tv,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Health: Heart,
  Savings: PiggyBank,
}

const categoryColors: Record<string, string> = {
  Housing: "text-chart-1",
  Food: "text-chart-2",
  Transportation: "text-chart-3",
  Entertainment: "text-chart-4",
  Utilities: "text-chart-5",
  Shopping: "text-primary",
  Health: "text-accent",
  Savings: "text-accent",
}

interface BudgetItem {
  id: string
  category: string
  allocated: number
  spent: number
  color: string
}

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(budgets)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const monthlyIncome = userProfile.monthlyIncome + 1200
  const aiRecommendations = generateBudgetRecommendation(monthlyIncome)

  const totalAllocated = budgetItems.reduce((sum, b) => sum + b.allocated, 0)
  const totalSpent = budgetItems.reduce((sum, b) => sum + b.spent, 0)
  const remainingBudget = totalAllocated - totalSpent

  const handleEdit = (id: string, currentValue: number) => {
    setEditingId(id)
    setEditValue(currentValue.toString())
  }

  const handleSave = (id: string) => {
    setBudgetItems(items =>
      items.map(item =>
        item.id === id ? { ...item, allocated: parseFloat(editValue) || item.allocated } : item
      )
    )
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue("")
  }

  const applyAiRecommendations = () => {
    const recommendedBudgets: Record<string, number> = {
      Housing: aiRecommendations.housing,
      Food: aiRecommendations.food,
      Transportation: aiRecommendations.transportation,
      Utilities: aiRecommendations.utilities,
      Health: aiRecommendations.healthcare,
      Entertainment: aiRecommendations.entertainment,
      Shopping: aiRecommendations.other / 2,
      Savings: aiRecommendations.savings,
    }

    setBudgetItems(items =>
      items.map(item => ({
        ...item,
        allocated: recommendedBudgets[item.category] || item.allocated,
      }))
    )
  }

  return (
    <div className="flex flex-col">
      <Header
        title="Budget Planner"
        subtitle="Manage your monthly budget allocations"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* AI Budget Assistant */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Budget Optimization</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on your income of ${monthlyIncome.toLocaleString()}/month, I have calculated 
                    optimal budget allocations following the 50/30/20 rule.
                  </p>
                </div>
              </div>
              <Button onClick={applyAiRecommendations} className="shrink-0">
                <Sparkles className="mr-2 h-4 w-4" />
                Apply AI Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-xl font-bold">${totalAllocated.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-5/10">
                  <AlertTriangle className="h-5 w-5 text-chart-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <PiggyBank className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={cn(
                    "text-xl font-bold",
                    remainingBudget >= 0 ? "text-accent" : "text-destructive"
                  )}>
                    ${remainingBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Budget Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-4">
              {budgetItems.map((budget) => {
                const percentage = Math.min((budget.spent / budget.allocated) * 100, 100)
                const isOverBudget = budget.spent > budget.allocated
                const IconComponent = categoryIcons[budget.category] || PiggyBank
                const colorClass = categoryColors[budget.category] || "text-muted-foreground"
                const remaining = budget.allocated - budget.spent

                return (
                  <div
                    key={budget.id}
                    className="rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          budget.category === 'Savings' ? "bg-accent/10" : "bg-muted"
                        )}>
                          <IconComponent className={cn("h-5 w-5", colorClass)} />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{budget.category}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${budget.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })} of ${budget.allocated.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isOverBudget && (
                          <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive">
                            Over Budget
                          </Badge>
                        )}
                        {editingId === budget.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="h-8 w-24"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-accent"
                              onClick={() => handleSave(budget.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={handleCancel}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEdit(budget.id, budget.allocated)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress
                        value={percentage}
                        className={cn(
                          "h-2",
                          isOverBudget && "[&>div]:bg-destructive",
                          budget.category === 'Savings' && "[&>div]:bg-accent"
                        )}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{percentage.toFixed(0)}% used</span>
                        <span className={cn(
                          remaining >= 0 ? "text-muted-foreground" : "text-destructive"
                        )}>
                          {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations Preview */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">AI Recommended Allocations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="mb-4 text-sm text-muted-foreground">
              Based on the 50/30/20 budgeting rule and your income, here are the recommended allocations:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(aiRecommendations).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground capitalize">{key}</p>
                  <p className="text-lg font-semibold">${Math.round(value).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
