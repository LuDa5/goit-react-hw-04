import React from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => (
  <ReactModal
    isOpen={!!image}
    onRequestClose={onClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <img src={image.urls.regular} alt={image.alt_description || 'Image'} className={styles.im } />
    <p className={styles.text}>{image.description || 'No description available.'}</p>
    <button onClick={onClose} className={styles.btn}>Close</button>
  </ReactModal>
);

export default ImageModal;
