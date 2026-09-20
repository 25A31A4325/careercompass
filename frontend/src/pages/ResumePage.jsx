import React, { useState } from 'react';

export default function ResumeAnalyzer({ onBack }) {
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Expanded Skills Master List for Dynamic Parsing
  const masterSkills = [
    'React', 'Node.js', 'JavaScript', 'Python', 'Java', 'C++', 'HTML', 'CSS',
    'Tailwind', 'SQL', 'MongoDB', 'Express', 'Git', 'GitHub', 'REST APIs',
    'TypeScript', 'Docker', 'AWS', 'System Design', 'Testing', 'CI/CD'
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setTimeout(() => {
        analyzeResumeText(text);
        setIsAnalyzing(false);
      }, 500); // Smooth loading UI delay
    };

    reader.readAsText(file);
  };

  const analyzeResumeText = (text) => {
    const lowerText = text.toLowerCase();

    // Dynamic Skill Detection based on file content
    const detectedSkills = masterSkills.filter(skill =>
      lowerText.includes(skill.toLowerCase())
    );

    const missingSkills = masterSkills.filter(skill =>
      !lowerText.includes(skill.toLowerCase())
    );

    // Dynamic Score Calculation
    let score = Math.min(100, Math.max(35, Math.round((detectedSkills.length / 8) * 100)));
    if (detectedSkills.length === 0) score = 42;

    let healthStatus = 'Needs Improvement ⚠️';
    let summaryText = 'Consider adding more core technical keywords and domain skills to boost your score.';

    if (score >= 80) {
      healthStatus = 'Excellent 🌟';
      summaryText = 'Your resume shows strong technical coverage and deep domain alignment!';
    } else if (score >= 60) {
      healthStatus = 'Good 👍';
      summaryText = 'Solid core skills detected. Add missing modern tools to reach top tier strength.';
    }

    setAnalysis({
      score,
      healthStatus,
      summaryText,
      strengths: detectedSkills.length > 0 ? detectedSkills : ['Communication', 'Problem Solving'],
      missing: missingSkills.slice(0, 6)
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 font-sans text-gray-800">
      
      {/* TOP BAR WITH BACK BUTTON */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
        >
          <span>← Back to Jobs</span>
        </button>
        <span className="text-sm text-gray-500 font-medium">CareerCompass AI Engine</span>
      </div>

      {/* UPLOAD HERO UI CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">📄</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Analyzer</h2>
            <p className="text-sm text-gray-500">Upload your resume to get instant dynamic skill gap analysis and score matching.</p>
          </div>
        </div>

        {/* UPLOAD BOX */}
        <div className="mt-4 border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-6 text-center bg-gray-50 transition-all cursor-pointer">
          <input
            type="file"
            accept=".txt,.md,.json,.csv"
            onChange={handleFileUpload}
            id="resume-upload"
            className="hidden"
          />
          <label htmlFor="resume-upload" className="cursor-pointer space-y-2 block">
            <div className="text-3xl">📤</div>
            <p className="text-sm font-semibold text-blue-600">Click to upload or drag resume file</p>
            <p className="text-xs text-gray-400">Supports .txt, .md, .csv text formats</p>
          </label>
        </div>

        {fileName && (
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <span>Uploaded: {fileName}</span>
            <span className="text-blue-600">Active</span>
          </div>
        )}
      </div>

      {/* LOADING STATE */}
      {isAnalyzing && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2">
          <div className="animate-spin text-3xl">⚙️</div>
          <p className="text-sm font-medium text-gray-600">Parsing resume text & matching skill matrices...</p>
        </div>
      )}

      {/* DYNAMIC RESULTS DASHBOARD */}
      {analysis && !isAnalyzing && (
        <div className="space-y-6">
          
          {/* HEALTH SCORE BANNER */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-blue-600 text-3xl font-extrabold text-blue-600 bg-blue-50">
              {analysis.score}%
            </div>
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Resume Health
              </span>
              <h3 className="text-xl font-bold text-gray-900">{analysis.healthStatus}</h3>
              <p className="text-sm text-gray-600 max-w-xl">{analysis.summaryText}</p>
            </div>
          </div>

          {/* DETECTED SKILLS vs MISSING SKILLS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* STRENGTHS */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-green-700 flex items-center gap-2">
                <span>✅</span> Strengths Detected ({analysis.strengths.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.strengths.map((skill, i) => (
                  <span key={i} className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* MISSING SKILLS */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-red-600 flex items-center gap-2">
                <span>⚠️</span> Top Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missing.map((skill, i) => (
                  <span key={i} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-full font-medium border border-red-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}