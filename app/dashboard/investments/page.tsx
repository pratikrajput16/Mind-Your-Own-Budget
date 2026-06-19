"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { investments, userProfile } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  PiggyBank,
  BarChart3,
  Building2,
  Briefcase,
  LineChart,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

const investmentIcons: Record<string, React.ElementType> = {
  Savings: PiggyBank,
  Stocks: LineChart,
  Bonds: Shield,
  ETF: BarChart3,
  'Real Estate': Building2,
}

const riskColors = {
  low: {
    badge: "bg-accent/10 text-accent border-accent/20",
    text: "text-accent",
  },
  medium: {
    badge: "bg-warning/10 text-warning border-warning/20",
    text: "text-warning",
  },
  high: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    text: "text-destructive",
  },
}

export default function InvestmentsPage() {
  const monthlySurplus = userProfile.monthlySavings
  const yearlySurplus = monthlySurplus * 12
  const recommendedEmergencyFund = userProfile.monthlyIncome * 6

  // Determine user's risk profile based on savings rate
  const riskProfile = userProfile.savingsRate >= 25 ? 'moderate' : userProfile.savingsRate >= 15 ? 'conservative' : 'aggressive'

  return (
    <div className="flex flex-col">
      <Header
        title="Investment Suggestions"
        subtitle="AI-powered investment recommendations"
      />

      <div className="flex flex-col gap-6 p-6">
        {/* AI Investment Analysis */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Investment Analysis</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  Based on your savings of <span className="font-semibold text-accent">${monthlySurplus.toLocaleString()}/month</span>,
                  you have significant investment potential. Your risk profile suggests a{" "}
                  <span className="font-semibold text-primary">{riskProfile}</span> investment strategy.
                  Here are personalized recommendations to help grow your wealth.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    ${yearlySurplus.toLocaleString()} Yearly Potential
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {riskProfile.charAt(0).toUpperCase() + riskProfile.slice(1)} Risk Profile
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Available</p>
                  <p className="text-xl font-bold text-accent">${monthlySurplus.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projected 10Y Growth</p>
                  <p className="text-xl font-bold text-primary">${Math.round(yearlySurplus * 10 * 1.08).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <Shield className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Fund Goal</p>
                  <p className="text-xl font-bold">${recommendedEmergencyFund.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Recommendation */}
        <Card className="border-accent/20 bg-accent/5 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <CardTitle className="text-base font-semibold">Priority Recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Before investing, ensure you have a 6-month emergency fund. Based on your expenses, 
              this should be approximately <span className="font-semibold">${recommendedEmergencyFund.toLocaleString()}</span>.
              A high-yield savings account is the best place for this fund.
            </p>
          </CardContent>
        </Card>

        {/* Investment Options */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Recommended Investments</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investments.map((investment) => {
              const IconComponent = investmentIcons[investment.type] || TrendingUp
              const riskStyle = riskColors[investment.risk]

              return (
                <Card
                  key={investment.id}
                  className="border-border/50 shadow-sm transition-all hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-4 p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                        <IconComponent className="h-5 w-5 text-foreground" />
                      </div>
                      <Badge variant="outline" className={riskStyle.badge}>
                        {investment.risk.charAt(0).toUpperCase() + investment.risk.slice(1)} Risk
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground">{investment.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{investment.type}</p>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {investment.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Return</p>
                        <p className="font-semibold text-accent">{investment.expectedReturn}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Min. Investment</p>
                        <p className="font-semibold">
                          {investment.minAmount === 0 ? 'No minimum' : `$${investment.minAmount}`}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Investment Strategy Tips */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">AI Investment Strategy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium text-foreground">Suggested Allocation</h4>
                <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    60% - Index Funds (Long-term growth)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    25% - Bonds (Stability)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-chart-4" />
                    15% - High-Yield Savings (Liquidity)
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium text-foreground">Key Principles</h4>
                <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    Diversify across asset classes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    Invest consistently (dollar-cost averaging)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    Rebalance portfolio annually
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Need personalized investment advice?</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Chat with our AI assistant for detailed investment planning
              </p>
            </div>
            <Link href="/dashboard/chat">
              <Button>
                Get Investment Advice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
