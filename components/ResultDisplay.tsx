
import React, { useState } from 'react';
import { DiagnosisResult } from '../types';

interface ResultDisplayProps {
  result: DiagnosisResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'chem'>('bio');

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <button 
        onClick={onReset}
        className="mb-6 text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-2"
      >
        <i className="fas fa-arrow-left"></i> Назад к форме
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Вероятный диагноз</span>
              <h2 className="text-3xl font-bold">{result.title}</h2>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <i className="fas fa-shield-virus text-4xl"></i>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <i className="fas fa-info-circle text-emerald-600"></i>
              Описание проблемы
            </h3>
            <p className="text-emerald-800 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-50">
              {result.description}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <i className="fas fa-search text-emerald-600"></i>
              Анализ симптомов
            </h3>
            <p className="text-emerald-800 leading-relaxed italic border-l-4 border-emerald-200 pl-4">
              {result.symptomsAnalysis}
            </p>
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-emerald-900">Рекомендации по борьбе</h3>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button 
                  onClick={() => setActiveTab('bio')}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'bio' ? 'bg-white text-green-700 shadow' : 'text-gray-500'}`}
                >
                  <i className="fas fa-leaf mr-2"></i> Био
                </button>
                <button 
                  onClick={() => setActiveTab('chem')}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'chem' ? 'bg-white text-red-700 shadow' : 'text-gray-500'}`}
                >
                  <i className="fas fa-flask mr-2"></i> Химия
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${activeTab === 'bio' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <ul className="space-y-3">
                {(activeTab === 'bio' ? result.recommendations.biological : result.recommendations.chemical).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${activeTab === 'bio' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                      <i className={`fas ${activeTab === 'bio' ? 'fa-check' : 'fa-vial'} text-[10px]`}></i>
                    </div>
                    <span className={activeTab === 'bio' ? 'text-green-900' : 'text-red-900'}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              <i className="fas fa-lightbulb text-amber-600"></i>
              Совет на будущее
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              {result.prevention}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
