import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Clock, MapPin, ChevronRight, Layout } from 'lucide-react';
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
            <div style={{ marginTop: '6rem', marginBottom: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--sandal-dark)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                    <Layout size={16} />
                    Perspective
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h1>Citizen Hub</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: '500' }}>
                            Transparency in action. Monitor the status of community reports and contribute to a better urban environment.
                        </p>
                    </div>
                    <Link to="/report" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1rem' }}>
                        <PlusCircle size={20} />
                        File a Report
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                <AnimatePresence>
                    {complaints.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                            className="card"
                            style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>
                                    <Clock size={14} />
                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '12px', fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.6', flex: '1' }}>
                                {item.description}
                            </p>

                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '24px',
                                borderTop: '1px solid var(--border-subtle)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-warm)', border: '1px solid var(--border-subtle)' }}>
                                        <MapPin size={14} color="var(--sandal-dark)" />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                                        {item.category}
                                    </span>
                                </div>
                                <div style={{ color: 'var(--sandal-medium)' }}>
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!loading && complaints.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '120px 40px', border: '2px dashed var(--border)', background: 'transparent', boxShadow: 'none' }}>
                    <h2 style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>Quiet Community</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
                        No active reports found. If you see something that needs attention, please file a report.
                    </p>
                    <Link to="/report" className="btn btn-outline">Initial Report</Link>
                </div>
            )}
        </motion.div>
    );
};

export default CitizenDashboard;
