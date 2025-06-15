import React, { useState } from 'react';
import { Sparkles, Wand2, Target, TrendingUp, CheckCircle, Loader } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { generateAIResume } from '../utils/aiResumeGenerator';

export function AIResumeGenerator() {
  const { updateResume } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [showForm, setShowForm] = useState(false);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
    'Sales', 'Engineering', 'Design', 'Consulting', 'Manufacturing',
    'Retail', 'Media', 'Non-profit', 'Government', 'Other'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-10 years)',
    'Executive Level (10+ years)'
  ];

  const handleGenerateResume = async () => {
    if (!jobTitle || !industry || !experience) return;

    setIsGenerating(true);
    try {
      const aiGeneratedResume = await generateAIResume({
        targetRole: jobTitle,
        industry,
        experienceLevel: experience
      });

      updateResume(aiGeneratedResume);
      setShowForm(false);
    } catch (error) {
      console.error('Error generating AI resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!showForm) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">AI Resume Generator</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Let our AI create a professional resume tailored to your target role with industry-specific content and optimized formatting.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Role-Specific</h4>
              <p className="text-sm text-gray-600">Tailored content for your target position</p>
            </div>
            <div className="text-center p-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">ATS Optimized</h4>
              <p className="text-sm text-gray-600">Keywords and formatting for applicant tracking systems</p>
            </div>
            <div className="text-center p-4">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Industry Standards</h4>
              <p className="text-sm text-gray-600">Follows best practices for your industry</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Generate AI Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">AI Resume Generator</h3>
        <p className="text-gray-600">Provide some details to generate a personalized resume</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Job Title *
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Software Engineer, Marketing Manager, Data Analyst"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select your industry</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level *
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select your experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowForm(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateResume}
            disabled={!jobTitle || !industry || !experience || isGenerating}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}