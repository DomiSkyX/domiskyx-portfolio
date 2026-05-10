'use client'

import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"
import ImageGallery from "@/components/ImageGallery"

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getAll)

  if (projects === undefined) {
    return (
      <main className="min-h-screen py-24">
        <Container>
          <p className="text-sm text-neutral-500">
            Loading projects...
          </p>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-24 bg-background text-foreground">
      <Container>

        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Portfolio
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-4 text-neutral-500 max-w-2xl text-sm sm:text-base">
            A collection of selected work, experiments, client projects,
            and creative builds.
          </p>
        </div>

        <div className="space-y-24">

          {projects.length === 0 && (
            <div className="border border-border rounded-3xl p-10 text-center">
              <p className="text-neutral-500">
                No projects yet.
              </p>
            </div>
          )}

          {projects.map((project: any) => (
            <article
              key={project._id}
              className="space-y-8"
            >

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                    Project
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-neutral-500 max-w-2xl text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="w-fit rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted transition"
                >
                  View Project
                </Link>

              </div>

              <ImageGallery images={project.images} />

              <div className="max-w-3xl">
                <p className="text-sm sm:text-base leading-8 text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                  {project.content}
                </p>
              </div>

            </article>
          ))}

        </div>

      </Container>
    </main>
  )
}