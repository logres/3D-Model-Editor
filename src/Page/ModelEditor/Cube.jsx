import React from 'react'
import { useCallback, useRef, useState } from 'react'
import { RigidBody } from "@react-three/rapier"
import * as THREE from 'three'
import { cubeStore, colorStore, opacityStore } from './store'
import { EdgesGeometry } from 'three'

export default function Cubes() {
    const cubes = cubeStore(state => state.cubes);
    return (
        cubes.map((cube, index) => <Cube key={index} position={cube.position} theCubColor={cube.color} theCubOpacity={cube.opacity} />)
    )
}

export function Cube({
    position,
    theCubColor,
    theCubOpacity
}) {
    const ref = useRef();
    const addCube = cubeStore(state => state.addCube);
    const removeCube = cubeStore(state => state.removeCube);

    const [hovered, set] = useState(null)
    const onMove = useCallback((e) => {
        set(Math.floor(e.faceIndex / 2))
    }, [])
    const onOut = useCallback(() => set(null), [])
    const onContextMenu = useCallback((e) => {
        e.stopPropagation();
        const { x, y, z } = ref.current.translation()
        removeCube({
            position: [x, y, z],
            color: 0xffffff
        });
    }, [removeCube])


    const colorOfCube = colorStore(state => state.color);
    const opacityOfCube = opacityStore(state => state.opacity);
    const onClick = useCallback((e) => {
        e.stopPropagation();
        const { x, y, z } = ref.current.translation()
        const dir = [
            [x + 1, y, z],
            [x - 1, y, z],
            [x, y + 1, z],
            [x, y - 1, z],
            [x, y, z + 1],
            [x, y, z - 1],
        ]
        addCube({ position: [...dir[Math.floor(e.faceIndex / 2)]], color: colorOfCube, opacity: opacityOfCube })
    }, [addCube, colorOfCube, opacityOfCube])

    return (
        <RigidBody position={position} ref={ref} type="fixed" colliders="cuboid">
            <mesh receiveShadow castShadow onClick={onClick} onContextMenu={onContextMenu} onPointerMove={onMove} onPointerOut={onOut} scale={[1, 1, 1]}>
                <boxGeometry />
                {[...Array(6)].map((_, index) => (
                    <meshStandardMaterial attach={`material-${index}`} key={index} color={hovered === index ? "hotpink" : theCubColor} roughness={0.7} metalness={0.3}
                        opacity={theCubOpacity} transparent={true}
                    />
                ))}
            </mesh>
            <mesh>
                <lineSegments geometry={new EdgesGeometry(new THREE.BoxGeometry(1, 1, 1))}>
                    <lineBasicMaterial attach="material" color={new THREE.Color(theCubColor).offsetHSL(0, -0.1, 0.1)} linewidth={10} />
                </lineSegments>
            </mesh>
        </RigidBody>
    )
}