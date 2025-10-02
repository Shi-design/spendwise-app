const Expense = require("../models/Expense");

// @desc   Get all expenses for logged-in user
// @route  GET /api/expenses
// @access Private
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Get Expenses Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Add a new expense
// @route  POST /api/expenses
// @access Private
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, notes } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ error: "Category and amount are required" });
    }

    const expense = await Expense.create({
      user: req.user._id, // ✅ comes from protect middleware
      category,
      amount,
      notes,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Add Expense Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Delete an expense
// @route  DELETE /api/expenses/:id
// @access Private
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Ensure user owns the expense
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } catch (error) {
    console.error("Delete Expense Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
