"use client";

import { useState, useRef, useEffect } from "react";
import { Project, projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import ProjectGallery from "./ProjectGallery";
import { ExternalLink } from "lucide-react";

type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export default function ProjectsGrid() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [rect, setRect] = useState<Rect | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Handle card click
    const handleCardClick = (project: Project, element: HTMLElement) => {
        if (isAnimating) return;

        // 1. Capture Position
        const r = element.getBoundingClientRect();
        setRect({
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
        });
        setActiveProject(project);
        setIsAnimating(true);

        // 2. Expand (next frame)
        // We use a small timeout to ensure the overlay renders at the initial position first
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsExpanded(true);
            });
        });
    };

    // Handle close
    const handleClose = () => {
        if (isAnimating) return;
        setIsExpanded(false);
        setIsAnimating(true);

        // Wait for transition to finish before removing the overlay
        setTimeout(() => {
            setActiveProject(null);
            setRect(null);
            setIsAnimating(false);
        }, 500); // Match the duration-500 in CSS
    };

    // Reset animation state when expansion finishes
    useEffect(() => {
        if (isExpanded) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isExpanded]);

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        onClick={handleCardClick}
                        isHidden={activeProject?.slug === project.slug}
                    />
                ))}
            </div>

            {/* Overlay */}
            {activeProject && rect && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{
                        pointerEvents: isExpanded ? "auto" : "none",
                    }}
                >
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-white/90 backdrop-blur-sm transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-0"
                            }`}
                        onClick={handleClose}
                    />

                    {/* Animated Card */}
                    <div
                        className="absolute bg-white overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                            top: isExpanded ? 0 : rect.top,
                            left: isExpanded ? 0 : rect.left,
                            width: isExpanded ? "100%" : rect.width,
                            height: isExpanded ? "100%" : rect.height,
                            borderRadius: isExpanded ? 0 : "1rem", // 16px matches rounded-2xl
                        }}
                    >
                        {/* Content Container */}
                        <div className={`relative w-full h-full ${isExpanded ? "overflow-y-auto" : "overflow-hidden"}`}>
                            <div className={`max-w-4xl mx-auto ${isExpanded ? "p-8 md:p-12 pt-20" : "p-8"}`}>

                                {/* Close Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClose();
                                    }}
                                    className={`absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Image */}
                                <div
                                    className={`relative w-full mb-8 transition-all duration-500 ${isExpanded ? "aspect-[21/9] rounded-xl" : "aspect-[4/3] rounded-xl"
                                        } overflow-hidden border border-gray-200`}
                                >
                                    <Image
                                        src={`/images/${activeProject.slug}.jpg`}
                                        alt={activeProject.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className={`flex items-center gap-4 font-bold text-gray-900 mb-2 transition-all duration-500 ${isExpanded ? "text-4xl" : "text-xl"
                                            }`}>
                                            {activeProject.title}
                                            <a href={activeProject.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:opacity-70 transition-opacity">
                                                <ExternalLink size={24} />
                                            </a>
                                        </h2>
                                        <p className="text-xl text-gray-600">{activeProject.role}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Detailed Description - Fades in */}
                                    <div className={`space-y-4 text-lg text-gray-600 leading-relaxed transition-opacity duration-500 delay-100 ${isExpanded ? "opacity-100" : "opacity-0"
                                        }`}>
                                        {activeProject.description.map((paragraph, i) => (
                                            <p key={i}>
                                                {paragraph.split(/(\*\*.*?\*\*)/).map((part, j) => {
                                                    if (part.startsWith("**") && part.endsWith("**")) {
                                                        return <strong key={j} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="space-y-12">
                                        <ProjectGallery images={activeProject.gallery} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
