"use client";

import {
  Brain,
  TrendingUp,
  Lightbulb,
  Sparkles,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeExpenses } from "@/lib/ai";

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await analyzeExpenses();
        setAnalysis(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium">
          Analyzing your startup finances...
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Unable to load AI analysis.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header
        title="AI Financial Insights"
        subtitle="AI-powered analysis of your startup expenses"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-red-500" />
                Total Expenses
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-red-500">
                ₹{analysis.summary.totalExpenses.toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Transactions
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {analysis.summary.transactions}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Average Expense
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold text-blue-500">
                ₹
                {analysis.summary.averageExpense.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Highest & Lowest Expense Categories */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-red-200 shadow-sm transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-red-500" />
                Highest Expense
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-xl font-semibold">
                {analysis.highestCategory.category}
              </p>

              <p className="mt-2 text-3xl font-bold text-red-500">
                ₹{analysis.highestCategory.amount.toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-sm transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownRight className="h-5 w-5 text-green-500" />
                Lowest Expense
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-xl font-semibold">
                {analysis.lowestCategory.category}
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                ₹{analysis.lowestCategory.amount.toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expense Trends */}
        <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Expense Trends</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {analysis.trends.map((trend: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{trend.category}</h3>

                    <span
                      className="
rounded-full
bg-red-100
px-3
py-1
text-xs
font-semibold
text-red-600
"
                    >
                      Increasing
                    </span>
                  </div>

                  <p className="mt-4 text-3xl font-bold">{trend.change}</p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Compared to the previous period
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map(
                (recommendation: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      ✔
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {recommendation}
                    </p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Smart Suggestions */}
        <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {analysis.smartSuggestions.map(
                (suggestion: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
                  >
                    <div className="flex gap-3">
                      <span className="text-xl">💡</span>

                      <p className="leading-6 text-muted-foreground">
                        {suggestion}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Expense Forecast */}
        <Card className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Expense Forecast
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Current Month</p>

                <p className="mt-2 text-xl font-bold">
                  {analysis.forecast.currentMonth}
                </p>
              </div>

              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  Current Spending
                </p>

                <p className="mt-2 text-xl font-bold">
                  ₹{analysis.forecast.currentTotal.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-muted-foreground">
                  Predicted Next Month
                </p>

                <p className="mt-2 text-xl font-bold text-blue-600">
                  ₹
                  {analysis.forecast.predictedNextMonth.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-muted-foreground">
                  Expected Increase
                </p>

                <p className="mt-2 text-xl font-bold text-red-600">
                  +₹{analysis.forecast.expectedChange.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Financial Advisor */}
        <Card
          className="
border-primary/30
bg-linear-to-br
from-primary/10
via-background
to-background
shadow-xl
"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Brain className="h-6 w-6" />
              AI Financial Advisor
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {analysis.llmAdvice
                .replace(
                  "Here are 5 practical financial suggestions for your startup:",
                  "",
                )
                .split(/\n\s*\n/)
                .filter((section: string) => section.trim() !== "")
                .map((section: string, index: number) => {
                  const lines = section.split("\n");

                  const title = lines[0];

                  const body = lines.slice(1).join(" ");

                  return (
                    <div
                      key={index}
                      className="
              rounded-xl
              border
              border-border/50
              bg-background
              p-5
              transition-all
              duration-300
              hover:shadow-md
            "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                  font-bold
                "
                        >
                          {index + 1}
                        </div>

                        <h3 className="font-semibold text-lg">{title}</h3>
                      </div>

                      {body && (
                        <p className="mt-4 leading-7 text-muted-foreground">
                          {body}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
