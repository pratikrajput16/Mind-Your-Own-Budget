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
import { userProfile, insights } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const monthlyIncome = userProfile.monthlyIncome + 1200;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${userProfile.name.split(" ")[0]}`}
      />

      <div className="flex flex-col gap-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={`$${userProfile.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            change={{ value: 12.5, type: "increase" }}
            iconName="wallet"
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatCard
            title="Monthly Income"
            value={`$${monthlyIncome.toLocaleString()}`}
            change={{ value: 8.2, type: "increase" }}
            iconName="trending-up"
            iconColor="text-accent"
            iconBgColor="bg-accent/10"
          />
          <StatCard
            title="Monthly Expenses"
            value={`₹${dashboard.totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            change={{ value: 3.1, type: "decrease" }}
            iconName="target"
            iconColor="text-chart-5"
            iconBgColor="bg-chart-5/10"
          />
          <StatCard
            title="Savings Rate"
            value={`${userProfile.savingsRate}%`}
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
              {insights.slice(0, 2).map((insight) => (
                <InsightCard key={insight.id} insight={insight} compact />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Health Score */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IncomeExpenseChart />
          </div>
          <div className="flex flex-col gap-6">
            <HealthScore />
            <CategoryPieChart />
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
}
