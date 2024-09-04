import React from "react";
import "./style/BalanceSummary.scss";
import { DAILY_SPENDING, REMAINING_BALANCE } from "./constanta";

interface BalanceSummaryProps {
  remainingBalance: number;
  dailySpending: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  remainingBalance,
  dailySpending,
}) => (
  <div className="balance-summary">
    <h3>{REMAINING_BALANCE}{remainingBalance.toFixed(0)}</h3>
    <p className="daily-spending">{DAILY_SPENDING}{dailySpending.toFixed(0)}</p>
  </div>
);

export default BalanceSummary;
