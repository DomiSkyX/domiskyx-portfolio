import { notFound } from "next/navigation"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import Container from "@/components/Container"
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

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <Container>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          <div className="space-y-6">

            <div className="space-y-4">

              <p className="text-sm text-muted-foreground">
                Case Study
              </p>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>

              <p className="text-base text-muted-foreground leading-relaxed">
                {project.description}
              </p>

            </div>

            <div className="space-y-6 text-sm sm:text-base leading-relaxed">
              {project.content}
            </div>

          </div>

          <ImageGallery images={project.images} />

        </div>

      </Container>
    </main>
  )
}