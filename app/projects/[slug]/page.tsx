import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-block mb-12 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to home
        </Link>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-[300px_1fr] gap-12 lg:gap-16">
          {/* Left Column - Project Info */}
          <aside className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-gray-600">{project.role}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Column - Project Description */}
          <article className="space-y-6">
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
