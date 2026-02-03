
import { GoogleGenAI, Type } from "@google/genai";
import { PlantCategory, Month, DiagnosisResult, PreventionPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const diagnosePlant = async (
  category: PlantCategory,
  plantName: string,
  month: Month,
  symptoms: string
): Promise<DiagnosisResult> => {
  const prompt = `Как эксперт-агроном и фитопатолог, проанализируй состояние растения.
    Категория: ${category}
    Растение: ${plantName}
    Месяц: ${month}
    Симптомы: ${symptoms}
    
    Определи наиболее вероятное заболевание или вредителя. Дай подробный анализ симптомов и предложи два варианта борьбы: биологический и химический. 
    Также добавь совет по профилактике.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Название болезни или вредителя" },
          description: { type: Type.STRING, description: "Краткое описание проблемы" },
          symptomsAnalysis: { type: Type.STRING, description: "Анализ указанных пользователем симптомов" },
          recommendations: {
            type: Type.OBJECT,
            properties: {
              biological: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Биологические методы борьбы" },
              chemical: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Химические методы борьбы" }
            },
            required: ["biological", "chemical"]
          },
          prevention: { type: Type.STRING, description: "Общий совет по профилактике" }
        },
        required: ["title", "description", "symptomsAnalysis", "recommendations", "prevention"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getPreventionAdvice = async (
  category: PlantCategory,
  month: Month
): Promise<PreventionPlan> => {
  const prompt = `Составь детальный план профилактических работ для категории "${category}" на месяц "${month}". 
    Укажи список необходимых дел в саду/огороде и рекомендованные препараты. 
    Для каждого препарата укажи: 
    1. Название
    2. Дозировку
    3. Периодичность
    4. Цель
    
    ВАЖНО: Обязательно добавь уточнение к применению: можно ли использовать эти препараты вместе (составлять баковую смесь) или их нужно применять по отдельности с определенным интервалом времени (укажи интервал). Дай четкую инструкцию по порядку смешивания или чередования.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.STRING },
          category: { type: Type.STRING },
          tasks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Список профилактических задач" },
          recommendedAgents: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                dosage: { type: Type.STRING },
                frequency: { type: Type.STRING },
                purpose: { type: Type.STRING }
              },
              required: ["name", "dosage", "frequency", "purpose"]
            }
          },
          usageInstructions: { type: Type.STRING, description: "Инструкция по совмещению препаратов (баковая смесь или интервалы)" }
        },
        required: ["month", "category", "tasks", "recommendedAgents", "usageInstructions"]
      }
    }
  });

  return JSON.parse(response.text);
};
