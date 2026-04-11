import { faMoneyBillWave, faArrowDown, faChartLine, faClock } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import FinanceIncome from "./FinanceIncome";
import "./FinancePage.css";
import FinanceExpense from "./FinanceExpense";
import FinanceRevenue from "./FinanceRevenue";
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance'

export default function FinancePage() {
    const [fetchData, setFetchData] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        async function fetchMemberCardData() {
            try {
                const response = await axiosInstance.get("/MyProject/FinanceCardDetail", {
                    headers: { "ngrok-skip-browser-warning": "true" }
                });
                setFetchData(response.data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMemberCardData();
    }, []);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

  return (
    <div className="finance-page">
      {/* Summary Cards */}
      <div className="summary-container">
        <Card title="Total Income" value={fetchData.total_income} icon={faMoneyBillWave} type="income" />
        <Card title="Total Expenses" value={fetchData.total_expense} icon={faArrowDown} type="expense" />
        <Card title="Net Revenue" value={fetchData.net_revenue} icon={faChartLine} type="profit" />
        <Card title="Pending Payments" value={fetchData.pending_payments} icon={faClock} type="pending" />
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