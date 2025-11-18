import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutDashboard() {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate(); // برای ناوبری واقعی

  const features = [
    {
      id: "expense",
      title: "Track Expenses",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwQe_UEirO7xN3DfMTEd3SIG9hL8bTKAt5Q&s",
      desc: "Log every expense easily with category, date, and item tracking. Stay organized and never miss a payment.",
    },
    {
      id: "ai",
      title: "AI Saving Tips",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKiOdgKDmfc1h0sBjeStDnigwOAVRNInj7g&usqp=CAU", // Visual Reports image
      desc: "Use AI to get personalized recommendations to save more efficiently. Smart suggestions help you spend wisely.",
    },
    {
      id: "reports",
      title: "Visual Reports",
      img: "https://enveloppe-budget.fr/cdn/shop/products/defidumois_7.png?v=1662215766", // AI Tips image
      desc: "Beautiful charts and summaries make your spending clear at a glance. Understand where your money goes.",
    },
    {
      id: "essentials",
      title: "Essentials Tracker",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWXrhhzx4Sa0jn6cDCx1RJRSWwrYp98BGIsN9FQ3HbylZR8Gk6y0tYy0&s=10",
      desc: "Track household essentials, mark items as bought, or quickly add new necessities. Keep your family organized.",
    },
    {
      id: "quickAdd",
      title: "Quick Add Suggestions",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDt7cxdGQnKvI7XIbQICzaWi2JJ9b3S-8m_jxK9zwPL0c3fzM5k_ofVdwG&s=10",
      desc: "Pre-made essential items for quick adding. Click and add instantly to your checklist without typing.",
    },
    {
      id: "incomeSavings",
      title: "Income & Savings",
      img: "https://enveloppe-budget.fr/cdn/shop/products/defidumois_1.png?v=1662213389", // همان Essentials Tracker image
      desc: "Track your monthly income and savings. Set goals and see progress directly on your dashboard.",
    },
  ];

  const styles = {
    container: { fontFamily: "'Poppins', sans-serif", maxWidth: "1200px", margin: "auto", padding: "24px" },
    header: { marginBottom: "32px" },
    title: { fontSize: "2rem", fontWeight: 700, color: "#7c3aed", marginBottom: "12px" },
    subtitle: { color: "#444", lineHeight: 1.6, fontSize: "1rem" },
    grid: { display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: "24px" },
    card: { background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.06)", cursor: "pointer", transition: "0.2s" },
    cardImg: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "12px", marginBottom: "12px" },
    cardTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#7c3aed", marginBottom: "8px" },
    cardDesc: { fontSize: "0.95rem", color: "#555", lineHeight: 1.5 },
    contactCard: { background: "#7c3aed", color: "#fff", padding: "20px", borderRadius: "16px", textAlign: "center" },
    contactBtn: { background: "#fff", color: "#7c3aed", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", marginTop: "12px", fontWeight: 600 },
    socialLink: { color: "#fff", textDecoration: "underline", fontWeight: 600 },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>💡 About FamTrack</h1>
        <p style={styles.subtitle}>
          Family Budget Tracker is a modern web app to help families manage daily expenses, track essentials, and set smart saving goals. Everything is visual, simple, and interactive designed to make financial management stress free.
        </p>
      </header>

      {/* What it Offers Section */}
<div style={{ textAlign: "center", marginBottom: "32px" }}>
  <h2 style={{
    fontWeight: 800,
    fontSize: "1.5rem",
    marginBottom: "8px",
 color: "#7c3aed",
  }}>
    What it Offers
  </h2>
  <div style={{
    width: "50px",
    height: "3px",
    backgroundColor: "#7c3aed",
    margin: "0 auto",
    borderRadius: "2px",
  }}></div>
</div>
      
      {/* Features */}
      <section style={styles.grid}>
        {features.map((f) => (
          <div key={f.id} style={styles.card} onClick={() => setActiveFeature(f.id)}>
            <img src={f.img} alt={f.title} style={styles.cardImg} />
            <h3 style={styles.cardTitle}>{f.title}</h3>
            {activeFeature === f.id && <p style={styles.cardDesc}>{f.desc}</p>}
          </div>
        ))}
      </section>

      {/* Tech Stack */}
      <section style={{ ...styles.grid, marginTop: "40px" }}>
        <div style={{ ...styles.card, textAlign: "center" }}>
          <h3 style={styles.cardTitle}>🧩 Tech Stack</h3>
          <p style={styles.cardDesc}>React, CSS, LocalStorage, OpenAI API</p>
        </div>
      </section>

      {/* Contact */}
      <section style={{ marginTop: "40px" }}>
        <div style={styles.contactCard}>
          <h3>📬 Contact Us</h3>
          <p>If you have questions, feedback, or want to collaborate, reach out:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Instagram</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={styles.socialLink}>LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.socialLink}>GitHub</a>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer" style={styles.socialLink}>Behance</a>
          </div>
          <button style={styles.contactBtn} onClick={() => navigate("/")}>
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}