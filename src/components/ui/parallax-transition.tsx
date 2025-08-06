"use client"

import Image from "next/image"

interface ParallaxTransitionProps {
  src: string
  alt: string
}

export function ParallaxTransition({ src, alt }: ParallaxTransitionProps) {
  return (
    <div className="relative h-[60vh] -mt-24 -mb-24">
      {/* Fixed background that stays in viewport while this section is visible */}
      <div className="fixed inset-0 w-full h-screen -z-10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlays for smooth content transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-transparent to-gray-900/90" />
      </div>
    </div>
  )
} 