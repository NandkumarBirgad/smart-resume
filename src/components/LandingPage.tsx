import React from 'react';
import { ArrowRight, Zap, Target, Award, FileText, Users, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Resume Intelligence
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build Resumes That
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Get Noticed</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create professional, ATS-optimized resumes with our intelligent builder. 
                  Stand out from the crowd with personalized templates and smart suggestions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200">
                  View Templates
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">10,000+ resumes created</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                      <p className="text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-3/5" />
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm text-gray-500">ATS Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-14 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-emerald-600">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Powerful Features for Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a standout resume that passes ATS systems and impresses recruiters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'ATS Optimization',
                description: 'Smart keyword analysis and formatting to ensure your resume passes applicant tracking systems'
              },
              {
                icon: Zap,
                title: 'AI-Powered Suggestions',
                description: 'Get intelligent recommendations for content, skills, and achievements based on your target role'
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Choose from modern, ATS-friendly templates designed by industry experts'
              },
              {
                icon: TrendingUp,
                title: 'Real-time Scoring',
                description: 'See your resume score improve in real-time as you add content and optimize sections'
              },
              {
                icon: Award,
                title: 'Industry Insights',
                description: 'Get personalized insights and benchmarks based on your industry and experience level'
              },
              {
                icon: Users,
                title: 'Recruiter Approved',
                description: 'Templates and formats tested and approved by hiring managers and recruiters'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}