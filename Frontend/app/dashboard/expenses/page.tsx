"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "@/lib/expenses";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: string;
}

import { cn } from "@/lib/utils";
import {
  Plus,
  ArrowDownRight,
  Search,
  Filter,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const categories = [
  "Cloud Services",
  "Equipment",
  "Food",
  "Internet",
  "Marketing",
  "Office Rent",
  "Software",
  "Utilities",
];

const categoryColors: Record<string, string> = {
  "Cloud Services": "bg-blue-100 text-blue-700",
  Equipment: "bg-purple-100 text-purple-700",
  Internet: "bg-cyan-100 text-cyan-700",
  Marketing: "bg-orange-100 text-orange-700",
  "Office Rent": "bg-pink-100 text-pink-700",
  Software: "bg-green-100 text-green-700",
};

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-primary)",
  "var(--color-accent)",
];

export default function ExpensesPage() {
  const [allTransactions, setAllTransactions] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [editingExpense, setEditingExpense] = useState<any>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();

      setAllTransactions(data.expenses);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTransactions = allTransactions.filter((t) => {
    const matchesCategory =
      filterCategory === "all" || t.category === filterCategory;

    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddExpense = async () => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, {
          title: newExpense.description,
          amount: Number(newExpense.amount),
          category: newExpense.category,
          paymentMethod: editingExpense.paymentMethod,
          description: newExpense.description,
          date: editingExpense.date,
        });
      } else {
        await createExpense({
          title: newExpense.description,
          amount: Number(newExpense.amount),
          category: newExpense.category,
          paymentMethod: "UPI",
          description: newExpense.description,
          date: new Date(),
        });
      }

      await fetchExpenses();

      setEditingExpense(null);

      setNewExpense({
        description: "",
        amount: "",
        category: "",
      });

      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);

      await fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);

    setNewExpense({
      description: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
    });

    setIsDialogOpen(true);
  };

  // Calculate category breakdown for pie chart
  const expensesByCategory = allTransactions.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));

  const totalExpenses = allTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex flex-col">
      <Header
        title="Expense Tracker"
        subtitle="Track and manage your expenses"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </span>
                <span className="text-2xl font-bold text-accent">
                  ₹
                  {totalExpenses.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </span>

                <span className="text-2xl font-bold">
                  {allTransactions.length}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Average Expense
                </span>
                <span className="text-2xl font-bold text-primary">
                  ₹
                  {(
                    totalExpenses / (allTransactions.length || 1)
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pie Chart */}
          <Card className="border-border/50 shadow-sm lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [
                        `₹${value.toFixed(2)}`,
                        "",
                      ]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs text-muted-foreground">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="border-border/50 shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">
                All Transactions
              </CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingExpense ? "Edit Expense" : "Add Expense"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="e.g., Coffee Shop"
                        value={newExpense.description}
                        onChange={(e) =>
                          setNewExpense({
                            ...newExpense,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) =>
                          setNewExpense({
                            ...newExpense,
                            amount: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={newExpense.category}
                        onValueChange={(value) =>
                          setNewExpense({ ...newExpense, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddExpense} className="mt-2">
                      {editingExpense ? "Update Expense" : "Save Expense"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Filters */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transactions */}
              <div className="flex max-h-100 flex-col gap-2 overflow-y-auto">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between rounded-lg bg-muted/30 px-5 py-4 hover:bg-muted/50 transition"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-8">
                      <Badge
                        variant="outline"
                        className={cn(categoryColors[transaction.category])}
                      >
                        {transaction.category}
                      </Badge>

                      <span className="w-36 text-right font-semibold tabular-nums">
                        -₹
                        {transaction.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>

                      <div className="flex items-center gap-3">
                        <Pencil
                          className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditExpense(transaction)}
                        />

                        <Trash2
                          className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteExpense(transaction._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
