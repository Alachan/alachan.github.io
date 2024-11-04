import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./PhotoPage.css";

const PhotoPage = ({
  images,
  handleImageClick,
  fullscreenImage,
  fullscreenAlt,
  handleCloseFullscreen,
  isMobile,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // 2 columns, 3 rows per page

  useEffect(() => {
    setCurrentPage(0); // Reset to first page when switching to mobile view
  }, [isMobile]);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedImages = isMobile
    ? images.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : images;

  return (
    <div className="photo-page-container">
      <div className="photo-grid">
        {paginatedImages.map((image, index) => (
          <div
            key={index}
            className="photo-item"
            onClick={() => handleImageClick(image.src, image.alt)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="hover-image grayscale"
            />
          </div>
        ))}
        {isMobile && currentPage > 0 && (
          <div
            className="carousel-arrow left-arrow"
            onClick={handlePreviousPage}
          >
            &#9664;
          </div>
        )}
        {isMobile && currentPage < totalPages - 1 && (
          <div className="carousel-arrow right-arrow" onClick={handleNextPage}>
            &#9654;
          </div>
        )}
      </div>
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <motion.div
            className="fullscreen-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <figure className="fullscreen-content">
              <img src={fullscreenImage} alt={fullscreenAlt} />
              <figcaption className="fullscreen-caption">
                {fullscreenAlt}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
