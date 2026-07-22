"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/lib/dashboard";

import { Header } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import {
  IncomeExpenseChart,
  CategoryPieChart,
} from "@/components/dashboard/overview-charts";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { HealthScore } from "@/components/dashboard/health-score";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getAIInsights } from "@/lib/ai";

import { DashboardData } from "@/types/dashboard";
import { AIAnalysis } from "@/types/ai";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [aiData, setAiData] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);

        const ai = await getAIInsights();
        setAiData(ai);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard || !aiData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header
        title="Dashboard"
        subtitle="Here's your startup financial overview."
      />

      <div className="flex flex-col gap-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Expenses"
            value={`₹${dashboard.totalExpenses.toLocaleString()}`}
            change={{ value: 12.5, type: "increase" }}
            iconName="wallet"
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatCard
            title="Transactions"
            value={dashboard.totalTransactions.toString()}
            change={{ value: 8.2, type: "increase" }}
            iconName="trending-up"
            iconColor="text-accent"
            iconBgColor="bg-accent/10"
          />
          <StatCard
            title="Average Expense"
            value={`₹${dashboard.averageExpense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`}
            change={{ value: 3.1, type: "decrease" }}
            iconName="target"
            iconColor="text-chart-5"
            iconBgColor="bg-chart-5/10"
          />
          <StatCard
            title="Financial Health"
            value={`${dashboard.financialHealth.score}/100`}
            change={{ value: 2.3, type: "increase" }}
            iconName="piggy-bank"
            iconColor="text-chart-2"
            iconBgColor="bg-chart-2/10"
          />
        </div>

        {/* AI Insights Highlight */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle className="text-base font-semibold">
                AI Insights
              </CardTitle>
            </div>
            <Link href="/dashboard/insights">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-3 md:grid-cols-2">
              {aiData.smartSuggestions
                .slice(0, 2)
                .map((suggestion: string, index: number) => (
                  <InsightCard
                    key={index}
                    insight={{
                      id: index.toString(),
                      type: "tip",
                      title: "AI Recommendation",
                      description: suggestion,
                      icon: "lightbulb",
                    }}
                    compact
                  />
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Health Score */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IncomeExpenseChart monthlyTrend={dashboard.monthlyTrend} />
          </div>
          <div className="flex flex-col gap-6">
            <HealthScore
              score={dashboard.financialHealth.score}
              status={dashboard.financialHealth.status}
            />
            <CategoryPieChart categoryBreakdown={dashboard.categoryBreakdown} />
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={dashboard.recentExpenses} />
      </div>
    </div>
  );
}
