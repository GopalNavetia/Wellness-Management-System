import Card from "./Card";
import "./FinancePage.css";

// Importing FontAwesome icons
import { faMoneyBillWave, faArrowDown, faChartLine, faClock } from "@fortawesome/free-solid-svg-icons";

export default function FinancePage() {
  return (
    <div className="finance-page">
      <div className="summary-container">
        <Card title="Total Income" value="₹100,000" icon={faMoneyBillWave} type="income" />
        <Card title="Total Expenses" value="₹70,000" icon={faArrowDown} type="expenses" />
        <Card title="Net Revenue" value="₹30,000" icon={faChartLine} type="revenue" />
        <Card title="Pending Payments" value="₹5,000" icon={faClock} type="pending" />
      </div>
    </div>
  );
}
