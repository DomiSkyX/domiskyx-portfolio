'use client'

import { useState } from "react"

export default function ImageGallery({
  images,
}: {
  images?: string[]
}) {
  const safeImages = images && images.length > 0 ? images : []

  const [active, setActive] = useState(0)

  if (safeImages.length === 0) {
    return (
      <div className="aspect-video rounded-2xl border border-border bg-muted flex items-center justify-center text-sm text-muted-foreground">
        No images available
      </div>
    )
  }

  const mainImage = safeImages[active]

  return (
    <div className="space-y-4 w-full max-w-7xl mx-auto">

      {/* MAIN IMAGE */}
      <div className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video">
        <img
          src={mainImage}
          className="w-full h-full object-cover transition duration-500"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {safeImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-2xl overflow-hidden border transition aspect-video ${
              i === active
                ? "border-foreground"
                : "border-border opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  )
}