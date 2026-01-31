import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const ReportComplaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Road',
        latitude: 0,
        longitude: 0
    });
    const [locating, setLocating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-detect location on mount
        detectLocation();
    }, []);

    const detectLocation = () => {
        if (navigator.geolocation) {
            setLocating(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setFormData(prev => ({ ...prev, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
                    setLocating(false);
                },
                () => {
                    alert("Could not detect location. Using default.");
                    setLocating(false);
                }
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/complaints', formData);
            navigate('/');
        } catch (err) {
            alert("Failed to submit complaint");
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="card">
                <h2>Report an Issue</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Provide details about the civic issue.</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Complaint Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Large pothole on Main St"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Road">Road</option>
                            <option value="Water">Water</option>
                            <option value="Garbage">Garbage</option>
                            <option value="Electricity">Electricity</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '24px' }}>
                        <MapPin size={20} color="var(--primary)" />
                        <div style={{ fontSize: '0.875rem' }}>
                            <strong>Location:</strong> {locating ? 'Detecting...' : `${formData.latitude.toFixed(4)}, ${formData.longitude.toFixed(4)}`}
                        </div>
                        {!locating && <button type="button" onClick={detectLocation} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem' }}>Retry</button>}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Complaint</button>
                </form>
            </div>
        </div>
    );
};

export default ReportComplaint;
