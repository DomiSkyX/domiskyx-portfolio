'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Container from "@/components/Container"
import Reveal from "@/components/Reveal"

export default function Home() {
  const projects = useQuery(api.projects.getAll)

  return (
    <main className="min-h-[70vh] pt-24 pb-12">
      <Container>
        <Reveal>
          <p className="text-sm text-neutral-400 mb-4">
            Portfolio — 2026
          </p>

          <h1 className="text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
            I design & build modern web experiences.
          </h1>

          <p className="text-neutral-500 max-w-xl mb-10">
            Clean interfaces, fast performance, and thoughtful UX.
          </p>

          <a
            href="/projects"
            className="inline-block px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            View Work
          </a>

          {projects && (
            <div className="mt-10 text-sm text-neutral-500">
              There are {projects.length} projects in the portfolio.
            </div>
          )}
        </Reveal>
      </Container>
    </main>
  )
}