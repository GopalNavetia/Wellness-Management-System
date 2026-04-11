import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance.jsx";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./FinanceExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function FinanceExpense() {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");

  // Get Financial Year Start
  const getFinancialYearStart = () => {
    const today = new Date();
    const year =
      today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year}-04-01`;
  };

  // Get Financial Year End
  const getFinancialYearEnd = () => {
    const today = new Date();
    const year =
      today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    return `${year + 1}-03-31`;
  };

  // Temporary date inputs (apply on button click)
  const [fromDate, setFromDate] = useState(getFinancialYearStart());
  const [toDate, setToDate] = useState(getFinancialYearEnd());

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    remarks: "",
  });

  const expenseCategories = [
    { value: "rent", label: "Rent" },
    { value: "salary", label: "Salary" },
    { value: "machinery", label: "Machinery" },
    { value: "maintenance", label: "Maintenance" },
    { value: "repair", label: "Repair" },
    { value: "utility_bill", label: "Utility Bill" },
    { value: "miscellaneous", label: "Miscellaneous" },
  ];

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async (
    from = getFinancialYearStart(),
    to = getFinancialYearEnd()
  ) => {
    try {
      setLoading(true);

      // Update endpoint if your backend route is different
      const result = await axiosInstance.get(`/MyProject/FinanceExpenseAPI`, {
        params: {
          from_date: from,
          to_date: to,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      setExpenses(Array.isArray(result?.data?.data) ? result.data.data : []);
    } catch (error) {
      console.log(error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD ================= */
  const handleAddClick = () => {
    setSelectedExpense(null);
    setFormData({ date: "", category: "", amount: "", remarks: "" });
    setIsFormOpen(true);
  };

  /* ================= VIEW ================= */
  const handleView = (exp) => {
    setSelectedExpense(exp);
    setIsFormOpen(true);
  };

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= SAVE (POST API) ================= */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setSaveLoading(true);

      const response = await axiosInstance.post(
        `/MyProject/AddExpenseAPI`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      // Close modal on successful API status
      if (response?.status === 200 || response?.status === 201) {
        alert(response?.data?.message || "Expense added successfully");
        setIsFormOpen(false);
        setSelectedExpense(null);
        setFormData({ date: "", category: "", amount: "", remarks: "" });
        fetchExpenseData(fromDate, toDate);
      } else {
        alert(response?.data?.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Add expense error:", error);
      alert(error?.response?.data?.message || "Failed to add expense");
    } finally {
      setSaveLoading(false);
    }
  };

  /* ================= DATE FILTER ================= */
  const handleApplyFilter = () => {
    if (fromDate && toDate) {
      fetchExpenseData(fromDate, toDate);
    } else {
      alert("Please select both From and To dates");
    }
  };

  const handleClearFilter = () => {
    const defaultFrom = getFinancialYearStart();
    const defaultTo = getFinancialYearEnd();
    setCategoryFilter("All");
    setFromDate(defaultFrom);
    setToDate(defaultTo);
    fetchExpenseData(defaultFrom, defaultTo);
  };

  /* ================= GRAPH DATA ================= */
  const categoryKeys = expenseCategories.map((cat) => cat.value);

  const chartData = Array.isArray(expenses)
    ? expenses.map((item) => {
      const month = item?.month || "";

      const amount =
        categoryFilter === "All"
          ? Number(item?.total ?? 0)
          : Number(item?.[categoryFilter] ?? 0);

      return {
        month,
        amount,
      };
    })
    : [];

  return (
    <div className="expense-container">
      {/* ================= HEADER ================= */}
      <div className="expenseHeadSection">
        <h1>Expenses</h1>

        <div className="expense-header">
          <div className="date-filters">
            <select
              className="expense-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All</option>
              {expenseCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

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

            <button onClick={handleApplyFilter}>Apply</button>
            <button onClick={handleClearFilter}>Clear</button>
            <button className="add-expense-btn" onClick={handleAddClick}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ================= GRAPH ================= */}
      <div className="expense-graph">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <ResponsiveContainer width="90%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#33ccff"
                fill="#33ccff"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading data...</td>
            </tr>
          ) : chartData.length > 0 ? (
            chartData.map((exp, index) => (
              <tr key={index}>
                <td>{exp.month}</td>
                <td>₹ {exp.amount}</td>
                <td>
                  <button onClick={() => handleView(exp)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedExpense ? "Expense Details" : "Add Expense"}</h3>
              <span onClick={() => setIsFormOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>

            {selectedExpense ? (
              <div className="view-box">
                <p>
                  <strong>Month:</strong> {selectedExpense.month}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedExpense.amount}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Choose category</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />

                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />

                <div className="form-buttons">
                  <button type="submit" disabled={saveLoading}>
                    {saveLoading ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}