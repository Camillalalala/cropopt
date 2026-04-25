export type LocalReport = {
  id: number;
  disease_id: string;
  timestamp: string;
  lat: number;
  long: number;
  sample_id: string;
  sample_label: string;
  confidence: number;
  image_uri: string;
  user_text: string;
  is_synced: number;
};
