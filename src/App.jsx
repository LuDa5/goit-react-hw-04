import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';

const API_KEY = 'jrUby21cxyE-mfVlRJdgpMIIJGqQcWM6mATZJTRQ5T4';
const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (newQuery, newPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          query: newQuery,
          page: newPage,
          per_page: 12,
          client_id: API_KEY,
        },
      });
      setImages((prevImages) =>
        newPage === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMore} />}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
