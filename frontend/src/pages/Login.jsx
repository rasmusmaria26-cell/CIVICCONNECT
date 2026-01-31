import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

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
            alert('Login failed: ' + (err.response?.data?.error || err.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="auth-container"
        >
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    style={{
                        width: '72px',
                        height: '72px',
                        background: 'var(--gradient-main)',
                        borderRadius: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 20px 40px var(--primary-glow)',
                        position: 'relative'
                    }}
                >
                    <Sparkles color="white" size={32} />
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', inset: '-10px', background: 'var(--primary)', filter: 'blur(20px)', zIndex: -1, borderRadius: '50%' }}
                    />
                </motion.div>
                <h1 style={{ fontSize: '2.8rem', marginBottom: '0.75rem', fontWeight: '800', letterSpacing: '-0.04em' }}>Welcome</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Enter your credentials to access the hub</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="login-email">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                        <input
                            id="login-email"
                            type="email"
                            style={{ paddingLeft: '56px', background: 'rgba(255,255,255,0.02)' }}
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <label htmlFor="login-password" style={{ marginBottom: 0 }}>Password</label>
                        <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary-light)', textDecoration: 'none', fontWeight: '700' }}>Forgot?</a>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                        <input
                            id="login-password"
                            type="password"
                            style={{ paddingLeft: '56px', background: 'rgba(255,255,255,0.02)' }}
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
                    style={{ width: '100%', padding: '20px', fontSize: '1.15rem', marginTop: '2rem', gap: '12px' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
                    {!isSubmitting && <ArrowRight size={22} />}
                </button>
            </form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: '3rem', textAlign: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}
            >
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Don't have an account yet? <br />
                    <Link to="/register" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', display: 'inline-block', marginTop: '8px', borderBottom: '2px solid var(--primary)' }}>Start reporting today</Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Login;
