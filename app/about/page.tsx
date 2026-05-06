'use client'

import Container from "@/components/Container"
import Reveal from "@/components/Reveal"

export default function About() {
  return (
    <main className="min-h-[70vh] py-24">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm text-neutral-400 mb-4">
              About
            </p>

            <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-6">
              I design & build digital products that feel simple, fast, and intuitive.
            </h1>

            <p className="text-neutral-500 mb-6">
              I focus on creating clean user interfaces and smooth user experiences.
              My work blends design and development — making sure products not only look good,
              but also perform well and scale.
            </p>

            <p className="text-neutral-500 mb-10">
              I enjoy working on modern web apps, design systems, and products where
              attention to detail makes a difference.
            </p>
          </Reveal>

          {/* Divider */}
          <div className="border-t border-border my-12" />

          {/* Skills / Focus */}
          <Reveal>
            <h2 className="text-sm text-neutral-400 mb-4">
              Focus
            </h2>

            <div className="grid grid-cols-2 gap-y-4 text-neutral-600 text-sm">
              <p>UI / UX Design</p>
              <p>Frontend Development</p>
              <p>Design Systems</p>
              <p>Performance Optimization</p>
              <p>React / Next.js</p>
              <p>Animations & Interactions</p>
            </div>
          </Reveal>

          {/* Divider */}
          <div className="border-t border-border my-12" />

          {/* Closing */}
          <Reveal>
            <p className="text-neutral-500">
              Currently building projects and continuously improving my craft.
              Always interested in working on meaningful products.
            </p>
          </Reveal>
        </div>
      </Container>
    </main>
  )
}