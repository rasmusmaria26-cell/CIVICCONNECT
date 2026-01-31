import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            alert('Authentication Failed: Credentials not recognized.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-warm)', padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ maxWidth: '480px', width: '100%', padding: '60px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.08)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--sandal-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid var(--border)' }}>
                        <UserCheck color="var(--sandal-dark)" size={32} />
                    </div>
                    <h1>Log In</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Enter your credentials to continue.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="login-email">Email Identity</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="login-email"
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="name@organization.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label htmlFor="login-password" style={{ marginBottom: 0 }}>Private Key</label>
                            <a href="#" style={{ fontSize: '0.75rem', color: 'var(--sandal-dark)', textDecoration: 'none', fontWeight: '800' }}>Forgotten?</a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                id="login-password"
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '18px', marginTop: '2.5rem', justifyContent: 'center' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Verifying...' : 'Establish Connection'}
                        {!isSubmitting && <ArrowRight size={20} />}
                    </button>
                </form>

                <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        No account active? <br />
                        <Link to="/register" style={{ color: 'var(--text-main)', fontWeight: '800', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>Join the community</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
