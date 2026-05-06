'use client'

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"
import Reveal from "@/components/Reveal"

export default function Projects() {
  const projects = useQuery(api.projects.getAll)

  if (!projects) return <div className="p-10">Loading...</div>

  return (
    <main className="min-h-[70vh] py-24">
      <Container>
        <Reveal>
          <h1 className="text-3xl font-semibold mb-12">
            Projects
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((p) => (
              <a
                key={p._id}
                href={`/projects/${p.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="rounded-2xl overflow-hidden bg-muted border border-border">
                  <img
                    src={p.images?.[0]}
                    className="w-full h-72 object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text */}
                <div className="mt-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    {p.title}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {p.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </main>
  )
}