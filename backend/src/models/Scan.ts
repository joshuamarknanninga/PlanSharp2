import { Schema, model } from 'mongoose';

const scanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: String, required: true },
  originalPath: { type: String, required: true },
  enhancedPath: { type: String, required: true },
  ocrText: { type: String, default: '' },
  tags: [String],
  notes: String
}, { timestamps: true });

scanSchema.index({ ocrText: 'text', tags: 'text', notes: 'text' });

export const Scan = model('Scan', scanSchema);
