import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";

const MercuryTest = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 0]} intensity={3} />
      <Sphere />
      <MeshPopulation count={300} />
    </Canvas>
  );
};

export default MercuryTest;

const MeshPopulation = ({ count }) => {
  const group = useRef(null);
  const meshes = [];

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.15;
  });

  for (let i = 0; i < count; i++) {
    const position = [
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 1,
      (Math.random() - 0.5) * 25,
    ];

    const args = [
      Math.random() * 0.2,
      Math.random() * 0.325,
      Math.random() * 0.4373,
    ];

    meshes.push(
      <mesh key={i} position={position}>
        <sphereGeometry args={args} />
        <meshStandardMaterial color="grey" />
      </mesh>
    );
  }
  return <group ref={group}>{meshes}</group>;
};

function Sphere() {
  const mesh = useRef(null);
  //   useFrame((state, delta) => {
  //     mesh.current.rotation.y += delta * 0.1;
  //   });

  const texture = useLoader(TextureLoader, "src/mercury/mercury.jpg");
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
