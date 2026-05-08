import sharp from 'sharp';

export async function processScan(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .grayscale()
    .normalize()
    .sharpen({ sigma: 1.2 })
    .png({ compressionLevel: 0 })
    .toBuffer();
}
