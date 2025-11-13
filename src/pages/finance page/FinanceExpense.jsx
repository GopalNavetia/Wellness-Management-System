import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import mockExpenseData from "../../mocks/ExpenseMockData";
import "./FinanceExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const COLORS = ["#ff99aa", "#87cefa", "#ffe59a", "#9de0d4", "#c7a4ff"];

export default function FinanceExpense() {
  const [expenses, setExpenses] = useState(mockExpenseData);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inactiveCategories, setInactiveCategories] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    notes: "",
  });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleAddClick = () => {
    setFormData({ date: "", category: "", amount: "", notes: "" });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEdit = (exp) => {
    setFormData(exp);
    setEditId(exp.id);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.category || !formData.amount) {
      alert("Please fill all required fields!");
      return;
    }

    if (isEditing) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...formData, id: editId } : item
        )
      );
    } else {
      const newExpense = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
      };
      setExpenses([newExpense, ...expenses]);
    }

    setIsFormOpen(false);
    setFormData({ date: "", category: "", amount: "", notes: "" });
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = (id) =>
    setExpenses(expenses.filter((exp) => exp.id !== id));

  // ✅ Date range filter logic
  const handleApplyFilter = () => {
    const filtered = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || expDate >= from) && (!to || expDate <= to);
    });
    setFilteredExpenses(filtered);
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setFilteredExpenses(expenses);
  };

  const chartData = Object.values(
    filteredExpenses.reduce((acc, exp) => {
      acc[exp.category] = acc[exp.category] || { name: exp.category, value: 0 };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  const toggleCategory = (name) => {
    setInactiveCategories((prev) =>
      prev.includes(name)
        ? prev.filter((cat) => cat !== name)
        : [...prev, name]
    );
  };

  const visibleData = chartData.filter(
    (d) => !inactiveCategories.includes(d.name)
  );

  return (
    <div className="expense-container">
      {/* Header Section */}
      <div className="expenseHeadSection">
        <h1>Expenses</h1>

        <div className="date-filters">
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>

          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>

          <button className="apply-btn" onClick={handleApplyFilter}>
            Apply
          </button>
          <button className="clear-btn" onClick={handleClearFilter}>
            Clear
          </button>
        </div>
      </div>

      <div className="expense-header">
        <button className="add-expense-btn" onClick={handleAddClick}>
          + Add Expense
        </button>
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Legend
              verticalAlign="top"
              align="center"
              payload={chartData.map((item, index) => ({
                id: item.name,
                type: "square",
                value: item.name,
                color: COLORS[index % COLORS.length],
              }))}
              formatter={(value) => (
                <span
                  onClick={() => toggleCategory(value)}
                  style={{
                    cursor: "pointer",
                    textDecoration: inactiveCategories.includes(value)
                      ? "line-through"
                      : "none",
                    color: inactiveCategories.includes(value)
                      ? "gray"
                      : "black",
                    fontWeight: "bold",
                  }}
                >
                  {value}
                </span>
              )}
            />

            <Pie
              data={visibleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {visibleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={inactiveCategories.includes(entry.name) ? 0.3 : 1}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Table */}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Expense Category</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>₹{exp.amount.toLocaleString()}</td>
              <td>{exp.notes}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(exp)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Expense" : "Add Expense"}</h3>
              <span className="xMark" onClick={() => setIsFormOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <form onSubmit={handleSave}>
              <label><b>Date:</b></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <label><b>Category:</b></label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Rent">Rent</option>
                <option value="Salaries">Salaries</option>
                <option value="Equipment">Equipment</option>
                <option value="Utilities">Utilities</option>
                <option value="Marketing">Marketing</option>
              </select>

              <label><b>Amount (₹):</b></label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />

              <label><b>Notes:</b></label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>

              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  {isEditing ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
