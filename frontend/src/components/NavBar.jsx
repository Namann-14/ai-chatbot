"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Bell, ChevronDown, Globe, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const NavBar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm px-20">
            <div className="flex items-center justify-between h-16 px-4">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
                    AI360
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm hover:text-primary">
                        About
                    </Link>
                    <Link href="#" className="text-sm hover:text-primary">
                        Arts
                    </Link>
                    <Link href="#" className="text-sm hover:text-primary">
                        FAQ
                    </Link>
                    <Link href="#" className="text-sm hover:text-primary">
                        Support
                    </Link>
                    <Button variant="outline" className="hidden md:inline-flex">
                        Learn more about services
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-50 right-50 transform translate-x-1/2 -translate-y-1/2 p-1 bg-green-500 border border-white rounded-full" />
                    </Button>
                    {/* <Image src="/placeholder.svg" alt="Profile" width={32} height={32} className="rounded-full" /> */}
                </nav>
            </div>
        </header>
    )
}

export default NavBar