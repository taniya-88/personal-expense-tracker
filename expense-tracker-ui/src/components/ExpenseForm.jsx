import { useState } from 'react';

const categories = ['FOOD', 'TRAVEL', 'SHOPPING', 'ENTERTAINMENT', 'BILLS', 'HEALTH', 'OTHER'];

export default function ExpenseForm({ onSubmit, initial }) {
    const [title, setTitle] = useState(initial?.title || '');
    const [amount, setAmount] = useState(initial?.amount || '');
    const [category, setCategory] = useState(initial?.category || 'FOOD');
    const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", { title, amount, category, date });
        onSubmit({
            title,
            amount: parseFloat(amount),
            category,
            date
        });
    };


    return (
        <form onSubmit={handleSubmit} className="card">
            <input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="input" type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button className="button" type="submit">{initial ? 'Update' : 'Add'}</button>
        </form>
    );
}
