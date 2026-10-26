import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const resizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> => {
  const outputDirectory = path.dirname(outputPath);

  await fs.mkdir(outputDirectory, { recursive: true });

  await sharp(inputPath).resize(width, height).toFile(outputPath);
};

export default resizeImage;
