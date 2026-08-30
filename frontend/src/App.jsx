import React, { useEffect, useState } from 'react';

export default function App() {
    const [backendStatus, setBackendStatus] = useState('Checking...');
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'addJob', 'profile'
    const [savedJobs, setSavedJobs] = useState([]);
    const [applied, setApplied] = useState(false);

    // New Job Form State
    const [newTitle, setNewTitle] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [newLocation, setNewLocation] = useState('Remote');
    const [newSalary, setNewSalary] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/health')
            .then((res) => res.json())
            .then((data) => setBackendStatus(data.status))
            .catch(() => setBackendStatus('Offline'));

        fetch('http://localhost:8080/api/jobs')
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((err) => console.error('Error loading jobs:', err));
    }, []);

    // Feature 2: Post New Job
    const handleAddJob = (e) => {
        e.preventDefault();
        const jobData = { title: newTitle, company: newCompany, location: newLocation, salary: newSalary };

        fetch('http://localhost:8080/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData),
        })
            .then((res) => res.json())
            .then((data) => {
                setJobs([...jobs, data]);
                setNewTitle('');
                setNewCompany('');
                setNewSalary('');
                setActiveTab('jobs');
            });
    };

    // Feature 3: Toggle Save Job
    const toggleSaveJob = (job) => {
        if (savedJobs.some((j) => j.id === job.id)) {
            setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
        } else {
            setSavedJobs([...savedJobs, job]);
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', margin: 0 }}>
            {/* Navigation Bar */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#1e293b', color: '#fff' }}>
                <h2 style={{ margin: 0, color: '#38bdf8', cursor: 'pointer' }} onClick={() => setActiveTab('jobs')}>🧭 Career Compass</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button onClick={() => setActiveTab('jobs')} style={{ background: 'none', border: 'none', color: activeTab === 'jobs' ? '#38bdf8' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Jobs</button>
                    <button onClick={() => setActiveTab('addJob')} style={{ background: 'none', border: 'none', color: activeTab === 'addJob' ? '#38bdf8' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+ Post Job</button>
                    <button onClick={() => setActiveTab('profile')} style={{ background: 'none', border: 'none', color: activeTab === 'profile' ? '#38bdf8' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Profile ({savedJobs.length})</button>
                    <span style={{ fontSize: '0.8rem', backgroundColor: backendStatus === 'ok' ? '#16a34a' : '#dc2626', padding: '4px 8px', borderRadius: '4px' }}>{backendStatus}</span>
                </div>
            </nav>

            {/* TAB 1: JOBS LIST */}
            {activeTab === 'jobs' && (
                <div style={{ padding: '30px 20px', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h1 style={{ color: '#0f172a' }}>Find Your Dream Career</h1>
                        <input
                            type="text"
                            placeholder="🔍 Search jobs by title or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '80%', padding: '12px 20px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                        {filteredJobs.map((job) => (
                            <div key={job.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'relative' }}>
                                <button
                                    onClick={() => toggleSaveJob(job)}
                                    style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                >
                                    {savedJobs.some((j) => j.id === job.id) ? '⭐️' : '☆'}
                                </button>
                                <h4 style={{ margin: '0 0 8px 0', color: '#0284c7' }}>{job.title}</h4>
                                <p style={{ margin: '4px 0', color: '#475569', fontSize: '0.9rem' }}>🏢 {job.company}</p>
                                <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.85rem' }}>📍 {job.location} | 💰 {job.salary}</p>

                                <button
                                    onClick={() => { setSelectedJob(job); setApplied(false); }}
                                    style={{ marginTop: '15px', backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
                                >
                                    View & Apply
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 2: POST NEW JOB FORM */}
            {activeTab === 'addJob' && (
                <div style={{ maxWidth: '500px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    <h2>Post a New Job Opening</h2>
                    <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input type="text" placeholder="Job Title (e.g. React Developer)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        <input type="text" placeholder="Company Name" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        <select value={newLocation} onChange={(e) => setNewLocation(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="On-site">On-site</option>
                        </select>
                        <input type="text" placeholder="Salary Range (e.g. $85,000)" value={newSalary} onChange={(e) => setNewSalary(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                        <button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Publish Job</button>
                    </form>
                </div>
            )}

            {/* TAB 3: USER PROFILE & SAVED JOBS */}
            {activeTab === 'profile' && (
                <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
                        <h2>👤 Bala Chandrika</h2>
                        <p style={{ color: '#64748b' }}>Frontend & Full Stack Developer</p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <span style={{ backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>React</span>
                            <span style={{ backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>JavaScript</span>
                            <span style={{ backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>Node.js</span>
                        </div>
                    </div>

                    <h3>⭐️ Saved Jobs ({savedJobs.length})</h3>
                    {savedJobs.length > 0 ? (
                        savedJobs.map((j) => (
                            <div key={j.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: 0 }}>{j.title}</h4>
                                    <small style={{ color: '#64748b' }}>{j.company} - {j.location}</small>
                                </div>
                                <button onClick={() => toggleSaveJob(j)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#94a3b8' }}>No saved jobs yet. Click the star icon on any job card!</p>
                    )}
                </div>
            )}

            {/* Feature 1: APPLY MODAL POPUP */}
            {selectedJob && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '90%' }}>
                        <h2>{selectedJob.title}</h2>
                        <p><strong>Company:</strong> {selectedJob.company}</p>
                        <p><strong>Location:</strong> {selectedJob.location}</p>
                        <p><strong>Salary Range:</strong> {selectedJob.salary}</p>

                        {applied ? (
                            <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '6px', textAlign: 'center', margin: '15px 0' }}>
                                ✅ Application Submitted Successfully!
                            </div>
                        ) : (
                            <button
                                onClick={() => setApplied(true)}
                                style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', width: '100%', marginTop: '10px', fontWeight: 'bold' }}
                            >
                                Apply Now
                            </button>
                        )}

                        <button
                            onClick={() => setSelectedJob(null)}
                            style={{ backgroundColor: '#64748b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', width: '100%' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}