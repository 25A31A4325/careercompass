import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(null);

const EMPTY_PROFILE = {
  name: '',
  email: '',
  college: '',
  year: '',
  branch: '',
  cgpa: '',
  programmingLanguages: [],
  technicalSkills: [],
  frameworks: [],
  tools: [],
  interests: [],
  projects: [],
  certifications: [],
  targetCareer: 'Software Developer',
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('cc_profile');
      return saved ? JSON.parse(saved) : EMPTY_PROFILE;
    } catch {
      return EMPTY_PROFILE;
    }
  });

  const [analysis, setAnalysis] = useState(null);

  function saveProfile(updates) {
    const next = { ...profile, ...updates };
    setProfile(next);
    localStorage.setItem('cc_profile', JSON.stringify(next));
  }

  function clearProfile() {
    setProfile(EMPTY_PROFILE);
    localStorage.removeItem('cc_profile');
  }

  const isProfileComplete = Boolean(profile.name && profile.technicalSkills.length > 0);

  return (
    <ProfileContext.Provider value={{ profile, saveProfile, clearProfile, analysis, setAnalysis, isProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
