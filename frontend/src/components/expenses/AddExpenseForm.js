import React, { useState } from "react";
import { addExpense } from "../../api";

function AddExpenseForm({ onExpenseAdded }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({ category, amount: Number(amount), notes });
      setCategory("");
      setAmount("");
      setNotes("");
      if (onExpenseAdded) onExpenseAdded(); // reload list
    } catch (err) {
      console.error("Error adding expense:", err.response?.data || err.message);
      alert("Failed to add expense, check if you are logged in.");
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
