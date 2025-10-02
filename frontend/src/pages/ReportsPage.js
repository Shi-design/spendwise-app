import React, { useEffect, useState } from "react";
import { getExpenses } from "../api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

function ReportsPage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const { data } = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error loading expenses:", error.response?.data || error.message);
    }
  };

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  // Pie chart data
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Total Spent (₹)",
        data: values,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="reports-container">
      <h2>Expense Reports</h2>

      {expenses.length === 0 ? (
        <p>No data available for reports.</p>
      ) : (
        <div className="charts">
          <div className="chart-box">
            <h3>Category Breakdown</h3>
            <Pie data={pieData} />
          </div>

          <div className="chart-box">
            <h3>Spending by Category</h3>
            <Bar data={barData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
