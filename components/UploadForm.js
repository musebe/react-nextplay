import React, { useState } from 'react';
import Progress from './Progress';
import axios from 'axios';

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [file_2, setFile_2] = useState('');
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('cover_photo', file);

    const formData_2 = new FormData();
    formData_2.append('video', file_2);

    try {
  
      //UPLOADING THUMBNAIL COVER PHOTO TO CLOUDINARY
      const res = await axios.post('/api/thumbnail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data.url);

      //UPLOADING VIDEO TO CLOUDINARY
      const res_2 = await axios.post('/api/videos', formData_2, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
       
        },
      });
      console.log(res_2.data.url);

      //UPLOADING MOVIE DATA TO AIRTABLE
      axios
        .post('/api/airtable', {
          Imgid: '2323',
          Name: name,
          Tag: tag,
          Videolink: res_2.data.url,
          Thumbnail: res.data.url,
        })
        .then(function (response) {
          console.log(response);
          window.location.reload(false);
        });
      setLoading(false);
      setMessage('File uploaded');
    } catch (error) {
      setLoading(false);
      setMessage(JSON.stringify(error));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loading && (
          <div
            id='modal'
            className="modal_overlay loader_text"
          >
            Uploading...
          </div>
        )}
        <div className='custom-file mb-4'>
          <input
            required
            type='text'
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='input'
            placeholder='Movie name'
          />
          <br />
          <input
            required
            type='text'
            className='input'
            onChange={(e) => {
              setTag(e.target.value);
            }}
            placeholder='Category'
          />
          <br />
          <label>Cover photo</label>
          <br />
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            required
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <br /> <br />
          <label>Movie file</label>
          <br />
          <input
            type='file'
            className='custom-file-input'
            id='customFile_2'
            required
            onChange={(e) => {
              setFile_2(e.target.files[0]);
            }}
          />
        </div>
<br/>
        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          r
          className='btn btn-primary btn-block mt-4'
        />
        {message}
      </form>
    </div>
  );
};

export default UploadForm;




