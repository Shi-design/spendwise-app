import React, { useState, useEffect } from "react";
import AddExpenseForm from "../components/expenses/AddExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import { getExpenses, deleteExpense } from "../api";
import '../assets/styles/Dashboard.css';

function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("budget");
    return saved ? parseInt(saved) : 50000;
  });
  const [newBudget, setNewBudget] = useState("");

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

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data || error.message);
    }
  };

  // Budget calculation
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remaining = budget - totalSpent;

  // Handle budget update
  const handleBudgetUpdate = () => {
    if (newBudget && !isNaN(newBudget)) {
      setBudget(parseInt(newBudget));
      localStorage.setItem("budget", newBudget);
      setNewBudget("");
    }
  };

  return (
    <div>
      <div className="budget-overview">
        <h2>Monthly Overview</h2>
        <div className="budget-box">
          <span>Budget:</span> ₹{budget.toLocaleString()}
        </div>
        <div className="budget-box">
          <span>Spent:</span> ₹{totalSpent.toLocaleString()}
        </div>
        <div className="budget-box remaining">
          <span>Remaining:</span> ₹{remaining.toLocaleString()}
        </div>
      </div>

      {/* Budget Input */}
      <div className="budget-input">
        <input
          type="number"
          placeholder="Enter Budget"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
        />
        <button onClick={handleBudgetUpdate}>Update Budget</button>
      </div>

      {/* Expenses */}
      <AddExpenseForm onExpenseAdded={loadExpenses} />
      <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
    </div>
  );
}

export default DashboardPage;
