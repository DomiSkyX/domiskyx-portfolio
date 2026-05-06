'use client'

import { useState } from "react"

export default function ImageGallery({
  images,
}: {
  images?: string[]
}) {
  const safeImages = images && images.length > 0 ? images : []

  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  if (safeImages.length === 0) {
    return (
      <div className="aspect-video rounded-2xl border border-border bg-muted flex items-center justify-center text-sm text-muted-foreground">
        No images available
      </div>
    )
  }

  const mainImage = safeImages[active]

  return (
    <>
      <div className="w-full space-y-4">

        {/* MAIN IMAGE */}
        <div
          onClick={() => setOpen(true)}
          className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video cursor-zoom-in group"
        >
          <img
            src={mainImage}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* THUMBNAILS */}
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-xl overflow-hidden border aspect-video transition ${
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

      {/* ZOOM MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <img
            src={mainImage}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  )
}