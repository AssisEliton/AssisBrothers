import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ImageContextType {
  images: string[];
  addImage: (base64: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);

  const addImage = (base64: string) => {
    setImages((prevImages) => [...prevImages, base64]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
