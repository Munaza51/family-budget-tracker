import React, { useState } from "react";

export default function ExpenseForm({ onAdd }) {
  const [category, setCategory] = useState("Groceries");
  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  function submit(e) {
    e.preventDefault();
    if (!item || !cost) return;

    const exp = {
      id: Date.now(),
      category,
      item,
      cost: Number(cost),
      date
    };

    // اضافه کردن هزینه
    onAdd(exp);

    // ریست کردن فرم
    setItem("");
    setCost("");
    setCategory("Groceries");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <form className="form" onSubmit={submit} style={{ maxWidth: "400px", margin: "auto" }}>
      <label>
        Category
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Groceries</option>
          <option>Transport</option>
          <option>Utilities</option>
          <option>Healthcare</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        Item
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="e.g. Flour" />
      </label>

      <label>
        Cost
        <input value={cost} onChange={e => setCost(e.target.value)} type="number" placeholder="e.g. 300" />
      </label>

      <label>
        Date
        <input value={date} onChange={e => setDate(e.target.value)} type="date" />
      </label>

      <button
  type="submit"
  style={{
    backgroundColor: "#fff",
    color: "#8b5cf6",
    border: "2px solid #8b5cf6",
    padding: "6px 12px",      // کوچکتر از قبل
    borderRadius: "12px",      // گردتر
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "600",
    fontSize: "0.9rem",        // کمی کوچکتر برای جمع‌وجور شدن
    transition: "all 0.2s ease"
  }}
>
  Add Expense
</button>
    </form>
  );
}