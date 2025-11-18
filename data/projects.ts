export interface Project {
  slug: string;
  title: string;
  role: string;
  techStack: string[];
  description: string[];
}

export const projects: Project[] = [
  {
    slug: "geni",
    title: "Geni",
    role: "Full Stack Developer",
    techStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    description: [
      "Geni is a modern genealogy platform that helps families connect and preserve their heritage. The platform combines intuitive family tree visualization with powerful collaboration tools.",
      "Built with a focus on user experience, Geni allows users to easily build and explore their family trees, share photos and stories, and collaborate with relatives around the world.",
      "The technical architecture leverages React for a responsive frontend, Node.js for a scalable backend API, and PostgreSQL for reliable data storage. The platform handles complex family relationships and maintains data integrity across distributed collaborative editing."
    ]
  },
  {
    slug: "research",
    title: "Research",
    role: "Research Engineer",
    techStack: ["Python", "TensorFlow", "PyTorch", "Docker"],
    description: [
      "This research project focuses on advancing machine learning techniques for natural language processing. The work explores novel architectures and training methodologies to improve model performance and efficiency.",
      "The project involves implementing state-of-the-art algorithms, conducting extensive experiments, and analyzing results to contribute to the broader ML research community.",
      "Technical work includes developing custom training pipelines with PyTorch and TensorFlow, containerizing experiments with Docker for reproducibility, and optimizing models for both performance and computational efficiency."
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
