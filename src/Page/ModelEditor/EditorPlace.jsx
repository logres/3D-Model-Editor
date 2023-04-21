import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import Ground from './Ground'
import Cubes from './Cube'
import { Physics } from "@react-three/rapier"
import * as THREE from 'three'
import { canvasStore } from './store'

export default function EditorPlace() {
    const canvasRef = React.useRef();
    const setCanvas = canvasStore(state => state.setCanvas);

    React.useEffect(() => {
        setCanvas(canvasRef.current);
    }, [setCanvas]);

    return (
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }} style={{ backgroundColor: 'white', borderRadius: '16px', }} ref={canvasRef} gl={{ preserveDrawingBuffer: true }} >
            <Sky sunPosition={[200, 200, 200]} />
            <ambientLight
                intensity={0.3}
            />
            <spotLight angle={0.5} penumbra={1} position={[200, 100, 200]} castShadow />
            <OrbitControls
                enablePan={true}
                mouseButtons={
                    {
                        LEFT: THREE.MOUSE.ROTATE,
                        MIDDLE: THREE.MOUSE.PAN,
                    }
                }
            />
            <Physics>
                <Ground h={255} w={255} />
                <Cubes />
            </Physics>
        </Canvas>
    )
}
