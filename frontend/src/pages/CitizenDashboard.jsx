import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Clock, MapPin, ChevronRight, Layout, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
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

    const stats = {
        total: complaints.length,
        resolved: complaints.filter(c => c.status === 'RESOLVED').length,
        pending: complaints.filter(c => c.status === 'PENDING').length,
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING': return 'badge-pending';
            case 'ASSIGNED': return 'badge-assigned';
            case 'IN_PROGRESS': return 'badge-progress';
            case 'RESOLVED': return 'badge-resolved';
            default: return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ paddingBottom: '120px' }}
        >
            <div className="header-surface"></div>

            <div style={{ marginTop: '6rem', marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--sandal-dark)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
                    <Activity size={16} />
                    Live Community Pulse
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '60px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h1>Citizen Hub</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '640px', fontWeight: '500', lineHeight: '1.6' }}>
                            A collective effort for a resilient city. Navigate active reports, track resolution progress, and stay informed.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Link to="/report" className="btn btn-primary" style={{ padding: '18px 36px', fontSize: '1.05rem', boxShadow: 'var(--shadow-warm)' }}>
                            <PlusCircle size={20} />
                            Submit New Report
                        </Link>
                    </div>
                </div>

                {/* Summary Stats Bar - Non-Generic Layout */}
                <div style={{ display: 'flex', gap: '48px', marginTop: '4rem', padding: '32px 0', borderTop: '1px solid var(--border-subtle)' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Manifest</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            {stats.total} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Inquiries</span>
                        </div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)' }}></div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Resolution Rate</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Efficiency</span>
                        </div>
                    </div>
                    <div style={{ width: '1px', background: 'var(--border)' }}></div>
                    <div style={{ flex: 1, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>Local Authority Active</div>
                            <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700' }}>Operational Status</div>
                        </div>
                        <CheckCircle size={24} color="#166534" />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                <AnimatePresence>
                    {complaints.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.6, ease: [0.2, 1, 0.2, 1] }}
                            className="card"
                            style={{ padding: '36px', display: 'flex', flexDirection: 'column', background: 'white' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                                <span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700' }}>
                                    <Clock size={14} />
                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '14px', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.025em', lineHeight: '1.3' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '32px', lineHeight: '1.7', flex: '1', fontWeight: '500' }}>
                                {item.description}
                            </p>

                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '28px',
                                borderTop: '1px solid var(--border-subtle)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-warm)' }}>
                                        <MapPin size={15} color="var(--primary)" />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {item.category}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--sandal-medium)' }}>
                                    <ChevronRight size={22} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!loading && complaints.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '120px 40px', border: '1px dashed var(--border)', background: 'white', boxShadow: 'none', borderRadius: '32px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--surface-warm)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                        <Activity size={40} color="var(--sandal-medium)" />
                    </div>
                    <h2 style={{ marginBottom: '16px', color: 'var(--text-main)', fontSize: '2rem' }}>All Systems Balanced</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 40px', fontSize: '1.15rem', fontWeight: '500' }}>
                        We haven't received any active reports yet. Your contribution helps maintain urban standards.
                    </p>
                    <Link to="/report" className="btn btn-primary" style={{ padding: '16px 40px' }}>Initiate Official Report</Link>
                </div>
            )}
        </motion.div>
    );
};

export default CitizenDashboard;
