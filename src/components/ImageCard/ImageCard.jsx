import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.card}>
      <div>
        <img
          src={image.urls.small}
          alt={image.alt_description || 'Image'}
          className={styles.image}
          onClick={() => onClick(image)} 
        />
      </div>
    </li>
  );
};

export default ImageCard;

