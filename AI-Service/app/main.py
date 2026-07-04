import os

import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Mind Your Own Budget AI Service", version="1.0.0")


class ExpenseRequest(BaseModel):
    expenses: list


@app.get("/")
def home():
    return {"success": True, "message": "AI Service Running"}


@app.post("/analyze")
def analyze(data: ExpenseRequest):

    expenses = data.expenses

    total = sum(expense["amount"] for expense in expenses)

    transactions = len(expenses)

    average = 0

    if transactions > 0:
        average = round(total / transactions, 2)

    category_totals = {}

    for expense in expenses:
        category = expense["category"]

        if category not in category_totals:
            category_totals[category] = 0

        category_totals[category] += expense["amount"]

    monthly_data = {}

    for expense in expenses:

        month = expense["date"][:7]  # Example: 2026-05
        category = expense["category"]

        if month not in monthly_data:
            monthly_data[month] = {}

        if category not in monthly_data[month]:
            monthly_data[month][category] = 0

        monthly_data[month][category] += expense["amount"]

    trends = []

    months = sorted(monthly_data.keys())

    if len(months) >= 2:

        previous = monthly_data[months[-2]]
        current = monthly_data[months[-1]]

        common_categories = set(previous.keys()) & set(current.keys())

        for category in common_categories:

            previous_amount = previous[category]
            current_amount = current[category]

            if previous_amount == 0:
                continue

            change = round(
                ((current_amount - previous_amount) / previous_amount) * 100,
                2,
            )

            if change > 0:
                direction = "Increasing"
            elif change < 0:
                direction = "Decreasing"
            else:
                direction = "Stable"

            trends.append(
                {
                    "category": category,
                    "direction": direction,
                    "change": f"{change:+.2f}%",
                }
            )

    forecast = None

    if len(months) >= 2:

        monthly_totals = []

        for month in months:
            monthly_totals.append(sum(monthly_data[month].values()))

        increases = []

        for i in range(1, len(monthly_totals)):
            increases.append(monthly_totals[i] - monthly_totals[i - 1])

        average_change = round(
            sum(increases) / len(increases),
            2,
        )

        predicted = round(
            monthly_totals[-1] + average_change,
            2,
        )

        forecast = {
            "currentMonth": months[-1],
            "currentTotal": monthly_totals[-1],
            "predictedNextMonth": predicted,
            "expectedChange": average_change,
        }

    smart_suggestions = []

    # High spending categories
    for category, amount in category_totals.items():

        percentage = (amount / total) * 100

        if percentage >= 50:
            smart_suggestions.append(
                f"{category} spending accounts for {percentage:.2f}% of total expenses. Consider delaying non-essential purchases in this category."
            )

        elif percentage >= 25:
            smart_suggestions.append(
                f"{category} is one of your major expenses. Review whether costs can be optimized."
            )

    # Trend-based suggestions
    for trend in trends:

        if trend["direction"] == "Increasing":
            smart_suggestions.append(
                f"{trend['category']} expenses are increasing. Monitor this category closely."
            )

        elif trend["direction"] == "Decreasing":
            smart_suggestions.append(
                f"{trend['category']} expenses are decreasing. Good cost control."
            )

    # Forecast suggestion
    if forecast:

        if forecast["expectedChange"] > 0:
            smart_suggestions.append(
                "Overall spending is expected to increase next month. Consider planning your budget in advance."
            )

        elif forecast["expectedChange"] < 0:
            smart_suggestions.append(
                "Overall spending is expected to decrease next month. Keep maintaining your current spending habits."
            )

    prompt = f"""
    You are an expert startup financial advisor.

    Analyze the following startup expenses.

    Summary:
    Total Expenses: {total}

    Transactions: {transactions}

    Category Breakdown:
    {category_totals}

    Trends:
    {trends}

    Forecast:
    {forecast}

    Give 5 practical financial suggestions.
    Keep the answer concise.
    """
    
    #Ask Gemini
    response = model.generate_content(prompt)

    llm_advice = response.text
    

    highest_category = max(category_totals, key=category_totals.get)

    lowest_category = min(category_totals, key=category_totals.get)

    recommendations = []

    for category, amount in category_totals.items():

        percentage = round((amount / total) * 100, 2)

        if percentage >= 40:
            recommendations.append(
                f"{category} accounts for {percentage}% of your spending. Review this category for possible savings."
            )

        elif percentage <= 5:
            recommendations.append(f"{category} spending is well controlled.")

    return {
        "success": True,
        "summary": {
            "totalExpenses": total,
            "transactions": transactions,
            "averageExpense": average,
        },
        "categoryBreakdown": category_totals,
        "highestCategory": {
            "category": highest_category,
            "amount": category_totals[highest_category],
        },
        "lowestCategory": {
            "category": lowest_category,
            "amount": category_totals[lowest_category],
        },
        "recommendations": recommendations,
        "trends": trends,
        "forecast": forecast,
        "smartSuggestions": smart_suggestions,
        "llmAdvice": llm_advice,
    }
