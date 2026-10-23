import fs from 'fs';
import resizeImage from '../utilities/imageProcessor';

describe('Image Processing Utility Tests', () => {
  it('creates a resized image with valid inputs', async () => {
    const outputPath = 'images/thumb/test-fjord.jpg';

    await resizeImage('images/full/fjord.jpg', outputPath, 200, 200);

    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('throws an error for an invalid input image', async () => {
    await expectAsync(
      resizeImage(
        'images/full/doesnotexist.jpg',
        'images/thumb/invalid.jpg',
        200,
        200,
      ),
    ).toBeRejected();
  });
});
