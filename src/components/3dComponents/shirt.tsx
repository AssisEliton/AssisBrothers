import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh, PerspectiveCamera, TextureLoader, Vector3 } from "three";
import { Box, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from 'three';


const ShirtModel: React.FC = () => {
  const gltf = useGLTF('/models/t_shirt.glb');

  return <primitive object={gltf.scene} />;
};


function CameraAdjuster() {
  const { camera, size } = useThree();
  const initialSetup = useRef(false);
   console.log(camera)
  const updateCamera = () => {
    const { width, height } = size;

    // Ajusta a posição da câmera e a orientação
    (camera as PerspectiveCamera).aspect = width / height; // Proporção do Canvas

    camera.position.set(width / 2, height / 2, Math.max(width, height) * 1.5);
    camera.lookAt(width / 2, height / 2, 0);
    camera.updateProjectionMatrix();
  };


  useFrame(() => {
    if (!initialSetup.current) {
      initialSetup.current = true;
      updateCamera();
    }
  });

  useEffect(() => {
    // Atualiza a câmera quando a janela é redimensionada
    window.addEventListener('resize', updateCamera);
    updateCamera(); // Atualiza a câmera na montagem
    return () => window.removeEventListener('resize', updateCamera);
  }, [size, camera]);

  return null;
}

function CenteredModel() {
  return (
    <Box args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
}

function Shirt() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[1, 1, 1]} />
      <OrbitControls />
      <CameraAdjuster />
      <CenteredModel />
    </Canvas>
  );
}

export default Shirt;
