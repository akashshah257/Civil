
import { Category, Tool } from './types';

export const TOOLS: Tool[] = [
  // UNIT CONVERTERS
  {
    id: 'inches-to-units',
    name: 'Inches to Other units Converter',
    category: Category.UnitConverter,
    description: 'Convert inches to feet, yards, meters, and cm.',
    fields: [
      { id: 'inches', label: 'Inches', type: 'number', defaultValue: 1 }
    ],
    calculation: (inputs) => ({
      'Feet': (inputs.inches / 12).toFixed(4),
      'Meters': (inputs.inches * 0.0254).toFixed(4),
      'Centimeters': (inputs.inches * 2.54).toFixed(2),
      'Yards': (inputs.inches / 36).toFixed(4)
    })
  },
  {
    id: 'cement-weight-vol',
    name: 'Weight to Volume of Cement',
    category: Category.UnitConverter,
    description: 'Convert cement weight in kg to volume in liters/bags.',
    fields: [
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', defaultValue: 50 }
    ],
    calculation: (inputs) => {
      const vol = inputs.weight / 1440; // Density of cement ~1440 kg/m3
      return {
        'Volume (m³)': vol.toFixed(4),
        'Bags (50kg)': (inputs.weight / 50).toFixed(2),
        'Liters': (vol * 1000).toFixed(2)
      };
    }
  },

  // MATERIAL ESTIMATORS
  {
    id: 'brick-masonry',
    name: 'Brick Masonry Calculator',
    category: Category.MaterialEstimator,
    description: 'Estimate bricks, cement, and sand for a wall.',
    fields: [
      { id: 'length', label: 'Wall Length', type: 'number', unit: 'ft', defaultValue: 10 },
      { id: 'height', label: 'Wall Height', type: 'number', unit: 'ft', defaultValue: 10 },
      { id: 'thickness', label: 'Wall Thickness', type: 'number', unit: 'inch', defaultValue: 9 },
      { id: 'ratio', label: 'Mix Ratio (1:X)', type: 'number', defaultValue: 6 }
    ],
    calculation: (inputs) => {
      const volume = (inputs.length * inputs.height * (inputs.thickness / 12));
      const bricks = Math.ceil(volume * 13.5); // Standard assumption
      const mortarVol = volume * 0.3; // 30% mortar
      const dryVol = mortarVol * 1.33;
      const cementBags = (dryVol / (1 + inputs.ratio)) / 1.226; // 1.226 cft per bag
      const sand = (dryVol * inputs.ratio / (1 + inputs.ratio));
      return {
        'Total Bricks': bricks,
        'Cement (Bags)': cementBags.toFixed(2),
        'Sand (cft)': sand.toFixed(2),
        'Total Volume (cft)': volume.toFixed(2)
      };
    }
  },
  {
    id: 'concrete-mix',
    name: 'Concrete Mix Estimator',
    category: Category.MaterialEstimator,
    description: 'Calculate ingredients for concrete grades (M15, M20, etc).',
    fields: [
      { id: 'volume', label: 'Wet Volume', type: 'number', unit: 'm³', defaultValue: 1 },
      { id: 'ratio_cement', label: 'Cement Ratio', type: 'number', defaultValue: 1 },
      { id: 'ratio_sand', label: 'Sand Ratio', type: 'number', defaultValue: 1.5 },
      { id: 'ratio_agg', label: 'Aggregate Ratio', type: 'number', defaultValue: 3 }
    ],
    calculation: (inputs) => {
      const dryVol = inputs.volume * 1.54;
      const sum = inputs.ratio_cement + inputs.ratio_sand + inputs.ratio_agg;
      const cement = (inputs.ratio_cement / sum) * dryVol;
      const sand = (inputs.ratio_sand / sum) * dryVol;
      const agg = (inputs.ratio_agg / sum) * dryVol;
      return {
        'Cement (Bags)': (cement / 0.0347).toFixed(2),
        'Sand (m³)': sand.toFixed(3),
        'Aggregates (m³)': agg.toFixed(3),
        'Dry Volume (m³)': dryVol.toFixed(3)
      };
    }
  },

  // STEEL
  {
    id: 'rebar-weight',
    name: 'Rebar Weight Calculator',
    category: Category.SteelRebar,
    description: 'Find weight of steel bars by diameter and length.',
    fields: [
      { id: 'dia', label: 'Diameter', type: 'number', unit: 'mm', defaultValue: 12 },
      { id: 'length', label: 'Total Length', type: 'number', unit: 'm', defaultValue: 12 }
    ],
    calculation: (inputs) => {
      const weight = (inputs.dia * inputs.dia / 162.2) * inputs.length;
      return {
        'Total Weight': weight.toFixed(2) + ' kg',
        'Weight per Meter': (inputs.dia * inputs.dia / 162.2).toFixed(3) + ' kg/m'
      };
    }
  },

  // DESIGN
  {
    id: 'slab-designer',
    name: 'Two Way RCC Slab Designer',
    category: Category.DesignRCC,
    description: 'Preliminary design of a two-way slab.',
    fields: [
      { id: 'lx', label: 'Short Span (Lx)', type: 'number', unit: 'm', defaultValue: 4 },
      { id: 'ly', label: 'Long Span (Ly)', type: 'number', unit: 'm', defaultValue: 5 },
      { id: 'load', label: 'Live Load', type: 'number', unit: 'kN/m²', defaultValue: 2 }
    ],
    calculation: (inputs) => {
      const ratio = inputs.ly / inputs.lx;
      const type = ratio < 2 ? 'Two-way Slab' : 'One-way Slab (Ratio > 2)';
      const minThickness = (inputs.lx * 1000) / 35; // Basic rule L/35
      return {
        'Ly/Lx Ratio': ratio.toFixed(2),
        'Slab Type': type,
        'Min Thickness (mm)': Math.ceil(minThickness),
        'Status': ratio < 2 ? 'Designed as Two-Way' : 'Warning: Use One-Way Design'
      };
    }
  },

  // PROJECT MGMT
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    category: Category.ProjectManagement,
    description: 'Calculate monthly loan payments for construction.',
    fields: [
      { id: 'amount', label: 'Loan Amount', type: 'number', defaultValue: 1000000 },
      { id: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: 8.5 },
      { id: 'tenure', label: 'Tenure (Years)', type: 'number', defaultValue: 15 }
    ],
    calculation: (inputs) => {
      const r = inputs.rate / (12 * 100);
      const n = inputs.tenure * 12;
      const emi = (inputs.amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPay = emi * n;
      return {
        'Monthly EMI': '₹ ' + Math.round(emi).toLocaleString(),
        'Total Interest': '₹ ' + Math.round(totalPay - inputs.amount).toLocaleString(),
        'Total Payment': '₹ ' + Math.round(totalPay).toLocaleString()
      };
    }
  }
];

export const CATEGORIES = Object.values(Category);
