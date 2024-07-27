import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import jsPDF from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import { Expense } from "../Interface/Type";

const PDF: React.FC = () => {
  const { userDetails, expenses } = useAuth();
  const [incomes, setIncomes] = useState<Expense[]>([]);
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  console.log(expenses, "expenses");
  console.log(userDetails, "userDetails");

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

    doc.line(10, 45, 200, 45);

    let y = 50;

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
          `${capitalizeFirstLetter(income.category)}: ${income.comment} $${
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
          `${capitalizeFirstLetter(expense.category)}: ${expense.comment} $${
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
    <div onClick={generatePDF} className="links-content">
      {/* <div className="pdf-icon"> */}
      <FaFileDownload size={30} />
      <h3 className="link-title">Download</h3>
      {/* </div> */}
    </div>
  );
};

export default PDF;
