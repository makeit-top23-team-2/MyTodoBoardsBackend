const fs = require('fs')
const cloudinary = require('cloudinary').v2



async function uploadProfile(req, res){
  const { file } = req
  try {
    const result = await cloudinary.uploader.upload(file.path,{
      folder: 'profile',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto'
    })

    return res.json(result.url)
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    fs.unlinkSync(file.path)
  }
}

async function uploadBackgroundBoard(req, res){
  const { file } = req
  try {
    const result = await cloudinary.uploader.upload(file.path,{
      folder: 'backgroundBoard',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto'
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    fs.unlinkSync(file.path)
  }
}

async function uploadBackgroundCard(req, res){
  const { file } = req
  try {
    const result = await cloudinary.uploader.upload(file.path,{
      folder: 'backgroundCard',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto'
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    fs.unlinkSync(file.path)
  }
}



module.exports = {
  uploadProfile,
  uploadBackgroundBoard,
  uploadBackgroundCard
}