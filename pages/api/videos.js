import { postVideos } from '../../utils/cloudinary';
import formidable from 'formidable';
import { getAllThumbnails, postThumbnail } from '../../utils/cloudinary';
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method === 'POST') {
try {
  //
  // console.log(req.file['cover_photo'])
  // res.status(200).json(thumbnail);
  const form = new formidable.IncomingForm();
  // form.uploadDir = 'uploads';
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    console.log(err, fields, files);
    
    const video = await postVideos(files["video"].path);
    console.log(video);
    res.status(200).json(video);
  });

  //
} catch (error) {
  // 'Posting thumbnail failed.'
  res.status(500).json({ message: error });
  console.log(error);
}
}
}

export default handler;
