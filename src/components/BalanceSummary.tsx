import React from "react";
import "./style/BalanceSummary.scss";
import { uiText } from "../mocksData/uiText";

interface BalanceSummaryProps {
  remainingBalance: number;
  dailySpending: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  remainingBalance,
  dailySpending,
}) => (
  <div className="balance-summary">
    <h3>{uiText.budget.remainingBalance}{remainingBalance.toFixed(0)}</h3>
    <p className="daily-spending">{uiText.budget.dailySpending}{dailySpending.toFixed(0)}</p>
  </div>
);

export default BalanceSummary;
