import React, { useState} from 'react';
import UploadForm from './UploadForm';

const Upload = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='UserProfile'>
      <div className='User'>
        <div
          className='name'
          onClick={() => {
            setShowModal(true);
          }}
          className="upload_button"
        >
          Upload Movie
        </div>

        {showModal && (
          <div
            id='modal'
            className="modal_overlay"
           
          >
            <div
             className="modal_upload"
             
            >
              <h3>Upload Movie</h3>
              <div
                onClick={() => {
                  setShowModal(false);
                }}
                className="close_button"
              
              >
                &#215;
              </div>

              <UploadForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
