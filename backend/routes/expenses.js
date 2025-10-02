const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// All these routes are now protected and require a valid token
router.route('/')
    .get(protect, getExpenses)
    .post(protect, addExpense);

router.route('/:id')
    .delete(protect, deleteExpense);

module.exports = router;
