import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    currentStep > index
                      ? 'bg-green-500 text-white'
                      : currentStep === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-1 mx-2 transition-all duration-200 ${
                      currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={index} className="text-xs sm:text-sm text-center">
              <span
                className={`font-medium ${
                  currentStep >= index ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}