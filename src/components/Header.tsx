import React from 'react';
import { FileText, Save, Download } from 'lucide-react';

interface HeaderProps {
  onSave?: () => void;
  onExport?: () => void;
  showActions?: boolean;
}

export function Header({ onSave, onExport, showActions = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
              <p className="text-sm text-gray-500">Intelligent Resume Builder</p>
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onSave}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={onExport}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}