"use client";

import { motion } from "framer-motion";
import { Heart, Github, Twitter, Mail, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Bot className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold">AI360</span>
            </motion.div>
            <p className="text-gray-600">
              Generating visual ideas in seconds. Explore and create in an
              awesome place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {["About", "Arts", "FAQ", "Support"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-pink-500 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <div className="flex gap-2">
              {[
                { icon: Twitter, name: "Twitter" },
                { icon: Github, name: "Github" },
                { icon: Mail, name: "Mail" },
              ].map(({ icon: Icon, name }) => (
                <Button key={name} variant="outline" size="icon">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2024 AI360. All rights reserved.</p>
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 1],
              transition: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            Made with <Heart className="h-4 w-4 text-pink-500" /> by AI360
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
