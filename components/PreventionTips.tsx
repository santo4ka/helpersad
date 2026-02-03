
import React, { useState, useEffect } from 'react';
import { PlantCategory, Month, PreventionPlan, PreventionDrug } from '../types';
import { CATEGORIES, MONTHS } from '../constants';
import { getPreventionAdvice } from '../services/geminiService';

const PreventionTips: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<PlantCategory>(PlantCategory.TREES);
  const [month, setMonth] = useState<Month>(MONTHS[new Date().getMonth()]);
  const [plan, setPlan] = useState<PreventionPlan | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<PreventionDrug | null>(null);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const data = await getPreventionAdvice(category, month);
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, month]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100 mb-8">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
            <i className="fas fa-calendar-alt text-emerald-600"></i>
            График профилактики
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-3 uppercase tracking-wider">Категория растений</label>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all border-2 ${
                      category === cat.id 
                      ? `${cat.color} text-white border-transparent shadow-md` 
                      : 'bg-white text-emerald-700 border-emerald-50 hover:border-emerald-200'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-bold">{cat.id}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-3 uppercase tracking-wider">Выбор месяца</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value as Month)}
                className="w-full px-4 py-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/30 font-semibold text-emerald-800"
              >
                {MONTHS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin text-emerald-600 text-5xl mb-4">
            <i className="fas fa-circle-notch"></i>
          </div>
          <p className="text-emerald-700 font-medium">Подготавливаем детальные схемы обработок...</p>
        </div>
      ) : plan && (
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-100 h-full">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <i className="fas fa-tasks text-emerald-600"></i>
              </div>
              Задачи на {month}
            </h3>
            <ul className="space-y-4">
              {plan.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl hover:bg-emerald-50 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                  <span className="text-emerald-800 leading-relaxed text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-900 p-8 rounded-3xl shadow-lg text-white h-full relative">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-emerald-100">
              <div className="bg-emerald-800 p-2 rounded-lg">
                <i className="fas fa-flask text-emerald-300"></i>
              </div>
              Схема обработок
            </h3>
            
            <div className="space-y-3 mb-8">
              <p className="text-emerald-300 text-[10px] uppercase tracking-widest font-bold opacity-75 italic mb-2">Нажмите на препарат для подробностей</p>
              {plan.recommendedAgents.map((agent, idx) => (
                <div key={idx} className="group">
                  <button 
                    onClick={() => setSelectedDrug(selectedDrug?.name === agent.name ? null : agent)}
                    className={`w-full text-left p-5 rounded-2xl transition-all border ${
                      selectedDrug?.name === agent.name 
                        ? 'bg-emerald-500 border-white/40 shadow-xl' 
                        : 'bg-white/10 border-white/5 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 font-bold text-emerald-50">
                        <i className={`fas fa-vial ${selectedDrug?.name === agent.name ? 'text-white' : 'text-emerald-400'}`}></i>
                        {agent.name}
                      </div>
                      <i className={`fas fa-chevron-${selectedDrug?.name === agent.name ? 'up' : 'down'} text-xs opacity-50`}></i>
                    </div>
                    
                    {selectedDrug?.name === agent.name && (
                      <div className="mt-4 space-y-3 pt-4 border-t border-white/20 animate-fadeInShort">
                        <div className="flex items-start gap-3">
                          <i className="fas fa-balance-scale text-emerald-200 mt-1"></i>
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-emerald-200/70">Дозировка:</span>
                            <span className="text-sm">{agent.dosage}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <i className="fas fa-redo text-emerald-200 mt-1"></i>
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-emerald-200/70">Частота:</span>
                            <span className="text-sm">{agent.frequency}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <i className="fas fa-shield-alt text-emerald-200 mt-1"></i>
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-emerald-200/70">Цель:</span>
                            <span className="text-sm italic">{agent.purpose}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              ))}
              {plan.recommendedAgents.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <i className="fas fa-leaf text-4xl mb-2"></i>
                  <p>Профилактические опрыскивания не требуются</p>
                </div>
              )}
            </div>

            {/* NEW: Usage Instructions Section */}
            {plan.recommendedAgents.length > 0 && (
              <div className="bg-emerald-800/50 rounded-2xl p-6 border border-emerald-700 shadow-inner">
                <h4 className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fas fa-mortar-pestle"></i>
                  Применение и смешивание
                </h4>
                <div className="text-sm text-emerald-50 leading-relaxed italic bg-black/10 p-4 rounded-xl">
                  {plan.usageInstructions}
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t border-white/10 text-emerald-400 text-xs italic">
              * Внимание: соблюдайте интервалы ожидания перед сбором урожая. Используйте респиратор и перчатки.
            </div>
          </div>
        </div>
      )}

      {/* Styles for shorter animations */}
      <style>{`
        @keyframes fadeInShort {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInShort {
          animation: fadeInShort 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PreventionTips;
