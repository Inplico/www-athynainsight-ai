"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxBannerProps {
  src: string
  alt: string
  opacity?: number
  className?: string
}

export function ParallaxBanner({ src, alt, opacity = 0.2, className }: ParallaxBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const banner = bannerRef.current
    if (!banner) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * 0.5
      banner.style.transform = `translate3d(0, ${rate}px, 0)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={bannerRef} className={`absolute inset-0 -z-10 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900" />
    </div>
  )
} 