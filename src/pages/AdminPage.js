// src/pages/AdminPage.js — Complete MongoDB Management Dashboard
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageLoader } from '../components/LoadingSpinner';
import api from '../services/api';
import './AdminPage.css';
import {
  FaUsers,
  FaBook,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane,
  FaPlus,
  FaUpload,
  FaImage,
  FaCog,
  FaCopy,
  FaCheck,
  FaEdit
} from 'react-icons/fa';

const TABS = [
  'Overview',
  'Temples',
  'Heritage',
  'States',
  'Media & GridFS',
  'Settings',
  'Users',
  'Modules',
  'Quizzes',
  'Notifications'
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [heritage, setHeritage] = useState([]);
  const [temples, setTemples] = useState([]);
  const [states, setStates] = useState([]);
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingHeritage, setPendingHeritage] = useState([]);

  // Notifications State
  const [newNotif, setNewNotif] = useState({
    title: '',
    titleHi: '',
    message: '',
    messageHi: '',
    type: 'info',
    icon: 'temple',
    link: '/temples'
  });
  const [broadcastStatus, setBroadcastStatus] = useState('');

  // States Tab Message
  const [stateEditMsg, setStateEditMsg] = useState('');

  // Add Temple State
  const [showAddTemple, setShowAddTemple] = useState(false);
  const [newTemple, setNewTemple] = useState({
    name: '',
    deity: '',
    state: '',
    city: '',
    architecture: 'Nagara Shikhara',
    timings: '6:00 AM – 8:00 PM',
    description: '',
    image: ''
  });
  const [templeMsg, setTempleMsg] = useState('');
  const [templeStateFilter, setTempleStateFilter] = useState('All');
  const [templeSearch, setTempleSearch] = useState('');
  const [editingTemple, setEditingTemple] = useState(null);
  const [editTempleForm, setEditTempleForm] = useState({});
  const [editTempleMsg, setEditTempleMsg] = useState('');

  // Add Heritage State
  const [showAddHeritage, setShowAddHeritage] = useState(false);
  const [newHeritage, setNewHeritage] = useState({
    name: '',
    category: 'Monument',
    state: '',
    historicalPeriod: '',
    description: '',
    image: '',
    unescoListed: false
  });
  const [heritageMsg, setHeritageMsg] = useState('');
  const [heritageStateFilter, setHeritageStateFilter] = useState('All');
  const [heritageCategoryFilter, setHeritageCategoryFilter] = useState('All');
  const [heritageSearch, setHeritageSearch] = useState('');
  const [editingHeritage, setEditingHeritage] = useState(null);
  const [editHeritageForm, setEditHeritageForm] = useState({});
  const [editHeritageMsg, setEditHeritageMsg] = useState('');
  const [heritageReviews, setHeritageReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviewActionMsg, setReviewActionMsg] = useState('');

  // Media & GridFS State
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaCategory, setMediaCategory] = useState('general');
  const [mediaDesc, setMediaDesc] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [copiedId, setCopiedId] = useState('');

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    siteName: 'DivyaBharat',
    tagline: 'Rooted in Culture, United in Spirit',
    heroHeading: 'Discover the Divine. Experience Bharat.',
    heroSubtitle: "Explore India's sacred temples, timeless heritage, ancient traditions and spiritual wonders.",
    announcement: 'Welcome to DivyaBharat — India Temple Heritage & Pilgrimage Information Portal',
    contactEmail: 'contact@divyabharat.in',
    contactPhone: '+91 98765 43210',
    address: 'New Delhi, Bharat (India)',
    footerDescription: 'Preserving, documenting, and celebrating the sacred temple architecture, monumental citadels, and living traditions of Bharat.'
  });
  const [settingsMsg, setSettingsMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          userStats,
          usersRes,
          heritageRes,
          templesRes,
          statesRes,
          modulesRes,
          quizzesRes,
          notifsRes,
          mediaRes,
          settingsRes,
          reviewsRes
        ] = await Promise.allSettled([
          api.get('/users/stats'),
          api.get('/users?limit=50'),
          api.get('/heritage?limit=200&status=approved'),
          api.get('/temples?limit=100'),
          api.get('/states'),
          api.get('/modules?limit=50'),
          api.get('/quizzes'),
          api.get('/notifications'),
          api.get('/media?limit=100'),
          api.get('/settings'),
          api.get('/heritage/reviews/all')
        ]);

        if (userStats.status === 'fulfilled' && userStats.value.data.success) {
          setStats(userStats.value.data.stats);
        }
        if (usersRes.status === 'fulfilled' && usersRes.value.data.success) {
          setUsers(usersRes.value.data.users);
        }
        if (heritageRes.status === 'fulfilled' && heritageRes.value.data.success) {
          setHeritage(heritageRes.value.data.heritage);
        }
        if (templesRes.status === 'fulfilled' && templesRes.value.data.success) {
          setTemples(templesRes.value.data.temples || []);
        }
        if (statesRes.status === 'fulfilled' && statesRes.value.data.success) {
          setStates(statesRes.value.data.states || []);
        }
        if (modulesRes.status === 'fulfilled' && modulesRes.value.data.success) {
          setModules(modulesRes.value.data.modules);
        }
        if (quizzesRes.status === 'fulfilled' && quizzesRes.value.data.success) {
          setQuizzes(quizzesRes.value.data.quizzes);
        }
        if (notifsRes.status === 'fulfilled' && notifsRes.value.data.success) {
          setNotifications(notifsRes.value.data.notifications || []);
        }
        if (mediaRes.status === 'fulfilled' && mediaRes.value.data.success) {
          setMediaList(mediaRes.value.data.media || []);
        }
        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.data.success) {
          setHeritageReviews(reviewsRes.value.data.reviews || []);
        }
        if (settingsRes.status === 'fulfilled' && settingsRes.value.data.success) {
          const s = settingsRes.value.data.settings;
          setSettingsData(s);
          setSettingsForm({
            siteName: s.siteName || 'DivyaBharat',
            tagline: s.tagline || 'Rooted in Culture, United in Spirit',
            heroHeading: s.heroHeading || 'Discover the Divine. Experience Bharat.',
            heroSubtitle: s.heroSubtitle || "Explore India's sacred temples, timeless heritage, ancient traditions and spiritual wonders.",
            announcement: s.announcement || '',
            contactEmail: s.contactEmail || 'contact@divyabharat.in',
            contactPhone: s.contactPhone || '+91 98765 43210',
            address: s.address || 'New Delhi, Bharat (India)',
            footerDescription: s.footerDescription || ''
          });
        }

        // Fetch pending heritage
        const pendingRes = await api.get('/heritage?status=pending&limit=20');
        if (pendingRes.data.success) setPendingHeritage(pendingRes.data.heritage);
      } catch (err) {
        console.error('Admin fetch error:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // --- ACTIONS ---

  const approveHeritage = async (id) => {
    try {
      await api.put(`/heritage/${id}/status`, { status: 'approved' });
      setPendingHeritage(prev => prev.filter(h => h._id !== id));
      const { data } = await api.get('/heritage?limit=100&status=approved');
      if (data.success) setHeritage(data.heritage);
    } catch {}
  };

  const rejectHeritage = async (id) => {
    try {
      await api.put(`/heritage/${id}/status`, { status: 'rejected' });
      setPendingHeritage(prev => prev.filter(h => h._id !== id));
    } catch {}
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch {}
  };

  const updateUserRole = async (userId, role) => {
    try {
      await api.put(`/users/${userId}`, { role });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role } : u));
    } catch {}
  };

  const deleteHeritage = async (id) => {
    if (!window.confirm('Delete this heritage site permanently from MongoDB?')) return;
    try {
      await api.delete(`/heritage/${id}`);
      setHeritage(prev => prev.filter(h => h._id !== id));
    } catch {}
  };

  const handleStartEditHeritage = (item) => {
    setEditingHeritage(item);
    setEditHeritageMsg('');
    setEditHeritageForm({
      name: item.name || '',
      altName: item.altName || (Array.isArray(item.altNames) ? item.altNames.join(', ') : ''),
      category: item.category || 'Forts & Palaces',
      state: item.state || '',
      district: item.district || '',
      city: item.city || '',
      historicalPeriod: item.historicalPeriod || '',
      dynasty: item.dynasty || '',
      architecturalStyle: item.architecturalStyle || '',
      unescoStatus: item.unescoStatus || '',
      unescoListed: !!(item.unescoListed || item.unescoStatus),
      description: item.description || '',
      historicalBackground: item.historicalBackground || '',
      culturalImportance: item.culturalImportance || '',
      archaeologicalImportance: item.archaeologicalImportance || '',
      timings: item.visitorInformation?.timings || item.visitingInfo?.timings || '',
      entryFee: item.visitorInformation?.entryFee || item.visitingInfo?.entryFee || '',
      bestTimeToVisit: item.visitorInformation?.bestTimeToVisit || item.visitingInfo?.bestTime || '',
      guidelines: item.visitorInformation?.guidelines || item.visitingInfo?.guidelines || '',
      lat: item.coordinates?.lat || item.latitude || '',
      lng: item.coordinates?.lng || item.longitude || '',
      googleMapsUrl: item.googleMapsUrl || item.mapsUrl || '',
      image: item.image || '',
      featured: !!item.featured,
      isPopular: !!item.isPopular
    });
  };

  const handleSaveEditHeritage = async (e) => {
    e.preventDefault();
    if (!editingHeritage) return;
    try {
      setEditHeritageMsg('Saving updates to MongoDB...');
      const payload = {
        name: editHeritageForm.name,
        altName: editHeritageForm.altName,
        altNames: editHeritageForm.altName ? editHeritageForm.altName.split(',').map(s => s.trim()).filter(Boolean) : [],
        category: editHeritageForm.category,
        state: editHeritageForm.state,
        district: editHeritageForm.district,
        city: editHeritageForm.city,
        historicalPeriod: editHeritageForm.historicalPeriod,
        dynasty: editHeritageForm.dynasty,
        architecturalStyle: editHeritageForm.architecturalStyle,
        unescoStatus: editHeritageForm.unescoStatus,
        unescoListed: editHeritageForm.unescoListed,
        description: editHeritageForm.description,
        historicalBackground: editHeritageForm.historicalBackground,
        culturalImportance: editHeritageForm.culturalImportance,
        archaeologicalImportance: editHeritageForm.archaeologicalImportance,
        featured: editHeritageForm.featured,
        isPopular: editHeritageForm.isPopular,
        image: editHeritageForm.image,
        googleMapsUrl: editHeritageForm.googleMapsUrl,
        mapsUrl: editHeritageForm.googleMapsUrl,
        latitude: editHeritageForm.lat ? parseFloat(editHeritageForm.lat) : undefined,
        longitude: editHeritageForm.lng ? parseFloat(editHeritageForm.lng) : undefined,
        coordinates: {
          lat: editHeritageForm.lat ? parseFloat(editHeritageForm.lat) : undefined,
          lng: editHeritageForm.lng ? parseFloat(editHeritageForm.lng) : undefined
        },
        visitorInformation: {
          ...editingHeritage.visitorInformation,
          timings: editHeritageForm.timings,
          entryFee: editHeritageForm.entryFee,
          bestTimeToVisit: editHeritageForm.bestTimeToVisit,
          guidelines: editHeritageForm.guidelines
        },
        visitingInfo: {
          ...editingHeritage.visitingInfo,
          timings: editHeritageForm.timings,
          entryFee: editHeritageForm.entryFee,
          bestTime: editHeritageForm.bestTimeToVisit,
          guidelines: editHeritageForm.guidelines
        }
      };

      const { data } = await api.put(`/heritage/${editingHeritage._id}`, payload);
      if (data && data.success) {
        setHeritage(prev => prev.map(h => h._id === editingHeritage._id ? data.heritage : h));
        setEditHeritageMsg('✓ Heritage destination updated permanently in MongoDB!');
        setTimeout(() => {
          setEditingHeritage(null);
          setEditHeritageMsg('');
        }, 1500);
      }
    } catch (err) {
      setEditHeritageMsg('Error updating heritage: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleModerateReview = async (reviewId, newStatus) => {
    try {
      setReviewActionMsg(`Updating status to ${newStatus}...`);
      const { data } = await api.put(`/heritage/reviews/${reviewId}/status`, { status: newStatus });
      if (data && data.success) {
        setHeritageReviews(prev => prev.map(r => r._id === reviewId ? { ...r, status: newStatus } : r));
        setReviewActionMsg(`✓ Review status updated to ${newStatus}`);
        setTimeout(() => setReviewActionMsg(''), 2500);
      }
    } catch (err) {
      setReviewActionMsg('Action failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this user review permanently?')) return;
    try {
      await api.delete(`/heritage/reviews/${reviewId}`);
      setHeritageReviews(prev => prev.filter(r => r._id !== reviewId));
      setReviewActionMsg('✓ Review deleted successfully');
      setTimeout(() => setReviewActionMsg(''), 2500);
    } catch (err) {
      setReviewActionMsg('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteTemple = async (id) => {
    if (!window.confirm('Delete this temple permanently from MongoDB?')) return;
    try {
      await api.delete(`/temples/${id}`);
      setTemples(prev => prev.filter(t => t._id !== id));
    } catch {}
  };

  const handleStartEditTemple = (temple) => {
    setEditingTemple(temple);
    setEditTempleMsg('');
    setEditTempleForm({
      name: temple.name || '',
      altNames: Array.isArray(temple.altNames) ? temple.altNames.join(', ') : '',
      deity: temple.deity || '',
      state: temple.state || '',
      city: temple.city || '',
      district: temple.district || '',
      category: temple.category || 'Ancient Temple',
      architecture: temple.architecture || '',
      timings: temple.timings || '',
      description: temple.description || '',
      history: temple.history || '',
      significance: temple.significance || '',
      mythology: temple.mythology || '',
      image: temple.image || '',
      mapsUrl: temple.mapsUrl || '',
      lat: temple.coordinates?.lat || '',
      lng: temple.coordinates?.lng || '',
      morningPooja: temple.rituals?.morningPooja || '',
      eveningAarti: temple.rituals?.eveningAarti || '',
      prasadInfo: temple.rituals?.prasadInfo || '',
      dressCode: temple.guidelines?.dressCode || '',
      bestTimeToVisit: temple.bestTimeToVisit || ''
    });
  };

  const handleSaveEditTemple = async (e) => {
    e.preventDefault();
    if (!editingTemple) return;
    try {
      setEditTempleMsg('Saving updates to MongoDB...');
      const payload = {
        name: editTempleForm.name,
        altNames: editTempleForm.altNames ? editTempleForm.altNames.split(',').map(s => s.trim()).filter(Boolean) : [],
        deity: editTempleForm.deity,
        state: editTempleForm.state,
        city: editTempleForm.city,
        district: editTempleForm.district,
        category: editTempleForm.category,
        architecture: editTempleForm.architecture,
        timings: editTempleForm.timings,
        description: editTempleForm.description,
        history: editTempleForm.history,
        significance: editTempleForm.significance,
        mythology: editTempleForm.mythology,
        image: editTempleForm.image,
        mapsUrl: editTempleForm.mapsUrl,
        bestTimeToVisit: editTempleForm.bestTimeToVisit,
        coordinates: {
          lat: editTempleForm.lat ? parseFloat(editTempleForm.lat) : undefined,
          lng: editTempleForm.lng ? parseFloat(editTempleForm.lng) : undefined
        },
        rituals: {
          ...editingTemple.rituals,
          morningPooja: editTempleForm.morningPooja,
          eveningAarti: editTempleForm.eveningAarti,
          prasadInfo: editTempleForm.prasadInfo
        },
        guidelines: {
          ...editingTemple.guidelines,
          dressCode: editTempleForm.dressCode
        }
      };

      const { data } = await api.put(`/temples/${editingTemple._id}`, payload);
      if (data && data.success) {
        setTemples(prev => prev.map(t => t._id === editingTemple._id ? data.temple : t));
        setEditTempleMsg('✓ Temple updated successfully in MongoDB!');
        setTimeout(() => {
          setEditingTemple(null);
          setEditTempleMsg('');
        }, 1500);
      }
    } catch (err) {
      setEditTempleMsg('Error updating temple: ' + (err.response?.data?.message || err.message));
    }
  };

  // Add New Temple to MongoDB
  const handleAddTemple = async (e) => {
    e.preventDefault();
    if (!newTemple.name || !newTemple.state || !newTemple.description) {
      setTempleMsg('Please fill in Name, State and Description');
      return;
    }
    try {
      setTempleMsg('Saving temple to MongoDB...');
      const { data } = await api.post('/temples', newTemple);
      if (data && data.success) {
        setTemples(prev => [data.temple, ...prev]);
        setTempleMsg(`✓ Added "${data.temple.name}" to MongoDB!`);
        setNewTemple({
          name: '',
          deity: '',
          state: '',
          city: '',
          architecture: 'Nagara Shikhara',
          timings: '6:00 AM – 8:00 PM',
          description: '',
          image: ''
        });
        setTimeout(() => {
          setShowAddTemple(false);
          setTempleMsg('');
        }, 2000);
      }
    } catch (err) {
      setTempleMsg('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  // Add New Heritage Site to MongoDB
  const handleAddHeritage = async (e) => {
    e.preventDefault();
    if (!newHeritage.name || !newHeritage.state || !newHeritage.description) {
      setHeritageMsg('Please fill in Name, State and Description');
      return;
    }
    try {
      setHeritageMsg('Saving heritage to MongoDB...');
      const { data } = await api.post('/heritage', newHeritage);
      if (data && data.success) {
        setHeritage(prev => [data.heritage, ...prev]);
        setHeritageMsg(`✓ Added "${data.heritage.name}" to MongoDB!`);
        setNewHeritage({
          name: '',
          category: 'Monument',
          state: '',
          historicalPeriod: '',
          description: '',
          image: '',
          unescoListed: false
        });
        setTimeout(() => {
          setShowAddHeritage(false);
          setHeritageMsg('');
        }, 2000);
      }
    } catch (err) {
      setHeritageMsg('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  // Update State Cultural Icon
  const updateStateIcon = async (stateId, icon) => {
    try {
      const { data } = await api.put(`/states/${stateId}`, { icon });
      if (data && data.success) {
        setStates(prev => prev.map(s => s._id === stateId ? { ...s, icon } : s));
        setStateEditMsg(`Saved icon for ${data.state.name}`);
        setTimeout(() => setStateEditMsg(''), 3000);
      }
    } catch (err) {
      console.error('Update state icon error:', err);
      setStateEditMsg('Error saving icon');
      setTimeout(() => setStateEditMsg(''), 3000);
    }
  };

  // Upload Image to MongoDB GridFS
  const handleUploadMedia = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', mediaCategory);
    formData.append('description', mediaDesc);

    try {
      setUploadStatus('Uploading image to MongoDB GridFS...');
      const { data } = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (data && data.success) {
        setMediaList(prev => [data.media, ...prev]);
        setUploadStatus(`✓ Image stored in MongoDB GridFS successfully! ID: ${data.media.gridFsId}`);
        setSelectedFile(null);
        setMediaDesc('');
        // Reset file input
        const fileInput = document.getElementById('gridfs-file-input');
        if (fileInput) fileInput.value = '';
        setTimeout(() => setUploadStatus(''), 4000);
      }
    } catch (err) {
      setUploadStatus('Upload failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Delete Media Asset from MongoDB
  const handleDeleteMedia = async (id) => {
    if (!window.confirm('Delete this image permanently from MongoDB GridFS?')) return;
    try {
      await api.delete(`/media/${id}`);
      setMediaList(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error('Delete media error:', err);
    }
  };

  // Copy GridFS URL to Clipboard
  const handleCopyUrl = (url, id) => {
    const fullUrl = window.location.origin + url;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2500);
    }
  };

  // Save Website Settings to MongoDB
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSettingsMsg('Saving settings to MongoDB...');
      const { data } = await api.put('/settings', settingsForm);
      if (data && data.success) {
        setSettingsData(data.settings);
        setSettingsMsg('✓ Website settings updated permanently in MongoDB!');
        setTimeout(() => setSettingsMsg(''), 3500);
      }
    } catch (err) {
      setSettingsMsg('Save failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // Broadcast Notification
  const handleBroadcastNotification = async (e) => {
    e.preventDefault();
    if (!newNotif.title || !newNotif.message) return;
    try {
      setBroadcastStatus('Broadcasting announcement...');
      const { data } = await api.post('/notifications', newNotif);
      if (data.success) {
        setBroadcastStatus('Announcement broadcasted in real time to all connected portals!');
        setNotifications(prev => [data.notification, ...prev]);
        setNewNotif({
          title: '',
          titleHi: '',
          message: '',
          messageHi: '',
          type: 'info',
          icon: 'temple',
          link: '/temples'
        });
        setTimeout(() => setBroadcastStatus(''), 4500);
      }
    } catch (err) {
      setBroadcastStatus('Broadcast failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteNotificationItem = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Delete notification failed', err);
    }
  };

  if (loading) return <><Navbar /><PageLoader /></>;

  return (
    <div className="db-admin-page">
      <Navbar />
      <div className="db-admin-container">
        {/* HEADER */}
        <div className="db-admin-header">
          <div>
            <h1>🛡️ Admin Dashboard</h1>
            <p>Full MongoDB Data Management: Temples, Heritage, States, GridFS Images & Settings</p>
          </div>
          {pendingHeritage.length > 0 && (
            <div className="db-admin-alert">
              ⚠️ {pendingHeritage.length} heritage item{pendingHeritage.length > 1 ? 's' : ''} pending approval
            </div>
          )}
        </div>

        {/* TABS */}
        <div className="db-admin-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`db-admin-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Media & GridFS' && <FaImage style={{ marginRight: '6px' }} />}
              {tab === 'Settings' && <FaCog style={{ marginRight: '6px' }} />}
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'Overview' && stats && (
          <div className="db-admin-overview">
            <div className="db-admin-stat-card">
              <FaUsers size={28} />
              <div>
                <span className="db-admin-stat-num">{stats.total}</span>
                <span className="db-admin-stat-label">Total Users</span>
                <div className="db-admin-stat-breakdown">
                  <span>👨‍🎓 {stats.students} Students</span>
                  <span>👩‍🏫 {stats.teachers} Teachers</span>
                  <span>🛡️ {stats.admins} Admins</span>
                </div>
              </div>
            </div>

            <div className="db-admin-stat-card">
              <span style={{ fontSize: 28 }}>🛕</span>
              <div>
                <span className="db-admin-stat-num">{temples.length}</span>
                <span className="db-admin-stat-label">Sacred Temples</span>
                <div className="db-admin-stat-breakdown">
                  <span>Stored permanently in MongoDB</span>
                </div>
              </div>
            </div>

            <div className="db-admin-stat-card">
              <span style={{ fontSize: 28 }}>🏛️</span>
              <div>
                <span className="db-admin-stat-num">{heritage.length}</span>
                <span className="db-admin-stat-label">Heritage Records</span>
                <div className="db-admin-stat-breakdown">
                  <span>⭐ {heritage.filter(h => h.unescoListed).length} UNESCO Listed</span>
                </div>
              </div>
            </div>

            <div className="db-admin-stat-card">
              <span style={{ fontSize: 28 }}>🗺️</span>
              <div>
                <span className="db-admin-stat-num">{states.length}</span>
                <span className="db-admin-stat-label">States & UTs</span>
                <div className="db-admin-stat-breakdown">
                  <span>Cultural icons & themes synced</span>
                </div>
              </div>
            </div>

            <div className="db-admin-stat-card">
              <FaImage size={28} />
              <div>
                <span className="db-admin-stat-num">{mediaList.length}</span>
                <span className="db-admin-stat-label">MongoDB GridFS Images</span>
                <div className="db-admin-stat-breakdown">
                  <span>Binary chunk storage active</span>
                </div>
              </div>
            </div>

            <div className="db-admin-stat-card">
              <FaBook size={28} />
              <div>
                <span className="db-admin-stat-num">{modules.length}</span>
                <span className="db-admin-stat-label">Learning Modules</span>
              </div>
            </div>
          </div>
        )}

        {/* PENDING APPROVAL */}
        {activeTab === 'Overview' && pendingHeritage.length > 0 && (
          <div className="db-admin-section">
            <h2>⏳ Pending Heritage Approval</h2>
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr><th>Name</th><th>Category</th><th>State</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {pendingHeritage.map(h => (
                    <tr key={h._id}>
                      <td><strong>{h.name}</strong></td>
                      <td>{h.category}</td>
                      <td>{h.state}</td>
                      <td>
                        <div className="db-admin-actions">
                          <button className="db-admin-approve-btn" onClick={() => approveHeritage(h._id)}>
                            <FaCheckCircle size={13} /> Approve
                          </button>
                          <button className="db-admin-reject-btn" onClick={() => rejectHeritage(h._id)}>
                            <FaTimesCircle size={13} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TEMPLES TAB */}
        {activeTab === 'Temples' && (() => {
          const filteredAdminTemples = temples.filter(t => {
            if (templeStateFilter !== 'All' && t.state?.toLowerCase() !== templeStateFilter.toLowerCase()) return false;
            if (templeSearch.trim()) {
              const q = templeSearch.toLowerCase().trim();
              const mName = t.name?.toLowerCase().includes(q);
              const mDeity = t.deity?.toLowerCase().includes(q);
              const mDistrict = t.district?.toLowerCase().includes(q);
              const mCity = t.city?.toLowerCase().includes(q);
              if (!mName && !mDeity && !mDistrict && !mCity) return false;
            }
            return true;
          });

          // Unique states for filter dropdown
          const templeStates = Array.from(new Set(temples.map(t => t.state).filter(Boolean))).sort();

          return (
            <div className="db-admin-section">
              <div className="db-admin-section-header">
                <h2>🛕 Temple Management ({temples.length})</h2>
                <button
                  className="db-admin-btn-accent"
                  onClick={() => setShowAddTemple(!showAddTemple)}
                >
                  <FaPlus size={12} /> {showAddTemple ? 'Close Form' : 'Add New Temple'}
                </button>
              </div>

              {/* SEARCH & STATE FILTER TOOLBAR */}
              <div className="db-admin-toolbar-row">
                <select
                  className="db-admin-filter-select"
                  value={templeStateFilter}
                  onChange={(e) => setTempleStateFilter(e.target.value)}
                >
                  <option value="All">All States ({temples.length})</option>
                  <option value="Andhra Pradesh">Andhra Pradesh (15)</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh (12)</option>
                  {templeStates.filter(s => s !== 'Andhra Pradesh' && s !== 'Arunachal Pradesh').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <input
                  type="text"
                  className="db-admin-filter-input"
                  placeholder="Search temples by name, deity, or district..."
                  value={templeSearch}
                  onChange={(e) => setTempleSearch(e.target.value)}
                />

                <span style={{ fontSize: '13px', color: '#7a5040', fontWeight: '600' }}>
                  Showing {filteredAdminTemples.length} of {temples.length} temples
                </span>
              </div>

              {/* ADD TEMPLE FORM */}
              {showAddTemple && (
                <div className="db-admin-form-card">
                  <h3>Add New Temple to MongoDB</h3>
                  <form onSubmit={handleAddTemple} className="db-admin-form-grid">
                    <div className="db-admin-form-group">
                      <label>Temple Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mahakaleshwar Temple"
                        value={newTemple.name}
                        onChange={(e) => setNewTemple({ ...newTemple, name: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>Presiding Deity</label>
                      <input
                        type="text"
                        placeholder="e.g. Lord Shiva"
                        value={newTemple.deity}
                        onChange={(e) => setNewTemple({ ...newTemple, deity: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Madhya Pradesh"
                        value={newTemple.state}
                        onChange={(e) => setNewTemple({ ...newTemple, state: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>City / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Ujjain"
                        value={newTemple.city}
                        onChange={(e) => setNewTemple({ ...newTemple, city: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>Architecture Style</label>
                      <input
                        type="text"
                        placeholder="e.g. Nagara Bhumija Style"
                        value={newTemple.architecture}
                        onChange={(e) => setNewTemple({ ...newTemple, architecture: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>Darshan Timings</label>
                      <input
                        type="text"
                        placeholder="e.g. 4:00 AM – 11:00 PM"
                        value={newTemple.timings}
                        onChange={(e) => setNewTemple({ ...newTemple, timings: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Image URL or GridFS Link</label>
                      <input
                        type="text"
                        placeholder="e.g. /api/media/6ae6... or external image URL"
                        value={newTemple.image}
                        onChange={(e) => setNewTemple({ ...newTemple, image: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Description *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detailed spiritual history, rituals, and significance..."
                        value={newTemple.description}
                        onChange={(e) => setNewTemple({ ...newTemple, description: e.target.value })}
                      />
                    </div>
                    {templeMsg && <p className="db-admin-form-msg">{templeMsg}</p>}
                    <button type="submit" className="db-admin-submit-btn">
                      Save Temple to MongoDB
                    </button>
                  </form>
                </div>
              )}

              {/* TEMPLES TABLE */}
              <div className="db-admin-table-wrap">
                <table className="db-admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Deity</th>
                      <th>State / District</th>
                      <th>Architecture</th>
                      <th>Timings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdminTemples.map(t => (
                      <tr key={t._id}>
                        <td>
                          <strong>{t.name}</strong>
                          {t.category && (
                            <span style={{ display: 'block', fontSize: '11px', color: '#8a6050' }}>
                              {t.category}
                            </span>
                          )}
                        </td>
                        <td><span className="db-admin-badge">{t.deity || 'Sacred Shrine'}</span></td>
                        <td>{t.state}{t.district ? ` (${t.district})` : ''}</td>
                        <td>{t.architecture || 'Traditional'}</td>
                        <td>{t.timings || 'Daily'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="db-admin-edit-btn"
                              onClick={() => handleStartEditTemple(t)}
                              title="Edit Temple"
                            >
                              <FaEdit size={12} /> Edit
                            </button>
                            <button
                              className="db-admin-delete-btn"
                              onClick={() => deleteTemple(t._id)}
                              title="Delete Temple"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* EDIT TEMPLE MODAL */}
              {editingTemple && (
                <div
                  className="db-admin-modal-backdrop"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setEditingTemple(null);
                  }}
                >
                  <div className="db-admin-modal-card">
                    <div className="db-admin-modal-header">
                      <h3>Edit Temple: {editingTemple.name}</h3>
                      <button
                        className="db-admin-modal-close"
                        onClick={() => setEditingTemple(null)}
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveEditTemple} className="db-admin-notif-form">
                      <div className="db-admin-form-group">
                        <label>Temple Name *</label>
                        <input
                          type="text"
                          required
                          value={editTempleForm.name}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, name: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Alternative Names (comma-separated)</label>
                        <input
                          type="text"
                          value={editTempleForm.altNames}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, altNames: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Presiding Deity</label>
                        <input
                          type="text"
                          value={editTempleForm.deity}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, deity: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Category</label>
                        <input
                          type="text"
                          value={editTempleForm.category}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, category: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>State *</label>
                        <input
                          type="text"
                          required
                          value={editTempleForm.state}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, state: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>District</label>
                        <input
                          type="text"
                          value={editTempleForm.district}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, district: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>City / Location</label>
                        <input
                          type="text"
                          value={editTempleForm.city}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, city: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Architecture Style</label>
                        <input
                          type="text"
                          value={editTempleForm.architecture}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, architecture: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Darshan Timings</label>
                        <input
                          type="text"
                          value={editTempleForm.timings}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, timings: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Best Time to Visit</label>
                        <input
                          type="text"
                          value={editTempleForm.bestTimeToVisit}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, bestTimeToVisit: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Latitude Coordinates</label>
                        <input
                          type="number"
                          step="any"
                          value={editTempleForm.lat}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, lat: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Longitude Coordinates</label>
                        <input
                          type="number"
                          step="any"
                          value={editTempleForm.lng}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, lng: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Google Maps URL</label>
                        <input
                          type="text"
                          value={editTempleForm.mapsUrl}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, mapsUrl: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Image URL</label>
                        <input
                          type="text"
                          value={editTempleForm.image}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, image: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Morning Pooja Schedule</label>
                        <input
                          type="text"
                          value={editTempleForm.morningPooja}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, morningPooja: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Evening Aarti Schedule</label>
                        <input
                          type="text"
                          value={editTempleForm.eveningAarti}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, eveningAarti: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Prasad & Annaprasadam Details</label>
                        <input
                          type="text"
                          value={editTempleForm.prasadInfo}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, prasadInfo: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Dress Code & Visitor Guidelines</label>
                        <input
                          type="text"
                          value={editTempleForm.dressCode}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, dressCode: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Temple Description *</label>
                        <textarea
                          rows={3}
                          required
                          value={editTempleForm.description}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, description: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Detailed Historical Background</label>
                        <textarea
                          rows={3}
                          value={editTempleForm.history}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, history: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Spiritual Significance</label>
                        <textarea
                          rows={2}
                          value={editTempleForm.significance}
                          onChange={(e) => setEditTempleForm({ ...editTempleForm, significance: e.target.value })}
                        />
                      </div>

                      {editTempleMsg && (
                        <p className="db-admin-form-msg" style={{ gridColumn: '1 / -1' }}>
                          {editTempleMsg}
                        </p>
                      )}

                      <div className="db-admin-modal-actions">
                        <button
                          type="button"
                          className="db-admin-cancel-btn"
                          onClick={() => setEditingTemple(null)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="db-admin-submit-btn">
                          Save Changes to MongoDB
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* HERITAGE TAB */}
        {activeTab === 'Heritage' && (() => {
          // Filter heritage by state, category, and search query
          const filteredAdminHeritage = heritage.filter(h => {
            const matchesState =
              heritageStateFilter === 'All' ||
              (h.state && h.state.toLowerCase() === heritageStateFilter.toLowerCase());

            const matchesCategory =
              heritageCategoryFilter === 'All' ||
              (h.category && h.category.toLowerCase().includes(heritageCategoryFilter.toLowerCase()));

            const q = heritageSearch.toLowerCase().trim();
            const matchesSearch =
              !q ||
              (h.name && h.name.toLowerCase().includes(q)) ||
              (h.altName && h.altName.toLowerCase().includes(q)) ||
              (h.district && h.district.toLowerCase().includes(q)) ||
              (h.city && h.city.toLowerCase().includes(q)) ||
              (h.dynasty && h.dynasty.toLowerCase().includes(q)) ||
              (h.historicalPeriod && h.historicalPeriod.toLowerCase().includes(q)) ||
              (h.description && h.description.toLowerCase().includes(q));

            return matchesState && matchesCategory && matchesSearch;
          });

          // Unique states for filter dropdown
          const heritageStates = Array.from(new Set(heritage.map(h => h.state).filter(Boolean))).sort();
          const apCount = heritage.filter(h => h.state === 'Andhra Pradesh').length;
          const arCount = heritage.filter(h => h.state === 'Arunachal Pradesh').length;

          // Unique categories
          const heritageCategories = Array.from(new Set(heritage.map(h => h.category).filter(Boolean))).sort();

          // Filter reviews
          const filteredReviews = heritageReviews.filter(r => {
            if (reviewFilter === 'all') return true;
            return r.status === reviewFilter;
          });

          return (
            <div className="db-admin-section">
              <div className="db-admin-section-header">
                <h2>🏛️ Heritage Management ({heritage.length})</h2>
                <button
                  className="db-admin-btn-accent"
                  onClick={() => setShowAddHeritage(!showAddHeritage)}
                >
                  <FaPlus size={12} /> {showAddHeritage ? 'Close Form' : 'Add Heritage Site'}
                </button>
              </div>

              {/* SEARCH & STATE/CATEGORY FILTER TOOLBAR */}
              <div className="db-admin-toolbar-row">
                <select
                  className="db-admin-filter-select"
                  value={heritageStateFilter}
                  onChange={(e) => setHeritageStateFilter(e.target.value)}
                >
                  <option value="All">All States ({heritage.length})</option>
                  <option value="Andhra Pradesh">Andhra Pradesh ({apCount})</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh ({arCount || 32})</option>
                  {heritageStates.filter(s => s !== 'Andhra Pradesh' && s !== 'Arunachal Pradesh').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  className="db-admin-filter-select"
                  value={heritageCategoryFilter}
                  onChange={(e) => setHeritageCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {heritageCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <input
                  type="text"
                  className="db-admin-filter-input"
                  placeholder="Search heritage by name, alt name, district, dynasty, or city..."
                  value={heritageSearch}
                  onChange={(e) => setHeritageSearch(e.target.value)}
                />

                <span style={{ fontSize: '13px', color: '#7a5040', fontWeight: '600' }}>
                  Showing {filteredAdminHeritage.length} of {heritage.length} destinations
                </span>
              </div>

              {/* ADD HERITAGE FORM */}
              {showAddHeritage && (
                <div className="db-admin-form-card">
                  <h3>Add New Heritage Landmark to MongoDB</h3>
                  <form onSubmit={handleAddHeritage} className="db-admin-form-grid">
                    <div className="db-admin-form-group">
                      <label>Monument / Heritage Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gandikota Fort"
                        value={newHeritage.name}
                        onChange={(e) => setNewHeritage({ ...newHeritage, name: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>Category *</label>
                      <select
                        value={newHeritage.category}
                        onChange={(e) => setNewHeritage({ ...newHeritage, category: e.target.value })}
                      >
                        <option value="Forts & Palaces">Forts & Palaces</option>
                        <option value="Ancient Caves">Ancient Caves</option>
                        <option value="Buddhist Heritage">Buddhist Heritage</option>
                        <option value="Ancient Temples">Ancient Temples</option>
                        <option value="Archaeological Sites">Archaeological Sites</option>
                        <option value="Historical Towns">Historical Towns</option>
                        <option value="Monument">Monument</option>
                        <option value="Historical Place">Historical Place</option>
                      </select>
                    </div>
                    <div className="db-admin-form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Andhra Pradesh"
                        value={newHeritage.state}
                        onChange={(e) => setNewHeritage({ ...newHeritage, state: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group">
                      <label>Historical Period / Dynasty</label>
                      <input
                        type="text"
                        placeholder="e.g. 13th Century CE, Pemmasani Nayaks"
                        value={newHeritage.historicalPeriod}
                        onChange={(e) => setNewHeritage({ ...newHeritage, historicalPeriod: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Image URL or GridFS Link</label>
                      <input
                        type="text"
                        placeholder="e.g. /api/media/6ae6... or external image URL"
                        value={newHeritage.image}
                        onChange={(e) => setNewHeritage({ ...newHeritage, image: e.target.value })}
                      />
                    </div>
                    <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                      <label>Description *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Historical significance, architecture, and cultural facts..."
                        value={newHeritage.description}
                        onChange={(e) => setNewHeritage({ ...newHeritage, description: e.target.value })}
                      />
                    </div>
                    {heritageMsg && <p className="db-admin-form-msg">{heritageMsg}</p>}
                    <button type="submit" className="db-admin-submit-btn">
                      Save Heritage to MongoDB
                    </button>
                  </form>
                </div>
              )}

              {/* HERITAGE TABLE */}
              <div className="db-admin-table-wrap">
                <table className="db-admin-table">
                  <thead>
                    <tr>
                      <th>Name & Location</th>
                      <th>Category</th>
                      <th>State / District</th>
                      <th>Dynasty / Period</th>
                      <th>Badges</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdminHeritage.map(h => (
                      <tr key={h._id}>
                        <td>
                          <strong>{h.name}</strong>
                          {h.altName && (
                            <span style={{ display: 'block', fontSize: '11px', color: '#8a6050' }}>
                              aka {h.altName}
                            </span>
                          )}
                          {h.city && (
                            <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>
                              📍 {h.city}
                            </span>
                          )}
                        </td>
                        <td><span className="db-admin-badge">{h.category}</span></td>
                        <td>{h.state}{h.district ? ` (${h.district})` : ''}</td>
                        <td style={{ fontSize: '12px' }}>
                          {h.dynasty || h.historicalPeriod || 'Ancient Bharat'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {h.unescoStatus || h.unescoListed ? (
                              <span style={{ fontSize: '10px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                UNESCO
                              </span>
                            ) : null}
                            {h.featured && (
                              <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                Featured
                              </span>
                            )}
                            {h.isPopular && (
                              <span style={{ fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                Popular
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#b45309' }}>
                            ⭐ {h.averageRating ? h.averageRating.toFixed(1) : '4.8'}
                          </span>
                          <span style={{ display: 'block', fontSize: '10px', color: '#64748b' }}>
                            ({h.reviewCount || 0} reviews)
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="db-admin-edit-btn"
                              onClick={() => handleStartEditHeritage(h)}
                              title="Edit Heritage Destination"
                            >
                              <FaEdit size={12} /> Edit
                            </button>
                            <button
                              className="db-admin-delete-btn"
                              onClick={() => deleteHeritage(h._id)}
                              title="Delete Heritage"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* EDIT HERITAGE MODAL */}
              {editingHeritage && (
                <div
                  className="db-admin-modal-backdrop"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setEditingHeritage(null);
                  }}
                >
                  <div className="db-admin-modal-card">
                    <div className="db-admin-modal-header">
                      <h3>Edit Heritage Destination: {editingHeritage.name}</h3>
                      <button
                        className="db-admin-modal-close"
                        onClick={() => setEditingHeritage(null)}
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSaveEditHeritage} className="db-admin-notif-form">
                      <div className="db-admin-form-group">
                        <label>Destination Name *</label>
                        <input
                          type="text"
                          required
                          value={editHeritageForm.name}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, name: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Alternative Names (comma-separated)</label>
                        <input
                          type="text"
                          value={editHeritageForm.altName}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, altName: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Category *</label>
                        <select
                          value={editHeritageForm.category}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, category: e.target.value })}
                        >
                          <option value="Forts & Palaces">Forts & Palaces</option>
                          <option value="Ancient Caves">Ancient Caves</option>
                          <option value="Buddhist Heritage">Buddhist Heritage</option>
                          <option value="Ancient Temples">Ancient Temples</option>
                          <option value="Archaeological Sites">Archaeological Sites</option>
                          <option value="Historical Towns">Historical Towns</option>
                          <option value="Monument">Monument</option>
                          <option value="Historical Place">Historical Place</option>
                        </select>
                      </div>

                      <div className="db-admin-form-group">
                        <label>State *</label>
                        <input
                          type="text"
                          required
                          value={editHeritageForm.state}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, state: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>District</label>
                        <input
                          type="text"
                          value={editHeritageForm.district}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, district: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>City / Location</label>
                        <input
                          type="text"
                          value={editHeritageForm.city}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, city: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Historical Period / Era</label>
                        <input
                          type="text"
                          value={editHeritageForm.historicalPeriod}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, historicalPeriod: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Dynasty / Historical Rulers</label>
                        <input
                          type="text"
                          value={editHeritageForm.dynasty}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, dynasty: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Architectural Style</label>
                        <input
                          type="text"
                          value={editHeritageForm.architecturalStyle}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, architecturalStyle: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>UNESCO World Heritage Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Tentative List / Documented National Monument"
                          value={editHeritageForm.unescoStatus}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, unescoStatus: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Visiting Timings</label>
                        <input
                          type="text"
                          value={editHeritageForm.timings}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, timings: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Entry Fee</label>
                        <input
                          type="text"
                          value={editHeritageForm.entryFee}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, entryFee: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Best Time to Visit</label>
                        <input
                          type="text"
                          value={editHeritageForm.bestTimeToVisit}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, bestTimeToVisit: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Latitude Coordinates</label>
                        <input
                          type="number"
                          step="any"
                          value={editHeritageForm.lat}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, lat: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group">
                        <label>Longitude Coordinates</label>
                        <input
                          type="number"
                          step="any"
                          value={editHeritageForm.lng}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, lng: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Google Maps URL</label>
                        <input
                          type="text"
                          value={editHeritageForm.googleMapsUrl}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, googleMapsUrl: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Hero Image URL</label>
                        <input
                          type="text"
                          value={editHeritageForm.image}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, image: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Dress Code & Visitor Guidelines</label>
                        <input
                          type="text"
                          value={editHeritageForm.guidelines}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, guidelines: e.target.value })}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '16px', gridColumn: '1 / -1', margin: '8px 0' }}>
                        <label className="db-admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={editHeritageForm.featured}
                            onChange={(e) => setEditHeritageForm({ ...editHeritageForm, featured: e.target.checked })}
                          />
                          Featured Destination (Hero Highlight)
                        </label>

                        <label className="db-admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={editHeritageForm.isPopular}
                            onChange={(e) => setEditHeritageForm({ ...editHeritageForm, isPopular: e.target.checked })}
                          />
                          Popular Destination
                        </label>
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Brief Description *</label>
                        <textarea
                          rows={3}
                          required
                          value={editHeritageForm.description}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, description: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Detailed Historical Background</label>
                        <textarea
                          rows={4}
                          value={editHeritageForm.historicalBackground}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, historicalBackground: e.target.value })}
                        />
                      </div>

                      <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Cultural & Archaeological Significance</label>
                        <textarea
                          rows={3}
                          value={editHeritageForm.culturalImportance}
                          onChange={(e) => setEditHeritageForm({ ...editHeritageForm, culturalImportance: e.target.value })}
                        />
                      </div>

                      {editHeritageMsg && (
                        <p className="db-admin-form-msg" style={{ gridColumn: '1 / -1' }}>
                          {editHeritageMsg}
                        </p>
                      )}

                      <div className="db-admin-modal-actions">
                        <button
                          type="button"
                          className="db-admin-cancel-btn"
                          onClick={() => setEditingHeritage(null)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="db-admin-submit-btn">
                          Save Changes to MongoDB
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* COMMUNITY REVIEWS MODERATION PANEL */}
              <div className="db-admin-review-section">
                <div className="db-admin-section-header">
                  <h3>📝 Community Reviews & Ratings Moderation ({heritageReviews.length})</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'reported', 'pending', 'approved', 'rejected'].map(st => (
                      <button
                        key={st}
                        className={`db-admin-cat-filter ${reviewFilter === st ? 'active' : ''}`}
                        onClick={() => setReviewFilter(st)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: reviewFilter === st ? '1px solid #c99a6b' : '1px solid #e2e8f0',
                          background: reviewFilter === st ? '#fff4eb' : '#ffffff',
                          fontWeight: '600',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {st.charAt(0).toUpperCase() + st.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {reviewActionMsg && (
                  <p style={{ color: '#15803d', fontWeight: 'bold', margin: '4px 0 12px' }}>
                    {reviewActionMsg}
                  </p>
                )}

                {filteredReviews.length === 0 ? (
                  <p style={{ color: '#8a6050', fontStyle: 'italic', padding: '16px 0' }}>
                    No reviews in selected filter category.
                  </p>
                ) : (
                  <div className="db-admin-table-wrap">
                    <table className="db-admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Heritage Site</th>
                          <th>Rating</th>
                          <th>Review Text</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Moderation Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReviews.map(rev => (
                          <tr key={rev._id}>
                            <td><strong>{rev.userName}</strong></td>
                            <td>
                              {rev.heritage?.name ? (
                                <strong>{rev.heritage.name}</strong>
                              ) : (
                                <span style={{ color: '#94a3b8' }}>ID: {rev.heritage}</span>
                              )}
                            </td>
                            <td>
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                                {'★'.repeat(rev.rating)}
                              </span>{' '}
                              ({rev.rating}/5)
                            </td>
                            <td style={{ maxWidth: '300px', fontSize: '12px', color: '#334155' }}>
                              "{rev.reviewText}"
                            </td>
                            <td style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                              {rev.visitDate || new Date(rev.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <span className={`db-admin-status ${rev.status}`}>
                                {rev.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {rev.status !== 'approved' && (
                                  <button
                                    className="db-admin-approve-btn"
                                    onClick={() => handleModerateReview(rev._id, 'approved')}
                                    title="Approve review"
                                  >
                                    Approve
                                  </button>
                                )}
                                {rev.status !== 'rejected' && (
                                  <button
                                    className="db-admin-reject-btn"
                                    onClick={() => handleModerateReview(rev._id, 'rejected')}
                                    title="Reject or hide review"
                                  >
                                    Reject
                                  </button>
                                )}
                                <button
                                  className="db-admin-delete-btn"
                                  onClick={() => handleDeleteReview(rev._id)}
                                  title="Delete review permanently"
                                >
                                  <FaTrash size={11} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* STATES & ICONS TAB */}
        {activeTab === 'States' && (
          <div className="db-admin-section">
            <div className="db-admin-section-header">
              <h2>🗺️ States & Cultural Themes in MongoDB ({states.length})</h2>
              {stateEditMsg && (
                <span style={{ color: '#27ae60', fontWeight: 'bold', marginLeft: '16px' }}>
                  {stateEditMsg}
                </span>
              )}
            </div>
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Region</th>
                    <th>Architectural Style</th>
                    <th>Icon</th>
                    <th>Manage Icon</th>
                  </tr>
                </thead>
                <tbody>
                  {states.map(s => (
                    <tr key={s._id}>
                      <td><strong>{s.name}</strong></td>
                      <td><span className="db-admin-badge">{s.isUT ? 'Union Territory' : 'State'}</span></td>
                      <td>{s.region}</td>
                      <td style={{ fontSize: '12px', color: '#7a5040' }}>{s.archStyle || 'Classical Indian Architecture'}</td>
                      <td style={{ fontSize: '24px', textAlign: 'center' }}>{s.icon || '🏛️'}</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={s.icon || ''}
                          key={s._id + (s.icon || '')}
                          onBlur={(e) => {
                            const val = e.target.value.trim();
                            if (val && val !== s.icon) updateStateIcon(s._id, val);
                          }}
                          style={{
                            width: '60px',
                            padding: '6px 10px',
                            textAlign: 'center',
                            fontSize: '18px',
                            borderRadius: '8px',
                            border: '1px solid #d4a373'
                          }}
                          title="Enter cultural icon/emoji and click away to save to MongoDB"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MEDIA & GRIDFS TAB */}
        {activeTab === 'Media & GridFS' && (
          <div className="db-admin-section">
            <div className="db-admin-section-header">
              <h2>🖼️ MongoDB GridFS Image & Asset Storage ({mediaList.length} files)</h2>
            </div>

            {/* UPLOAD FORM */}
            <div className="db-admin-form-card">
              <h3>Upload Image Directly into MongoDB GridFS</h3>
              <p style={{ fontSize: '13px', color: '#8a6050', margin: '0 0 16px' }}>
                Files are stored as native binary chunks inside MongoDB (<code>uploads.files</code> & <code>uploads.chunks</code>) and can be embedded anywhere.
              </p>
              <form onSubmit={handleUploadMedia} className="db-admin-form-grid">
                <div className="db-admin-form-group">
                  <label>Select Image File *</label>
                  <input
                    id="gridfs-file-input"
                    type="file"
                    required
                    accept="image/*,.svg,.ico,.pdf"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
                <div className="db-admin-form-group">
                  <label>Asset Category</label>
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                  >
                    <option value="temple">Temple Image</option>
                    <option value="heritage">Heritage Site Image</option>
                    <option value="state">State Regional Asset</option>
                    <option value="banner">Banner / Hero Backdrop</option>
                    <option value="logo">Logo & Emblem</option>
                    <option value="icon">Icon Asset</option>
                    <option value="general">General Asset</option>
                  </select>
                </div>
                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Asset Description</label>
                  <input
                    type="text"
                    placeholder="Brief description of the image or shrine..."
                    value={mediaDesc}
                    onChange={(e) => setMediaDesc(e.target.value)}
                  />
                </div>
                {uploadStatus && <p className="db-admin-form-msg">{uploadStatus}</p>}
                <button type="submit" className="db-admin-submit-btn">
                  <FaUpload size={13} style={{ marginRight: '6px' }} /> Upload to MongoDB GridFS
                </button>
              </form>
            </div>

            {/* MEDIA LIST TABLE */}
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Original Name</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>GridFS URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#a07060' }}>
                        No images uploaded to GridFS yet. Use the upload form above.
                      </td>
                    </tr>
                  ) : (
                    mediaList.map(m => (
                      <tr key={m._id}>
                        <td>
                          <img
                            src={m.url}
                            alt={m.originalName}
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #e6ab82'
                            }}
                          />
                        </td>
                        <td>
                          <strong>{m.originalName}</strong>
                          <div style={{ fontSize: '11px', color: '#8a6050' }}>{m.filename}</div>
                        </td>
                        <td><span className="db-admin-badge">{m.category}</span></td>
                        <td>{(m.size / 1024).toFixed(1)} KB</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <code style={{ fontSize: '11px', background: '#f5eee6', padding: '2px 6px', borderRadius: '4px' }}>
                              {m.url}
                            </code>
                            <button
                              type="button"
                              onClick={() => handleCopyUrl(m.url, m._id)}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: copiedId === m._id ? '#27ae60' : '#8a6050' }}
                              title="Copy URL"
                            >
                              {copiedId === m._id ? <FaCheck size={12} /> : <FaCopy size={12} />}
                            </button>
                          </div>
                        </td>
                        <td>
                          <button
                            className="db-admin-delete-btn"
                            onClick={() => handleDeleteMedia(m._id)}
                            title="Delete from GridFS"
                          >
                            <FaTrash size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WEBSITE SETTINGS TAB */}
        {activeTab === 'Settings' && (
          <div className="db-admin-section">
            <div className="db-admin-section-header">
              <h2>⚙️ Website Settings & Portal Metadata</h2>
            </div>

            <div className="db-admin-form-card">
              <h3>Portal Identity Stored in MongoDB</h3>
              <p style={{ fontSize: '13px', color: '#8a6050', margin: '0 0 20px' }}>
                All modifications update the <code>Setting</code> collection in MongoDB and persist across all user sessions and server restarts.
              </p>
              <form onSubmit={handleSaveSettings} className="db-admin-form-grid">
                <div className="db-admin-form-group">
                  <label>Portal Name</label>
                  <input
                    type="text"
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group">
                  <label>Official Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Hero Main Heading</label>
                  <input
                    type="text"
                    value={settingsForm.heroHeading}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeading: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Portal Announcement Banner</label>
                  <input
                    type="text"
                    value={settingsForm.announcement}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    value={settingsForm.contactPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  />
                </div>
                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Footer Description</label>
                  <textarea
                    rows={2}
                    value={settingsForm.footerDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, footerDescription: e.target.value })}
                  />
                </div>
                {settingsData && (
                  <p style={{ gridColumn: '1 / -1', fontSize: '12px', color: '#8a6050', margin: '4px 0' }}>
                    Last saved in MongoDB: {new Date(settingsData.updatedAt).toLocaleString()}
                  </p>
                )}
                {settingsMsg && <p className="db-admin-form-msg">{settingsMsg}</p>}
                <button type="submit" className="db-admin-submit-btn">
                  Save Settings to MongoDB
                </button>
              </form>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'Users' && (
          <div className="db-admin-section">
            <h2>👥 User Management ({users.length})</h2>
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td><strong>{u.name}</strong></td>
                      <td style={{ fontSize: '13px', color: '#8a6050' }}>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u._id, e.target.value)}
                          className="db-admin-role-select"
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>{u.isActive ? '✅' : '❌'}</td>
                      <td>
                        <button className="db-admin-delete-btn" onClick={() => deleteUser(u._id)} title="Delete User">
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULES TAB */}
        {activeTab === 'Modules' && (
          <div className="db-admin-section">
            <h2>📚 Learning Modules ({modules.length})</h2>
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr><th>Title</th><th>Level</th><th>Category</th><th>Lessons</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  {modules.map(m => (
                    <tr key={m._id}>
                      <td><strong>{m.title}</strong></td>
                      <td><span className={`db-admin-level ${m.level}`}>{m.level}</span></td>
                      <td>{m.category}</td>
                      <td>{m.lessons?.length || 0}</td>
                      <td>{m.duration} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUIZZES TAB */}
        {activeTab === 'Quizzes' && (
          <div className="db-admin-section">
            <h2>📝 Quizzes ({quizzes.length})</h2>
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr><th>Title</th><th>Category</th><th>Questions</th><th>Passing Score</th></tr>
                </thead>
                <tbody>
                  {quizzes.map(q => (
                    <tr key={q._id}>
                      <td><strong>{q.title}</strong></td>
                      <td>{q.category}</td>
                      <td>{q.questions?.length || 0}</td>
                      <td>{q.passingScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'Notifications' && (
          <div className="db-admin-section">
            <div className="db-admin-section-header">
              <h2>🔔 Real-Time Portal Notifications & Announcements ({notifications.length})</h2>
            </div>

            {/* BROADCAST FORM CARD */}
            <div className="db-admin-notif-card">
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#6b2d1b', margin: '0 0 8px' }}>
                📢 Broadcast New Announcement to All Users
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8a6050', margin: '0 0 16px' }}>
                Instantly streams in real time via Server-Sent Events (SSE) to all connected visitors and saves to MongoDB.
              </p>

              <form onSubmit={handleBroadcastNotification} className="db-admin-notif-form">
                <div className="db-admin-form-group">
                  <label>Title (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahashivratri Celebrations Announced"
                    value={newNotif.title}
                    onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                  />
                </div>

                <div className="db-admin-form-group">
                  <label>Title (Hindi)</label>
                  <input
                    type="text"
                    placeholder="उदा. महाशिवरात्रि महोत्सव की घोषणा"
                    value={newNotif.titleHi}
                    onChange={(e) => setNewNotif({ ...newNotif, titleHi: e.target.value })}
                  />
                </div>

                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Message (English) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Details about the festival, special darshan timings, or portal announcement..."
                    value={newNotif.message}
                    onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                  />
                </div>

                <div className="db-admin-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Message (Hindi)</label>
                  <textarea
                    rows={2}
                    placeholder="उत्सव, विशेष दर्शन समय, या पोर्टल सूचना का हिंदी विवरण..."
                    value={newNotif.messageHi}
                    onChange={(e) => setNewNotif({ ...newNotif, messageHi: e.target.value })}
                  />
                </div>

                <div className="db-admin-form-group">
                  <label>Type</label>
                  <select
                    value={newNotif.type}
                    onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value })}
                  >
                    <option value="info">Info / Announcement</option>
                    <option value="festival">Festival / Sacred Event</option>
                    <option value="temple">Temple Update</option>
                    <option value="alert">Alert / Advisory</option>
                  </select>
                </div>

                <div className="db-admin-form-group">
                  <label>Portal Link</label>
                  <input
                    type="text"
                    placeholder="/temples or /heritage"
                    value={newNotif.link}
                    onChange={(e) => setNewNotif({ ...newNotif, link: e.target.value })}
                  />
                </div>

                {broadcastStatus && (
                  <div className="db-admin-broadcast-status">
                    ✦ {broadcastStatus}
                  </div>
                )}

                <button type="submit" className="db-admin-broadcast-btn">
                  <FaPaperPlane size={13} /> Broadcast Live Notification
                </button>
              </form>
            </div>

            {/* NOTIFICATIONS TABLE */}
            <div className="db-admin-table-wrap">
              <table className="db-admin-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Title (EN / HI)</th>
                    <th>Message</th>
                    <th>Link</th>
                    <th>Sent At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: '#a07060' }}>
                        No notifications sent yet. Use the broadcast form above to send an announcement.
                      </td>
                    </tr>
                  ) : (
                    notifications.map(n => (
                      <tr key={n._id}>
                        <td>
                          <span className="db-admin-badge">{n.type || 'info'}</span>
                        </td>
                        <td>
                          <strong>{n.title}</strong>
                          {n.titleHi && <div style={{ fontSize: '11.5px', color: '#b45309' }}>{n.titleHi}</div>}
                        </td>
                        <td style={{ maxWidth: '320px', fontSize: '12px' }}>
                          <div>{n.message}</div>
                          {n.messageHi && <div style={{ color: '#7a5040', marginTop: '2px' }}>{n.messageHi}</div>}
                        </td>
                        <td>
                          <code style={{ fontSize: '11px', background: '#f5eee6', padding: '2px 6px', borderRadius: '4px' }}>
                            {n.link || '/'}
                          </code>
                        </td>
                        <td style={{ fontSize: '11.5px', color: '#8a6050', whiteSpace: 'nowrap' }}>
                          {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td>
                          <button
                            className="db-admin-delete-btn"
                            onClick={() => deleteNotificationItem(n._id)}
                            title="Delete Notification"
                          >
                            <FaTrash size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
