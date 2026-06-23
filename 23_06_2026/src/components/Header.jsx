import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="material-symbols-outlined header-icon">menu</span>
        <Link to="/" className="header-brand">EduFlow</Link>
      </div>
      <div className="header-right">
        <span className="material-symbols-outlined header-icon">notifications</span>
        <div className="flex-center">
          <span className="material-symbols-outlined header-icon">search</span>
        </div>
      </div>
    </header>
  );
}
