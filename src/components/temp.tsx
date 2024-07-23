// src/components/ShirtModel.tsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

const ShirtModel: React.FC = () => {
  const gltf = useLoader(GLTFLoader, '/models/shirt.glb');
  const texture = useLoader(TextureLoader, '/textures/texture.jpg');

  // Itera sobre os materiais do modelo e aplica a textura
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
    }
  });

  return <primitive object={gltf.scene} />;
};



const App: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ShirtModel />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
