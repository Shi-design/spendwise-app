import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {user ? (
                    <>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Dashboard</NavLink>
                        <NavLink to="/reports" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Reports</NavLink>
                        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Settings</NavLink>
                        <button onClick={onLogout} className="nav-link logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
