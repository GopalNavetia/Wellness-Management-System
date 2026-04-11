import React, { useState, useEffect } from "react";
import axiosInstance from '../../utils/AxiosInstance.jsx'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line, 
} from "recharts";
import "./FinanceRevenue.css";

const FinanceRevenue = () => {

  // Get Financial Year Start 
  const getFinancialYearStart = () => {
    const today = new Date();
    const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year}-04-01`;
  };

  // Get Financial Year End
  const getFinancialYearEnd = () => {
    const today = new Date();
    const year = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year + 1}-03-31`;
  };

  const [fromDate, setFromDate] = useState(getFinancialYearStart());
  const [toDate, setToDate] = useState(getFinancialYearEnd());
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRevenueTableData = async (from = fromDate, to = toDate) => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/MyProject/NetRevenueAPI`, {
        params: {
          from_date: from,
          to_date: to,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setFetchedData(Array.isArray(result?.data?.data) ? result.data.data : []);
    } catch (error) {
      console.log(error);
      setFetchedData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueTableData();
  }, []);

  const handleApply = () => {
    if (fromDate && toDate) {
      fetchRevenueTableData(fromDate, toDate);
    } else {
      alert("Please select both From and To dates");
    }
  };

  const handleClear = () => {
    const defaultFrom = getFinancialYearStart();
    const defaultTo = getFinancialYearEnd();
    setFromDate(defaultFrom);
    setToDate(defaultTo);
    fetchRevenueTableData(defaultFrom, defaultTo);
  };

  return (
    <div className="revenue-section">
      {/*  HEADER  */}
      <div className="revenue-topbar">
        <h2>Revenue</h2>
        <div className="revenue-controls">
          <span>From:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span>To:</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>

          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={fetchedData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#87cefa" name="Income" />
            <Bar dataKey="expense" fill="#ff99aa" name="Expense" />
            <Line
              type="monotone"
              dataKey="net_revenue"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 3 }}
              name="Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
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
          {loading ? (
            <tr>
              <td colSpan="4" className="loading-cell">Loading...</td>
            </tr>
          ) : fetchedData.length > 0 ? (
            fetchedData.map((row) => (
              <tr key={row.id}>
                <td>{row.month}</td>
                <td>₹ {row.income}</td>
                <td>₹ {row.expense}</td>
                <td>₹ {row.net_revenue}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceRevenue;