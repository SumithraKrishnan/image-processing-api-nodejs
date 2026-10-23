import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import resizeImage from '../utilities/imageProcessor';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // Validate query parameters
  if (
    !filename ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    res.status(400).send('Please provide a valid filename, width and height');
    return;
  }
  const inputPath = path.resolve('images/full', `${filename}.jpg`);

  const outputPath = path.resolve(
    'images/thumb',
    `${filename}-${width}-${height}.jpg`,
  );

  // Check if original image exists
  if (!fs.existsSync(inputPath)) {
    res.status(404).send('Image not found');
    return;
  }

  try {
    // Check if resized image already exists
    if (!fs.existsSync(outputPath)) {
      await resizeImage(inputPath, outputPath, width, height);
    }

    // Return the resized image
    res.sendFile(outputPath);
  } catch {
    res.status(500).send('Error processing image');
  }
});

export default images;
