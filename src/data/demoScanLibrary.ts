export type DemoScanSample = {
  id: string;
  label: string;
  crop: string;
  diseaseId: string;
  confidence: number;
  fieldNotes: string;
  analystHint: string;
  accentColor: string;
  previewBackground: string;
  previewPattern: 'rust' | 'blight' | 'healthy';
};

export const demoScanLibrary: DemoScanSample[] = [
  {
    id: 'sample_rust_wheat',
    label: 'Field Sample A',
    crop: 'Wheat leaf',
    diseaseId: 'leaf_rust',
    confidence: 0.93,
    fieldNotes: 'Upper canopy leaf with orange pustules after two humid mornings.',
    analystHint: 'Pattern matches clustered rust pustules spreading between veins.',
    accentColor: '#b45309',
    previewBackground: '#ecfccb',
    previewPattern: 'rust',
  },
  {
    id: 'sample_blight_tomato',
    label: 'Field Sample B',
    crop: 'Tomato leaf',
    diseaseId: 'blight',
    confidence: 0.89,
    fieldNotes: 'Lower leaf collected near drip line with dark concentric lesions.',
    analystHint: 'Dark necrotic patches and moisture stress line up with blight.',
    accentColor: '#b91c1c',
    previewBackground: '#d1fae5',
    previewPattern: 'blight',
  },
  {
    id: 'sample_healthy_maize',
    label: 'Field Sample C',
    crop: 'Maize leaf',
    diseaseId: 'healthy',
    confidence: 0.97,
    fieldNotes: 'Leaf blade appears uniform with no active lesions or stress markings.',
    analystHint: 'No visible infection pattern. Tissue tone and edges look stable.',
    accentColor: '#15803d',
    previewBackground: '#dcfce7',
    previewPattern: 'healthy',
  },
];

export function getDemoScanSample(sampleId: string): DemoScanSample | undefined {
  return demoScanLibrary.find((sample) => sample.id === sampleId);
}
