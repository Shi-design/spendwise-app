const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link expense to a user
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter an amount"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // automatically adds createdAt + updatedAt
);

module.exports = mongoose.model("Expense", expenseSchema);
