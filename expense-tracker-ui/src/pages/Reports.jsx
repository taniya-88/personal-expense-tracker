import { useState } from "react";
import { getMonthlyReport, getYearlyReport } from "../api";
import "./Report.css";

export default function ReportPage() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [reportType, setReportType] = useState("monthly");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            let data;
            if (reportType === "monthly") {
                data = await getMonthlyReport(year, month);
            } else {
                data = await getYearlyReport(year);
            }
            setReport(data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch report. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-container">
            <h1 className="title">Expense Reports</h1>

            {/* Controls */}
            <div className="controls">
                <div className="form-group">
                    <label>Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                </div>

                {reportType === "monthly" && (
                    <div className="form-group">
                        <label>Month</label>
                        <input
                            type="number"
                            min="1"
                            max="12"
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Report Type</label>
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <button onClick={fetchReport} className="btn" disabled={loading}>
                    {loading ? "Loading..." : "Generate Report"}
                </button>
            </div>

            {/* Report Display */}
            {report && (
                <div className="report-box">
                    <h2>
                        {reportType === "monthly"
                            ? `Monthly Report (${year}-${month})`
                            : `Yearly Report (${year})`}
                    </h2>

                    <p className="total">
                        Total Expenses: <span>{report.total}</span>
                    </p>

                    <div className="category-grid">
                        {report.byCategory &&
                            Object.entries(report.byCategory).map(([cat, amt]) => (
                                <div key={cat} className="category-card">
                                    <span>{cat}</span>
                                    <strong>{amt}</strong>
                                </div>
                            ))}
                    </div>

                    <p>Total Count of Expenses: {report.count}</p>
                </div>
            )}
        </div>
    );
}
