export type Scan = {
  id: string;
  projectId: string;
  originalUri: string;
  enhancedUri: string;
  ocrText: string;
  tags: string[];
  note?: string;
  createdAt: string;
};
