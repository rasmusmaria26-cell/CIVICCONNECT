import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, MapPin, Tag, Download, Settings, BarChart3, Database, ShieldCheck, Activity } from 'lucide-react';

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

    const stats = {
        total: complaints.length,
        resolved: complaints.filter(c => c.status === 'RESOLVED').length,
        inProgress: complaints.filter(c => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length,
    };

    const handleStatusChange = async (id, newStatus) => {
        const remarks = prompt("Official Administrative Remark for Progress Update:");
        if (remarks === null) return;

        try {
            await axios.patch(`http://localhost:5000/api/complaints/${id}/status`, {
                status: newStatus,
                remarks: remarks || 'System protocol update'
            });
            fetchComplaints();
        } catch (err) {
            alert("Administrative Update Failure.");
        }
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

            <div style={{ marginTop: '6rem', marginBottom: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--sandal-dark)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
                    <ShieldCheck size={16} />
                    High-Level Civic Oversight
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
                    <div>
                        <h1>Authority Terminal</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '640px', fontWeight: '500' }}>
                            Advanced management matrix for urban infrastructure resolution and cross-departmental coordination.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button className="btn btn-outline" style={{ background: 'white' }}>
                            <Settings size={18} />
                            Governance Config
                        </button>
                        <button className="btn btn-primary">
                            <Download size={18} />
                            Generate Manifest
                        </button>
                    </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: '4rem' }}>
                    <div className="card" style={{ padding: '32px', background: 'white', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-muted)' }}>
                            <Database size={18} />
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Active Database</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{stats.total}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>Total Reports Cataloged</div>
                    </div>

                    <div className="card" style={{ padding: '32px', background: 'white', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--sandal-dark)' }}>
                            <BarChart3 size={18} />
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Resolution Metric</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#166534' }}>{stats.resolved}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>Reports Successfully Closed</div>
                    </div>

                    <div className="card" style={{ padding: '32px', background: 'white', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#b45309' }}>
                            <Activity size={18} />
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>Workflow Load</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#b45309' }}>{stats.inProgress}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>Reports Under Processing</div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '40px' }}>Lifecycle Status</th>
                                <th>Subject & Intelligence</th>
                                <th>Reporting Entity</th>
                                <th style={{ paddingRight: '40px' }}>Administrative Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {complaints.map((item, idx) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.02 }}
                                        style={{ borderBottom: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? 'transparent' : 'var(--surface-warm)' }}
                                    >
                                        <td style={{ paddingLeft: '40px' }}>
                                            <span className={`badge ${getStatusClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '32px 24px' }}>
                                            <div style={{ fontWeight: '800', marginBottom: '8px', fontSize: '1.15rem', color: 'var(--text-main)', letterSpacing: '-0.015em' }}>{item.title}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Tag size={14} color="var(--primary)" /> {item.category}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <MapPin size={14} color="var(--sandal-dark)" /> {item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                                    <User size={16} color="var(--sandal-dark)" />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1' }}>{item.citizen?.name}</span>
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginTop: '4px' }}>Citizen Operator</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ paddingRight: '40px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <select
                                                    value={item.status}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    className="input-field"
                                                    style={{ padding: '10px 14px', width: 'auto', minWidth: '160px', fontSize: '0.85rem', fontWeight: '800', borderRadius: '10px', background: 'white' }}
                                                >
                                                    <option value="PENDING">Pending Review</option>
                                                    <option value="ASSIGNED">Assign Unit</option>
                                                    <option value="IN_PROGRESS">Active Work</option>
                                                    <option value="RESOLVED">Final Resolution</option>
                                                </select>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthorityDashboard;
