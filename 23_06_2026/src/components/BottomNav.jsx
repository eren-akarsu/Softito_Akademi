import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="app-bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'bottom-nav-link-active' : 'bottom-nav-link'}>
        <span className="material-symbols-outlined">home</span>
        <span className="text-label-md">Ana Sayfa</span>
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'bottom-nav-link-active' : 'bottom-nav-link'}>
        <span className="material-symbols-outlined">search</span>
        <span className="text-label-md">Arama</span>
      </NavLink>
      <NavLink to="/my-courses" className={({ isActive }) => isActive ? 'bottom-nav-link-active' : 'bottom-nav-link'}>
        <span className="material-symbols-outlined">play_circle</span>
        <span className="text-label-md">Eğitimlerim</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'bottom-nav-link-active' : 'bottom-nav-link'}>
        <span className="material-symbols-outlined">person</span>
        <span className="text-label-md">Profil</span>
      </NavLink>
    </nav>
  );
}
