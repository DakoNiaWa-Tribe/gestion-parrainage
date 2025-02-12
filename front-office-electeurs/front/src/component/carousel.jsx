import{ useEffect, useState } from "react";

const BackgroundCarousel = () => {
  // Tableau des images de fond
  const images = [
      "https://mdbootstrap.com/img/new/textures/full/243.jpg",
      'https://mdbootstrap.com/img/new/textures/full/102.jpg',
      'https://mdbootstrap.com/img/new/textures/full/106.jpg',
    'https://mdbootstrap.com/img/new/textures/full/107.jpg',
    'https://mdbootstrap.com/img/new/textures/full/266.jpg',
    'https://mdbootstrap.com/img/new/textures/full/247.jpg',
    'https://mdbootstrap.com/img/new/textures/full/277.jpg',
    'https://mdbootstrap.com/img/new/textures/full/259.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'image actuelle

  useEffect(() => {
    // Intervalle pour changer d'image toutes les 5 secondes
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="background-carousel w-full h-screen bg-cover bg-center transition-opacity  ease-in-out"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        transition: "background-image 3s ease-in-out"
      }}
    ></div>
  );
};

export default BackgroundCarousel;