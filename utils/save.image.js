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
  image
    .blur(2, function (err) {
      if (err) throw err;
    })
    .write(blurredImage);
  blurredImage = rootUrl + filename;

  console.log({ originalImage, blurredImage });
  return { originalImage, blurredImage };
};
