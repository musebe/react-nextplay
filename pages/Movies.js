import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Upload from '../components/Upload';
import Banner from '../components/Banner';
import Logo from '../components/Logo';
import useSWR from 'swr';

const Movies = (props) => {
  const [movies, setMovies] = useState(props.movies);
  const [videoUrl, setVideoUrl] = useState('');

  const { data, error } = useSWR('/api/airtable');



 
  useEffect(async () => {
    setMovies(data);
    // console.log(data);
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !movies) {
    return <p>Loading...</p>;
  }
  console.log(movies);

  
  return (
    <div>
      <header className='Header'>
        <Upload />
      </header>
      {videoUrl == '' ? (
        <Banner />
      ) : (
        <div>
          <ReactPlayer
            url={videoUrl}
            controls={true}
            playing={true}
            width='100vw'
            height='70vh'
          />
        </div>
      )}
      <div className='movielist_title'>
        <h2>Movie list</h2>
      </div>
      <div className='movielist'>
        {typeof movies != 'undefined' &&
          movies.map((movie, id) => {
            return (
              <div
                key={id}
                className='Item'
                onClick={() => {
                  setVideoUrl(movie.Videolink);
                }}
                style={{
                  backgroundImage: `url(` + movie.Thumbnail + `)`,
                  margin: 5,
                }}
              >
                <div className='overlay'>
                  <div className='title'>{movie.Name}</div>
                  <div className='rating'>{movie.Tag}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch('/api/airtable');
  const data = await response.json();
  return { props: { movies: data } };
}

export default Movies;
