import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.card} onClick={() => onClick(image)}>
      <div>
        <img src={image.urls.small} alt={image.alt_description || 'Image'} />
      </div>
    </li>
  );
};

export default ImageCard;
