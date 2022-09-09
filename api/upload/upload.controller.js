const fs = require('fs');
const cloudinary = require('cloudinary').v2;

async function uploadProfile(req, res) {
  const { file } = req;
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'profile',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto',
    });
    return res.json(result.secure_url);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    fs.unlinkSync(file.path);
  }
}

async function uploadBackgroundBoard(req, res) {
  const { file } = req;
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'backgroundBoard',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto',
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  } finally {
    fs.unlinkSync(file.path);
  }
}

async function uploadMultiplefiles(req, res) {
  const resultsAll = [];
  const { files } = req;

  try {
    const result = files.map(file =>
      cloudinary.uploader.upload(file.path, {
        folder: 'filesCard',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: 'auto',
      })
    );
    const results = await Promise.all(result);

    for (let index = 0; index < results.length; index += 1) {
      const objectReturn = {
        url: results[index].url,
        name: files[index].originalname,
      };
      resultsAll.push(objectReturn);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({});
  } finally {
    files.forEach(file => fs.unlinkSync(file.path));
  }
  return res.json(resultsAll);
}

module.exports = {
  uploadProfile,
  uploadBackgroundBoard,
  uploadMultiplefiles,
};
