import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Slide1Img from '../assets/slides/slide1.jpg';
import Slide2Img from '../assets/slides/slide2.jpg';
import Slide3Img from '../assets/slides/slide3.jpg';
import Slide4Img from '../assets/slides/slide4.jpg';
import Slide5Img from '../assets/slides/slide5.jpg';
import Slide6Img from '../assets/slides/slide6.jpg';
import Slide7Img from '../assets/slides/slide7.jpg';
import Slide8Img from '../assets/slides/slide8.jpg';
// import Slide9Img from "../assets/slides/slide9.jpg";
// import Slide10Img from "../assets/slides/slide10.jpg";
// import Slide11Img from "../assets/slides/slide11.jpg";
// import Slide12Img from "../assets/slides/slide12.jpg";

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    Slide1Img,
    Slide2Img,
    Slide3Img,
    Slide4Img,
    Slide5Img,
    Slide6Img,
    Slide7Img,
    Slide8Img,
    // Slide9Img,
    // Slide10Img,
    // Slide11Img,
    // Slide12Img,
  ];

  const itemsPerPage = 4;

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < images.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-center text-2xl font-bold">Gallery</h1>

      {/* Slider Controls */}
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          onClick={nextSlide}
          disabled={currentIndex + itemsPerPage >= images.length}
        >
          Next
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {images
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${currentIndex + index + 1}`}
              className="h-full max-h-64 w-full cursor-pointer rounded-lg object-cover shadow-xl transition-transform hover:scale-105"
              onClick={() => setSelectedImage(image)}
            />
          ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative mx-auto mt-10 h-[80%] w-[30%] overflow-hidden rounded bg-white px-5 shadow-lg">
            <div className="">
              {/* Image */}
              <img
                src={selectedImage}
                alt="Selected"
                className="mb-16 mt-8 h-full w-full object-contain"
              />
            </div>
            {/* Close Button */}
            <button
              className="absolute right-2 top-1 z-50 text-xl font-bold text-black shadow-lg hover:text-blue-500 focus:outline-none"
              onClick={() => setSelectedImage(null)}
            >
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
