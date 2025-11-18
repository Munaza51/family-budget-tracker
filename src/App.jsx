import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Essentials from "./pages/Essentials";
import About from "./pages/About";

export default function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="app">
      {/* ✅ CSS مستقیم داخل App.js */}
      <style>{`
        :root {
          --main-color: #7c3aed; /* پالت خود اپ */
          --text-color: #1f2937;
          --light-color: #ffffff;
          --hover-color: #9f5cf9;
        }

        .nav {
          width: 100%;
          background: var(--light-color);
          padding: 20px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .nav h1 {
          font-size: 22px;
          color: var(--main-color);
          font-weight: 700;
        }

        .nav nav {
          display: flex;
          gap: 30px;
        }

        .nav a {
          color: var(--text-color);
          font-size: 15px;
          text-decoration: none;
          font-weight: 600;
          padding-bottom: 4px;
          transition: 0.3s ease;
        }

        .nav a:hover {
          color: var(--hover-color);
        }

        .active {
          color: var(--main-color) !important;
          border-bottom: 2px solid var(--main-color);
        }

        @media (max-width: 700px) {
          .nav {
            padding: 15px 25px;
          }

          .nav h1 {
            font-size: 18px;
          }

          .nav nav {
            gap: 15px;
          }

          .nav a {
            font-size: 14px;
          }
        }

        main {
          padding: 20px;
        }

        footer.footer {
          text-align: center;
          padding: 15px;
          font-size: 0.85rem;
          color: var(--text-color);
          border-top: 1px solid #e5e5e5;
        }
      `}</style>

      <header className="nav">
        <h1>famTrack</h1>
        <nav>
          <Link to="/" className={isActive("/")}>Dashboard</Link>
          <Link to="/essentials" className={isActive("/essentials")}>Essentials</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/essentials" element={<Essentials />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <small>Built for CodeWeekend Capstone — keep it simple, finish strong</small>
      </footer>
    </div>
  );
}