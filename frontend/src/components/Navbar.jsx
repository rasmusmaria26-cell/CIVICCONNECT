import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem' }}>
                CIVIC<span style={{ color: 'var(--text-main)' }}>CONNECT</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#e2e8f0', padding: '8px', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} />
                    </div>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user?.name}</span>
                    <span className="status-badge" style={{ fontSize: '0.6rem', marginLeft: '4px' }}>{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="btn" style={{ background: 'none', border: 'none', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
