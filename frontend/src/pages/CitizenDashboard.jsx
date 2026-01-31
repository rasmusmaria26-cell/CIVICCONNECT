import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, AlertCircle, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CitizenDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/complaints');
                setComplaints(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING': return 'status-pending';
            case 'ASSIGNED': return 'status-assigned';
            case 'IN_PROGRESS': return 'status-progress';
            case 'RESOLVED': return 'status-resolved';
            default: return '';
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemAnim = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your reports and civic updates</p>
                </div>
                <Link to="/report" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                    <PlusCircle size={20} style={{ marginRight: '10px' }} />
                    Report Issue
                </Link>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid"
            >
                <AnimatePresence>
                    {complaints.map(item => (
                        <motion.div
                            key={item.id}
                            variants={itemAnim}
                            layout
                            className="card"
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    <Clock size={14} />
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>{item.description}</p>

                            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--primary-light)' }}>
                                    #{item.category.toUpperCase()}
                                </span>
                                {item.latitude && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        <MapPin size={12} />
                                        Location Tagged
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {!loading && complaints.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '6rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed var(--glass-border)' }}
                >
                    <AlertCircle size={64} style={{ marginBottom: '20px', color: 'var(--text-muted)', opacity: 0.5 }} />
                    <h2 style={{ marginBottom: '12px' }}>No reports yet</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
                        Your dashboard is empty. Report any civic issues in your area to help the community.
                    </p>
                    <Link to="/report" className="btn btn-primary">Submit First Report</Link>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CitizenDashboard;
