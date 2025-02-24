"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Globe, PlayCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FeatureSection } from "../components/feature-section"
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { LightGrid } from "@/components/light-grid"
import { FeatureTitle } from "@/components/feature-title"
import { TimelineLanding } from "@/components/timeline"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
export default function Page() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-pink-500",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="h-screen">
        <div className="pt-24 mx-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="text-pink-600 font-bold bg-pink-100 text-2xl">Enjoy with AI</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">The intelligent Design service</h1>
              <p className="text-muted-foreground text-lg">
                I generate visual ideas in 30 seconds so explore and Generate your ideas in an awesome place I generate
                ideas into visual photos and videos.
              </p>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Input type="text" placeholder="What shall I draw fo you?" className="bg-muted h-12" />
                </div>
                <Button variant="outline" className="gap-0 h-12">
                  <PlayCircle className="h-5 w-5" />
                  Show video
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Have any question?</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/realrobot.png"
                alt="AI Robot"
                width={600}
                height={600}
                className="object-contain rounded-3xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-1/4 -left-8"
              >
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-pink-600" />
                    <p className="text-sm font-medium">Lovely place</p>
                  </div>
                  <p className="text-xs text-muted-foreground">you can enjoy more.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-3/4 left-24"
              >
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-600" />
                    <p className="text-sm font-medium">Lovely place</p>
                  </div>
                  <p className="text-xs text-muted-foreground">you can enjoy more.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-1/2 right-12"
              >
                <div className="bg-white rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-300" />
                    <p className="text-sm font-medium">Lovely place</p>
                  </div>
                  <p className="text-xs text-muted-foreground">you can enjoy more.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="my-24 px-8 shadow-2xl rounded-2xl pb-10"
          >
            {/* <TypewriterEffectAbout /> */}
            <TypewriterEffect words={words} className='py-8' />
            <FeatureSection />
          </motion.div>
        </div>
        <div>
          <motion.div
            initial="hidden"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileInView="visible"
            viewport={{ once: true }}
            className="px-8 rounded-3xl bg-gradient-to-b from-[rgb(201,222,244)] via-[rgb(245,204,212)] to-[rgb(184,164,201)]"
          >
            <FeatureTitle />
            <LightGrid />
            <TimelineLanding />
          </motion.div>
        </div>
      <Footer />
      </div>
    </>
  )
}

