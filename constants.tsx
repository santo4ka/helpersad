
import React from 'react';
import { PlantCategory, Month } from './types';

export const CATEGORIES = [
  { id: PlantCategory.TREES, icon: <i className="fas fa-tree text-3xl"></i>, color: 'bg-emerald-600' },
  { id: PlantCategory.SHRUBS, icon: <i className="fas fa-seedling text-3xl"></i>, color: 'bg-green-500' },
  { id: PlantCategory.GRAPES, icon: <i className="fas fa-wine-glass text-3xl"></i>, color: 'bg-purple-600' },
  { id: PlantCategory.VEGETABLES, icon: <i className="fas fa-carrot text-3xl"></i>, color: 'bg-orange-500' },
];

export const MONTHS: Month[] = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const PLANT_OPTIONS: Record<PlantCategory, string[]> = {
  [PlantCategory.TREES]: [
    'Яблоня', 'Груша', 'Слива', 'Вишня', 'Черешня', 
    'Персик', 'Абрикос', 'Алыча', 'Орех грецкий', 'Шелковица'
  ],
  [PlantCategory.SHRUBS]: [
    'Смородина черная', 'Смородина красная', 'Крыжовник', 
    'Малина', 'Ежевика', 'Жимолость', 'Голубика', 'Йошта'
  ],
  [PlantCategory.GRAPES]: [
    'Виноград столовый', 'Виноград винный', 'Кишмиш'
  ],
  [PlantCategory.VEGETABLES]: [
    'Томаты', 'Огурцы', 'Перец сладкий', 'Баклажаны', 
    'Капуста', 'Картофель', 'Кабачки', 'Лук', 'Чеснок', 'Морковь'
  ]
};
