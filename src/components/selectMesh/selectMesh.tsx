import React from 'react';
import * as THREE from 'three';

interface IsolatedPartProps {
  part: THREE.Mesh;
  texture: THREE.Texture;
}

const IsolatedPart: React.FC<IsolatedPartProps> = ({ part, texture }) => {
  const material = part.material;
  if (material instanceof THREE.MeshStandardMaterial) {
    material.map = texture;
    material.needsUpdate = true;
  }

  return (
    <mesh geometry={part.geometry}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default IsolatedPart;
