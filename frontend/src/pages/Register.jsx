import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCircle, ArrowRight, BookOpen } from 'lucide-react';

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
            alert('Registration unsuccessful. Please verify your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-warm)', padding: '40px 24px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ maxWidth: '540px', width: '100%', padding: '60px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.08)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--sandal-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid var(--border)' }}>
                        <BookOpen color="var(--sandal-dark)" size={32} />
                    </div>
                    <h1>Join</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>Register to contribute to your city's progress.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Professional Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Official Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="name@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <input
                                type="password"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Security Credentials"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '2.5rem' }}>
                        <label>Administrative Role</label>
                        <div style={{ position: 'relative' }}>
                            <UserCircle style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                            <select
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={isSubmitting}
                            >
                                <option value="CITIZEN">Citizen Participant</option>
                                <option value="AUTHORITY">Urban Authority</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '20px', justifyContent: 'center' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Registering...' : 'Complete Registration'}
                        {!isSubmitting && <ArrowRight size={22} />}
                    </button>
                </form>

                <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Already a member? <br />
                        <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: '800', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}>Enter Portal</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
