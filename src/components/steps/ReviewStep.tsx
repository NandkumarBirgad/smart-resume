import React from 'react';
import { Download, Edit, CheckCircle, AlertCircle, TrendingUp, Target, FileText, Award } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export function ReviewStep() {
  const { resume, atsScore, setCurrentStep } = useResume();

  const completionChecks = [
    {
      key: 'personalInfo',
      label: 'Personal Information',
      completed: !!(resume.personalInfo.fullName && resume.personalInfo.email && resume.personalInfo.phone),
      icon: FileText
    },
    {
      key: 'experience',
      label: 'Work Experience',
      completed: resume.experience.length > 0,
      icon: Target
    },
    {
      key: 'skills',
      label: 'Skills & Expertise',
      completed: resume.skills.length >= 5,
      icon: Award
    }
  ];

  const overallCompletion = Math.round(
    (completionChecks.filter(check => check.completed).length / completionChecks.length) * 100
  );

  const exportToPDF = async () => {
    try {
      // Import the libraries dynamically
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const resumeElement = document.getElementById('resume-preview');
      if (!resumeElement) return;

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resume.personalInfo.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return 'Excellent - Your resume is highly optimized!';
    if (score >= 70) return 'Good - Your resume looks great with room for minor improvements';
    if (score >= 50) return 'Fair - Consider adding more details and optimizing content';
    return 'Needs Improvement - Add more content and optimize for better results';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Review & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* ATS Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(atsScore.overall)} mb-4`}>
                <span className="text-2xl font-bold">{atsScore.overall}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
              <p className="text-sm text-gray-600 mt-1">{getScoreDescription(atsScore.overall)}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Keyword Match</span>
                <span className="font-medium">{atsScore.keywordMatch}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Formatting</span>
                <span className="font-medium">{atsScore.formatting}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completeness</span>
                <span className="font-medium">{overallCompletion}%</span>
              </div>
            </div>
          </div>

          {/* Completion Checklist */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Checklist</h3>
            <div className="space-y-4">
              {completionChecks.map((check, index) => {
                const Icon = check.icon;
                return (
                  <div key={check.key} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        check.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {check.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{check.label}</span>
                    </div>
                    {!check.completed && (
                      <button
                        onClick={() => setCurrentStep(index)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Suggestions */}
          {atsScore.suggestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
              <ul className="space-y-2">
                {atsScore.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Export Actions */}
          <div className="space-y-3">
            <button
              onClick={exportToPDF}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <Edit className="w-5 h-5 mr-2" />
              Continue Editing
            </button>
          </div>
        </div>

        {/* Right Column - Resume Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
              <p className="text-sm text-gray-600">This is how your resume will look</p>
            </div>
            <div className="p-6">
              <div id="resume-preview" className="bg-white">
                {/* Resume Template */}
                <div className="max-w-4xl mx-auto">
                  {/* Header with Profile Image */}
                  <div className="border-b-2 border-blue-600 pb-6 mb-8">
                    <div className="flex items-start space-x-6">
                      {resume.personalInfo.profileImage && (
                        <img
                          src={resume.personalInfo.profileImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {resume.personalInfo.fullName || 'Your Name'}
                        </h1>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
                            {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
                          </div>
                          <div className="space-y-1">
                            {resume.personalInfo.location && <div>{resume.personalInfo.location}</div>}
                            {resume.personalInfo.linkedin && <div>{resume.personalInfo.linkedin}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {resume.personalInfo.summary && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resume.experience.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                        Professional Experience
                      </h2>
                      <div className="space-y-6">
                        {resume.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                                <p className="text-blue-600 font-medium">{exp.company}</p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </div>
                            </div>
                            {exp.description && (
                              <p className="text-gray-700 mb-2">{exp.description}</p>
                            )}
                            {exp.achievements.some(ach => ach.trim()) && (
                              <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {exp.achievements.filter(ach => ach.trim()).map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resume.skills.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                        Skills & Expertise
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(
                          resume.skills.reduce((acc, skill) => {
                            if (!acc[skill.category]) acc[skill.category] = [];
                            acc[skill.category].push(skill);
                            return acc;
                          }, {} as Record<string, typeof resume.skills>)
                        ).map(([category, skills]) => (
                          <div key={category}>
                            <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill) => (
                                <span
                                  key={skill.id}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resume.education.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                        Education
                      </h2>
                      <div className="space-y-4">
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                              <p className="text-gray-700">{edu.institution}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}