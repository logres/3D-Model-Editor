import React from 'react'

export default function Ground({ h, w }) {
    return (
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
            <planeGeometry args={[h, w]} />
            <meshStandardMaterial color={0xFFFFFF} opacity={1} transparent={false} />
            <gridHelper args={[h, w]} rotation-x={-Math.PI / 2} colorGrid={0x000000} />
        </mesh>
    )
}