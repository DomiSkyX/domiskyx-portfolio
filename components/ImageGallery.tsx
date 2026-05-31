'use client'

import { useState } from "react"

export default function ImageGallery({
  images = [],
}: {
  images?: string[]
}) {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : []

  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (safeImages.length === 0) {
    return (
      <div className="aspect-video rounded-2xl border border-border bg-muted flex items-center justify-center text-sm text-muted-foreground">
        No images available
      </div>
    )
  }

  const mainImage = safeImages[active] ?? safeImages[0]

  return (
    <div className="space-y-4 w-full max-w-7xl mx-auto">

      {/* MAIN IMAGE */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video cursor-zoom-in"
      >
        <img
          src={mainImage}
          className="w-full h-full object-cover transition duration-500"
          alt="project image"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {safeImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-2xl overflow-hidden border transition aspect-video ${i === active
              ? "border-foreground"
              : "border-border opacity-70 hover:opacity-100"
              }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`thumbnail ${i}`}
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={mainImage}
            alt="project image"
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  )
}