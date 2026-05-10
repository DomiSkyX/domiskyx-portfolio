import type { Metadata } from "next"
import './globals.css'
import { ClerkProvider } from "@clerk/nextjs"
import ConvexClientProvider from "@/components/ConvexClientProvider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ThemeProvider from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Modern portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background text-foreground antialiased">
          <ConvexClientProvider>
            <ThemeProvider>
              <Header />

              <main className="pt-20">{children}</main>

              <Footer />
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
