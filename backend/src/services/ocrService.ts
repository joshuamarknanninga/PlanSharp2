import { createWorker } from 'tesseract.js';

export async function extractText(imagePath: string): Promise<string> {
  const worker = await createWorker('eng');
  const result = await worker.recognize(imagePath);
  await worker.terminate();
  return result.data.text;
}
