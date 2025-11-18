import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Philip</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            I'm a software engineer passionate about building elegant solutions to complex problems. 
            I specialize in full-stack development and have a keen interest in machine learning and data-driven applications.
          </p>
          
          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:philip@example.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Email
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{project.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
