package com.example.expense_tracker.service;

import com.example.expense_tracker.model.Expense;
import com.example.expense_tracker.repo.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) { this.repo = repo; }

    public Expense create(Expense expense) {
        return repo.save(expense);
    }

    public List<Expense> listAll() {
        return repo.findAll();
    }
}
