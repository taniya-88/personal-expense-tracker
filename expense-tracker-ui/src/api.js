import axios from 'axios';

// Base Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});


// List all expenses
export const listExpenses = async () => {
    try {
        const res = await api.get('/expenses');
        return res.data;
    } catch (err) {
        console.error('Error fetching expenses:', err.response || err);
        throw err;
    }
};

// Create a new expense
export const createExpense = async (payload) => {
    try {
        const res = await api.post('/expenses', payload);
        return res.data;
    } catch (err) {
        console.error('Error creating expense:', err.response || err);
        throw err;
    }
};

// Update an existing expense
export const updateExpense = async (id, payload) => {
    try {
        const res = await api.put(`/expenses/${id}`, payload);
        return res.data;
    } catch (err) {
        console.error('Error updating expense:', err.response || err);
        throw err;
    }
};

// Delete an expense
export const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/${id}`);
    } catch (err) {
        console.error('Error deleting expense:', err.response || err);
        throw err;
    }
};

// Get monthly report
export const getMonthlyReport = async (year, month) => {
    try {
        const res = await api.get(`/expenses/reports/monthly?year=${year}&month=${month}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching monthly report:', err.response || err);
        throw err;
    }
};

// Get yearly report
export const getYearlyReport = async (year) => {
    try {
        const res = await api.get(`/expenses/reports/yearly?year=${year}`);
        return res.data;
    } catch (err) {
        console.error('Error fetching yearly report:', err.response || err);
        throw err;
    }
};
