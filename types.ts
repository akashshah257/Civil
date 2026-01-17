
export enum Category {
  UnitConverter = 'Unit Converters',
  CostEstimator = 'Cost Estimators',
  MaterialEstimator = 'Material Estimators',
  SteelRebar = 'Steel & Rebar',
  RateAnalysis = 'Rate Analysis',
  DesignRCC = 'Design of RCC',
  BBS = 'Bar Bending Schedule',
  SoilFoundation = 'Soil & Foundation',
  LoadCalculations = 'Load Calculations',
  LandArea = 'Land Area',
  ProjectManagement = 'Project Management',
  Utilities = 'General Utilities'
}

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon?: string;
  fields?: Field[];
  calculation?: (inputs: Record<string, number>) => Record<string, any>;
}

export interface Field {
  id: string;
  label: string;
  type: 'number' | 'select' | 'text';
  unit?: string;
  options?: string[];
  defaultValue?: number | string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
