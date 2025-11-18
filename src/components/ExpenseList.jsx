import React, { useState } from "react";

export default function ExpenseList({ items, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    item: "",
    category: "",
    cost: "",
  });

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      item: expense.item,
      category: expense.category,
      cost: expense.cost,
    });
  };

  const saveEdit = () => {
    if (!form.item.trim() || !form.category.trim() || !form.cost) return;

    onEdit(editingId, {
      item: form.item.trim(),
      category: form.category.trim(),
      cost: Number(form.cost),
    });

    setEditingId(null);
    setForm({ item: "", category: "", cost: "" });
  };

  if (!items.length)
    return (
      <p
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        No expenses yet — add something to start tracking.
      </p>
    );

  return (
    <div className="expense-list" style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <thead
          style={{
            background: "linear-gradient(to right, #6366f1, #8b5cf6)",
            color: "#fff",
          }}
        >
          <tr>
            <th style={th}>Date</th>
            <th style={th}>Item</th>
            <th style={th}>Category</th>
            <th style={th}>Cost</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((exp) => (
            <tr key={exp.id}>
              {/* DATE */}
              <td style={td}>{exp.date}</td>

              {/* ITEM */}
              <td style={td}>
                {editingId === exp.id ? (
                  <input
                    value={form.item}
                    onChange={(e) => setForm({ ...form, item: e.target.value })}
                    style={input}
                  />
                ) : (
                  exp.item
                )}
              </td>

              {/* CATEGORY */}
              <td style={td}>
                {editingId === exp.id ? (
                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    style={input}
                  />
                ) : (
                  exp.category
                )}
              </td>

              {/* COST */}
              <td style={td}>
                {editingId === exp.id ? (
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) =>
                      setForm({ ...form, cost: e.target.value })
                    }
                    style={input}
                  />
                ) : (
                  exp.cost
                )}
              </td>

              {/* ACTIONS */}
              <td style={{ ...td, textAlign: "center" }}>
                {editingId === exp.id ? (
                  <button onClick={saveEdit} style={btnSave}>
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => startEdit(exp)} style={btn}>
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(exp.id)}
                      style={{ ...btn, background: "#ef4444" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Styles */
const th = {
  padding: "12px",
  fontWeight: "600",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const input = {
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "100%",
};

const btn = {
  margin: "0 4px",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  background: "#8b5cf6",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

const btnSave = {
  ...btn,
  background: "#10b981",
};