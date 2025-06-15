import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ProgressBar } from './ProgressBar';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { SkillsStep } from './steps/SkillsStep';
import { ReviewStep } from './steps/ReviewStep';

const steps = [
  { title: 'Personal', component: PersonalInfoStep },
  { title: 'Experience', component: ExperienceStep },
  { title: 'Skills', component: SkillsStep },
  { title: 'Review', component: ReviewStep }
];

export function ResumeBuilder() {
  const { currentStep, setCurrentStep, resume, updateATSScore } = useResume();

  useEffect(() => {
    // Calculate ATS score based on resume completeness
    const calculateATSScore = () => {
      let completeness = 0;
      let keywordMatch = 0;
      
      // Personal info completeness (30%)
      const personalFields = ['fullName', 'email', 'phone', 'location', 'summary'];
      const completedPersonalFields = personalFields.filter(field => 
        resume.personalInfo[field as keyof typeof resume.personalInfo]
      ).length;
      completeness += (completedPersonalFields / personalFields.length) * 30;

      // Experience completeness (40%)
      if (resume.experience.length > 0) {
        completeness += 40;
        // Keyword matching simulation
        keywordMatch = Math.min(resume.experience.length * 15, 80);
      }

      // Skills completeness (20%)
      if (resume.skills.length >= 5) {
        completeness += 20;
        keywordMatch += Math.min(resume.skills.length * 2, 20);
      }

      // Education bonus (10%)
      if (resume.education.length > 0) {
        completeness += 10;
      }

      const overall = Math.round(completeness);
      const suggestions = [];

      if (resume.personalInfo.summary.length < 100) {
        suggestions.push('Expand your professional summary to 2-3 sentences');
      }
      if (resume.experience.length === 0) {
        suggestions.push('Add at least one work experience entry');
      }
      if (resume.skills.length < 8) {
        suggestions.push('Add more relevant skills (aim for 8-12 skills)');
      }
      if (!resume.personalInfo.linkedin) {
        suggestions.push('Add your LinkedIn profile URL');
      }

      updateATSScore({
        overall,
        keywordMatch: Math.round(keywordMatch),
        formatting: 85, // Static for demo
        completeness: Math.round(completeness),
        suggestions
      });
    };

    calculateATSScore();
  }, [resume, updateATSScore]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return resume.personalInfo.fullName && resume.personalInfo.email && resume.personalInfo.phone;
      case 1: // Experience
        return true; // Optional
      case 2: // Skills
        return true; // Optional
      default:
        return true;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar 
        currentStep={currentStep} 
        totalSteps={steps.length} 
        steps={steps.map(s => s.title)} 
      />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CurrentStepComponent />
          
          {/* Navigation */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <div className="w-24" /> // Placeholder to maintain layout
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}