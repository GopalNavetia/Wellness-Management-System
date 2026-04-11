import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/AxiosInstance.jsx'
import {
  AreaChart,
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

  // Get Financial Year Start 
  const getFinancialYearStart = () => {
    const today = new Date();
    const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year}-04-01`;
  };

  // Get Financial Year End
  const getFinancialYearFrom = () => {
    const today = new Date();
    const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year + 1}-03-31`;
  };

  // Temporary inputs
  const [tempFromDate, setTempFromDate] = useState(getFinancialYearStart());
  const [tempToDate, setTempToDate] = useState(getFinancialYearFrom());

  const [selectedItem, setSelectedItem] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIncomeTableData();
  }, []);

  const fetchIncomeTableData = async (fromDate = tempFromDate, toDate = tempToDate) => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/MyProject/FinanceIncomeAPI`, {
        params: {
          from_date: fromDate,
          to_date: toDate,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setTableData(Array.isArray(result?.data?.data) ? result.data.data : []);
    } catch (error) {
      console.log(error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= Apply Filter ================= // API CALL
  const handleApplyFilter = () => {
    if (tempFromDate && tempToDate) {
      fetchIncomeTableData(tempFromDate, tempToDate);
    } else {
      alert("Please select both From and To dates");
    }
  };

  // ================= Clear Filter =================
  const handleClearFilter = () => {
    setFilter("All");
    const defaultFrom = getFinancialYearStart();
    const defaultTo = getFinancialYearFrom();
    setTempFromDate(defaultFrom);
    setTempToDate(defaultTo);
    fetchIncomeTableData(defaultFrom, defaultTo);
  };

  // ================= Status Filter =================
  const filteredTableData = Array.isArray(tableData)
    ? tableData.filter((item) => {
      if (filter === "All") return true;

      const pending = Number(item?.pending ?? 0);
      const paid = Number(item?.paid ?? 0);

      if (filter === "Pending") return pending > 0;
      if (filter === "Paid") return paid > 0;

      return true;
    })
    : [];

  // ================= Chart Derived =================
  // Build chart directly from API table data (filtered)
  const filteredChartData = Array.isArray(filteredTableData)
    ? filteredTableData.reduce((acc, item) => {
      const month = item?.month ?? "";
      const total = Number(item?.total ?? 0);

      const existing = acc.find((row) => row.month === month);
      if (existing) {
        existing.income += total;
      } else {
        acc.push({ month, income: total });
      }

      return acc;
    }, [])
    : [];

  return (
    <div className="income-section">

      {/* ================= HEADER ================= */}
      <div className="income-main-header">
        <h1>Income (Payments)</h1>

        {/* ===== Header Controls (Status Filter + Dates) ===== */}
        {/* Status Dropdown */}
        <div className="filterContainer">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="income-status-dropdown"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          {/* ================= DATE FILTERS ================= */}
          <div className="date-Filters">
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
            <button onClick={handleApplyFilter}>Apply</button>
            <button onClick={handleClearFilter}>Clear</button>
          </div>
        </div>
      </div>

      {/* ================= CHART ================= */}
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

          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ================= TABLE ================= */}
      <div className="income-table-container">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table className="income-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTableData.length > 0 ? (
                filteredTableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.month}</td>
                    <td>₹ {item.total}</td>
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
                  <td colSpan="8">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div className="income-modal-overlay">
          <div className="income-modal">
            <div className="income-modal-header">
              <h3>Payment Details</h3>
              <span
                className="income-modal-close"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </span>
            </div>

            <div className="income-modal-body">

              <p><strong>Month:</strong> {selectedItem.month}</p>
              <p><strong>Amount:</strong> ₹{selectedItem.amount}</p>
              <p><strong>Status:</strong> {selectedItem.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}