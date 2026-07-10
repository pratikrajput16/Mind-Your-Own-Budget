"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const categoryColors: Record<string, string> = {
  Income: "bg-accent/10 text-accent border-accent/20",
  Housing: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Food: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Transportation: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Entertainment: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Utilities: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Shopping: "bg-primary/10 text-primary border-primary/20",
  Health: "bg-accent/10 text-accent border-accent/20",
};

interface RecentExpense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: RecentExpense[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Recent Transactions
        </CardTitle>
        <Link href="/dashboard/expenses">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    false ? "bg-accent/10" : "bg-muted",
                  )}
                >
                  {false ? (
                    <ArrowUpRight className="h-4 w-4 text-accent" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {transaction.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-normal",
                    categoryColors[transaction.category] ||
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {transaction.category}
                </Badge>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    false ? "text-accent" : "text-foreground",
                  )}
                >
                  -₹
                  {transaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
