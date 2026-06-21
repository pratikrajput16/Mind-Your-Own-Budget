"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { userProfile, categoryBreakdown, budgets } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Send,
  Sparkles,
  User,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "How can I save more money?",
  "Where am I overspending?",
  "What investments should I consider?",
  "How is my financial health?",
]

// Simulated AI responses based on user data
function generateAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  const totalExpenses = categoryBreakdown.reduce((sum, c) => c.name !== 'Savings' ? sum + c.value : sum, 0)
  const foodSpending = categoryBreakdown.find(c => c.name === 'Food')?.value || 0
  const housingSpending = categoryBreakdown.find(c => c.name === 'Housing')?.value || 0

  if (message.includes('save') || message.includes('saving')) {
    return `Great question! Based on your current spending patterns, here are some personalized tips to boost your savings:

1. **Food expenses**: You're spending $${foodSpending.toFixed(2)} on food. Consider meal prepping on weekends - this could save you $100-150/month on takeout and dining.

2. **Subscription audit**: I noticed you have entertainment subscriptions totaling ~$27/month. Review if you're using all of them actively.

3. **Automate your savings**: Since you're already saving ${userProfile.savingsRate}% of your income, try increasing it by just 2% - you likely won't notice the difference day-to-day.

4. **Round-up savings**: Consider using apps that round up your purchases and save the difference.

Your current savings rate is excellent at ${userProfile.savingsRate}%, but these small changes could add an extra $200-300/month to your savings!`
  }

  if (message.includes('overspend') || message.includes('spending')) {
    return `I've analyzed your spending patterns, and here's what I found:

**Areas to Watch:**
- **Food**: $${foodSpending.toFixed(2)} this month (${((foodSpending / (userProfile.monthlyIncome + 1200)) * 100).toFixed(1)}% of income)
  - This is slightly higher than the recommended 10-12%
  - Tip: Track individual food purchases to identify patterns

**You're Doing Great With:**
- **Housing**: $${housingSpending.toFixed(2)} (${((housingSpending / (userProfile.monthlyIncome + 1200)) * 100).toFixed(1)}% of income)
  - Well within the recommended 28% threshold!
  
- **Transportation**: Your transportation costs are very efficient

Overall, your spending is well-managed! The main opportunity for improvement is in the food category. Would you like specific meal planning tips?`
  }

  if (message.includes('invest') || message.includes('investment')) {
    return `Based on your financial profile, here are my investment recommendations:

**Your Investment Readiness:**
- Monthly surplus: $${userProfile.monthlySavings.toLocaleString()}
- Risk tolerance: Moderate (based on your ${userProfile.savingsRate}% savings rate)

**Recommended Strategy:**

1. **Emergency Fund First** (if not complete)
   - Target: 6 months of expenses (~$${(totalExpenses * 6).toLocaleString()})
   - Vehicle: High-yield savings account (4-5% APY)

2. **Retirement Accounts**
   - Max out employer 401(k) match first (free money!)
   - Consider Roth IRA for tax-free growth

3. **Taxable Investments**
   - Low-cost S&P 500 index fund (60%)
   - Total bond market fund (25%)
   - International stocks (15%)

**Starting Point:**
With your $${userProfile.monthlySavings.toLocaleString()}/month surplus, I'd suggest:
- $500 → Emergency fund (until 6-month goal met)
- $1,000 → Retirement accounts
- $625 → Index fund investments

Would you like more details on any of these options?`
  }

  if (message.includes('health') || message.includes('score') || message.includes('status')) {
    return `Let me give you a comprehensive view of your financial health:

**Overall Score: 85/100** - Excellent!

**Strengths:**
✓ Savings rate of ${userProfile.savingsRate}% (above the 20% target)
✓ Housing costs well under 30% of income
✓ Positive cash flow each month
✓ Total balance of $${userProfile.totalBalance.toLocaleString()}

**Areas for Growth:**
- Building a larger emergency fund
- Increasing investment contributions
- Optimizing food expenses

**Comparison:**
You're in the top 15% of savers in your income bracket! Your disciplined approach to money is paying off.

**Next Milestones:**
1. 6-month emergency fund: ~$${(totalExpenses * 6).toLocaleString()}
2. First $100k invested
3. Bump savings rate to 30%

Keep up the excellent work! Your financial habits are setting you up for long-term success.`
  }

  if (message.includes('budget') || message.includes('allocat')) {
    const monthlyIncome = userProfile.monthlyIncome + 1200
    return `Here's your personalized budget analysis using the 50/30/20 rule:

**Your Monthly Income:** $${monthlyIncome.toLocaleString()}

**Recommended Allocation:**
- **Needs (50%):** $${(monthlyIncome * 0.5).toLocaleString()}
  - Housing, utilities, food, transportation, insurance
  
- **Wants (30%):** $${(monthlyIncome * 0.3).toLocaleString()}
  - Entertainment, dining out, hobbies, subscriptions
  
- **Savings (20%):** $${(monthlyIncome * 0.2).toLocaleString()}
  - Emergency fund, investments, debt payoff

**Your Current Split:**
- Needs: ~$${(housingSpending + foodSpending + 97.30 + 205).toFixed(0)} (${(((housingSpending + foodSpending + 97.30 + 205) / monthlyIncome) * 100).toFixed(0)}%)
- Wants: ~$${(26.98 + 156.99).toFixed(0)} (${(((26.98 + 156.99) / monthlyIncome) * 100).toFixed(0)}%)
- Savings: $${userProfile.monthlySavings.toLocaleString()} (${userProfile.savingsRate}%)

**Verdict:** You're actually doing better than the 50/30/20 rule suggests! Your savings rate exceeds the recommended 20%. Great job!`
  }

  // Default response
  return `Thanks for your question! I'm your AI financial advisor, and I'm here to help you make smart money decisions.

Based on your profile, here's what I know:
- Monthly income: $${(userProfile.monthlyIncome + 1200).toLocaleString()}
- Savings rate: ${userProfile.savingsRate}%
- Total balance: $${userProfile.totalBalance.toLocaleString()}

I can help you with:
- **Saving strategies** - Tips to increase your savings
- **Spending analysis** - Find where you might be overspending
- **Investment advice** - Personalized investment recommendations
- **Budget planning** - Optimize your budget allocations
- **Financial health** - Overall assessment of your finances

What would you like to know more about?`
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi ${userProfile.name.split(' ')[0]}! I'm your AI financial advisor. I've analyzed your spending patterns and financial data. How can I help you today?\n\nYou can ask me about:\n- How to save more money\n- Where you might be overspending\n- Investment recommendations\n- Your overall financial health\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: String(Date.now()),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse: Message = {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: generateAIResponse(input),
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, aiResponse])
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      <Header
        title="AI Assistant"
        subtitle="Your personal financial advisor"
      />

      <div className="flex flex-1 flex-col p-6">
        <Card className="flex flex-1 flex-col border-border/50 shadow-sm">
          {/* Chat Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' && "flex-row-reverse"
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={cn(
                      message.role === 'assistant'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}>
                      {message.role === 'assistant' ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === 'assistant'
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <p className={cn(
                      "mt-1 text-xs",
                      message.role === 'assistant' ? "text-muted-foreground" : "text-primary-foreground/70"
                    )}>
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Analyzing your data...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="border-t border-border/50 px-4 py-3">
              <p className="mb-2 text-xs text-muted-foreground">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border/50 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your finances..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
