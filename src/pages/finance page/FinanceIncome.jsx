import React, { useState } from "react";
import incomeMockData from "../../mocks/IncomeMockData";
import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import "./FinanceIncome.css";

export default function FinanceIncome() {
  const [filter, setFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const chartData = incomeMockData.chartData;
  const tableData = incomeMockData.tableData;

  // 🔍 Filter logic
  const filteredData = tableData.filter((item) => {
    let matchStatus =
      filter === "All" ? true : item.status.toLowerCase() === filter.toLowerCase();

    let matchDate = true;
    if (fromDate && toDate) {
      matchDate =
        new Date(item.dueDate) >= new Date(fromDate) &&
        new Date(item.dueDate) <= new Date(toDate);
    }

    return matchStatus && matchDate;
  });

  // 🔹 Function to open modal
  const handleView = (row) => {
    setSelectedRow(row);
  };

  // 🔹 Function to close modal
  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  return (
    <div className="income-section">
      {/* Header */}
      <div className="income-main-header">
        <h1>Income (Payments)</h1>
      </div>

      <div className="income-container">
        {/* Filters */}
        <div className="income-filters">
          {["All", "Paid", "Pending", "Overdue"].map((btn) => (
            <button
              key={btn}
              className={filter === btn ? "active" : ""}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}

          {/* Custom Date Filter */}
          <div className="income-date-filter">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* Graph Label */}
        <div className="income-graph-label">
          <span>Monthly Income</span>
        </div>

        {/* Line Chart */}
        <div className="income-graph">
          <ResponsiveContainer width="90%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#33ccff"
                fill="#33ccff"
                fillOpacity={0.2}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#33ccff"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="income-table-container">
          <table className="income-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Member</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.month}</td>
                  <td>{item.memberName}</td>
                  <td>₹{item.amount}</td>
                  <td>₹{item.paid}</td>
                  <td>₹{item.pending}</td>
                  <td>{item.dueDate}</td>
                  <td className={`status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => handleView(item)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
   {selectedRow && (
  <div className="income-modal-overlay">
    <div className="income-modal-content">
      {/* Modal Header */}
      <div className="income-modal-header">
        <h3>Payment Details</h3>
        <span className="close-btn" onClick={handleCloseModal}>
          ✖
        </span>
      </div>

      {/* Modal Body */}
      <div className="income-modal-body">
        <p><strong>Member:</strong> {selectedRow.memberName}</p>
        <p><strong>Month:</strong> {selectedRow.month}</p>
        <p><strong>Amount:</strong> ₹{selectedRow.amount}</p>
        <p><strong>Paid:</strong> ₹{selectedRow.paid}</p>
        <p><strong>Pending:</strong> ₹{selectedRow.pending}</p>
        <p><strong>Due Date:</strong> {selectedRow.dueDate}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status-${selectedRow.status.toLowerCase()}`}>
            {selectedRow.status}
          </span>
        </p>
      </div>
    </div>
  </div>
)}
</div>
  );
}