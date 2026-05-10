import Container from "@/components/Container"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 sm:py-24">
      <Container>

        <div className="max-w-4xl mx-auto space-y-8">

          <div className="space-y-4">

            <p className="text-sm text-muted-foreground">
              About me
            </p>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Building modern digital experiences.
            </h1>

          </div>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            I design and develop modern websites and digital products
            focused on clean aesthetics, smooth interactions and strong
            user experiences.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            My focus is creating premium feeling interfaces that work
            beautifully across desktop, tablet and mobile devices.
          </p>

        </div>

      </Container>
    </main>
  )
}