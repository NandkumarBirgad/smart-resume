import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, Building, Briefcase } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Experience } from '../../types/resume';

export function ExperienceStep() {
  const { resume, updateResume } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyExperience: Experience = {
    id: crypto.randomUUID(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  };

  const [formData, setFormData] = useState<Experience>(emptyExperience);

  const handleSave = () => {
    if (!formData.company || !formData.position) return;

    const updatedExperience = editingId
      ? resume.experience.map(exp => exp.id === editingId ? formData : exp)
      : [...resume.experience, { ...formData, id: crypto.randomUUID() }];

    updateResume({ experience: updatedExperience });
    setFormData(emptyExperience);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    updateResume({
      experience: resume.experience.filter(exp => exp.id !== id)
    });
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) => i === index ? value : ach)
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
            <p className="text-gray-600">Add your professional experience</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </div>

        {resume.experience.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No work experience added yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-3">{exp.description}</p>
                    )}
                    {exp.achievements.some(ach => ach.trim()) && (
                      <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
                        {exp.achievements.filter(ach => ach.trim()).map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Experience' : 'Add Experience'}
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Position *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="month"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="month"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      disabled={formData.current}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={formData.current}
                        onChange={(e) => setFormData(prev => ({ ...prev, current: e.target.checked, endDate: e.target.checked ? '' : prev.endDate }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">I currently work here</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your role and responsibilities"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                    <button
                      onClick={addAchievement}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe a key achievement or responsibility"
                      />
                      {formData.achievements.length > 1 && (
                        <button
                          onClick={() => removeAchievement(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData(emptyExperience);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.company || !formData.position}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingId ? 'Update' : 'Add'} Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}