package com.example.expense_tracker.repo;

import com.example.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // Custom query method to fetch expenses between two dates
    List<Expense> findByDateBetween(LocalDate start, LocalDate end);
}
