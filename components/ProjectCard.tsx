"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project, element: HTMLElement) => void;
  isHidden?: boolean;
}

export default function ProjectCard({ project, onClick, isHidden }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [raised, setRaised] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick && cardRef.current) {
      onClick(project, cardRef.current);
      return;
    }

    const to = () => router.push(`/projects/${project.slug}`);

    const el = cardRef.current;
    const supportsVT = typeof document !== "undefined" && (document as any).startViewTransition;
    if (el && supportsVT) {
      el.style.setProperty("view-transition-name", "project-card");
      const root = document.documentElement;
      root.classList.add("is-vt");
      (document as any)
        .startViewTransition(() => {
          to();
        })
        .finished.finally(() => {
          // Clean up after transition completes
          el.style.removeProperty("view-transition-name");
          root.classList.remove("is-vt");
        });
      return;
    }
    to();
  };

  const raisedCardClasses = raised
    ? "-translate-y-2 md:-translate-y-3 shadow-lg border-gray-300"
    : "translate-y-0 shadow-sm border-gray-200";

  return (
    <a
      href={`/projects/${project.slug}`}
      onClick={handleClick}
      className={`group block ${isHidden ? "opacity-0 pointer-events-none" : ""}`}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => setRaised(false)}
    >
      <div className="relative">
        {/* Shadow that stays in place when the card lifts */}
        <div
          aria-hidden
          className={
            "pointer-events-none absolute inset-x-6 bottom-4 h-8 rounded-[24px] bg-black/15 blur-xl transition-opacity duration-500 " +
            (raised ? "opacity-80" : "opacity-0")
          }
        />

        {/* The actual card that lifts */}
        <div
          ref={cardRef}
          className={
            "relative z-[1] bg-white rounded-2xl p-8 border transform-gpu transition-all duration-500 " +
            raisedCardClasses
          }
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-gray-200">
            <Image
              src={`/images/${project.slug}.jpg`}
              alt={`${project.title}`}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 40vw, 90vw"
              priority
              unoptimized
              className="object-cover"
            />
          </div>
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

      </div>
    </a>
  );
}
