import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { ImageUpload } from '../ImageUpload';
import { AIResumeGenerator } from '../AIResumeGenerator';

export function PersonalInfoStep() {
  const { resume, updateResume } = useResume();
  const { personalInfo } = resume;

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        [field]: value
      }
    });
  };

  const handleImageChange = (imageUrl: string) => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        profileImage: imageUrl
      }
    });
  };

  const handleImageRemove = () => {
    updateResume({
      personalInfo: {
        ...personalInfo,
        profileImage: ''
      }
    });
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* AI Resume Generator */}
      <AIResumeGenerator />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Let's start with your basic information and profile photo</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Image Upload */}
          <div className="lg:col-span-1">
            <ImageUpload
              currentImage={personalInfo.profileImage}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />
          </div>

          {/* Personal Information Form */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="nandu birgad"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="nandu@email.com"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="india"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={personalInfo.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/nandu"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website/Portfolio
                </label>
                <input
                  type="url"
                  value={personalInfo.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://nandu.com"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className={labelClass}>
            Professional Summary *
          </label>
          <textarea
            value={personalInfo.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="A brief professional summary highlighting your key skills, experience, and career objectives..."
            rows={4}
            className={`${inputClass} resize-none`}
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            2-3 sentences that summarize your professional background and goals
          </p>
        </div>
      </div>
    </div>
  );
}