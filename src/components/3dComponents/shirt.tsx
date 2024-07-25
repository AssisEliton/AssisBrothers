import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Raycaster, Vector2 } from "three";
import { OrbitControls, useGLTF } from '@react-three/drei';

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
  const modelRef = useRef<any>(null);
  const { gl, scene, camera } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseOver = () => {

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    const onClick = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        console.log(`Clicked on: ${intersectedObject.name}`);
        // Chame sua callback aqui
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', onMouseOver);
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', onMouseOver);
      window.removeEventListener('click', onClick);
    };

  }, [raycaster, mouse, camera, scene.children]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, -10.8, 0); // Posiciona o modelo ao centro do canvas
      modelRef.current.scale.set(8.5, 8.5, 8.5); // Ajuste a escala conforme necessário
      modelRef.current.rotation.set(0.1, 0.5, 0);
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

function Shirt() {
  return (
    <div className="h-100 w-100">
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
    </div>
  );
}

export default Shirt;
