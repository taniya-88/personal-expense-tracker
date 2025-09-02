package com.example.expense_tracker.controller;

import com.example.expense_tracker.model.Expense;
import com.example.expense_tracker.repo.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // ----------- CRUD Endpoints ------------
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        expense.setId(id);
        return expenseRepository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }

    // ----------- Reports ------------

    // Date Range Report
    @GetMapping("/reports")
    public Map<String, Object> getReports(
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        List<Expense> expenses = expenseRepository.findByDateBetween(start, end);
        return buildReport(expenses);
    }

    // Monthly Report
    @GetMapping("/reports/monthly")
    public Map<String, Object> getMonthlyReport(
            @RequestParam int year,
            @RequestParam int month) {

        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();

        List<Expense> expenses = expenseRepository.findByDateBetween(start, end);
        return buildReport(expenses);
    }

    // Yearly Report
    @GetMapping("/reports/yearly")
    public Map<String, Object> getYearlyReport(@RequestParam int year) {
        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        List<Expense> expenses = expenseRepository.findByDateBetween(start, end);
        return buildReport(expenses);
    }

    // ----------- Helper Method ------------
    private Map<String, Object> buildReport(List<Expense> expenses) {
        double total = expenses.stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                .sum();

        Map<String, Double> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getCategory() != null ? e.getCategory().toString() : "OTHER",
                        Collectors.summingDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                ));

        Map<String, Object> report = new HashMap<>();
        report.put("total", total);
        report.put("byCategory", categoryTotals);
        report.put("count", expenses.size());

        return report;
    }
}
