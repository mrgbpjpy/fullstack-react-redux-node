import {useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useAppSelector } from "../hooks";
import { themeColors } from "../theme/colors";

export default function ThemeOrb() {
    const meshRef = useRef<Mesh>(null!);
    const mode = useAppSelector((state) => state.theme.mode);
    const color = themeColors[mode];

    useFrame((_, delta) =>{
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.25;
    });

    return(
        <mesh ref={meshRef}>
            <boxGeometry args={[3,3,3]} />
            <meshStandardMaterial
                color={color}
                metalness={0.6}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}