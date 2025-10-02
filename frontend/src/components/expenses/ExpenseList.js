import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
    return (
        <div className="list-container">
            <h3>History</h3>
            <ul className="list">
                {expenses.length === 0 && <p>No transactions yet.</p>}
                {expenses.map(expense => (
                    <li key={expense._id} className="list-item">
                        <div>
                            <span className="category-tag">{expense.category}</span>
                            {expense.notes || 'Expense'}
                        </div>
                        <div>
                            <span>₹{expense.amount.toLocaleString()}</span>
                            <button onClick={() => onDeleteExpense(expense._id)} className="delete-btn">x</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;