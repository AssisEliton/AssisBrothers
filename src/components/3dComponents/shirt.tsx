import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from "three";
import { Box, OrbitControls, useGLTF } from '@react-three/drei';
import { Mesh } from 'three';



function CameraAdjuster() {
  const { camera, size } = useThree();
  const initialSetup = useRef(false);

  const updateCamera = () => {
    const { width, height } = size;
    (camera as PerspectiveCamera).aspect = width / height;
    camera.position.set(0, 0, 5); // Posiciona a câmera em z
    camera.lookAt(0, 0, 0); // Aponta para o centro do canvas
    camera.updateProjectionMatrix();
  };

  useFrame(() => {
    if (!initialSetup.current) {
      initialSetup.current = true;
      updateCamera();
    }
  });

  useEffect(() => {
    window.addEventListener('resize', updateCamera);
    updateCamera();
    return () => window.removeEventListener('resize', updateCamera);
  }, [size, camera]);

  return null;
}


const ShirtModel: React.FC = () => {
  const gltf = useGLTF('/models/t_shirt.glb');
  const modelRef = useRef<Mesh>(null);
  const planeRef = useRef<Mesh>(null);
  const { size } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      const { width, height } = size;
      modelRef.current.position.set(0, -11.3, 0); // Posiciona o modelo ao centro do canvas
      modelRef.current.scale.set(8.5,8.5,8.5); // Ajuste a escala conforme necessário
      modelRef.current.rotation.set(0,0.5,0);
    }
  });

  return (
    <>
      <primitive object={gltf.scene} ref={modelRef} />
      <mesh ref={planeRef}>
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
};

function Shirt() {
  return (
    <Canvas
      gl={{ antialias: true }}
      style={{ background: '#000000', minHeight: '50vh', height: '50vh', width: '100%' }} // Canvas com altura de 50vh e largura 100%
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[1, 1, 1]} />
      <OrbitControls
        maxPolarAngle={Math.PI / 2} // Limita a rotação para não ultrapassar o eixo X
        minPolarAngle={Math.PI / 2} // Limita a rotação para não ultrapassar o eixo X
        enableRotate // Habilita a rotação
        enableZoom={false} // Desabilita o zoom, se desejado
        enablePan={false} // Desabilita o pan, se desejado
      />
      <CameraAdjuster />
      <ShirtModel />
    </Canvas>
  );
}

export default Shirt;
