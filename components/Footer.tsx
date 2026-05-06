import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-neutral-500">
        
        <p>© {new Date().getFullYear()} DomiSkyX</p>

        <div className="flex gap-5">
          <a
            href="https://github.com/domiskyx"
            target="_blank"
            className="hover:text-black transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}