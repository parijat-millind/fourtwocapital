import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Image, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

const FloatingAssets = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse-Follow parallax interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse to -1 to +1
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation for rotation based on mouse position
      const targetX = mousePos.y * 0.3; // Limit the max rotation
      const targetY = mousePos.x * 0.3; 

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core Nodes - Back Left */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Image 
          url="/assets/hero_core_nodes_1777080776926.png" 
          transparent 
          position={[-3, 1, -2]} 
          scale={[4, 4.5]} 
        />
      </Float>

      {/* Main Shield - Center Front */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
        <Image 
          url="/assets/hero_shield_defense_1777080792427.png" 
          transparent 
          position={[0, 0, 1]} 
          scale={[5, 5]} 
        />
      </Float>

      {/* Catalyst Graph - Bottom Right */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
        <Image 
          url="/assets/hero_catalyst_graph_1777080807910.png" 
          transparent 
          position={[3.5, -1.5, 0]} 
          scale={[3.5, 3.5]} 
        />
      </Float>
    </group>
  );
};

export default function BusinessHero3D() {
  const [mounted, setMounted] = useState(false);
  
  // Prevent SSR to ensure text paints quickly (LCP Optimization)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0 z-0 bg-transparent animate-pulse" />;

  return (
    <div className="w-full h-full min-h-[500px] absolute inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Support high-pixel-density displays
        gl={{ antialias: true, alpha: true }}
      >
        <React.Suspense fallback={null}>
          <FloatingAssets />
          {/* Subtle HDRI lighting wrap */}
          <Environment preset="city" />
          <Preload all />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
