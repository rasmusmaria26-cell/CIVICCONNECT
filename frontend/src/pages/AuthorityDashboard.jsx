import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const AuthorityDashboard = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const res = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(res.data);
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
        <div className="container">
            <h1>Authority Portal</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage and resolve citizen reported issues.</p>

            <div className="card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '16px' }}>Status</th>
                            <th style={{ padding: '16px' }}>Issue</th>
                            <th style={{ padding: '16px' }}>Citizen</th>
                            <th style={{ padding: '16px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px' }}>
                                    <span className={`status-badge status-${item.status.toLowerCase().replace('_', '')}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <strong>{item.title}</strong>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    {item.citizen?.name}
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <select
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                        style={{ padding: '8px', borderRadius: '4px' }}
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="ASSIGNED">Assigned</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthorityDashboard;
