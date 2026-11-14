// src/pages/TeacherPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageLoader } from '../components/LoadingSpinner';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaPlus, FaQuestionCircle } from 'react-icons/fa';
import './TeacherPage.css';

export default function TeacherPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('modules');
  const [showAddForm, setShowAddForm] = useState(false);

  // Simple heritage submission form
  const [newHeritage, setNewHeritage] = useState({
    name: '', category: 'Monument', state: '', location: '',
    description: '', culturalSignificance: '', historicalPeriod: '', image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modRes, quizRes] = await Promise.all([
          api.get('/modules'),
          api.get('/quizzes')
        ]);
        if (modRes.data.success) setModules(modRes.data.modules);
        if (quizRes.data.success) setQuizzes(quizRes.data.quizzes);
      } catch { }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmitHeritage = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg('');
    try {
      const { data } = await api.post('/heritage', newHeritage);
      if (data.success) {
        setSubmitMsg('✅ Heritage submitted for admin review!');
        setNewHeritage({ name: '', category: 'Monument', state: '', location: '', description: '', culturalSignificance: '', historicalPeriod: '', image: '' });
        setShowAddForm(false);
      }
    } catch (err) {
      setSubmitMsg('❌ Failed to submit. ' + (err.response?.data?.message || ''));
    }
    setSubmitting(false);
  };

  if (loading) return <><Navbar /><PageLoader /></>;

  return (
    <div className="db-teacher-page">
      <Navbar />
      <div className="db-teacher-container">
        <div className="db-teacher-header">
          <div>
            <h1>👩‍🏫 Teacher Dashboard</h1>
            <p>Welcome, {user?.name}! Contribute heritage content and explore learning resources.</p>
          </div>
          <button className="db-teacher-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
            <FaPlus size={14} /> Submit Heritage
          </button>
        </div>

        {submitMsg && (
          <div className={`db-teacher-msg ${submitMsg.includes('✅') ? 'success' : 'error'}`}>{submitMsg}</div>
        )}

        {/* SUBMIT FORM */}
        {showAddForm && (
          <div className="db-teacher-form-wrap">
            <h2>Submit New Heritage for Review</h2>
            <p>Your submission will be reviewed by an admin before being published.</p>
            <form onSubmit={handleSubmitHeritage} className="db-teacher-form">
              <div className="db-teacher-form-row">
                <div className="db-teacher-form-group">
                  <label>Heritage Name *</label>
                  <input required value={newHeritage.name} onChange={e => setNewHeritage(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Ajanta Caves" />
                </div>
                <div className="db-teacher-form-group">
                  <label>Category *</label>
                  <select value={newHeritage.category} onChange={e => setNewHeritage(p => ({ ...p, category: e.target.value }))}>
                    {['Monument', 'Temple', 'Historical Place', 'Festival', 'Tradition', 'Art Form', 'Natural Heritage'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="db-teacher-form-row">
                <div className="db-teacher-form-group">
                  <label>State *</label>
                  <input required value={newHeritage.state} onChange={e => setNewHeritage(p => ({ ...p, state: e.target.value }))} placeholder="e.g., Maharashtra" />
                </div>
                <div className="db-teacher-form-group">
                  <label>Location</label>
                  <input value={newHeritage.location} onChange={e => setNewHeritage(p => ({ ...p, location: e.target.value }))} placeholder="e.g., Aurangabad, Maharashtra" />
                </div>
              </div>
              <div className="db-teacher-form-group">
                <label>Historical Period</label>
                <input value={newHeritage.historicalPeriod} onChange={e => setNewHeritage(p => ({ ...p, historicalPeriod: e.target.value }))} placeholder="e.g., 2nd century BCE to 480 CE" />
              </div>
              <div className="db-teacher-form-group">
                <label>Description *</label>
                <textarea required rows={4} value={newHeritage.description} onChange={e => setNewHeritage(p => ({ ...p, description: e.target.value }))} placeholder="Describe this heritage site..." />
              </div>
              <div className="db-teacher-form-group">
                <label>Cultural Significance</label>
                <textarea rows={3} value={newHeritage.culturalSignificance} onChange={e => setNewHeritage(p => ({ ...p, culturalSignificance: e.target.value }))} placeholder="Why is this culturally significant?" />
              </div>
              <div className="db-teacher-form-group">
                <label>Image URL</label>
                <input type="url" value={newHeritage.image} onChange={e => setNewHeritage(p => ({ ...p, image: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="db-teacher-form-actions">
                <button type="submit" className="db-teacher-submit-btn" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit for Review'}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="db-teacher-cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* TABS */}
        <div className="db-teacher-tabs">
          <button className={`db-teacher-tab ${activeTab === 'modules' ? 'active' : ''}`} onClick={() => setActiveTab('modules')}>
            <FaBook size={14} /> Modules ({modules.length})
          </button>
          <button className={`db-teacher-tab ${activeTab === 'quizzes' ? 'active' : ''}`} onClick={() => setActiveTab('quizzes')}>
            <FaQuestionCircle size={14} /> Quizzes ({quizzes.length})
          </button>
        </div>

        {activeTab === 'modules' && (
          <div className="db-teacher-content">
            {modules.map(m => (
              <div key={m._id} className="db-teacher-item">
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.level} · {m.lessons?.length || 0} lessons · {m.duration} min</p>
                </div>
                <span className={`db-teacher-level ${m.level}`}>{m.level}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="db-teacher-content">
            {quizzes.map(q => (
              <div key={q._id} className="db-teacher-item">
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.category} · {q.questions?.length || 0} questions · Pass: {q.passingScore}%</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
