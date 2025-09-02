import axios from "axios";

const API_URL = "http://localhost:8080/api/expenses";

class ExpenseService {
    getAllExpenses() {
        return axios.get(API_URL);
    }

    addExpense(expense) {
        return axios.post(API_URL, expense);
    }

    deleteExpense(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ExpenseService();
