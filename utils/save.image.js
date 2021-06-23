const fs = require('fs').promises;
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

module.exports = async (file) => {
  const rootDir = './public/apps/uploads/';
  let sourcePath = file.path;
  let targetPath = rootDir + file.filename + '.png';
  let rootUrl = process.env.APPS_SUBDOMAIN + '/uploads/';
  let originalImage = rootUrl + file.filename + '.png';

  let data = await fs.readFile(sourcePath);
  await fs.writeFile(targetPath, data);

  let filename = uuidv4() + '.png';
  let blurredImage = rootDir + filename;
  let image = await Jimp.read(originalImage);

  await image.resize(500, Jimp.AUTO);

  let { width, height } = image.bitmap;
  if (height > width) {
    // naka portrait
    await image.crop(0, (height - width) / 2, width, width);
  } else if (height < width) {
    // naka landscape
    await image.crop((width - height) / 2, 0, height, height);
  }
  await image.writeAsync(targetPath);

  await image.blur(2);
  await image.writeAsync(blurredImage);
  blurredImage = rootUrl + filename;

  console.log({ originalImage, blurredImage, width, height });
  return { originalImage, blurredImage };
};
