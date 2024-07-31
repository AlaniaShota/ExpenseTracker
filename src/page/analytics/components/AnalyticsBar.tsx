import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Expense } from "../../../Interface/Type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface AnalyticsBarProps {
  expenses: Expense[];
}

const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};

const AnalyticsBar: React.FC<AnalyticsBarProps> = ({ expenses }) => {

  const barData = {
    labels: expenses.map((expense) => expense.id),
    datasets: [
      {
        label: "Detailed Analysis of Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: expenses.map((expense) =>
          expense.type === "income" ? "green" : "red",
        ),
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        type: "category" as const,
        labels: expenses.map((category) => {
          const labelDataText = formatDate(category.date);
          const labelCategoryText = category.category;
          return `${labelCategoryText}\n${labelDataText}`;
        }),
        title: {
          display: true,
          text: "",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const amount = context.raw as number;
            const comment = expenses[context.dataIndex].comment;
            return `Amount: $${amount}\nComment: ${comment}`;
          },
        },
      },
    },
  };

  return <Bar data={barData} options={barOptions} />;
};

export default AnalyticsBar;
