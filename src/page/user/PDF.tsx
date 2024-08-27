import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import { useMobile } from "../../context/Mobile";
import { Expense } from "../../Interface/Type";
import { useAuth } from "../../context/AuthProvider";
import { DOWNLOAD } from "./constanta";

const PDF: React.FC = () => {
  const isMobile = useMobile();
  const { userDetails, expenses } = useAuth();
  const [incomes, setIncomes] = useState<Expense[]>([]);
  const [expensesList, setExpensesList] = useState<Expense[]>([]);

  useEffect(() => {
    if (expenses) {
      setIncomes(expenses.filter((expense) => expense.type === "income"));
      setExpensesList(expenses.filter((expense) => expense.type === "expense"));
    }
  }, [expenses]);

  const generatePDF = () => {
    if (!userDetails || !expenses) return;

    const doc = new jsPDF();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const capitalizeFirstLetter = (str: string) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const calculateTotalAmount = (type: string) => {
      if (!expenses) return 0;
      return expenses
        .filter((expense) => expense.type === type)
        .reduce((acc, expense) => acc + (Number(expense.amount) || 0), 0);
    };

    const calculateRemainingAmount = () => {
      const totalIncome = calculateTotalAmount("income");
      const totalExpense = calculateTotalAmount("expense");
      return totalIncome - totalExpense;
    };

    doc.setFont("helvetica", "semibold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `${capitalizeFirstLetter(userDetails.firstName)} ${capitalizeFirstLetter(
        userDetails.lastName
      )}`,
      10,
      30
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "light");
    doc.setDrawColor(0, 0, 0);
    doc.text(`Email: ${userDetails.email}`, 10, 36);
    doc.text(`Phone: ${userDetails.phone}`, 10, 41);
    doc.text(`${capitalizeFirstLetter(formattedDate)}`, 175, 41);

    doc.line(10, 43, 200, 43);

    doc.setFont("helvetica", "light");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Income: ${calculateTotalAmount("income")}`, 10, 50);
    doc.text(`Total Expense: ${calculateTotalAmount("expense")}`, 10, 55);
    doc.text(`Total Expense: ${calculateRemainingAmount()}`, 10, 60);

    let y = 70;

    if (incomes.length > 0) {
      doc.setFont("helvetica", "semibold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Income", 10, y);
      y += 6;

      incomes.map((income) => {
        doc.setFillColor(0, 0, 0);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `${capitalizeFirstLetter(income.category)}: ${income.comment} ${
            income.amount
          }`,
          15,
          y
        );
        y += 6;
      });
    }

    y += 6;

    if (expensesList.length > 0) {
      doc.setFont("helvetica", "semibold");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Expenses", 10, y);
      y += 6;

      expensesList.map((expense) => {
        doc.setFillColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `${capitalizeFirstLetter(expense.category)}: ${expense.comment} ${
            expense.amount
          }`,
          15,
          y
        );
        y += 6;
      });
    }

    doc.save(
      `${capitalizeFirstLetter(userDetails.firstName)}_${capitalizeFirstLetter(
        userDetails.lastName
      )}`
    );
  };

  return (
    <div className={`${isMobile ? "btn-logout btn-3 hover-border-5" : ""}`}>
      <div
        onClick={generatePDF}
        className={`${isMobile ? "logout-icon" : "links-content"}`}
      >
        <FaFileDownload size={30} />
        <span className="link-title">{DOWNLOAD}</span>
      </div>
    </div>
  );
};

export default PDF;
