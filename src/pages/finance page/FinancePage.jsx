import { faMoneyBillWave, faArrowDown, faChartLine, faClock } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import FinanceIncome from "./FinanceIncome";
import "./FinancePage.css";
import FinanceExpense from "./FinanceExpense";
import FinanceRevenue from "./FinanceRevenue";


export default function FinancePage() {
  // return <div>Work in Progress...</div>

  return (
    <div className="finance-page">
      {/* Summary Cards */}
      <div className="summary-container">
        <Card title="Total Income" value="₹100,000" icon={faMoneyBillWave} type="income" />
        <Card title="Total Expenses" value="₹70,000" icon={faArrowDown} type="expense" />
        <Card title="Net Revenue" value="₹30,000" icon={faChartLine} type="profit" />
        <Card title="Pending Payments" value="₹5,000" icon={faClock} type="pending" />
      </div>
      {/* Income Section */}
      <FinanceIncome />
      {/* Expense Section */}
      <FinanceExpense />
      {/* Revenue Section */}
      <FinanceRevenue />
    </div>
  )
}