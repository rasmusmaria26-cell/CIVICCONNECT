import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Send } from 'lucide-react';
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
                    alert("Location awareness failed. Using manual defaults.");
                    setLocating(false);
                }
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/complaints', formData);
            navigate('/');
        } catch (err) {
            alert("Submission failed. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="container"
            style={{ maxWidth: '720px', paddingBottom: '120px' }}
        >
            <div style={{ marginTop: '6rem', marginBottom: '4rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', marginBottom: '2rem' }}
                >
                    <ArrowLeft size={18} />
                    Back to Hub
                </button>
                <h1>File a Report</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '500' }}>Provide precise details about the urban issue you've identified.</p>
            </div>

            <div className="card" style={{ padding: '60px', boxShadow: '0 20px 60px -10px rgba(0,0,0,0.05)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Issue Subject</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Briefly state the problem..."
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Classification</label>
                        <select
                            className="input-field"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Road">Infrastructure & Roads</option>
                            <option value="Water">Water Systems</option>
                            <option value="Garbage">Public Sanitation</option>
                            <option value="Electricity">Power & Lighting</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Report Description</label>
                        <textarea
                            rows="6"
                            className="input-field"
                            placeholder="Help us understand the situation in detail..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '24px',
                        background: 'var(--surface-warm)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        marginBottom: '44px'
                    }}>
                        <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--sandal-light)', border: '1px solid var(--border)' }}>
                            <MapPin size={24} color="var(--sandal-dark)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800', marginBottom: '4px' }}>Incident Location</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {locating ? 'Searching coordinates...' : `${formData.latitude.toFixed(6)}, ${formData.longitude.toFixed(6)}`}
                            </div>
                        </div>
                        {!locating && (
                            <button
                                type="button"
                                onClick={detectLocation}
                                className="btn btn-outline"
                                style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '8px' }}
                            >
                                Refresh
                            </button>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '22px', fontSize: '1.1rem', justifyContent: 'center' }}>
                        <Send size={18} />
                        Confirm and Submit
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ReportComplaint;
