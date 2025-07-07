"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text3D, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, Users, MapPin, TrendingUp, Shield, Zap } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function HealthImpactPage() {
  const router = useRouter()

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <Environment preset="sunset" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            <Text3D
              font="/fonts/Geist_Bold.json"
              size={1.2}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              Health Impact Hub
              <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
            </Text3D>
          </Float>

          <HealthNetworkVisualization />
        </Canvas>
      </div>

      <Navigation />

      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md pointer-events-auto">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-orange-500" />
                  Direct Health Impact
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Every FLB token represents real health interventions across Africa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span>1 FLB = 1 BNB donated to verified health facilities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span>70% of donations directly fund health interventions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span>30% supports platform sustainability and governance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 h-4 w-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span>Soulbound tokens ensure authentic participation</span>
                  </li>
                </ul>
                <Button
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                  onClick={() => router.push("/donation-studio")}
                >
                  Start Donating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-orange-500/30 backdrop-blur-md pointer-events-auto">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-orange-500" />
                  Verified Health Network
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Only verified African health actors can receive donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <HealthActorCard icon={<Heart className="h-5 w-5 text-orange-500" />} title="Hospitals" count="247" />
                  <HealthActorCard icon={<Users className="h-5 w-5 text-orange-500" />} title="Clinics" count="1,832" />
                  <HealthActorCard
                    icon={<MapPin className="h-5 w-5 text-orange-500" />}
                    title="Health Posts"
                    count="5,421"
                  />
                  <HealthActorCard
                    icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
                    title="Mobile Units"
                    count="156"
                  />
                </div>
                <div className="mt-4 p-3 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                  <p className="text-orange-400 text-sm">
                    <Zap className="inline mr-1 h-4 w-4" />
                    All health actors undergo rigorous verification through our African partner network
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-orange-500 text-orange-500 hover:bg-orange-900/20 bg-transparent"
                  onClick={() => router.push("/impact-tracking")}
                >
                  View Impact Metrics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function HealthActorCard({ icon, title, count }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex items-center">
      {icon}
      <div className="ml-2">
        <div className="text-white font-medium">{count}</div>
        <div className="text-gray-400 text-sm">{title}</div>
      </div>
    </div>
  )
}

function HealthNetworkVisualization() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  // Create health facility network visualization
  const facilities = []
  const facilityTypes = [
    { color: "#f97316", name: "Hospital" },
    { color: "#fbbf24", name: "Clinic" },
    { color: "#f59e0b", name: "Health Post" },
    { color: "#d97706", name: "Mobile Unit" },
  ]

  for (let i = 0; i < 25; i++) {
    const facilityType = facilityTypes[Math.floor(Math.random() * facilityTypes.length)]
    const angle = (i / 25) * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 3

    facilities.push(
      <group key={`facility-${i}`} position={[x, y, z]}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={facilityType.color}
            emissive={facilityType.color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
        <Html position={[0, 0, 0.41]} transform occlude>
          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{facilityType.name}</div>
        </Html>
      </group>,
    )

    // Add donation flow connections
    if (i > 0 && Math.random() > 0.6) {
      const prevAngle = ((i - 1) / 25) * Math.PI * 2
      const prevRadius = 3 + Math.random() * 4
      const prevX = Math.cos(prevAngle) * prevRadius
      const prevZ = Math.sin(prevAngle) * prevRadius
      const prevY = (Math.random() - 0.5) * 3

      facilities.push(
        <mesh key={`connection-${i}`}>
          <cylinderGeometry
            args={[0.03, 0.03, Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2) + Math.pow(z - prevZ, 2)), 8]}
            position={[(x + prevX) / 2, (y + prevY) / 2, (z + prevZ) / 2]}
            rotation={[
              Math.atan2(Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(z - prevZ, 2)), y - prevY),
              Math.atan2(z - prevZ, x - prevX),
              0,
            ]}
          />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>,
      )
    }
  }

  return <group ref={groupRef}>{facilities}</group>
}
