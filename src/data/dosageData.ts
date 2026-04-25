export type DosageEntry = {
  productName: string;
  productType: 'liquid' | 'powder';
  ratePerHa: number;
  unit: 'mL' | 'g' | 'kg';
  waterLitersPerHa: number;
  intervalDays: number;
  daysBeforeHarvest: number;
  organicAlternative: string;
};

const DOSAGE_TABLE: Record<string, DosageEntry> = {
  leaf_rust: {
    productName: 'Propiconazole 250EC',
    productType: 'liquid',
    ratePerHa: 125,
    unit: 'mL',
    waterLitersPerHa: 200,
    intervalDays: 14,
    daysBeforeHarvest: 21,
    organicAlternative: 'Wettable sulfur 80WP at 3 kg/ha',
  },
  stem_rust: {
    productName: 'Tebuconazole 250EW',
    productType: 'liquid',
    ratePerHa: 150,
    unit: 'mL',
    waterLitersPerHa: 200,
    intervalDays: 10,
    daysBeforeHarvest: 28,
    organicAlternative: 'Copper oxychloride 50WP at 2.5 kg/ha',
  },
  stripe_rust: {
    productName: 'Tebuconazole 250EW',
    productType: 'liquid',
    ratePerHa: 150,
    unit: 'mL',
    waterLitersPerHa: 200,
    intervalDays: 14,
    daysBeforeHarvest: 28,
    organicAlternative: 'Sulfur dust at 20 kg/ha',
  },
  blight: {
    productName: 'Mancozeb 80WP',
    productType: 'powder',
    ratePerHa: 2,
    unit: 'kg',
    waterLitersPerHa: 500,
    intervalDays: 7,
    daysBeforeHarvest: 7,
    organicAlternative: 'Bordeaux mixture (1% copper sulfate) at 500 L/ha',
  },
  late_blight: {
    productName: 'Cymoxanil+Mancozeb (Curzate)',
    productType: 'powder',
    ratePerHa: 2.5,
    unit: 'kg',
    waterLitersPerHa: 500,
    intervalDays: 7,
    daysBeforeHarvest: 14,
    organicAlternative: 'Copper hydroxide (Kocide) at 2.5 kg/ha',
  },
  early_blight: {
    productName: 'Chlorothalonil 720SC',
    productType: 'liquid',
    ratePerHa: 1500,
    unit: 'mL',
    waterLitersPerHa: 400,
    intervalDays: 10,
    daysBeforeHarvest: 14,
    organicAlternative: 'Bacillus subtilis (Serenade) at 4 L/ha',
  },
  powdery_mildew_wheat: {
    productName: 'Fenpropimorph 750EC',
    productType: 'liquid',
    ratePerHa: 750,
    unit: 'mL',
    waterLitersPerHa: 200,
    intervalDays: 14,
    daysBeforeHarvest: 35,
    organicAlternative: 'Potassium bicarbonate at 2.5 kg/ha',
  },
  gray_leaf_spot_corn: {
    productName: 'Azoxystrobin 250SC',
    productType: 'liquid',
    ratePerHa: 800,
    unit: 'mL',
    waterLitersPerHa: 300,
    intervalDays: 14,
    daysBeforeHarvest: 7,
    organicAlternative: 'Copper oxychloride at 2.5 kg/ha',
  },
  rice_blast: {
    productName: 'Tricyclazole 75WP',
    productType: 'powder',
    ratePerHa: 500,
    unit: 'g',
    waterLitersPerHa: 400,
    intervalDays: 10,
    daysBeforeHarvest: 14,
    organicAlternative: 'Silicon fertilizer + neem cake at 250 kg/ha',
  },
  coffee_rust: {
    productName: 'Copper hydroxide 77WP',
    productType: 'powder',
    ratePerHa: 2.5,
    unit: 'kg',
    waterLitersPerHa: 800,
    intervalDays: 21,
    daysBeforeHarvest: 0,
    organicAlternative: 'Bordeaux mixture 1% at 1000 L/ha',
  },
  soybean_rust: {
    productName: 'Azoxystrobin+Chlorothalonil',
    productType: 'liquid',
    ratePerHa: 1000,
    unit: 'mL',
    waterLitersPerHa: 300,
    intervalDays: 14,
    daysBeforeHarvest: 21,
    organicAlternative: 'Copper fungicides at 2 kg/ha',
  },
  healthy: {
    productName: 'No treatment needed',
    productType: 'liquid',
    ratePerHa: 0,
    unit: 'mL',
    waterLitersPerHa: 0,
    intervalDays: 0,
    daysBeforeHarvest: 0,
    organicAlternative: 'Continue preventive monitoring',
  },
  _default: {
    productName: 'Copper Oxychloride 50WP',
    productType: 'powder',
    ratePerHa: 2.5,
    unit: 'kg',
    waterLitersPerHa: 500,
    intervalDays: 10,
    daysBeforeHarvest: 14,
    organicAlternative: 'Bordeaux mixture (1% copper sulfate) at 500 L/ha',
  },
};

export function getDosageEntry(diseaseId: string): DosageEntry {
  return DOSAGE_TABLE[diseaseId] ?? DOSAGE_TABLE['_default'];
}

export type DosageResult = {
  productName: string;
  productAmount: number;
  productUnit: string;
  waterAmount: number;
  organicAlternative: string;
  intervalDays: number;
  daysBeforeHarvest: number;
  isNoTreatment: boolean;
};

export function calculateDosage(diseaseId: string, fieldAreaHa: number): DosageResult {
  const entry = getDosageEntry(diseaseId);
  return {
    productName: entry.productName,
    productAmount: Math.round(entry.ratePerHa * fieldAreaHa * 100) / 100,
    productUnit: entry.unit,
    waterAmount: Math.round(entry.waterLitersPerHa * fieldAreaHa),
    organicAlternative: entry.organicAlternative,
    intervalDays: entry.intervalDays,
    daysBeforeHarvest: entry.daysBeforeHarvest,
    isNoTreatment: entry.ratePerHa === 0,
  };
}
