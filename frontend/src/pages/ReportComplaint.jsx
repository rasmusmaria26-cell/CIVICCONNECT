import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="container"
            style={{ maxWidth: '640px', marginTop: '5rem' }}
        >
            <div className="card" style={{ padding: '48px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--gradient)' }}></div>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: '800' }}>Report an Issue</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Submit details to the nearest urban authority.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Issue Title</label>
                        <input
                            type="text"
                            placeholder="Briefly name the problem..."
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
                            <option value="Road">Roads & Infrastructure</option>
                            <option value="Water">Water & Sewage</option>
                            <option value="Garbage">Garbage & Sanitation</option>
                            <option value="Electricity">Electricity & Lighting</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Extensive Description</label>
                        <textarea
                            rows="5"
                            placeholder="Help authorities understand the urgency..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '20px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '16px',
                        marginBottom: '40px'
                    }}>
                        <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)' }}>
                            <MapPin size={24} color="var(--primary-light)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', marginBottom: '4px' }}>Detected Location</div>
                            <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                {locating ? 'Searching coordinates...' : `${formData.latitude.toFixed(6)}, ${formData.longitude.toFixed(6)}`}
                            </div>
                        </div>
                        {!locating && (
                            <button
                                type="button"
                                onClick={detectLocation}
                                className="btn"
                                style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', fontSize: '0.8rem' }}
                            >
                                Refresh
                            </button>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }}>
                        Submit Formal Report
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ReportComplaint;
