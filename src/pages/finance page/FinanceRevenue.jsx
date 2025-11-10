import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import revenueData from "../../mocks/RevenueMockData";
import "./FinanceRevenue.css";

export default function FinanceRevenue() {
  const { chartData, reports } = revenueData;

  const exportExcel = () => {
    alert("Export to Excel coming soon!");
  };

  const exportPDF = () => {
    alert("Export to PDF coming soon!");
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="revenue-section">
      <h2 className="revenue-title">Net Revenue</h2>

      <ResponsiveContainer width="70%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#87cefa" name="Income (₹)" />
          <Bar dataKey="expenses" fill="#ff99aa" name="Expenses (₹)" />
        </BarChart>
      </ResponsiveContainer>
       
      <div className="report-section">
        <h3>Reports & Export</h3>

       

        <table className="report-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Net Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row, index) => (
              <tr key={index}>
                <td>{row.month}</td>
                <td>₹{row.income.toLocaleString()}</td>
                <td>₹{row.expenses.toLocaleString()}</td>
                <td>₹{row.netRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
         <div className="report-buttons">
         <button onClick={exportExcel}>📊 Export Excel</button>
         <button onClick={exportPDF}>📄 Export PDF</button>
         <button onClick={printReport}>🖨️ Print</button>

        </div>
      </div>
      </div>
  );
}
