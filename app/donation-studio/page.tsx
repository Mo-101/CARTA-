"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text3D, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Send, Shield, MapPin, Coins, ChevronDown } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { HealthAiAssistant } from "@/components/health-ai-assistant"

export default function DonationStudioPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("donate")
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedFacility, setSelectedFacility] = useState("")

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
              Donation Studio
              <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
            </Text3D>
          </Float>

          <DonationVisualization activeTab={activeTab} />
        </Canvas>
      </div>

      <Navigation />
      <HealthAiAssistant />

      <div className="absolute inset-0 z-20 flex flex-col p-4 pointer-events-none">
        <div className="flex justify-between items-center mb-4 pointer-events-auto">
          <div className="flex items-center">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-900/20 mr-2 bg-transparent"
            >
              <Heart className="mr-2 h-4 w-4" />
              Quick Donate
            </Button>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-900/20 bg-transparent"
            >
              <Shield className="mr-2 h-4 w-4" />
              Verify Facility
            </Button>
          </div>
          <div className="flex items-center">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg px-4 py-2 mr-4">
              <span className="text-orange-400 text-sm">Your FLB Balance: </span>
              <span className="text-white font-bold">0 FLB</span>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <Coins className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 pointer-events-auto">
            <TabsTrigger value="donate" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Make Donation
            </TabsTrigger>
            <TabsTrigger
              value="facilities"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
            >
              Health Facilities
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Impact Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="flex-1 flex mt-4">
            <div className="w-80 bg-black/80 border-orange-500/30 backdrop-blur-md rounded-lg p-4 mr-4 pointer-events-auto">
              <h3 className="text-white font-medium mb-4">Donation Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Select Health Facility</label>
                  <div className="relative">
                    <select
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white appearance-none"
                      value={selectedFacility}
                      onChange={(e) => setSelectedFacility(e.target.value)}
                    >
                      <option value="">Choose a verified facility</option>
                      <option value="lagos-general">Lagos General Hospital</option>
                      <option value="nairobi-clinic">Nairobi Community Clinic</option>
                      <option value="cape-town-health">Cape Town Health Center</option>
                      <option value="accra-medical">Accra Medical Facility</option>
                      <option value="addis-hospital">Addis Ababa Hospital</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Donation Amount (BNB)</label>
                  <Input
                    type="number"
                    placeholder="0.1"
                    step="0.01"
                    min="0.01"
                    className="bg-gray-900/50 border-gray-700 text-white"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">You will receive {donationAmount || "0"} FLB tokens</p>
                </div>

                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                  <h4 className="text-orange-400 font-medium text-sm mb-2">Fund Distribution</h4>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>To Health Facility (70%)</span>
                      <span>{donationAmount ? (Number.parseFloat(donationAmount) * 0.7).toFixed(3) : "0"} BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Treasury (30%)</span>
                      <span>{donationAmount ? (Number.parseFloat(donationAmount) * 0.3).toFixed(3) : "0"} BNB</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                  disabled={!selectedFacility || !donationAmount}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Donate & Mint FLB
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-black/80 border-orange-500/30 backdrop-blur-md rounded-lg p-4 pointer-events-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Donation Impact Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-500 text-orange-500 hover:bg-orange-900/20 bg-transparent"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </div>

              <div className="h-[calc(100%-40px)] bg-gray-900/50 rounded-lg border border-gray-800 flex items-center justify-center">
                {selectedFacility ? (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-black" />
                    </div>
                    <h4 className="text-white font-medium mb-2">
                      {selectedFacility.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Your donation will directly support health interventions at this verified facility
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-orange-400 font-medium">Patients Served</div>
                        <div className="text-white text-lg">2,450/month</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-orange-400 font-medium">Success Rate</div>
                        <div className="text-white text-lg">94%</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a health facility to see donation impact</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="flex-1 mt-4">
            <div className="bg-black/80 border-orange-500/30 backdrop-blur-md rounded-lg p-4 h-full pointer-events-auto">
              <h3 className="text-white font-medium mb-4">Verified Health Facilities</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FacilityCard
                  name="Lagos General Hospital"
                  location="Lagos, Nigeria"
                  type="Hospital"
                  patients="5,200/month"
                  verified={true}
                />
                <FacilityCard
                  name="Nairobi Community Clinic"
                  location="Nairobi, Kenya"
                  type="Clinic"
                  patients="1,800/month"
                  verified={true}
                />
                <FacilityCard
                  name="Cape Town Health Center"
                  location="Cape Town, South Africa"
                  type="Health Center"
                  patients="3,100/month"
                  verified={true}
                />
                <FacilityCard
                  name="Accra Medical Facility"
                  location="Accra, Ghana"
                  type="Medical Center"
                  patients="2,400/month"
                  verified={true}
                />
                <FacilityCard
                  name="Addis Ababa Hospital"
                  location="Addis Ababa, Ethiopia"
                  type="Hospital"
                  patients="4,600/month"
                  verified={true}
                />
                <FacilityCard
                  name="Kampala Mobile Unit"
                  location="Kampala, Uganda"
                  type="Mobile Unit"
                  patients="800/month"
                  verified={true}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="flex-1 mt-4">
            <div className="bg-black/80 border-orange-500/30 backdrop-blur-md rounded-lg p-4 h-full pointer-events-auto">
              <h3 className="text-white font-medium mb-4">Your Donation Impact</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Total Donated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">0 BNB</div>
                    <div className="text-sm text-gray-400">≈ $0 USD</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">FLB Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">0 FLB</div>
                    <div className="text-sm text-gray-400">Governance tokens</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Lives Impacted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">0</div>
                    <div className="text-sm text-gray-400">Estimated patients helped</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                  onClick={() => setActiveTab("donate")}
                >
                  Make Your First Donation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function FacilityCard({ name, location, type, patients, verified }) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm">{name}</CardTitle>
          {verified && <Shield className="h-4 w-4 text-orange-500" />}
        </div>
        <CardDescription className="text-gray-400 text-xs">{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white">{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Patients:</span>
            <span className="text-white">{patients}</span>
          </div>
        </div>
        <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-black">
          <Heart className="mr-1 h-3 w-3" />
          Donate
        </Button>
      </CardContent>
    </Card>
  )
}

function DonationVisualization({ activeTab }) {
  const sceneRef = useRef()

  useFrame(({ clock }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  // Create donation flow visualization
  const elements = []

  if (activeTab === "donate") {
    // Show donation flow from donor to facility
    const donationFlow = [
      { type: "donor", label: "Donor", position: [-4, 1, 0], color: "#f97316" },
      { type: "escrow", label: "Escrow", position: [0, 0, 0], color: "#fbbf24" },
      { type: "facility", label: "Health Facility", position: [4, 1, 0], color: "#f59e0b" },
      { type: "treasury", label: "Treasury", position: [4, -1, 0], color: "#d97706" },
    ]

    donationFlow.forEach((item, index) => {
      elements.push(
        <group key={`flow-${index}`} position={item.position}>
          <mesh>
            <boxGeometry args={[1.5, 1, 0.5]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Html position={[0, 0, 0.26]} transform occlude>
            <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{item.label}</div>
          </Html>
        </group>,
      )
    })

    // Add flow connections
    elements.push(
      <mesh key="donor-to-escrow">
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} position={[-2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>,
      <mesh key="escrow-to-facility">
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} position={[2, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>,
      <mesh key="escrow-to-treasury">
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} position={[2, -0.5, 0]} rotation={[0, 0, Math.PI / 6]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>,
    )
  }

  return <group ref={sceneRef}>{elements}</group>
}
