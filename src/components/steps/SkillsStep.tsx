import React, { useState } from 'react';
import { Plus, X, Code, MessageCircle, Globe, Award } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Skill } from '../../types/resume';

export function SkillsStep() {
  const { resume, updateResume } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Skill['category']>('Technical');
  const [selectedLevel, setSelectedLevel] = useState<Skill['level']>('Intermediate');

  const categories = {
    Technical: { icon: Code, color: 'blue' },
    Soft: { icon: MessageCircle, color: 'green' },
    Language: { icon: Globe, color: 'purple' },
    Certification: { icon: Award, color: 'orange' }
  };

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

  const addSkill = () => {
    if (!newSkill.trim()) return;

    const skill: Skill = {
      id: crypto.randomUUID(),
      name: newSkill.trim(),
      level: selectedLevel,
      category: selectedCategory
    };

    updateResume({
      skills: [...resume.skills, skill]
    });

    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    updateResume({
      skills: resume.skills.filter(skill => skill.id !== id)
    });
  };

  const getCategoryIcon = (category: Skill['category']) => {
    const Icon = categories[category].icon;
    const color = categories[category].color;
    return <Icon className={`w-4 h-4 text-${color}-600`} />;
  };

  const getCategoryColor = (category: Skill['category']) => {
    const colors = {
      Technical: 'bg-blue-100 text-blue-800 border-blue-200',
      Soft: 'bg-green-100 text-green-800 border-green-200',
      Language: 'bg-purple-100 text-purple-800 border-purple-200',
      Certification: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category];
  };

  const getLevelColor = (level: Skill['level']) => {
    const colors = {
      Beginner: 'bg-red-100 text-red-800',
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-blue-100 text-blue-800',
      Expert: 'bg-green-100 text-green-800'
    };
    return colors[level];
  };

  const groupedSkills = resume.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<Skill['category'], Skill[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
          <p className="text-gray-600">Add your technical skills, soft skills, languages, and certifications</p>
        </div>

        {/* Add Skill Form */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., JavaScript, Leadership, Spanish"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Skill['category'])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.keys(categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as Skill['level'])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        </div>

        {/* Skills Display */}
        {resume.skills.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No skills added yet</p>
            <p className="text-sm text-gray-400 mt-2">Add your first skill using the form above</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(categories).map(([category, config]) => {
              const categorySkills = groupedSkills[category as Skill['category']] || [];
              if (categorySkills.length === 0) return null;

              const Icon = config.icon;
              return (
                <div key={category}>
                  <div className="flex items-center mb-4">
                    <Icon className={`w-5 h-5 text-${config.color}-600 mr-2`} />
                    <h3 className="text-lg font-semibold text-gray-900">{category} Skills</h3>
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {categorySkills.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className={`inline-flex items-center px-4 py-2 rounded-lg border-2 ${getCategoryColor(skill.category)} group hover:shadow-md transition-all`}
                      >
                        <span className="font-medium mr-2">{skill.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Skills Summary</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              You have {resume.skills.length} skills across {Object.keys(groupedSkills).length} categories. 
              Consider adding 8-12 relevant skills for optimal ATS performance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}