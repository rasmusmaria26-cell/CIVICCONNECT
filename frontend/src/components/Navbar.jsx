import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Zap } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--gradient)', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={20} color="white" fill="white" />
                </div>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>
                    CIVIC<span style={{ color: 'var(--primary-light)' }}>CONNECT</span>
                </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
                    <div style={{ background: 'var(--glass-border)', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} color="var(--primary-light)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.85rem', lineHeight: '1' }}>{user?.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800', marginTop: '2px' }}>{user?.role}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn"
                    style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        padding: '8px 16px',
                        fontSize: '0.85rem',
                        gap: '8px'
                    }}
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
