import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThemeOrb from "./ThemeOrb";


export default function ThemeOrbCanvas() {
    return(
        <Canvas style={{ height: 300}}>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[3,3,3]}/>
            <ThemeOrb/>
            <OrbitControls enableZoom={false}/>
        </Canvas>
    )
}