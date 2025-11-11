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
  const [tempFromDate, setTempFromDate] = useState("");
  const [tempToDate, setTempToDate] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Local states for chart and table data
  const [chartData, setChartData] = useState(incomeMockData.chartData);
  const [tableData, setTableData] = useState(incomeMockData.tableData);

  // ✅ Apply custom date filter
  const handleApplyFilter = () => {
    if (!tempFromDate || !tempToDate) {
      alert("Please select both From and To dates.");
      return;
    }

    setFromDate(tempFromDate);
    setToDate(tempToDate);

    const filteredTable = incomeMockData.tableData.filter((item) => {
      const itemDate = new Date(item.dueDate);
      const start = new Date(tempFromDate);
      const end = new Date(tempToDate);
      return itemDate >= start && itemDate <= end;
    });

    const filteredChart = incomeMockData.chartData.filter((item) => {
      const itemDate = new Date(item.date);
      const start = new Date(tempFromDate);
      const end = new Date(tempToDate);
      return itemDate >= start && itemDate <= end;
    });

    setTableData(filteredTable);
    setChartData(filteredChart);
  };

  // ✅ Clear filters
  const handleClearFilter = () => {
    setFilter("All");
    setFromDate("");
    setToDate("");
    setTempFromDate("");
    setTempToDate("");
    setChartData(incomeMockData.chartData);
    setTableData(incomeMockData.tableData);
  };

  // ✅ Filter table data by status
  const filteredTableData = tableData.filter((item) =>
    filter === "All" ? true : item.status.toLowerCase() === filter.toLowerCase()
  );

  // ✅ Update chart based on filtered table
  const filteredChartData = chartData.map((monthData) => {
    const total = filteredTableData
      .filter((item) => item.month === monthData.month)
      .reduce((sum, curr) => sum + curr.amount, 0);
    return { ...monthData, income: total };
  });

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

          {/* ✅ Date Filters */}
          <div className="date-filters">
            <label>From:</label>
            <input
              type="date"
              value={tempFromDate}
              onChange={(e) => setTempFromDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={tempToDate}
              onChange={(e) => setTempToDate(e.target.value)}
            />

            {/* ✅ Apply Button */}
            <button className="apply-btn" onClick={handleApplyFilter}>
              Apply
            </button>

            {/* ✅ Clear Button */}
            <button className="clear-btn" onClick={handleClearFilter}>
              Clear
            </button>
          </div>
        </div>

        {/* Graph Label */}
        <div className="income-graph-label">
          <span>Monthly Income</span>
        </div>

        {/* ✅ Line Chart */}
        <div className="income-graph">
          <ResponsiveContainer width="90%" height={350}>
            <AreaChart data={filteredChartData}>
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

        {/* ✅ Table Section */}
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
              {filteredTableData.length > 0 ? (
                filteredTableData.map((item) => (
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
                      <button
                        className="view-btn"
                        onClick={() => setSelectedItem(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No records found for selected filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     {/* ✅ Modal Section */}
{selectedItem && (
  <div className="income-modal-overlay">
    <div className="income-modal">
      <div className="income-modal-header">
        <h3>Payment Details</h3>
        <span className="income-modal-close" onClick={() => setSelectedItem(null)}>
          ×
        </span>
      </div>

      <div className="income-modal-body">
        <p><strong>Member:</strong> {selectedItem.memberName}</p>
        <p><strong>Month:</strong> {selectedItem.month}</p>
        <p><strong>Amount:</strong> ₹{selectedItem.amount}</p>
        <p><strong>Paid:</strong> ₹{selectedItem.paid}</p>
        <p><strong>Pending:</strong> ₹{selectedItem.pending}</p>
        <p><strong>Due Date:</strong> {selectedItem.dueDate}</p>
        <p><strong>Status:</strong> {selectedItem.status}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
