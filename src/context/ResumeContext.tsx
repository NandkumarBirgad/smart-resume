import React, { createContext, useContext, ReactNode } from 'react';
import { Resume, ATSScore } from '../types/resume';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ResumeContextType {
  resume: Resume;
  updateResume: (resume: Partial<Resume>) => void;
  atsScore: ATSScore;
  updateATSScore: (score: ATSScore) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResume: Resume = {
  id: crypto.randomUUID(),
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    profileImage: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  targetRole: '',
  template: 'modern',
  lastModified: new Date().toISOString()
};

const initialATSScore: ATSScore = {
  overall: 0,
  keywordMatch: 0,
  formatting: 85,
  completeness: 0,
  suggestions: []
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useLocalStorage<Resume>('current-resume', initialResume);
  const [atsScore, setATSScore] = useLocalStorage<ATSScore>('ats-score', initialATSScore);
  const [currentStep, setCurrentStep] = useLocalStorage<number>('builder-step', 0);

  const updateResume = (updates: Partial<Resume>) => {
    setResume(prev => ({
      ...prev,
      ...updates,
      lastModified: new Date().toISOString()
    }));
  };

  const updateATSScore = (score: ATSScore) => {
    setATSScore(score);
  };

  return (
    <ResumeContext.Provider value={{
      resume,
      updateResume,
      atsScore,
      updateATSScore,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}