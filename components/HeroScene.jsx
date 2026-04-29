"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from "@react-three/drei";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        {/* Floating Abstract Liquid Glass Shape */}
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 100, 200]} scale={1.5}>
            <MeshDistortMaterial
              color="#ff8c42" // Levioosa Peach/Orange touch
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}