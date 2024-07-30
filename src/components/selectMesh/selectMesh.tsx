import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import ImageUpload from '../pages/canvas/imageUpload';
import { useImageContext } from '../../context/ImageContext';
import { Canvas } from '@react-three/fiber';

interface IsolatedPartProps {
  part: THREE.Mesh;
}

const IsolatedPart: React.FC<IsolatedPartProps> = ({ part }) => {
  const { images } = useImageContext();
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const material = part.material;

  useEffect(() => {
    if (images.length > 0) {
      const base64 = images[0];
      const textureLoader = new THREE.TextureLoader();
      const loadedTexture = textureLoader.load(base64, () => {
        setTexture(loadedTexture);
      });
    }
  }, [images]);

  useEffect(() => {
    if (material instanceof THREE.MeshStandardMaterial) {
      material.map = texture ?? null;
      material.needsUpdate = true;
    }
  }, [texture, material]);

  return (
    <div className="w-100">
      <ImageUpload />
      <Canvas>
        <ambientLight />
        <mesh geometry={part.geometry}>
          <meshStandardMaterial map={texture} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default IsolatedPart;
