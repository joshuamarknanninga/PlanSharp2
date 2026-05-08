import fs from 'node:fs/promises';
import path from 'node:path';
import { Request, Response } from 'express';
import { Scan } from '../models/Scan';
import { processScan } from '../services/imageService';
import { extractText } from '../services/ocrService';

export async function uploadScan(req: Request, res: Response) {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'file required' });
  const enhanced = await processScan(file.buffer);
  const outPath = path.join('uploads', `${Date.now()}-${file.originalname}.png`);
  await fs.mkdir('uploads', { recursive: true });
  await fs.writeFile(outPath, enhanced);
  const ocrText = await extractText(outPath);
  const scan = await Scan.create({
    userId: (req as any).user.sub,
    projectId: req.body.projectId,
    originalPath: file.originalname,
    enhancedPath: outPath,
    ocrText,
    tags: req.body.tags ?? []
  });
  return res.status(201).json(scan);
}

export async function searchScans(req: Request, res: Response) {
  const q = `${req.query.q ?? ''}`;
  const scans = await Scan.find({ $text: { $search: q }, userId: (req as any).user.sub }).limit(100);
  return res.json(scans);
}
