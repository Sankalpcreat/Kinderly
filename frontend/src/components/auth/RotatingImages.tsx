"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/child1.jpg',
  '/images/child2.jpg',
  '/images/child3.jpg'
];

const ROTATION_INTERVAL = 5000; // 5 seconds

export default function RotatingImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="relative w-full h-full bg-purple-100">
      {/* Loading state */}
      {!imagesLoaded.some(loaded => loaded) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
        </div>
      )}
      
      {/* Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover rounded-l-lg"
            priority={index === 0}
            onLoad={() => handleImageLoad(index)}
            onError={(e) => {
              console.error(`Error loading image ${src}:`, e);
            }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-purple-900/20 z-10 rounded-l-lg" />
      
      {/* Text overlay */}
      <div className="absolute bottom-10 left-10 z-20 text-white">
        <h2 className="text-4xl font-bold mb-4">Capturing Moments,</h2>
        <h2 className="text-4xl font-bold">Creating Memories</h2>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
} 