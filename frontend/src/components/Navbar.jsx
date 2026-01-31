import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <div style={{ width: '32px', height: '32px', background: 'var(--sandal-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '12px', height: '12px', border: '2px solid white', borderRadius: '2px' }}></div>
                </div>
                <span style={{ fontWeight: '800', letterSpacing: '-0.02em' }}>CIVIC<span style={{ color: 'var(--sandal-dark)' }}>CONNECT</span></span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 16px', background: 'var(--surface-warm)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--sandal-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={14} color="var(--sandal-dark)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1' }}>{user?.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px' }}>{user?.role}</span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                    <LogOut size={16} />
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
