// src/pages/QuizPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageLoader, EmptyState } from '../components/LoadingSpinner';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './QuizPage.css';
import {
  FaQuestionCircle, FaCheckCircle, FaTimesCircle,
  FaArrowRight, FaArrowLeft, FaTrophy, FaRedo
} from 'react-icons/fa';

// ---- QUIZ LISTING PAGE ----
export function QuizListPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myResults, setMyResults] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/quizzes');
        if (data.success) setQuizzes(data.quizzes);
        if (user) {
          const res = await api.get('/quiz-results/my');
          if (res.data.success) setMyResults(res.data.results);
        }
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const getQuizResult = (quizId) => myResults.find(r => r.quiz?._id === quizId || r.quiz === quizId);

  return (
    <div className="db-quiz-page">
      <Navbar />
      <div className="db-quiz-hero">
        <div className="db-quiz-hero-inner">
          <p className="db-quiz-hero-sub">📝 Test Your Knowledge</p>
          <h1>Heritage Quizzes</h1>
          <p className="db-quiz-hero-desc">Challenge yourself with quizzes on India's rich heritage, monuments, temples, and cultural traditions.</p>
        </div>
      </div>

      {/* MY STATS */}
      {user && myResults.length > 0 && (
        <div className="db-quiz-stats-bar">
          <div className="db-quiz-stat">
            <span className="db-quiz-stat-num">{myResults.length}</span>
            <span className="db-quiz-stat-label">Attempted</span>
          </div>
          <div className="db-quiz-stat">
            <span className="db-quiz-stat-num">{myResults.filter(r => r.passed).length}</span>
            <span className="db-quiz-stat-label">Passed</span>
          </div>
          <div className="db-quiz-stat">
            <span className="db-quiz-stat-num">
              {myResults.length > 0 ? Math.round(myResults.reduce((a, r) => a + r.percentage, 0) / myResults.length) : 0}%
            </span>
            <span className="db-quiz-stat-label">Avg Score</span>
          </div>
          <div className="db-quiz-stat">
            <span className="db-quiz-stat-num">
              {myResults.length > 0 ? Math.max(...myResults.map(r => r.percentage)) : 0}%
            </span>
            <span className="db-quiz-stat-label">Best Score</span>
          </div>
        </div>
      )}

      <div className="db-quiz-main">
        {loading ? <PageLoader /> : quizzes.length === 0 ? (
          <EmptyState icon="📝" title="No Quizzes Yet" message="Check back soon for heritage quizzes." />
        ) : (
          <div className="db-quiz-grid">
            {quizzes.map(quiz => {
              const result = getQuizResult(quiz._id);
              return (
                <div key={quiz._id} className="db-quiz-card">
                  <div className="db-quiz-card-icon">📝</div>
                  <div className="db-quiz-card-body">
                    <span className="db-quiz-card-cat">{quiz.category}</span>
                    <h3>{quiz.title}</h3>
                    <p>{quiz.description || `${quiz.questions?.length || 0} questions`}</p>
                    <div className="db-quiz-card-meta">
                      <span>🎯 {quiz.questions?.length || 0} Questions</span>
                      <span>✅ Pass: {quiz.passingScore}%</span>
                    </div>
                    {result && (
                      <div className={`db-quiz-card-result ${result.passed ? 'passed' : 'failed'}`}>
                        {result.passed ? <FaCheckCircle size={13} /> : <FaTimesCircle size={13} />}
                        Last Score: {result.percentage}% — {result.passed ? 'Passed' : 'Failed'}
                      </div>
                    )}
                    <button
                      className="db-quiz-card-btn"
                      onClick={() => {
                        if (!user) { navigate('/'); return; }
                        navigate(`/quiz/${quiz._id}`);
                      }}
                    >
                      {result ? 'Retake Quiz' : 'Start Quiz'} <FaArrowRight size={13} />
                    </button>
                  </div>
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

// ---- QUIZ DETAIL / ATTEMPT PAGE ----
export function QuizDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await api.get(`/quizzes/${id}`);
        if (data.success) setQuiz(data.quiz);
      } catch {}
      setLoading(false);
    };
    if (!user) { navigate('/'); return; }
    fetchQuiz();
  }, [id, user, navigate]);

  const handleSelect = (qIndex, ansIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: ansIndex }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const answers = quiz.questions.map((_, i) => ({ selectedAnswer: selectedAnswers[i] ?? -1 }));
      const { data } = await api.post('/quiz-results', { quizId: id, answers });
      if (data.success) {
        setResult(data.result);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
    setSubmitting(false);
  };

  if (loading) return <><Navbar /><PageLoader /></>;
  if (!quiz) return <><Navbar /><EmptyState icon="📝" title="Quiz not found" /></>;

  const q = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const answered = Object.keys(selectedAnswers).length;

  // RESULT VIEW
  if (submitted && result) {
    return (
      <div className="db-quiz-page">
        <Navbar />
        <div className="db-quiz-result-page">
          <div className="db-quiz-result-card">
            <div className={`db-quiz-result-icon ${result.passed ? 'passed' : 'failed'}`}>
              {result.passed ? <FaTrophy size={48} /> : <FaQuestionCircle size={48} />}
            </div>
            <h1>{result.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}</h1>
            <p className="db-quiz-result-quiztitle">{quiz.title}</p>

            <div className="db-quiz-result-stats">
              <div className="db-quiz-result-stat">
                <span className="db-quiz-result-stat-num">{result.percentage}%</span>
                <span className="db-quiz-result-stat-label">Score</span>
              </div>
              <div className="db-quiz-result-stat">
                <span className="db-quiz-result-stat-num">{result.score}/{result.totalQuestions}</span>
                <span className="db-quiz-result-stat-label">Correct</span>
              </div>
              <div className="db-quiz-result-stat">
                <span className="db-quiz-result-stat-num">{result.passed ? '✅' : '❌'}</span>
                <span className="db-quiz-result-stat-label">{result.passed ? 'Passed' : 'Failed'}</span>
              </div>
            </div>

            {/* ANSWER REVIEW */}
            <div className="db-quiz-review">
              <h3>Answer Review</h3>
              {result.questions?.map((question, i) => {
                const answerData = result.answers?.[i];
                const isCorrect = answerData?.isCorrect;
                return (
                  <div key={i} className={`db-quiz-review-item ${isCorrect ? 'correct' : 'wrong'}`}>
                    <div className="db-quiz-review-header">
                      {isCorrect ? <FaCheckCircle size={14} color="#1a7a30" /> : <FaTimesCircle size={14} color="#c0392b" />}
                      <p><strong>Q{i + 1}:</strong> {question.question}</p>
                    </div>
                    <p className="db-quiz-review-answer">
                      Your answer: <strong>{question.options?.[answerData?.selectedAnswer] || 'Not answered'}</strong>
                    </p>
                    {!isCorrect && (
                      <p className="db-quiz-review-correct">
                        Correct: <strong>{question.options?.[question.correctAnswer]}</strong>
                      </p>
                    )}
                    {question.explanation && (
                      <p className="db-quiz-review-explanation">💡 {question.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="db-quiz-result-actions">
              <button onClick={() => { setSubmitted(false); setCurrentQ(0); setSelectedAnswers({}); setResult(null); }} className="db-quiz-retry-btn">
                <FaRedo size={14} /> Retry Quiz
              </button>
              <button onClick={() => navigate('/quiz')} className="db-quiz-back-btn">
                ← All Quizzes
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // QUIZ FLOW
  return (
    <div className="db-quiz-page">
      <Navbar />
      <div className="db-quiz-attempt-page">
        <div className="db-quiz-attempt-card">
          {/* HEADER */}
          <div className="db-quiz-attempt-header">
            <div>
              <h2>{quiz.title}</h2>
              <p>Question {currentQ + 1} of {totalQ}</p>
            </div>
            <div className="db-quiz-progress-bar-wrap">
              <div className="db-quiz-progress-bar" style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }} />
            </div>
            <p className="db-quiz-answered">{answered}/{totalQ} answered</p>
          </div>

          {/* QUESTION */}
          <div className="db-quiz-question">
            <h3>Q{currentQ + 1}. {q.question}</h3>
          </div>

          {/* OPTIONS */}
          <div className="db-quiz-options">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`db-quiz-option ${selectedAnswers[currentQ] === i ? 'selected' : ''}`}
                onClick={() => handleSelect(currentQ, i)}
              >
                <span className="db-quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="db-quiz-nav">
            <button
              className="db-quiz-nav-btn secondary"
              onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
              disabled={currentQ === 0}
            >
              <FaArrowLeft size={13} /> Previous
            </button>

            {currentQ < totalQ - 1 ? (
              <button
                className="db-quiz-nav-btn primary"
                onClick={() => setCurrentQ(q => Math.min(totalQ - 1, q + 1))}
              >
                Next <FaArrowRight size={13} />
              </button>
            ) : (
              <button
                className="db-quiz-nav-btn submit"
                onClick={handleSubmit}
                disabled={submitting || answered < totalQ}
              >
                {submitting ? 'Submitting...' : `Submit Quiz (${answered}/${totalQ})`}
              </button>
            )}
          </div>

          {/* QUESTION DOTS */}
          <div className="db-quiz-dots">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                className={`db-quiz-dot ${i === currentQ ? 'current' : ''} ${selectedAnswers[i] !== undefined ? 'answered' : ''}`}
                onClick={() => setCurrentQ(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default QuizListPage;
