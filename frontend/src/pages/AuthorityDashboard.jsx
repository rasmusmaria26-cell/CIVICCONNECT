import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, MapPin, Tag } from 'lucide-react';

const AuthorityDashboard = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/complaints');
            setComplaints(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const remarks = prompt("Add a remark for this status change:");
        if (remarks === null) return;

        try {
            await axios.patch(`http://localhost:5000/api/complaints/${id}/status`, {
                status: newStatus,
                remarks: remarks || 'Status updated by authority'
            });
            fetchComplaints();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container"
        >
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                    <ShieldCheck color="var(--primary-light)" size={32} />
                    <h1 style={{ fontSize: '2.5rem', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Authority Portal
                    </h1>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>Manage and resolve community reports with priority.</p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="card"
                style={{ padding: '0', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.4)' }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)' }}>
                                <th style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Issue Details</th>
                                <th style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Citizen</th>
                                <th style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {complaints.map((item, idx) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '20px' }}>
                                            <span className={`status-badge status-${item.status.toLowerCase().replace('_', '')}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '1rem' }}>{item.title}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                <Tag size={12} /> {item.category}
                                                <span style={{ opacity: 0.3 }}>|</span>
                                                <MapPin size={12} /> {item.latitude?.toFixed(2)}, {item.longitude?.toFixed(2)}
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={12} />
                                                </div>
                                                <span style={{ fontSize: '0.9rem' }}>{item.citizen?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                className="glass"
                                                style={{ padding: '8px 12px', border: '1px solid var(--glass-border)', color: 'white', background: 'rgba(0,0,0,0.2)' }}
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="ASSIGNED">Assigned</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="RESOLVED">Resolved</option>
                                            </select>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AuthorityDashboard;
