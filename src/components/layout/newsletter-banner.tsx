"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NewsletterBanner() {
  return (
    <div className="relative z-50 bg-indigo-600/10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:items-center sm:gap-x-4">
            <span className="text-sm font-semibold leading-6 text-indigo-200">NEWSLETTER</span>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current text-gray-300">
              <circle cx={1} cy={1} r={1} />
            </svg>
          </div>
          <p className="text-sm font-semibold leading-6 text-white">
            The AI Transformation Toolkit: Essential Strategies for Smooth AI Adoption
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="ring-1 ring-white/20 hover:ring-white/30"
        >
          <Link
            href="https://www.linkedin.com/newsletters/7222741175433117697/"
            className="flex items-center gap-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Subscribe</span>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  )
} 