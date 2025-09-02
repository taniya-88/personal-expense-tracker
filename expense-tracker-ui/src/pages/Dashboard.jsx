import { useEffect, useState } from "react";
import {
    listExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "../api";
import "./Dashboard.css";

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        date: ""
    });

    // Fetch all expenses
    const fetchExpenses = async () => {
        const data = await listExpenses();
        setExpenses(data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Handle form submit (Add / Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            amount: parseFloat(form.amount), // ensure number
            category: form.category.toUpperCase() // ensure enum
        };

        if (editing) {
            await updateExpense(editing.id, payload);
            setEditing(null);
        } else {
            await createExpense(payload);
        }

        setForm({ title: "", amount: "", category: "", date: "" });
        fetchExpenses();
    };

    // Handle delete
    const handleDelete = async (id) => {
        await deleteExpense(id);
        fetchExpenses();
    };

    // Handle edit
    const handleEdit = (exp) => {
        setEditing(exp);
        setForm({
            ...exp,
            amount: exp.amount.toString() // keep input value as string
        });
    };

    return (
        <div className="dashboard-container">
            <h1 className="title">Expense Dashboard</h1>

            {/* Expense Form */}
            <div className="form-card">
                <h2>{editing ? "Edit Expense" : "Add New Expense"}</h2>
                <form onSubmit={handleSubmit} className="expense-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        required
                    />
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="FOOD">Food</option>
                        <option value="TRAVEL">Travel</option>
                        <option value="SHOPPING">Shopping</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn">
                        {editing ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            {/* Expense List */}
            <div className="table-card">
                <h2>All Expenses</h2>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp.id}>
                                <td>{exp.title}</td>
                                <td>₹{exp.amount}</td>
                                <td>{exp.category}</td>
                                <td>{exp.date}</td>
                                <td>
                                    <button
                                        className="btn edit"
                                        onClick={() => handleEdit(exp)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDelete(exp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && (
                            <tr>
                                <td colSpan="5" className="no-data">
                                    No expenses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
