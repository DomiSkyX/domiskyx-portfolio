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

        <div className="grid gap-10">
          {projects.map((project: any) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-3xl border border-border bg-card transition hover:border-neutral-400/40 hover:shadow-lg">

                {/* Cover Image */}
                {project.images?.[0] && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                    Project
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed max-w-2xl line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-6 text-sm font-medium">
                    View Project →
                  </div>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </Container>
    </main>
  )
}