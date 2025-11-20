import Image from "next/image";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Philip Montgomery</h1>
          {/* Intro: image left, description right */}
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div className="order-1">
              <Image
                src="/images/profile.jpg"
                alt="Philip speaking on stage"
                width={800}
                height={1000}
                priority
                className="w-full h-auto rounded-xl border border-gray-200"
              />
            </div>
            <div className="order-2 space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                Founder & Researcher building AI tools that make elementary math more understandable and engaging.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I've researched, designed, built, launched, and sold products used by thousands of students.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Computer Science + Economics BS @ University of Illinois at Urbana-Champaign
              </p>
              {/* Links */}
              <div className="mt-6 flex gap-6 text-sm">
                <a
                  href="https://github.com/dundric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/philipm614/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:philipmon614@gmail.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Email
                </a>
                <a
                  href="/images/Philip Montgomery Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <ProjectsGrid />
        </section>
      </div>
    </main>
  );
}
