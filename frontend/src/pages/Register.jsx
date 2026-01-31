import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCircle, ArrowRight, Shield } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CITIZEN');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await register(name, email, password, role);
            navigate('/');
        } catch (err) {
            alert('Registration failed: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="auth-container"
            style={{ maxWidth: '520px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--gradient-main)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 20px 40px var(--primary-glow)'
                    }}
                >
                    <Shield color="white" size={40} />
                </motion.div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Join CivicConnect</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Empower your community through shared reporting</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="reg-name">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="reg-name"
                                type="text"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Rasmus"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="reg-email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="reg-email"
                                type="email"
                                style={{ paddingLeft: '48px' }}
                                placeholder="rasmus@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="reg-password">Security Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="reg-password"
                                type="password"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Minimum 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="reg-role">Platform Role</label>
                        <div style={{ position: 'relative' }}>
                            <UserCircle style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <select
                                id="reg-role"
                                style={{ paddingLeft: '48px' }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={isSubmitting}
                            >
                                <option value="CITIZEN">Citizen Reporter</option>
                                <option value="AUTHORITY">Urban Authority</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '20px', fontSize: '1.1rem', gap: '10px' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Initializing Account...' : 'Get Started'}
                    {!isSubmitting && <ArrowRight size={22} />}
                </button>
            </form>

            <p style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Member already? <Link to="/login" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', borderBottom: '2px solid var(--primary)' }}>Log back in</Link>
            </p>
        </motion.div>
    );
};

export default Register;
