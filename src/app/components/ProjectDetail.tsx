import { useParams, Link } from "react-router";
import { ArrowLeft, X } from "lucide-react";

const projectData: Record<string, { title: string; category: string; description: string; year: string; tags: string[]; embedUrls?: string[]; embedUrl?: string; externalUrl?: string }> = {
  "figma-animations": {
    title: "Figma Animations",
    category: "Motion Design",
    description: "Interactive prototypes showcasing advanced animation techniques.",
    year: "2024",
    tags: ["Motion Design", "Prototyping", "Figma"],
    embedUrls: [
      "https://embed.figma.com/proto/CPY12RB4HZNtvoDMgsalFY/EmilieJoseph_Figma?page-id=476%3A2&node-id=541-1198&p=f&viewport=373%2C-131%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=532%3A8&embed-host=share",
      "https://embed.figma.com/proto/CPY12RB4HZNtvoDMgsalFY/EmilieJoseph_Figma?page-id=336%3A19&node-id=346-63&viewport=108%2C397%2C0.14&scaling=scale-down&content-scaling=fixed&embed-host=share",
    ],
  },
  "planetology": { 
    title: "Planetology — Interactive Planet Systems",
    category: "Interactive Systems",
    description: "A 3D interactive solar system using hand tracking and particle systems to explore how learning can become immersive and experiential.",
    year: "2024",
    tags: ["Interactive Systems", "Hand Tracking", "Three.js", "Generative Visuals", "Creative Coding"],
    externalUrl: "https://planetology.figma.site/"
  },
  "static": {
    title: "Static — A Generative Brand System",
    category: "Brand Design & Motion",
    description: "Modern brand identity system showcasing bold typography and interactive visual elements.",
    year: "2024",
    tags: ["Brand Identity", "Typography", "Interactive"],
    externalUrl: "https://static-brand.vercel.app/"
  },
  "figma-experiments": {
    title: "Interaction Studies — Figma Demos",
    category: "Prototypes",
    description: "A collection of interactive prototypes exploring microinteractions, motion, and design systems—using rapid experimentation to test how small interactions shape user experience.",
    year: "2022-2024",
    tags: ["Prototyping", "User Interface", "Motion", "Design Systems", "Interaction Design"],
    embedUrls: [
      "https://embed.figma.com/proto/CPY12RB4HZNtvoDMgsalFY/EmilieJoseph_Figma?page-id=336%3A19&node-id=338-21&viewport=108%2C397%2C0.14&t=K7p5ldObPAJzxyLp-1&scaling=scale-down&content-scaling=fixed&embed-host=share",
      "https://embed.figma.com/proto/Y5rh4n0DvbJFNJUkRXL8ic/Queuenect?node-id=5-46&p=f&m=dev&scaling=scale-down&content-scaling=fixed&page-id=5%3A45&starting-point-node-id=5%3A46&embed-host=share"
    ]
  },
  "playground": {
    title: "Playground",
    category: "Creative Coding",
    description: "A collection of experimental creative coding sketches exploring generative visuals, interaction, and unconventional interfaces.",
    year: "2026",
    tags: ["Creative Coding", "Experimental UI", "Interaction", "Visual Exploration", "Concept Lab"],
  },
  "lesli-website": { 
    title: "Lesli’s Pet Services — Brand & Web Experience",
    category: "Web Design",
    description: "A full brand identity and responsive website combining visual design, front-end interaction, and motion—exploring how branding and subtle interactivity can create a cohesive digital experience.",
    year: "2023",
    tags: ["Brand Identity", "Web Design", "Interaction", "Motion", "Front-end Development"],
    externalUrl: "https://leslispetservices.figma.site"
  },
  "tank": {
    title: "Tank — A Generative Aquarium",
    category: "Creative Technology",
    description: "A generative, bioluminescent aquarium where fish respond to user interaction—exploring behavior, motion, and emergent systems.",
    year: "2024",
    tags: ["Generative Systems", "Behavioral Simulation", "Creative Coding", "HTML Canvas", "Interaction"],
    externalUrl: "https://tank-gilt.vercel.app/"
  },
  "mural": {
    title: "MURAL — A Real-Time Collaborative Canvas",
    category: "Real-Time Systems",
    description: "A real-time collaborative canvas where multiple users draw simultaneously—turning individual devices into a shared, interactive system.",
    year: "2024",
    tags: ["Real-time Systems", "Collaboration", "WebSockets", "Interactive Experience", "Creative Coding"],
    externalUrl: "https://mural-t9uc.onrender.com/"
  },
  "3d-museum-project": { 
    title: "Em’s Art Museum — A 3D Gallery Experience",
    category: "Spatial Interfaces",
    description: "A navigable 3D gallery exploring spatial interaction and new ways of experiencing art.",
    year: "2024",
    tags: ["Spatial Interface", "3D Interaction", "Three.js", "WebGL", "Immersive Experience"],
  },
  "tasksprout": {
    title: "TaskSprout — A Living Productivity System",
    category: "Behavioral Systems",
    description: "A productivity tool that visualizes tasks as a growing system—exploring how interaction design can influence behavior.",
    year: "2024",
    tags: ["Interaction Design", "Behavioral Design", "UX Systems", "Prototyping"],
  },
};

export function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectId ? projectData[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project not found</h1>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-900 z-50 flex flex-col overflow-hidden min-h-0">
      {/* Close Button - Top Right */}
      <Link
        to="/"
        className="absolute top-4 right-4 z-10 p-2 hover:bg-accent transition-colors rounded-md"
      >
        <X className="w-5 h-5" />
      </Link>

      {/* Scrollable Content */}
      <div
        className="overflow-y-auto overscroll-y-contain flex-1 min-h-0 pt-12 touch-pan-y"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Project Details */}
        <div className="p-6 sm:p-8">
          {/* Embedded Project Content - Moved to top */}
          <div className="mb-6">
            {project.externalUrl ? (
              <div className="space-y-6">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Live Project
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <div className="w-full h-[80vh] bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={project.externalUrl}
                    className="w-full h-full"
                    title={`${project.title} Live Project`}
                  />
                </div>
              </div>
            ) : project.embedUrls ? (
              <div className="space-y-6">
                {project.embedUrls.map((url, index) => (
                  <div key={index} className="w-full aspect-[16/10] bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src={url}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${project.title} Figma Prototype ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : project.embedUrl ? (
              <div className="w-full aspect-[16/10] bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={project.embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${project.title} Figma Prototype`}
                />
              </div>
            ) : (
              <div className="w-full aspect-[16/10] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Content coming soon...</p>
              </div>
            )}
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl mb-8">{project.title}</h1>
            <p className="text-xl font-bold">{project.category}</p>
            <p className="text-lg text-muted-foreground">{project.description}</p>
            <p className="text-sm text-muted-foreground">Year: {project.year}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 border text-sm rounded-full" style={{ borderColor: '#FFA500' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Footer-like Section */}
        <section className="pt-2 pb-8 sm:pt-4 sm:pb-12">
          <div className="w-full px-3 sm:px-4 lg:px-[15px]">
            <div className="lg:px-[79px]">
              <div
                className="border-t-[1.5px] mb-0"
                style={{ borderColor: '#FFA50055' }}
              ></div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-6">
                  <span
                    className="text-[34px] sm:text-[46px] font-medium leading-none relative"
                    style={{ fontFamily: '"Bangla MN", serif', left: '-26px', top: '8px', color: '#000' }}
                    id="footer-emilie-joseph"
                  >
                    Emilie Joseph
                  </span>
                </div>
                <div style={{ position: 'relative', left: '198px', top: '-28px' }}>
                  <div className="flex flex-col items-start mb-1">
                    <span
                      className="text-[15px] sm:text-[18px] font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif', color: '#000' }}
                    >
                      Let's Connect!
                    </span>
                    <a
                      href="mailto:emilieneha@gmail.com"
                      className="text-[13px] sm:text-[15px] mt-1"
                      style={{ fontFamily: 'Poppins, sans-serif', textDecoration: 'none', color: '#000', position: 'relative', top: '-2px' }}
                    >
                      emilieneha@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-row gap-3 mt-2" style={{ position: 'relative', top: '8px' }}>
                    <a
                      href="https://www.linkedin.com/in/emilie-joseph-90n982229"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors flex items-center"
                      style={{ color: '#000', marginRight: '0.5rem' }}
                    >
                      <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/3miliejoseph"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors flex items-center"
                      style={{ color: '#000', marginRight: '0.5rem' }}
                    >
                      <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mt-4 mb-6 text-muted-foreground text-sm flex justify-center w-full">
                  <span className="text-center">Built with React, Three.js, and interactive systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}