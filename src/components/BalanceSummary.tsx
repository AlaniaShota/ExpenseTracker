import React from "react";
import "./style/BalanceSummary.scss";

interface BalanceSummaryProps {
  remainingBalance: number;
  dailySpending: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  remainingBalance,
  dailySpending,
}) => (
  <div className="balance-summary">
    <h3>Remaining Balance: {remainingBalance.toFixed(0)}</h3>
    <p className="daily-spending">Daily Spending: {dailySpending.toFixed(0)}</p>
  </div>
);

export default BalanceSummary;
