import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Raycaster, Vector2, TextureLoader, MeshStandardMaterial, Mesh } from "three";
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useImageContext } from "../../context/ImageContext";
import { customModal } from "../dialogs/custom/CustomDialog";
import IsolatedPart from "../selectMesh/selectMesh";

function CameraAdjuster() {
  const { camera, size } = useThree();
  const initialSetup = useRef(false);

  const updateCamera = () => {
    const { width, height } = size;
    (camera as PerspectiveCamera).aspect = width / height;
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
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
  const { scene, camera } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();



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

      if (intersectedObject instanceof THREE.Mesh)
        customModal(
          "Escolha uma imagem",
          <IsolatedPart part={intersectedObject} ></IsolatedPart>
        )
    }
  };

  useEffect(() => {
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
      modelRef.current.position.set(0, -10.8, 0);
      modelRef.current.scale.set(8.5, 8.5, 8.5);
      modelRef.current.rotation.set(0.1, 0.5, 0);
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const LightAdjuster: React.FC = () => {
  const { camera, scene } = useThree();
  const lightRef = useRef<any>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
      lightRef.current.lookAt(scene.position);
    }
  });

  return <directionalLight ref={lightRef} intensity={0.5} />;
};

function Shirt() {
  return (
    <div className="h-100 w-100">
      <Canvas
        gl={{ antialias: true }}
        style={{ background: '#000000', minHeight: '50vh', height: '50vh', width: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <LightAdjuster />
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableRotate
          enableZoom={false}
          enablePan={false}
        />
        <CameraAdjuster />
        <ShirtModel />
      </Canvas>
    </div>
  );
}

export default Shirt;
