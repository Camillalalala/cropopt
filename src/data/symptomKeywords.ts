import { getDiseaseInfo } from './diseaseLookup';

type Keyword = { word: string; weight: number };

const KEYWORDS: Record<string, Keyword[]> = {
  leaf_rust: [
    { word: 'orange', weight: 3 }, { word: 'pustule', weight: 5 }, { word: 'rust', weight: 4 },
    { word: 'circular spot', weight: 3 }, { word: 'wheat', weight: 2 }, { word: 'barley', weight: 2 },
    { word: 'yellow halo', weight: 3 }, { word: 'spore', weight: 3 }, { word: 'brown powder', weight: 3 },
    { word: 'upper leaf', weight: 1 }, { word: 'uredinia', weight: 5 }, { word: 'orange brown', weight: 4 },
  ],
  stem_rust: [
    { word: 'stem', weight: 3 }, { word: 'rust', weight: 3 }, { word: 'brick red', weight: 5 },
    { word: 'lodge', weight: 3 }, { word: 'elongated', weight: 3 }, { word: 'sheath', weight: 3 },
    { word: 'black pustule', weight: 4 }, { word: 'stalk', weight: 2 },
  ],
  stripe_rust: [
    { word: 'stripe', weight: 5 }, { word: 'yellow stripe', weight: 5 }, { word: 'vein', weight: 3 },
    { word: 'parallel', weight: 3 }, { word: 'cool', weight: 2 }, { word: 'linear', weight: 3 },
    { word: 'yellow line', weight: 4 }, { word: 'wheat', weight: 1 },
  ],
  blight: [
    { word: 'dark', weight: 1 }, { word: 'concentric', weight: 4 }, { word: 'target', weight: 4 },
    { word: 'brown spot', weight: 2 }, { word: 'tomato', weight: 2 }, { word: 'potato', weight: 2 },
    { word: 'necrotic', weight: 3 }, { word: 'ring', weight: 3 }, { word: 'lower leaf', weight: 2 },
    { word: 'defoliation', weight: 2 }, { word: 'blight', weight: 5 },
  ],
  late_blight: [
    { word: 'water soaked', weight: 5 }, { word: 'white fuzzy', weight: 5 }, { word: 'white mold', weight: 4 },
    { word: 'potato', weight: 3 }, { word: 'tomato', weight: 2 }, { word: 'collapse', weight: 3 },
    { word: 'black stem', weight: 4 }, { word: 'late blight', weight: 6 }, { word: 'underside', weight: 2 },
    { word: 'sporulation', weight: 4 }, { word: 'green brown border', weight: 4 },
  ],
  powdery_mildew_wheat: [
    { word: 'white powder', weight: 5 }, { word: 'powdery', weight: 5 }, { word: 'mildew', weight: 5 },
    { word: 'fluffy', weight: 4 }, { word: 'grey coating', weight: 4 }, { word: 'white coating', weight: 5 },
    { word: 'upper surface', weight: 2 },
  ],
  gray_leaf_spot_corn: [
    { word: 'rectangular', weight: 5 }, { word: 'corn', weight: 3 }, { word: 'maize', weight: 3 },
    { word: 'grey lesion', weight: 4 }, { word: 'tan', weight: 2 }, { word: 'bounded by vein', weight: 5 },
    { word: 'gray spot', weight: 4 },
  ],
  rice_blast: [
    { word: 'diamond', weight: 5 }, { word: 'eye shaped', weight: 5 }, { word: 'rice', weight: 3 },
    { word: 'neck rot', weight: 5 }, { word: 'empty head', weight: 4 }, { word: 'white head', weight: 4 },
    { word: 'blast', weight: 5 }, { word: 'grey centre', weight: 3 },
  ],
  fusarium_wilt: [
    { word: 'wilt', weight: 4 }, { word: 'yellow lower', weight: 3 }, { word: 'vascular', weight: 5 },
    { word: 'brown inside', weight: 4 }, { word: 'cut stem', weight: 4 }, { word: 'fusarium', weight: 5 },
    { word: 'afternoon wilt', weight: 4 },
  ],
  coffee_rust: [
    { word: 'coffee', weight: 4 }, { word: 'orange underside', weight: 5 }, { word: 'defoliation', weight: 2 },
    { word: 'yellow spot', weight: 2 }, { word: 'coffee rust', weight: 6 },
  ],
  downy_mildew: [
    { word: 'oil spot', weight: 4 }, { word: 'downy', weight: 5 }, { word: 'white grey underside', weight: 5 },
    { word: 'grape', weight: 2 }, { word: 'cucumber', weight: 2 }, { word: 'yellow patch', weight: 2 },
  ],
  anthracnose: [
    { word: 'sunken', weight: 4 }, { word: 'dark fruit', weight: 4 }, { word: 'salmon pink', weight: 5 },
    { word: 'mango', weight: 3 }, { word: 'bean', weight: 2 }, { word: 'anthracnose', weight: 6 },
    { word: 'concentric ring fruit', weight: 4 },
  ],
  fire_blight: [
    { word: 'shepherd', weight: 5 }, { word: 'crook', weight: 5 }, { word: 'apple', weight: 3 },
    { word: 'pear', weight: 3 }, { word: 'black shoot', weight: 4 }, { word: 'wilted tip', weight: 4 },
    { word: 'ooze', weight: 4 }, { word: 'fire blight', weight: 6 },
  ],
  healthy: [
    { word: 'healthy', weight: 5 }, { word: 'no disease', weight: 5 }, { word: 'normal', weight: 3 },
    { word: 'green', weight: 1 }, { word: 'fine', weight: 2 }, { word: 'no spots', weight: 4 },
    { word: 'no problem', weight: 4 }, { word: 'looks good', weight: 4 }, { word: 'uniform', weight: 2 },
  ],
};

export type SymptomMatchResult = {
  diseaseId: string;
  label: string;
  confidence: number;
  matched: boolean;
};

export function matchSymptoms(text: string): SymptomMatchResult {
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [diseaseId, keywords] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const { word, weight } of keywords) {
      if (lower.includes(word)) score += weight;
    }
    if (score > 0) scores[diseaseId] = score;
  }

  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) {
    return { diseaseId: 'unknown', label: 'Unknown Disease', confidence: 0, matched: false };
  }

  const [bestId, bestScore] = entries[0];
  const confidence = Math.min(0.95, 0.45 + Math.min(bestScore / 12, 1) * 0.5);

  return {
    diseaseId: bestId,
    label: getDiseaseInfo(bestId).label,
    confidence,
    matched: true,
  };
}
