import React, { useRef } from 'react'
import * as THREE from 'three'

const Star = () => {
  const ref = useRef<THREE.Mesh>(null)

  const size = Math.random() * 2
//   const color = new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`)
const r = Math.random() * 0.5 + 0.5 // wartość między 0.5 a 1
const g = Math.random() * 0.5 + 0.5 // wartość między 0.5 a 1
const b = Math.random() * 0.5 + 0.5 // wartość między 0.5 a 1
const color = new THREE.Color(r, g, b)
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  )

  return (
    <mesh ref={ref} position={position}>
      <sphereBufferGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

const CustomStars = () => {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {Array.from({ length: 1000 }, () => (
        <Star key={Math.random()} />
      ))}
    </group>
  )
}

export default CustomStars