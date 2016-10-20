import React, { PropTypes } from 'react';
import style from './videoItem.css';

const FeaturedVideo = (props) => {
  const videoExtension = props.id.videoId;
  const videoUrl = `https://www.youtube.com/embed/${videoExtension}`;
  return (
    <li>
      <iframe src={videoUrl} className={style.featured}></iframe>
    </li>
  );
};

FeaturedVideo.propTypes = {
  id: PropTypes.string,
};

export default FeaturedVideo;
