import React from "react";
import { Expense } from "../../../Interface/Type";
import { Pie } from "react-chartjs-2";
import { ChartData, TooltipItem } from "chart.js";

interface MobileAnalyticsPieProps {
  expenses: Expense[];
}

const MobileAnalyticsPie: React.FC<MobileAnalyticsPieProps> = ({
  expenses,
}) => {
  const pieData: ChartData<"pie"> = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: "Detailed Analysis of Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: expenses.map((expense) =>
          expense.type === "income"
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: expenses.map((expense) =>
          expense.type === "income"
            ? "rgba(75, 192, 192, 1)"
            : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Detailed Analysis of Expenses",
        font: {
          size: 20,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          font: {
            size: 16,
          },
          padding: 20,
        },
      },

      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const amount = context.raw as number;
            const comment = expenses[context.dataIndex].comment;
            return `Amount: $${amount}\nComment: ${comment}`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
};

export default MobileAnalyticsPie;
