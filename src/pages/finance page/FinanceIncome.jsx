import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./FinanceIncome.css";

export default function FinanceIncome({ data, title }) {
  const chartData = data.chartData;
  const tableData = data.tableData;

  return (
    <div className="income-section">
      {/* Header + Filters */}
      <div className="income-header-container">
        <h3>Income (Payments)</h3>
        <div className="income-filters">
          <button className="active">All</button>
          <button>Paid</button>
          <button>Pending</button>
          <button>Overdue</button>
        </div>
      </div>

      {/* Line Graph */}
      <div className="income-graph">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4caf50"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="income-table-container">
        <table className="income-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Member</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Due Date</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.month}</td>
                <td>{item.memberName}</td>
                <td>{item.plan}</td>
                <td>₹{item.amount}</td>
                <td>₹{item.paid}</td>
                <td>₹{item.pending}</td>
                <td>{item.dueDate}</td>
                <td>{item.mode}</td>
                <td className={`status-${item.status.toLowerCase()}`}>
                  {item.status}
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
