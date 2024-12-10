import { useState, useEffect } from "react";
import AboutImg1 from "../assets/about.jpg";
import AboutImg2 from "../assets/about2.jpg";
import AboutImg3 from "../assets/cheif.webp";

function About() {
  const slides = [
    { image: AboutImg1, text: "Welcome to Sofi Restaurant, where every dish tells a story." },
    { image: AboutImg2, text: "Nestled in the heart of Mekelle city, we blend fresh, locally sourced ingredients with a passion for flavor." },
    { image: AboutImg3, text: "Come savor the difference—where good food meets great company." },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [slides.length]);

  // Handle manual slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-raising-black mt-20 lg:mt-32 max-w-7xl mx-auto overflow-hidden">
      {/* Slides Container */}
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="min-w-full flex flex-col lg:flex-row lg:gap-8 gap-6" key={index}>
            {/* Image Section */}
            <div className="lg:w-3/5 w-full">
              <img
                className="w-full h-full object-cover rounded-md"
                src={slide.image}
                alt={`Slide ${index + 1}`}
              />
            </div>

            {/* Text Section */}
            <div className="p-6 lg:p-16 flex flex-col items-center justify-center lg:w-2/5 w-full">
              <h1 className="text-gold text-4xl font-bold font-roboto text-center lg:text-left">
                Sofi Restaurant
              </h1>
              <p className="text-white font-inter mt-6 mb-4 text-center lg:text-left">
                {slide.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Icons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full cursor-pointer ${currentSlide === index ? "bg-gold" : "bg-white"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default About;
