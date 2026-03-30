import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export function Projects() {
  const [filter, setFilter] = useState("All");
  const { theme } = useTheme();

  const categories = ["All", "Interactive Systems", "Brand Design & Motion", "Product Design", "Web Design", "Visual Design"];

  const projects = [
    {
      id: 2,
      slug: "planetology",
      title: "Planetology — Interactive Planet Systems",
      category: "Interactive Systems",
      description: "Interactive educational platform bringing planetary science to life through immersive design",
      year: "2024",
      image: "https://drive.google.com/uc?export=download&id=1fvUoD6E0lrXAjyV2e2VOnUgKZT7T6omp",
      mediaAspectRatio: "4 / 3",
      tags: ["Interactive Systems", "Hand Tracking", "Three.js", "Generative Visuals", "Creative Coding"],
    },
    {
      id: 10,
      slug: "3d-museum-project",
      title: "3D Museum — An Exploratory Virtual Space",
      category: "Spatial Interfaces",
      description: "Immersive 3D experience reimagining how we interact with art in digital spaces",
      year: "2024",
      image: "https://images.unsplash.com/photo-1642756060888-aa5f4bc4d86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGRlc2lnbiUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyODY4Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Spatial Interface", "3D Interaction", "Three.js", "WebGL", "Immersive Experience"],
    },
    {
      id: 1,
      slug: "be-all-you-work",
      title: "Be All You Work",
      category: "Product Design",
      description: "Productivity platform designed to empower teams and enhance workplace collaboration",
      year: "2023",
      image: "https://images.unsplash.com/photo-1725267196915-7700df784ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3Mjc5MjAyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["SaaS", "Collaboration", "Dashboard"],
    },
    {
      id: 9,
      slug: "lesli-website",
      title: "Lesli’s Pet Services — Brand & Web Experience",
      category: "Web Design",
      description: "Modern e-commerce experience with focus on accessibility and conversion optimization",
      year: "2023",
      image: "https://images.unsplash.com/photo-1760071744047-5542cbfda184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjBwcm9qZWN0JTIwc2hvd2Nhc2V8ZW58MXx8fHwxNzcyODY4Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Brand Identity", "Web Design", "Interaction", "Motion", "Front-end Development"],
    },
    {
      id: 3,
      slug: "figma-animations",
      title: "Figma Animations",
      category: "Brand Design & Motion",
      description: "Collection of animated Figma prototypes exploring product storytelling through motion design",
      year: "2022-2023",
      image: "https://images.unsplash.com/photo-1759459981078-35c1befc695b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0JTIwZGVzaWdufGVufDF8fHx8MTc3MjgxNDA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Figma Prototype", "Animation", "Brand Design"],
    },
    {
      id: 5,
      slug: "intobridge-interface",
      title: "IntoBridge Interface",
      category: "Interactive Systems",
      description: "Redesigned gift-sending flow addressing usability gaps and reducing friction through iterative testing",
      year: "2022",
      image: "https://images.unsplash.com/photo-1594948506928-2d4cad88d0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzcyNzY3NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Gift Feature", "User Flows", "Usability Testing"],
    },
    {
      id: 6,
      slug: "figma-experiments",
      title: "Interaction Studies — Figma Demos",
      category: "Product Design",
      description: "A sandbox of interactive Figma prototypes, including the Queuenect kiosk flow and rapid concept explorations",
      year: "2022-2024",
      image: "https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwbGF5b3V0fGVufDF8fHx8MTc3Mjc4NTAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Prototyping", "User Interface", "Motion", "Design Systems", "Interaction Design"],
    },
    {
      id: 14,
      slug: "playground",
      title: "Playground",
      category: "Creative Coding",
      description: "A collection of experimental creative coding sketches exploring generative visuals, interaction, and unconventional interfaces.",
      year: "2026",
      image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBnZW9tZXRyaWN8ZW58MXx8fHwxNzc0MDM4MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Creative Coding", "Experimental UI", "Interaction", "Visual Exploration", "Concept Lab"],
    },
    {
      id: 7,
      slug: "ucsd-star-wars",
      title: "Star Wars at UCSD",
      category: "Website Design",
      description: "Student organization website improving navigation and member engagement through clear messaging",
      year: "2021",
      image: "https://images.unsplash.com/photo-1764593284741-e99a939c356e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHByb2plY3QlMjBkaXNwbGF5fGVufDF8fHx8MTc3Mjg2ODc5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Web Design", "Student Org", "Engagement"],
    },
    {
      id: 8,
      slug: "spotify-redesign",
      title: "Spotify Redesign",
      category: "Interactive Systems",
      description: "Concept redesign improving discoverability, visual hierarchy, and accessibility in core app flows",
      year: "2021",
      image: "https://images.unsplash.com/photo-1550376026-d14d25cf9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbiUyMHByb3RvdHlwZXxlbnwxfHx8fDE3NzI4MDI5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      mediaAspectRatio: "4 / 3",
      tags: ["Accessibility", "Visual Design", "App Redesign"],
    },
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24 md:py-32 lg:py-24">
      <div className="desktop-content-gutter">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 font-medium">Work</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 lg:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-full transition-all border"
              style={{
                backgroundColor: filter === category 
                  ? (theme === "light" ? "#FFA500" : "#E879F9")
                  : "transparent",
                borderColor: filter === category 
                  ? (theme === "light" ? "#FFA500" : "#E879F9")
                  : (theme === "light" ? "rgba(255, 165, 0, 0.3)" : "rgba(139, 92, 246, 0.3)"),
                color: filter === category ? "#fff" : ""
              }}
              onMouseEnter={(e) => {
                if (filter !== category) {
                  e.currentTarget.style.borderColor = theme === "light" 
                    ? "rgba(255, 165, 0, 0.6)" 
                    : "rgba(139, 92, 246, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== category) {
                  e.currentTarget.style.borderColor = theme === "light" 
                    ? "rgba(255, 165, 0, 0.3)" 
                    : "rgba(139, 92, 246, 0.3)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={`/project/${project.slug}`}
                className="group cursor-pointer block"
              >
                <div
                  className="relative overflow-hidden bg-muted mb-6 rounded-lg sm:rounded-sm"
                  style={{ aspectRatio: project.mediaAspectRatio ?? "4 / 3" }}
                >
                  {project.slug === "planetology" ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  )}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs">
                    {project.year}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </div>
                  
                  <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border text-xs rounded-full"
                        style={{ borderColor: '#FFA500' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}