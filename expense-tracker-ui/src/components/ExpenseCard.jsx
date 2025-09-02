export default function ExpenseCard({ expense, onEdit, onDelete }) {
    return (
        <div className="card" style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>{expense.title}</h3>
            <p>💰 {expense.amount}</p>
            <p>📂 {expense.category}</p>
            <p>📅 {expense.date}</p>

            <button onClick={() => onEdit(expense)} style={{ marginRight: "0.5rem" }}>Edit</button>
            <button onClick={() => onDelete(expense.id)}>Delete</button>
        </div>
    );
}