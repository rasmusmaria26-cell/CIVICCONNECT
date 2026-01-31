import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, MapPin, Tag, Download, Settings } from 'lucide-react';

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
        const remarks = prompt("Official Remark for Status Modification:");
        if (remarks === null) return;

        try {
            await axios.patch(`http://localhost:5000/api/complaints/${id}/status`, {
                status: newStatus,
                remarks: remarks || 'Standard status update'
            });
            fetchComplaints();
        } catch (err) {
            alert("Update Failed: Protocol Error");
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
            <div style={{ marginTop: '6rem', marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--sandal-dark)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                        <Briefcase size={16} />
                        Administrative Portal
                    </div>
                    <h1>Authority Terminal</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px' }}>Oversee and resolve urban infrastructure reports with precision.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" style={{ border: '1px solid var(--border)' }}>
                        <Settings size={18} />
                        Preferences
                    </button>
                    <button className="btn btn-primary">
                        <Download size={18} />
                        Export Manifest
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Report Status</th>
                                <th>Subject & Details</th>
                                <th>Reporter Context</th>
                                <th>Action Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {complaints.map((item, idx) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        style={{ borderBottom: '1px solid var(--border-subtle)' }}
                                    >
                                        <td style={{ paddingLeft: '32px' }}>
                                            <span className={`badge ${getStatusClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '800', marginBottom: '6px', fontSize: '1.1rem', color: 'var(--text-main)', letterSpacing: '-0.01em' }}>{item.title}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <Tag size={12} color="var(--primary)" /> {item.category}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <MapPin size={12} color="var(--accent)" /> {item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--surface-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                                    <User size={14} color="var(--sandal-dark)" />
                                                </div>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '800' }}>{item.citizen?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ paddingRight: '32px' }}>
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                className="input-field"
                                                style={{ padding: '10px 14px', width: 'auto', minWidth: '150px', fontSize: '0.85rem', fontWeight: '700', borderRadius: '10px' }}
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
            </div>
        </motion.div>
    );
};

export default AuthorityDashboard;
