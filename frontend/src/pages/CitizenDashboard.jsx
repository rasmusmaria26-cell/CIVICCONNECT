import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CitizenDashboard = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            const res = await axios.get('http://localhost:5000/api/complaints');
            setComplaints(res.data);
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

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Complaints</h1>
                <Link to="/report" className="btn btn-primary">
                    <PlusCircle size={20} style={{ marginRight: '8px' }} />
                    Report Issue
                </Link>
            </div>

            <div className="grid">
                {complaints.map(item => (
                    <div key={item.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span className={`status-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 style={{ marginBottom: '8px' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{item.description}</p>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '0.8rem' }}>
                            <strong>Category:</strong> {item.category}
                        </div>
                    </div>
                ))}
            </div>

            {complaints.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <AlertCircle size={48} style={{ marginBottom: '12px' }} />
                    <p>No complaints found. Click "Report Issue" to submit your first one.</p>
                </div>
            )}
        </div>
    );
};

export default CitizenDashboard;
