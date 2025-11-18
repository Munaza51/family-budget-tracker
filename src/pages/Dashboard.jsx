import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Sparkles,
  Wallet,
  PieChart,
  Brain,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const LOCAL_KEY = "cw_expenses_v1";
const PURPLE = "#8b5cf6";
const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#d8b3ff"];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [aiTips, setAiTips] = useState("");
  const [loadingTips, setLoadingTips] = useState(false);
  const [filter, setFilter] = useState("");
  const [budgetAlert, setBudgetAlert] = useState(false);
  const [theme, setTheme] = useState("light");
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [timeFilter, setTimeFilter] = useState("all");

  const addExpenseRef = useRef(null);

  // Load expenses
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    setExpenses(raw ? JSON.parse(raw) : []);
  }, []);

  // Save + budget check
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(expenses));
    const total = expenses.reduce((s, e) => s + Number(e.cost || 0), 0);
    setBudgetAlert(total > 100000);
  }, [expenses]);

  // Add expense
  function addExpense(exp) {
    const withDate = { ...exp, date: exp.date || new Date().toISOString() };
    setExpenses((s) => [withDate, ...s]);
    setRecentlyAdded((s) => [withDate, ...s].slice(0, 3));
  }

  // Quick Add
  function quickAdd(name, cost, category) {
    const exp = {
      id: Date.now(),
      item: name,
      cost,
      category,
      date: new Date().toISOString(),
    };
    addExpense(exp);
  }

  // Remove
  function removeExpense(id) {
    setExpenses((s) => s.filter((e) => e.id !== id));
  }

  // Full edit: receives updated object {item, category, cost}
  function editExpense(id, updated) {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  }

  // Totals by category
  const totalsByCategory = expenses.reduce((acc, e) => {
    const cat = e.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + Number(e.cost || 0);
    return acc;
  }, {});

  // Monthly trend
  const monthlyTrend = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + Number(e.cost || 0);
    return acc;
  }, {});
  const trendData = Object.entries(monthlyTrend).map(([month, total]) => ({
    month,
    total,
  }));

  // AI tips
  async function getTips(summary) {
  try {
    const res = await fetch("/.netlify/functions/aiTips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch AI tips");
    }

    const data = await res.json();
    return data.tips;

  } catch (error) {
    console.error("Error fetching AI tips:", error);
    return "Could not fetch tips at this time.";
  }
}


  // Spending summary values
  const totalSpent = expenses.reduce((s, e) => s + Number(e.cost || 0), 0);
  const savingGoal = 200000;
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round(((savingGoal - totalSpent) / savingGoal) * 100))
  );

  // Filtered expenses
  const filteredExpenses = expenses.filter((e) => {
    const matchesFilter =
      (e.item || "").toString().toLowerCase().includes(filter.toLowerCase()) ||
      (e.category || "").toString().toLowerCase().includes(filter.toLowerCase());
    if (timeFilter === "month") {
      const now = new Date();
      return matchesFilter && new Date(e.date).getMonth() === now.getMonth();
    } else if (timeFilter === "week") {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return matchesFilter && new Date(e.date) >= weekAgo;
    }
    return matchesFilter;
  });

  // Styles
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      color: "#000",
      maxWidth: "1200px",
      margin: "auto",
      padding: "24px",
      background: "#fff",
      transition: "background 0.3s, color 0.3s",
    },
    toggleButton: { cursor: "pointer", position: "absolute", top: 20, right: 20 },
    // HERO with purple -> white gradient (chosen)
    hero: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  margin: "28px 0",
  padding: "40px 32px",
  borderRadius: "20px",
  background: PURPLE, // بنفش واقعی
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  flexWrap: "wrap",
  textAlign: "left",
},

heroText: { 
  flex: "1 1 420px", 
  minWidth: "260px", 
  color: "#fff",              // نوشته سفید
  fontFamily: "'Inter', sans-serif", // فونت مینیمال
},

heroImg: { 
  width: "220px", 
  height: "220px", 
  borderRadius: "16px", 
  objectFit: "cover",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
},

mainTitle: { 
  fontSize: "2.2rem", 
  color: "#fff",             // سفید
  marginBottom: "10px", 
  fontWeight: 700,
  fontFamily: "'Inter', sans-serif",
},

heroDesc: { 
  fontSize: "1.05rem", 
  lineHeight: 1.5, 
  color: "#f3f3f3", 
  marginBottom: "12px",
  fontFamily: "'Inter', sans-serif",
},

features: { 
  listStyle: "none", 
  paddingLeft: 0, 
  display: "flex", 
  flexDirection: "column", 
  gap: "8px", 
  color: "#fff", 
  margin: 0,
  fontFamily: "'Inter', sans-serif",
},

featureItem: { 
  display: "flex", 
  alignItems: "center", 
  fontSize: "0.95rem",
  color: "#fff",
},

featureArrow: { 
  marginRight: "8px", 
  color: "#fff", 
  fontWeight: 700,
},

// دکمه پایان متن
heroButton: {
  padding: "12px 20px",
  background: "#8b5cf6",
  color: "#9c6ff1",
  border: "none",
  borderRadius: "10px",
  marginTop: "16px",
  cursor: "pointer",
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
},

    // Top grid (3 columns)
    topGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
      background: "#fff",
    },
    addExpenseCard: { background: PURPLE, color: "#fff" },
    quickAddCard: { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", justifyContent: "center" },
    quickAddButton: {
      padding: "8px 12px",
      borderRadius: "8px",
      background: PURPLE,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      minWidth: "110px",
    },

    // Summary row (2 columns)
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "20px",
      marginTop: "24px",
    },
    spendingSummaryCard: {
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
      background: "#fff",
    },
    summaryBox: {
      backgroundColor: "#fafafa",
      padding: "14px",
      borderRadius: "10px",
      marginBottom: "12px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
    },
    aiTips: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      backgroundColor: PURPLE,
      color: "#fff",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "10px",
    },
    aiButton: {
      backgroundColor: PURPLE,
      color: "#fff",
      border: "none",
      padding: "10px 14px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    sectionMargin: { marginTop: "28px" },
    inputFilter: { padding: "8px 10px", borderRadius: "8px", border: "1px solid #e5e7eb", width: "170px", fontSize: "0.95rem" },

    miniList: { display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" },
    miniItem: { padding: "6px 10px", borderRadius: "8px", background: PURPLE, color: "#fff", fontSize: "0.85rem" },

    progressContainer: { background: "#eee", borderRadius: "12px", overflow: "hidden", marginTop: "10px" },
    progressBar: (pct) => ({ height: "14px", width: `${pct}%`, background: PURPLE, transition: "width 0.4s ease" }),
  };

  return (
    <div style={styles.container}>
      {/* Theme toggle */}
      <div style={styles.toggleButton} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.mainTitle}><Wallet size={22} /> Family Budget Tracker</h1>
          <p style={styles.heroDesc}>Track your expenses, see trends, and save smarter.</p>

          <ul style={styles.features}>
            <li style={styles.featureItem}><span style={styles.featureArrow}>➡</span>Real-time expense tracking</li>
            <li style={styles.featureItem}><span style={styles.featureArrow}>➡</span>Category & monthly breakdowns</li>
            <li style={styles.featureItem}><span style={styles.featureArrow}>➡</span>Smart AI suggestions</li>
            <li style={styles.featureItem}><span style={styles.featureArrow}>➡</span>Budget alerts & gamification</li>
          </ul>

          {/* Recently Added */}
          {recentlyAdded.length > 0 && (
            <div style={styles.miniList}>
              {recentlyAdded.map((e) => (
                <div key={e.id} style={styles.miniItem}>
                  {e.item} — {e.cost} AFN
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 14 }}>
            <button
              onClick={() => addExpenseRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                background: "#9c6ff1",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                marginTop: 12,
              }}
            >
              Start Tracking
            </button>
          </div>
        </div>

        <img
          style={styles.heroImg}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwQe_UEirO7xN3DfMTEd3SIG9hL8bTKAt5Q&s"
          alt="Budget illustration"
        />
      </div>

{/* ===== Dashboard Sections Overview Table with Scroll ===== */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    margin: "40px auto",
    padding: "20px",
    maxWidth: "1200px",
    background: "#8b5cf6", 
    borderRadius: "16px",
    color: "#fff",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  }}
>
  {[
    { 
      title: "Add Expense", 
      desc: "Add a new cost quickly", 
      refId: "addExpenseSection" 
    },
    { 
      title: "Quick Add", 
      desc: "Fast presets for common expenses", 
      refId: "quickAddSection" 
    },
    { 
      title: "Spending Summary", 
      desc: "Overview of your monthly spending", 
      refId: "spendingSummarySection" 
    },
    { 
      title: "AI Tips", 
      desc: "Smart suggestions to optimize", 
      refId: "aiTipsSection" 
    },
    { 
      title: "Monthly Trend", 
      desc: "See how your expenses change", 
      refId: "monthlyTrendSection" 
    },
    { 
      title: "Spending by Category", 
      desc: "Visual breakdown of categories", 
      refId: "categorySection" 
    },
  ].map((section, idx) => (
    <div
      key={idx}
      style={{
        background: "#9c6ff1",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "170px",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px 0",
          fontWeight: 600,
          fontSize: "1.2rem",
        }}
      >
        {section.title}
      </h3>

      {/* ✅ توضیح کوتاه */}
      <p
        style={{
          fontSize: "0.9rem",
          opacity: 0.9,
          margin: "0 0 14px 0",
        }}
      >
        {section.desc}
      </p>

      <button
        style={{
          marginTop: "auto",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#fff",
          color: "#8b5cf6",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => {
          const el = document.getElementById(section.refId);
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Go
      </button>
    </div>
  ))}
</div>
      
      {/* Top row: Add Expense | Quick Add | Monthly Trend */}
      <div style={{ ...styles.topGrid }} ref={addExpenseRef}>
        <section id="addExpenseSection" style={{ ...styles.card, ...styles.addExpenseCard }}>
          <h3 style={{ margin: 0, color: "#fff" }}><Sparkles /> Add Expense</h3>
          <div style={{ marginTop: 12 }}>
            <ExpenseForm onAdd={addExpense} />
          </div>
        </section>

        <section id="quickAddSection" style={{ ...styles.card, ...styles.quickAddCard }}>
          <h3 style={{ margin: 0 }}><Sparkles /> Quick Add</h3>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {["Food", "Transport", "Rent", "Groceries", "Electricity", "Water", "Internet", "Entertainment"].map((item, i) => (
              <button
                key={i}
                style={styles.quickAddButton}
                onClick={() => quickAdd(item, 100 * (i + 1), "General")}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section id="monthlyTrendSection" style={{ ...styles.card }}>
          <h3 style={{ margin: 0 }}><TrendingUp /> Monthly Trend</h3>
          <div style={{ marginTop: 12 }}>
            {trendData.length === 0 ? (
              <p style={{ color: "#666" }}>Add expenses to see your monthly spending trend.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke={PURPLE} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>

      {/* Summary row: Spending Summary (with AI tips) | Spending by Category */}
      <div style={styles.summaryGrid}>
        <section id="spendingSummarySection" style={styles.spendingSummaryCard}>
          {budgetAlert && (
            <div style={{ background: "#fff", color: PURPLE, padding: "6px 12px", borderRadius: 8, display: "inline-block", fontWeight: 700 }}>
              ⚠️ Budget exceeded!
            </div>
          )}

          <h3 style={{ marginTop: 12 }}><PieChart /> Spending Summary</h3>

          <div style={styles.summaryBox}>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, color: "#666" }}>Total Spent</p>
              <h2 style={{ margin: "8px 0" }}>{totalSpent.toLocaleString()} AFN</h2>
            </div>

            <div style={styles.progressContainer}>
              <div style={styles.progressBar(progressPercent)} />
            </div>

            <div style={{ marginTop: 8, color: "#666" }}>Goal: {savingGoal.toLocaleString()} AFN</div>
          </div>

          <div>
            <button style={styles.aiButton} onClick={askAITips} disabled={loadingTips}>
              {loadingTips ? "🤔 Thinking..." : "Get AI Saving Tips"}
            </button>

            {aiTips && (
              <div id="aiTipsSection" style={styles.aiTips}>
                <Brain size={18} />
                <div>
                  <strong>AI Suggestions</strong>
                  <div style={{ fontSize: 13, marginTop: 6 }}>{aiTips}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="categorySection" style={styles.card}>
          <h3 style={{ marginTop: 0 }}><PieChart /> Spending by Category</h3>

          {Object.keys(totalsByCategory).length === 0 ? (
            <p style={{ color: "#666" }}>Add expenses to start tracking categories.</p>
          ) : (
            <div style={{ marginTop: 12 }}>
              <ResponsiveContainer width="100%" height={220}>
                <RePieChart>
                  <Pie
                    data={Object.entries(totalsByCategory).map(([name, value]) => ({ name, value }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {Object.entries(totalsByCategory).map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      {/* Filter + Expense List (bottom) */}
      <div style={{ ...styles.card, ...styles.sectionMargin }}>
        <h3 style={{ marginTop: 0 }}><Sparkles /> All Expenses</h3>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search expenses..."
            style={styles.inputFilter}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} style={styles.inputFilter}>
            <option value="all">All time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>

        <ExpenseList items={filteredExpenses} onDelete={removeExpense} onEdit={editExpense} />
      </div>
    </div>
  );
    }