import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="app-sidebar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar-icon-active' : 'sidebar-icon'}>
        <span className="material-symbols-outlined">home</span>
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? 'sidebar-icon-active' : 'sidebar-icon'}>
        <span className="material-symbols-outlined">search</span>
      </NavLink>
      <NavLink to="/my-courses" className={({ isActive }) => isActive ? 'sidebar-icon-active' : 'sidebar-icon'}>
        <span className="material-symbols-outlined">play_circle</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'sidebar-icon-active' : 'sidebar-icon'}>
        <span className="material-symbols-outlined">person</span>
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'sidebar-icon-active' : 'sidebar-icon'}>
        <span className="material-symbols-outlined">mail</span>
      </NavLink>
    </div>
  );
}
