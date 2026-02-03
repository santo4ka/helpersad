
export enum PlantCategory {
  TREES = 'Деревья',
  SHRUBS = 'Кустарники',
  GRAPES = 'Виноград',
  VEGETABLES = 'Овощи'
}

export type Month = 
  | 'Январь' | 'Февраль' | 'Март' | 'Апрель' 
  | 'Май' | 'Июнь' | 'Июль' | 'Август' 
  | 'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь';

export interface TreatmentPlan {
  biological: string[];
  chemical: string[];
}

export interface DiagnosisResult {
  title: string;
  description: string;
  symptomsAnalysis: string;
  recommendations: TreatmentPlan;
  prevention: string;
}

export interface PreventionDrug {
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
}

export interface PreventionPlan {
  month: Month;
  category: PlantCategory;
  tasks: string[];
  recommendedAgents: PreventionDrug[];
  usageInstructions: string; // New field for mixing/interval details
}
