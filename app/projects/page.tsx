'use client'

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"
import ImageGallery from "@/components/ImageGallery"

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getAll)

  if (!projects) {
    return (
      <main className="py-24">
        <Container>
          <p className="text-sm text-neutral-500">Loading projects...</p>
        </Container>
      </main>
    )
  }

  return (
    <main className="py-24">
      <Container>

        <h1 className="text-3xl font-semibold mb-10">
          Projects
        </h1>

        <div className="space-y-20">

          {projects.map((project: any) => (
            <div key={project._id} className="space-y-6">

              {/* TITLE + DESCRIPTION */}
              <div>
                <h2 className="text-xl font-medium">
                  {project.title}
                </h2>

                <p className="text-sm text-neutral-500 mt-1">
                  {project.description}
                </p>
              </div>

              {/* IMAGE GALLERY */}
              <ImageGallery images={project.images} />

              {/* CONTENT */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {project.content}
              </div>

            </div>
          ))}

        </div>

      </Container>
    </main>
  )
}