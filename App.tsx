
import React, { useState } from 'react';
import Layout from './components/Layout';
import DiagnosisForm from './components/DiagnosisForm';
import ResultDisplay from './components/ResultDisplay';
import PreventionTips from './components/PreventionTips';
import { DiagnosisResult } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'prevention'>('diagnosis');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const handleDiagnosisResult = (result: DiagnosisResult) => {
    setDiagnosisResult(result);
  };

  const handleResetDiagnosis = () => {
    setDiagnosisResult(null);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      // Reset diagnosis when switching tabs
      if (tab === 'prevention') setDiagnosisResult(null);
    }}>
      {activeTab === 'diagnosis' ? (
        diagnosisResult ? (
          <ResultDisplay result={diagnosisResult} onReset={handleResetDiagnosis} />
        ) : (
          <DiagnosisForm onResult={handleDiagnosisResult} />
        )
      ) : (
        <PreventionTips />
      )}

      {/* Hero section for empty/initial states */}
      {activeTab === 'diagnosis' && !diagnosisResult && (
        <div className="mt-16 text-center opacity-60">
          <p className="text-emerald-800 text-sm max-w-md mx-auto">
            Наша база данных содержит информацию о сотнях вредителей и болезней. 
            Просто опишите то, что видите.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default App;
