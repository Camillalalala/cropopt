export type ClassificationResult = {
  diseaseId: string;
  confidence: number;
  sampleId?: string;
  sourceUri?: string;
};

import { getDemoScanSample } from '../data/demoScanLibrary';

export class ClassifierService {
  private modelReady = false;

  async initialize(): Promise<void> {
    // TODO (Gokul): Load Zetic .mlange model and SDK here.
    // Keep the placeholder path so UI and storage can be developed in parallel.
    this.modelReady = false;
  }

  async classifyLeafImage(imageUri?: string, sampleId?: string): Promise<ClassificationResult> {
    const sample = getDemoScanSample(sampleId ?? imageUri ?? '');

    if (sample) {
      return {
        diseaseId: sample.diseaseId,
        confidence: sample.confidence,
        sampleId: sample.id,
        sourceUri: imageUri,
      };
    }

    if (!this.modelReady) {
      return {
        diseaseId: 'leaf_rust',
        confidence: 0.91,
      };
    }

    // TODO (Gokul): Replace with real Zetic inference output mapping.
    return {
      diseaseId: 'leaf_rust',
      confidence: 0.91,
    };
  }
}

export const classifierService = new ClassifierService();
