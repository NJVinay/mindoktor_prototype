"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useTriageStore } from "../store/triageStore";
import PrimaryCTAButton from "./PrimaryCTAButton";
import "./BodyModelViewer.css";

const LAYER_COLORS: Record<string, string> = {
  "Full Body": "#E8F4FD",
  Muscles: "#FF6B6B",
  Skeleton: "#F5F5DC",
  Organs: "#FFB347",
  Nervous: "#87CEEB",
};

type BodyPartProps = {
  position: [number, number, number];
  args: any;
  color: string;
  zoneId: string;
  onHover: (zone: string | null) => void;
  onClick: (zone: string) => void;
  shape: "box" | "sphere" | "cylinder";
  rotation?: [number, number, number];
};

function BodyPart({ position, args, color, zoneId, onHover, onClick, shape, rotation = [0, 0, 0] }: BodyPartProps) {
  const meshRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        onHover(zoneId);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(zoneId);
      }}
    >
      {shape === "box" && <boxGeometry args={args} />}
      {shape === "sphere" && <sphereGeometry args={args} />}
      {shape === "cylinder" && <cylinderGeometry args={args} />}
      <meshStandardMaterial color={hovered ? "#C41F1A" : color} opacity={0.9} transparent />
    </mesh>
  );
}

function HumanModel({ activeLayer, onZoneSelect }: { activeLayer: string; onZoneSelect: (zone: string) => void }) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const color = LAYER_COLORS[activeLayer] || LAYER_COLORS["Full Body"];
  
  return (
    <group position={[0, -1, 0]}>
      {/* Head */}
      <BodyPart shape="sphere" args={[0.4, 32, 32]} position={[0, 3.2, 0]} color={color} zoneId="head" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Neck */}
      <BodyPart shape="cylinder" args={[0.15, 0.15, 0.3, 32]} position={[0, 2.7, 0]} color={color} zoneId="neck" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Chest / Torso */}
      <BodyPart shape="box" args={[1.2, 1.6, 0.6]} position={[0, 1.5, 0]} color={color} zoneId="chest" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Abdomen */}
      <BodyPart shape="box" args={[1.0, 0.8, 0.5]} position={[0, 0.3, 0]} color={color} zoneId="abdomen" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Groin / Pelvis */}
      <BodyPart shape="box" args={[1.0, 0.5, 0.5]} position={[0, -0.3, 0]} color={color} zoneId="pelvis" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Arms */}
      <BodyPart shape="cylinder" args={[0.15, 0.15, 1.5, 32]} position={[-0.8, 1.3, 0]} rotation={[0, 0, 0.2]} color={color} zoneId="left-arm" onHover={setHoveredZone} onClick={onZoneSelect} />
      <BodyPart shape="cylinder" args={[0.15, 0.15, 1.5, 32]} position={[0.8, 1.3, 0]} rotation={[0, 0, -0.2]} color={color} zoneId="right-arm" onHover={setHoveredZone} onClick={onZoneSelect} />
      {/* Legs */}
      <BodyPart shape="cylinder" args={[0.2, 0.2, 1.8, 32]} position={[-0.3, -1.0, 0]} color={color} zoneId="left-leg" onHover={setHoveredZone} onClick={onZoneSelect} />
      <BodyPart shape="cylinder" args={[0.2, 0.2, 1.8, 32]} position={[0.3, -1.0, 0]} color={color} zoneId="right-leg" onHover={setHoveredZone} onClick={onZoneSelect} />
    </group>
  );
}

export default function BodyModelViewer() {
  const router = useRouter();
  const setBodyZone = useTriageStore((state) => state.setBodyZone);
  const selectedZone = useTriageStore((state) => state.bodyZone);
  
  const [activeLayer, setActiveLayer] = useState("Full Body");
  const [hoverZone, setHoverZone] = useState<string | null>(null);

  const handleZoneSelect = (zone: string) => {
    setBodyZone(zone);
  };

  const handleCTA = () => {
    if (selectedZone) {
      router.push(`/anatomy-triage?zone=${selectedZone}`);
    }
  };

  const layers = ["Full Body", "Muscles", "Skeleton", "Organs", "Nervous"];

  return (
    <div className="body-viewer-container" aria-label="Interactive body model — tap to select a body area">
      {hoverZone && !selectedZone && (
        <div className="zone-tooltip">{hoverZone} &middot; Tap to find care</div>
      )}
      
      <Canvas camera={{ position: [0, 1.5, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <HumanModel activeLayer={activeLayer} onZoneSelect={handleZoneSelect} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2.0} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI - Math.PI / 4} />
      </Canvas>

      {selectedZone && (
        <div className="zone-cta-container">
          <PrimaryCTAButton onClick={handleCTA}>
            Find care for {selectedZone} &rarr;
          </PrimaryCTAButton>
        </div>
      )}

      <div className="layer-switcher">
        {layers.map((layer) => (
          <button
            key={layer}
            className={`layer-btn ${activeLayer === layer ? "active" : ""}`}
            onClick={() => setActiveLayer(layer)}
          >
            {layer}
          </button>
        ))}
      </div>
    </div>
  );
}
