import "./FinancePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faArrowDown,
  faChartLine,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function FinancePage() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income", amount: 50000 },
    { id: 2, type: "expense", amount: 20000 },
    { id: 3, type: "income", amount: 30000 },
    { id: 4, type: "expense", amount: 15000 },
    { id: 5, type: "pending", amount: 5000 },
  ]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netRevenue: 0,
    pendingPayments: 0,
  });
  // Calculate totals dynamically when transactions change
  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const pending = transactions
      .filter((t) => t.type === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    const net = income - expenses;

    setSummary({
      totalIncome: income,
      totalExpenses: expenses,
      netRevenue: net,
      pendingPayments: pending,
    });
  }, [transactions]);

  const summaryData = [
    {
      title: "Total Income",
      value: `₹${summary.totalIncome}`,
      icon: faMoneyBillWave,
      className: "income",
    },
    {
      title: "Total Expenses",
      value: `₹${summary.totalExpenses}`,
      icon: faArrowDown,
      className: "expenses",
    },
    {
      title: "Net Revenue",
      value: `₹${summary.netRevenue}`,
      icon: faChartLine,
      className: "revenue",
    },
    {
      title: "Pending Payments",
      value: `₹${summary.pendingPayments}`,
      icon: faClock,
      className: "pending",
    },
  ];

  return (
    <div className="finance-page">
      <h2 className="finance-title">Gym Finance Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-container">
        {summaryData.map((item, index) => (
          <div key={index} className={`summary-card ${item.className}`}>
            <div className="summary-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className="summary-details">
              <p className="summary-title">{item.title}</p>
              <h3 className="summary-value">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

