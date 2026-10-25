export type LabTab = 
  | 'overview'
  | 'graphing'
  | 'geometry'
  | 'calculus'
  | 'linear-algebra'
  | 'probability'
  | 'discrete'
  | 'formulas'
  | 'challenges'
  | 'notebook'
  | 'about';

export interface FormulaItem {
  id: string;
  name: string;
  category: 'Algebra' | 'Geometry' | 'Trigonometry' | 'Calculus' | 'Linear Algebra' | 'Statistics & Probability' | 'Discrete Math';
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
  labLink?: LabTab;
}

export interface MathChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Elementary' | 'Intermediate' | 'Advanced';
  question: string;
  latex?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  expression?: string;
  evaluatedResult?: string;
  timestamp: number;
  category: string;
}
