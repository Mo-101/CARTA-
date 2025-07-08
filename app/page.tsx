"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text3D, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Heart, Users, BookOpen, Shield, Globe, ArrowRight, Play, Coins, GraduationCap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const features = [
    {
      title: "Youth Learning Hub",
      description: "Gamified health education with blockchain rewards",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      href: "/youth",
    },
    {
      title: "Health Impact Tracking",
      description: "Real-time monitoring of African health facility funding",
      icon: <Heart className="h-8 w-8" />,
      color: "from-red-500 to-pink-500",
      href: "/health-impact",
    },
    {
      title: "Community Network",
      description: "Connect with learners and health advocates across Africa",
      icon: <Users className="h-8 w-8" />,
      color: "from-teal-500 to-cyan-500",
      href: "/community",
    },
    {
      title: "Validator System",
      description: "Decentralized review and verification of submissions",
      icon: <Shield className="h-8 w-8" />,
      color: "from-purple-500 to-indigo-500",
      href: "/validator",
    },
  ]

  const stats = [
    { label: "Active Learners", value: "12,847", icon: <Users className="h-6 w-6" />, color: "text-orange-500" },
    { label: "FLB Distributed", value: "2.4M", icon: <Coins className="h-6 w-6" />, color: "text-green-500" },
    { label: "Health Facilities", value: "6,656", icon: <Heart className="h-6 w-6" />, color: "text-red-500" },
    { label: "Countries", value: "54", icon: <Globe className="h-6 w-6" />, color: "text-blue-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#000000"]} />
          <Environment preset="city" />
          <FloatingElements />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Flame className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Flame</span>
                <span className="text-white">Born</span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The first blockchain-powered <span className="text-orange-400 font-semibold">Learn & Earn</span> platform
              designed for <span className="text-red-400 font-semibold">African health education</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-6 py-3 text-lg">
                🎓 Zero Cost Education
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-6 py-3 text-lg">
                💰 Earn FLB Tokens
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 px-6 py-3 text-lg">
                🌍 Impact Africa
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => router.push("/youth")}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <GraduationCap className="mr-3 h-6 w-6" />
              Start Learning
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              onClick={() => router.push("/preview")}
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg rounded-2xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="bg-black/60 border-gray-800 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`${stat.color} mb-4 flex justify-center`}>{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionizing{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Health Education
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combining blockchain technology with gamified learning to create sustainable impact across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => router.push(feature.href)}
              >
                <Card className="bg-black/60 border-gray-800 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300 h-full group-hover:scale-105">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                    <div className="mt-6 flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How FlameBorn Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A simple three-step process that transforms learning into real-world impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learn & Complete",
                description: "Take courses on African health topics and complete assessments",
                icon: <BookOpen className="h-8 w-8" />,
                color: "from-orange-500 to-red-500",
              },
              {
                step: "02",
                title: "Earn FLB Tokens",
                description: "Receive blockchain-verified FLB tokens for your achievements",
                icon: <Coins className="h-8 w-8" />,
                color: "from-red-500 to-pink-500",
              },
              {
                step: "03",
                title: "Create Impact",
                description: "70% of tokens automatically fund African health facilities",
                icon: <Heart className="h-8 w-8" />,
                color: "from-teal-500 to-cyan-500",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 text-white`}
                >
                  {step.icon}
                </div>
                <div className="text-6xl font-bold text-gray-800 mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              African Health?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of young Africans who are learning, earning, and creating real impact in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/youth")}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Flame className="mr-3 h-6 w-6" />
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                onClick={() => router.push("/community")}
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg rounded-2xl"
              >
                <Users className="mr-3 h-6 w-6" />
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function FloatingElements() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={2}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-4, 2, -5]}
        >
          FlameBorn
          <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Float>

      {/* Floating Icons */}
      {[
        { position: [-8, 3, -3], color: "#f97316" },
        { position: [8, -2, -4], color: "#ef4444" },
        { position: [-6, -3, -2], color: "#14b8a6" },
        { position: [6, 4, -6], color: "#8b5cf6" },
      ].map((item, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.3} floatIntensity={0.8} position={item.position}>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
