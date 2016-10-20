import React, { PropTypes } from 'react';
import style from './videoItem.css';

const YoutubeVideo = (props) => {
  let object = props.searchObj;
  return (
    <li>
      <img src={props.imgUrl} className={style.videoImage} onClick={() => props.updateFeatured(object)} />
    </li>
  );
};

YoutubeVideo.propTypes = {

};

export default YoutubeVideo;
