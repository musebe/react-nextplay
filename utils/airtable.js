import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);

export async function getAllVideos() {
  // Get all data from  airtables

  const records = await table.select({}).firstPage();

  const formattedRecords = records
    .map((record) => ({
      id: record.id,
      ...record.fields,
    }))
    .filter((record) => !!record.Imgid);

  return formattedRecords;
  //   console.log(formattedRecords);
}

export async function postVideo(obj) {
  const { Imgid, Name, Tag, Videolink, Thumbnail } = obj;

  const record = await table.create({
    Imgid,
    Name,
    Tag,
    Videolink,
    Thumbnail,
  });

  return record;
}

