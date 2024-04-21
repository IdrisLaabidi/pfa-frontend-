import React from "react";
import PropTypes from "prop-types";
import styles from './youtubeEmbed.module.css'

const YoutubeEmbed = ({ embedId }) => (
  <div className={styles.videoresponsive}>
    <iframe
      style={{ width: "500px", height: "281px" }}
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
