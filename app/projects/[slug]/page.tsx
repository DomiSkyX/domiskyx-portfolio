import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { notFound } from "next/navigation"
import ImageGallery from "@/components/ImageGallery"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const project = await fetchQuery(api.projects.getBySlug, {
    slug,
  })

  if (!project) return notFound()

  return (
    <main className="min-h-[70vh] max-w-5xl mx-auto px-6 py-16 space-y-10">

      {/* TITLE */}
      <div>
        <h1 className="text-4xl font-semibold">
          {project.title}
        </h1>

        <p className="text-muted-foreground mt-2">
          {project.description}
        </p>
      </div>

      {/* GALLERY */}
      <ImageGallery images={project.images} />

      {/* CONTENT */}
      <div className="prose prose-neutral max-w-none">
        {project.content}
      </div>

    </main>
  )
}