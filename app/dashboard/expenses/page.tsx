"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { transactions, type Transaction } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const categories = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Income",
]

const categoryColors: Record<string, string> = {
  Income: "bg-accent/10 text-accent border-accent/20",
  Housing: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Food: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Transportation: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Entertainment: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Utilities: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Shopping: "bg-primary/10 text-primary border-primary/20",
  Health: "bg-accent/10 text-accent border-accent/20",
}

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-primary)',
  'var(--color-accent)',
]

export default function ExpensesPage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(transactions)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense" as "expense" | "income",
  })

  const filteredTransactions = allTransactions.filter((t) => {
    const matchesCategory = filterCategory === "all" || t.category === filterCategory
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) return

    const transaction: Transaction = {
      id: String(allTransactions.length + 1),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
      type: newExpense.type,
    }

    setAllTransactions([transaction, ...allTransactions])
    setNewExpense({ description: "", amount: "", category: "", type: "expense" })
    setIsDialogOpen(false)
  }

  // Calculate category breakdown for pie chart
  const expensesByCategory = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }))

  const totalExpenses = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalIncome = allTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

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
                <span className="text-sm font-medium text-muted-foreground">Total Income</span>
                <span className="text-2xl font-bold text-accent">
                  +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
                <span className="text-2xl font-bold text-destructive">
                  -${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Net Balance</span>
                <span className={cn(
                  "text-2xl font-bold",
                  totalIncome - totalExpenses >= 0 ? "text-accent" : "text-destructive"
                )}>
                  ${(totalIncome - totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Pie Chart */}
          <Card className="border-border/50 shadow-sm lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-popover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="border-border/50 shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">All Transactions</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        placeholder="e.g., Coffee Shop"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={newExpense.category}
                        onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select
                        value={newExpense.type}
                        onValueChange={(value) => setNewExpense({ ...newExpense, type: value as "expense" | "income" })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddExpense} className="mt-2">
                      Add Transaction
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
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transactions */}
              <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
                          transaction.type === 'income' ? "bg-accent/10" : "bg-muted"
                        )}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-accent" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {transaction.description}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "hidden text-xs font-normal sm:flex",
                          categoryColors[transaction.category]
                        )}
                      >
                        {transaction.category}
                      </Badge>
                      <span
                        className={cn(
                          "text-sm font-semibold tabular-nums",
                          transaction.type === 'income' ? "text-accent" : "text-foreground"
                        )}
                      >
                        {transaction.type === 'income' ? '+' : '-'}$
                        {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
