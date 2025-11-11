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
  const chartData = incomeMockData.chartData;
  const tableData = incomeMockData.tableData;

  return (
    <div className="income-section">
      {/* Header */}
      <div className="income-main-header">
        <h1>Income (Payments)</h1>
      </div>



      {/* Combined Container for Graph + Table */}
      <div className="income-container">
        {/* Filters */}
        <div className="income-filters">
          <button className="active">All</button>
          <button>Paid</button>
          <button>Pending</button>
          <button>Overdue</button>
        </div>
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
              <Area type="monotone" dataKey="income" stroke="#33ccff" fill="#33ccff" fillOpacity={0.2} />
              <Line type="monotone" dataKey="income" stroke="#33ccff" fill="#33ccff" strokeWidth={3} />

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
                    <button className="view-btn">View</button>     
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}