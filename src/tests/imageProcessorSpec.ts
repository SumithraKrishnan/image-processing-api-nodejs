import fs from 'fs';
import resizeImage from '../utilities/imageProcessor';

describe('Image Processing Test', () => {
  it('should create a resized image', async () => {
    await resizeImage(
      'images/full/fjord.jpg',
      'images/thumb/test-fjord.jpg',
      200,
      200,
    );

    expect(fs.existsSync('images/thumb/test-fjord.jpg')).toBeTrue();
  });
});
