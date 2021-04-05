const { getAllVideos, postVideo } = require('../../utils/airtable');

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const formattedRecords = await getAllVideos();
      res.status(200).json(formattedRecords);
      //console.log(formattedRecords);
    } catch (error) {
      res.status(500).json({ message: 'Failed fetching videos.' });
    }
  } else if (req.method === 'POST') {
    try {
  
      const record = await postVideo(req.body);
      res.status(200).json(record);
      //console.log(record);
    } catch (error) {
      res.status(500).json({ message: 'Failed posting video to airtable.' });
    }
  }
}

export default handler;
