"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Float, Text3D, Sphere, MeshDistortMaterial } from "@react-three/drei"
import type { Group } from "three"

export function MainScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 10, 40]} />
      <ambientLight intensity={0.3} />
      <Environment preset="sunset" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Logo position={[0, 1, 0]} />
      </Float>

      <HealthNetwork />
      <AfricanNodes />
      <DonationFlow />
    </Canvas>
  )
}

function Logo({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-4.5, 0, 0]}
      >
        Flame
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
      </Text3D>

      <Text3D
        font="/fonts/Geist_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[0.2, 0, 0]}
      >
        Born
        <meshStandardMaterial color="#f0f0f0" metalness={0.8} roughness={0.2} />
      </Text3D>
    </group>
  )
}

function HealthNetwork() {
  const networkRef = useRef<Group>(null)
  const { viewport } = useThree()
  const [nodes, setNodes] = useState<Array<[number, number, number]>>([])

  useEffect(() => {
    const gridSize = 8
    const spacing = 2.5
    const newNodes: Array<[number, number, number]> = []

    // Create nodes representing African health facilities
    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        const distance = Math.sqrt(x * x + z * z)
        if (distance > 4 && distance < 12) {
          newNodes.push([x, -2, z])
        }
      }
    }

    setNodes(newNodes)
  }, [])

  useFrame(({ clock }) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <group ref={networkRef}>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function AfricanNodes() {
  const nodesRef = useRef<Group>(null)
  const [particles, setParticles] = useState<
    Array<{
      position: [number, number, number]
      speed: number
      size: number
      color: string
    }>
  >([])

  useEffect(() => {
    const count = 40
    const newParticles = []

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 6 + Math.random() * 8
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 8

      newParticles.push({
        position: [x, y, z],
        speed: 0.1 + Math.random() * 0.2,
        size: 0.06 + Math.random() * 0.08,
        color: Math.random() > 0.6 ? "#f97316" : "#fbbf24",
      })
    }

    setParticles(newParticles)
  }, [])

  useFrame(({ clock }) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((particle, i) => {
        const data = particles[i]
        // Simulate health data flowing upward
        particle.position.y += data.speed * 0.015
        if (particle.position.y > 4) {
          particle.position.y = -4
        }
      })
    }
  })

  return (
    <group ref={nodesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 12, 12]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function DonationFlow() {
  const flowRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (flowRef.current) {
      flowRef.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <group ref={flowRef} position={[0, 0, 0]}>
      <Sphere args={[10, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#f97316"
          attach="material"
          distort={0.2}
          speed={1.5}
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
    </group>
  )
}
