
import React, { useState, useEffect } from 'react';
import { PlantCategory, Month, DiagnosisResult } from '../types';
import { CATEGORIES, MONTHS, PLANT_OPTIONS } from '../constants';
import { diagnosePlant } from '../services/geminiService';

interface DiagnosisFormProps {
  onResult: (result: DiagnosisResult) => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [category, setCategory] = useState<PlantCategory>(PlantCategory.TREES);
  const [plantName, setPlantName] = useState(PLANT_OPTIONS[PlantCategory.TREES][0]);
  const [customPlant, setCustomPlant] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [month, setMonth] = useState<Month>(MONTHS[new Date().getMonth()]);
  const [symptoms, setSymptoms] = useState('');

  // Update default plant when category changes
  useEffect(() => {
    if (!isCustom) {
      setPlantName(PLANT_OPTIONS[category][0]);
    }
  }, [category, isCustom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalPlantName = isCustom ? customPlant : plantName;
    
    if (!finalPlantName || !symptoms) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await diagnosePlant(category, finalPlantName, month, symptoms);
      onResult(result);
    } catch (err) {
      setError('Не удалось получить диагноз. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 max-w-2xl mx-auto">
      <div className="bg-emerald-50 p-6 border-b border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Что случилось с растением?</h2>
        <p className="text-emerald-700">Выберите растение и опишите проблему.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-emerald-900 mb-3 uppercase tracking-wider">1. Выберите категорию</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  setIsCustom(false);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${
                  category === cat.id 
                  ? `${cat.color} text-white border-transparent scale-105 shadow-md` 
                  : 'bg-white text-emerald-700 border-emerald-50 hover:border-emerald-200'
                }`}
              >
                {cat.icon}
                <span className="text-xs font-bold mt-2">{cat.id}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-emerald-900 mb-2 uppercase tracking-wider">2. Название растения</label>
            {!isCustom ? (
              <select
                value={plantName}
                onChange={(e) => {
                  if (e.target.value === 'CUSTOM') {
                    setIsCustom(true);
                  } else {
                    setPlantName(e.target.value);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-emerald-50/30 font-medium"
              >
                {PLANT_OPTIONS[category].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="CUSTOM" className="text-emerald-600 font-bold">+ Свой вариант</option>
              </select>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={customPlant}
                  onChange={(e) => setCustomPlant(e.target.value)}
                  placeholder="Введите название..."
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setIsCustom(false)}
                  className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-700"
                  title="Вернуться к списку"
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-emerald-900 mb-2 uppercase tracking-wider">3. Месяц</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value as Month)}
              className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-emerald-50/30 font-medium"
            >
              {MONTHS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-emerald-900 mb-2 uppercase tracking-wider">4. Опишите симптомы</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            placeholder="Например: Пожелтение краев листьев, серый налет на плодах..."
            className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-emerald-50/30 resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
            loading ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Анализируем...
            </>
          ) : (
            <>
              <i className="fas fa-microscope"></i>
              Диагностировать
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DiagnosisForm;
