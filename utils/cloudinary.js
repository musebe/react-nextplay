import cloudinary from 'cloudinary';
const fs = require('fs');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAllThumbnails() {
  // Get Images from Cloudinary inserted into the Personal Folder
  const response = await cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'Netflix',
  });

  const thumbnailData = response.resources.map((image, key) => ({
    id: key,
    ...image,
  }));

  return thumbnailData;
}

export async function postVideos(file) {
  // Post Videos to Cloudinary
  const video = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'video',
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
  fs.unlinkSync(file)
  return video;
}
export async function postThumbnail(file) {
  const thumbnail = await cloudinary.v2.uploader.upload(file, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
  fs.unlinkSync(file)
    
  return thumbnail;

}
