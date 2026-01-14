/* eslint-disable react-hooks/set-state-in-effect */
import {useRef ,useEffect, useState} from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useAppSelector } from "../hooks";
import { themeColors } from "../theme/colors";

export default function ThemeOrb() {
    const meshRef = useRef<Mesh>(null!);
    const mode = useAppSelector((state) => state.theme.mode);
    const color = themeColors[mode];

    const [pulse, setPulse] = useState(0);

    useEffect(() => {
        setPulse(1)
    },[mode])

    useFrame((_, delta) =>{
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.25;

        /* decay pulse */
        if (pulse > 0) {
      setPulse((p) => Math.max(0, p - delta * .2));
    }

    const scale = 1 + pulse * .8;
    meshRef.current.scale.set(scale, scale, scale);
    });

    return(
        <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial
        color={color}
        metalness={2}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.5 + pulse}
      />
    </mesh>
    )
}