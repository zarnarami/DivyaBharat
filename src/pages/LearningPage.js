// src/pages/LearningPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageLoader, EmptyState } from '../components/LoadingSpinner';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './LearningPage.css';
import { FaArrowLeft, FaBook, FaCheckCircle, FaPlay, FaQuestionCircle, FaClock, FaDownload } from 'react-icons/fa';

const LEVELS = { beginner: '🟢 Beginner', intermediate: '🟡 Intermediate', advanced: '🔴 Advanced' };

// ---- LEARNING LISTING ----
export function LearningListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/modules');
        if (data.success) setModules(data.modules);

        if (user) {
          const pRes = await api.get('/progress/my');
          if (pRes.data.success) {
            const progressMap = {};
            pRes.data.progress.forEach(p => {
              progressMap[p.module?._id || p.module] = p;
            });
            setProgress(progressMap);
          }
        }
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const filtered = activeLevel === 'all' ? modules : modules.filter(m => m.level === activeLevel);

  return (
    <div className="db-learning-page">
      <Navbar />
      <div className="db-learning-hero">
        <div className="db-learning-hero-inner">
          <p className="db-learning-hero-sub">📚 Learn India's Heritage</p>
          <h1>Learning Modules</h1>
          <p className="db-learning-hero-desc">
            Structured, authentic learning modules about India's temples, monuments, traditions, and festivals. Each module contains lessons and a quiz.
          </p>
        </div>
      </div>

      <div className="db-learning-main">
        {/* LEVEL TABS */}
        <div className="db-learning-tabs">
          {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
            <button
              key={level}
              className={`db-learning-tab ${activeLevel === level ? 'active' : ''}`}
              onClick={() => setActiveLevel(level)}
            >
              {level === 'all' ? '📖 All' : LEVELS[level]}
            </button>
          ))}
        </div>

        {loading ? <PageLoader /> : filtered.length === 0 ? (
          <EmptyState icon="📚" title="No Modules Yet" message="Learning modules will be available soon." />
        ) : (
          <div className="db-learning-grid">
            {filtered.map(mod => {
              const p = progress[mod._id];
              const pct = p?.percentage || 0;
              const completed = p?.completed || false;
              return (
                <div key={mod._id} className="db-learning-card">
                  <div className="db-learning-card-header">
                    <div className="db-learning-card-icon">📚</div>
                    <div>
                      <span className="db-learning-card-level">{LEVELS[mod.level] || mod.level}</span>
                      <span className="db-learning-card-cat">{mod.category}</span>
                    </div>
                  </div>
                  <h3>{mod.title}</h3>
                  <p className="db-learning-card-desc">{mod.description}</p>
                  <div className="db-learning-card-meta">
                    <span><FaClock size={11} /> {mod.duration} min</span>
                    <span><FaBook size={11} /> {mod.lessons?.length || 0} Lessons</span>
                    {mod.quiz && <span><FaQuestionCircle size={11} /> Has Quiz</span>}
                  </div>

                  {user && (
                    <div className="db-learning-card-progress">
                      <div className="db-learning-card-progress-bar-wrap">
                        <div className="db-learning-card-progress-bar" style={{ width: `${pct}%` }} />
                      </div>
                      <span>{completed ? '✅ Completed' : pct > 0 ? `${pct}% done` : 'Not started'}</span>
                    </div>
                  )}

                  <button
                    className="db-learning-card-btn"
                    onClick={() => {
                      if (!user) { navigate('/'); return; }
                      navigate(`/learning/${mod._id}`);
                    }}
                  >
                    {pct > 0 && !completed ? '▶ Continue' : completed ? '🔄 Review' : '▶ Start Learning'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ---- MODULE DETAIL ----
export function ModuleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [module, setModule] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/modules/${id}`);
        if (data.success) setModule(data.module);
        if (user) {
          const pRes = await api.get(`/progress/module/${id}`);
          if (pRes.data.success && pRes.data.progress) setProgress(pRes.data.progress);
        }
      } catch {}
      setLoading(false);
    };
    if (!user) { navigate('/'); return; }
    fetchData();
    window.scrollTo(0, 0);
  }, [id, user, navigate]);

  const isLessonCompleted = (lessonIndex) => {
    return progress?.completedLessons?.includes(lessonIndex);
  };

  const markComplete = async (lessonIndex) => {
    if (isLessonCompleted(lessonIndex)) return;
    setSaving(true);
    try {
      const { data } = await api.post('/progress', { moduleId: id, lessonIndex });
      if (data.success) setProgress(data.progress);
    } catch {}
    setSaving(false);
  };

  const handleDownloadCurriculum = () => {
    if (!module) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open and print the module curriculum.');
      return;
    }

    const lessonsHtml = module.lessons && module.lessons.length > 0
      ? module.lessons.map((l, idx) => `
        <div class="lesson-block">
          <div class="lesson-header">
            <h3>Lesson ${idx + 1}: ${l.title}</h3>
            <span class="lesson-duration">⏱️ ${l.duration || 10} min</span>
          </div>
          <div class="lesson-body">
            ${l.content.split('\n').map(line => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return `<h4>${line.replace(/\*\*/g, '')}</h4>`;
              }
              if (line.startsWith('- ')) {
                return `<li>${line.replace(/^- /, '')}</li>`;
              }
              if (line.trim() === '') return '';
              return `<p>${line}</p>`;
            }).join('')}
          </div>
        </div>
      `).join('')
      : '<p>Curriculum lessons are being compiled.</p>';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DivyaBharat Curriculum - ${module.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
    @page { size: A4; margin: 15mm; }
    body {
      font-family: 'Inter', sans-serif;
      background: #fff;
      color: #2b1810;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
    }
    .header {
      border-bottom: 2px solid #e6ab82;
      padding-bottom: 14px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 700;
      color: #8b2500;
      letter-spacing: 1px;
    }
    .tagline {
      font-size: 11px;
      color: #8a6050;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 2px;
    }
    .badge {
      display: inline-block;
      background: #fde8da;
      color: #8b2500;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #e6ab82;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 30px;
      color: #3c1f16;
      margin: 0 0 8px 0;
      font-weight: 700;
    }
    .meta-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background: #fff8f4;
      border: 1px solid #f0d5c4;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
    }
    .meta-item strong {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      color: #8a6050;
      letter-spacing: 0.5px;
    }
    .meta-item span {
      font-size: 13.5px;
      font-weight: 600;
      color: #3c1f16;
    }
    .lesson-block {
      margin-bottom: 22px;
      padding-bottom: 16px;
      border-bottom: 1px dashed #e6ab82;
      page-break-inside: avoid;
    }
    .lesson-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .lesson-header h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      color: #8b2500;
      margin: 0;
    }
    .lesson-duration {
      font-size: 12px;
      color: #8a6050;
    }
    .lesson-body p {
      font-size: 13px;
      margin: 0 0 8px 0;
      color: #3d271d;
      text-align: justify;
    }
    .lesson-body h4 {
      font-family: 'Inter', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: #5a2612;
      margin: 12px 0 6px 0;
    }
    .lesson-body li {
      font-size: 13px;
      margin-bottom: 4px;
      color: #3d271d;
    }
    .footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #e2c0b0;
      font-size: 11px;
      color: #8a6050;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">DIVYABHARAT</div>
      <div class="tagline">Heritage Learning Hub • Study Curriculum Guide</div>
    </div>
    <div>
      <span class="badge">${module.category || 'Cultural Heritage'}</span>
    </div>
  </div>

  <h1>${module.title}</h1>
  <p style="font-size: 13.5px; color: #6b2d1b; margin-top: 0;">${module.description || ''}</p>

  <div class="meta-box">
    <div class="meta-item">
      <strong>Difficulty Level</strong>
      <span>${(module.level || 'all').toUpperCase()}</span>
    </div>
    <div class="meta-item">
      <strong>Total Duration</strong>
      <span>${module.duration || 30} Minutes</span>
    </div>
    <div class="meta-item">
      <strong>Curriculum</strong>
      <span>${module.lessons?.length || 0} Lessons</span>
    </div>
  </div>

  ${lessonsHtml}

  <div class="footer">
    <div>
      ✓ DivyaBharat Verified Study Material • Ministry & ASI Aligned Curriculum
    </div>
    <div>
      Printed: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (loading) return <><Navbar /><PageLoader /></>;
  if (!module) return <><Navbar /><EmptyState icon="📚" title="Module not found" /></>;

  const lesson = module.lessons[activeLesson];
  const totalLessons = module.lessons.length;
  const completedCount = progress?.completedLessons?.length || 0;

  return (
    <div className="db-learning-page">
      <Navbar />
      <div className="db-module-page">
        <div className="db-module-sidebar">
          <button className="db-module-back" onClick={() => navigate('/learning')}>
            <FaArrowLeft size={13} /> Back to Modules
          </button>
          <h2>{module.title}</h2>
          <div className="db-module-overall-progress">
            <div className="db-module-progress-wrap">
              <div className="db-module-progress-fill" style={{ width: `${progress?.percentage || 0}%` }} />
            </div>
            <p>{completedCount}/{totalLessons} lessons completed ({progress?.percentage || 0}%)</p>
          </div>
          <div className="db-module-lesson-list">
            {module.lessons.map((les, i) => (
              <button
                key={i}
                className={`db-module-lesson-btn ${activeLesson === i ? 'active' : ''} ${isLessonCompleted(i) ? 'done' : ''}`}
                onClick={() => setActiveLesson(i)}
              >
                {isLessonCompleted(i) ? <FaCheckCircle size={13} color="#1a7a30" /> : <FaPlay size={11} />}
                <span>{les.title}</span>
                <span className="db-module-lesson-dur">{les.duration}m</span>
              </button>
            ))}
          </div>

          <button
            className="db-module-pdf-btn"
            onClick={handleDownloadCurriculum}
            title="Download printable study material & curriculum guide (PDF)"
          >
            <FaDownload size={13} /> Download Study PDF
          </button>

          {module.quiz && (
            <button className="db-module-quiz-btn" onClick={() => navigate(`/quiz/${module.quiz._id || module.quiz}`)}>
              <FaQuestionCircle size={14} /> Take Module Quiz
            </button>
          )}
        </div>

        <div className="db-module-content">
          <div className="db-module-content-header">
            <div>
              <p className="db-module-lesson-num">Lesson {activeLesson + 1} of {totalLessons}</p>
              <h1>{lesson.title}</h1>
            </div>
            {isLessonCompleted(activeLesson) ? (
              <span className="db-module-completed-badge"><FaCheckCircle size={14} /> Completed</span>
            ) : (
              <button
                className="db-module-mark-btn"
                onClick={() => markComplete(activeLesson)}
                disabled={saving}
              >
                {saving ? 'Saving...' : '✓ Mark Complete'}
              </button>
            )}
          </div>

          <div className="db-module-lesson-content">
            {lesson.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} className="db-module-lesson-h3">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="db-module-lesson-li">{line.replace(/^- /, '')}</li>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i}>{line}</p>;
            })}
          </div>

          <div className="db-module-nav">
            <button
              className="db-module-nav-btn secondary"
              onClick={() => setActiveLesson(l => Math.max(0, l - 1))}
              disabled={activeLesson === 0}
            >
              <FaArrowLeft size={13} /> Previous
            </button>
            {!isLessonCompleted(activeLesson) && (
              <button className="db-module-mark-btn-inline" onClick={() => markComplete(activeLesson)} disabled={saving}>
                {saving ? '...' : '✓ Mark Complete'}
              </button>
            )}
            <button
              className="db-module-nav-btn primary"
              onClick={() => {
                if (activeLesson < totalLessons - 1) {
                  markComplete(activeLesson);
                  setActiveLesson(l => l + 1);
                }
              }}
              disabled={activeLesson === totalLessons - 1}
            >
              Next <FaArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LearningListPage;
