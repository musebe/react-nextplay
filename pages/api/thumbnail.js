import { getAllThumbnails, postThumbnail } from '../../utils/cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const thumbnailData = await getAllThumbnails();

      res.status(200).json(thumbnailData);
      //console.log(thumbnailData);
    } catch (error) {
      res.status(500).json({ message: 'Getting images failed.' });
    }
  } else if (req.method === "POST") {
    try {
      //
      // console.log(req.file['cover_photo'])
      // res.status(200).json(thumbnail);
      const form = new formidable.IncomingForm();
      // form.uploadDir = 'uploads';
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
        console.log(err, fields, files);
        const thumbnail = await postThumbnail(files["cover_photo"].path);
        console.log(thumbnail);
        res.status(200).json(thumbnail);
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
