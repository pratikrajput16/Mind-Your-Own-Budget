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
    }
