import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0", "#f4a261"];

export default function SpendingPie({ data }) {
  const entries = Object.entries(data).map(([category, value]) => ({ category, value }));
  if (entries.length === 0) return <p className="muted">No data yet — add expenses to see the chart.</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="value" data={entries} nameKey="category" cx="50%" cy="50%" outerRadius={90} label>
            {entries.map((entry, idx) => (
              <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}