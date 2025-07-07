"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, Text3D } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginBackground } from "@/components/login-background"
import { ArrowLeft, Shield, MapPin } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("verify")

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <Environment preset="sunset" />
          <LoginBackground />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[0, 3, 0]}>
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
              {activeTab === "verify" ? "African Verification" : "Join FlameBorn"}
              <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
            </Text3D>
          </Float>
        </Canvas>
      </div>

      <Button
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-white hover:text-orange-400 hover:bg-transparent"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/80 border-orange-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center">
              <Shield className="mr-2 h-6 w-6 text-orange-500" />
              {activeTab === "verify" ? "Verify African Identity" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              {activeTab === "verify"
                ? "Only verified African participants can join FlameBorn"
                : "Complete your registration to start contributing"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
                <TabsTrigger
                  value="verify"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
                >
                  Verify Identity
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-black"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="verify" className="mt-4">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                      African Country
                    </label>
                    <select className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option value="">Select your country</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="kenya">Kenya</option>
                      <option value="south-africa">South Africa</option>
                      <option value="ghana">Ghana</option>
                      <option value="ethiopia">Ethiopia</option>
                      <option value="uganda">Uganda</option>
                      <option value="tanzania">Tanzania</option>
                      <option value="other">Other African Country</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">National ID / Passport</label>
                    <Input
                      type="text"
                      placeholder="Enter your ID number"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+234 xxx xxx xxxx"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-orange-400 text-sm">
                      <Shield className="inline mr-1 h-4 w-4" />
                      Your identity will be verified through our African partner network to ensure authenticity.
                    </p>
                  </div>
                  <Button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    onClick={() => setActiveTab("register")}
                  >
                    Verify Identity
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-4">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Role</label>
                    <select className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white">
                      <option value="">Select your role</option>
                      <option value="donor">Individual Donor</option>
                      <option value="health-worker">Health Worker</option>
                      <option value="facility-admin">Health Facility Administrator</option>
                      <option value="community-leader">Community Leader</option>
                      <option value="researcher">Health Researcher</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Wallet Address (Optional)</label>
                    <Input
                      type="text"
                      placeholder="0x... (BNB Smart Chain)"
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                  </div>
                  <Button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    onClick={() => router.push("/donation-studio")}
                  >
                    Join FlameBorn
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-400 text-center">
              By joining FlameBorn, you agree to the Kairo Covenant v1.0 and commit to African health sovereignty.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
