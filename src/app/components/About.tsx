
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Palette, Lightbulb, Users, Code, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "next-themes";

export function About() {
  const { theme } = useTheme();
  const skills = [
    {
      category: "Design Tools",
      items: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Framer"],
    },
    {
      category: "Motion Design",
      items: ["After Effects", "Cinema 4D", "Premiere Pro", "Blender", "Lottie"],
    },
    {
      category: "Research & Strategy",
      items: ["User Research", "Usability Testing", "User Personas", "Journey Mapping", "A/B Testing"],
    },
    {
      category: "Design Skills",
      items: ["UI Design", "UX Design", "Interaction Design", "Prototyping", "Design Systems"],
    },
    {
      category: "Animation Skills",
      items: ["2D Animation", "3D Animation", "Motion Graphics", "Character Animation", "Kinetic Typography"],
    },
    {
      category: "Development",
      items: ["HTML/CSS", "React Basics", "Responsive Design", "Accessibility", "Design Tokens"],
    },
  ];

  const process = [
    {
      icon: Users,
      title: "Research & Discovery",
      description: "Understanding user needs through research, interviews, and competitive analysis.",
    },
    {
      icon: Lightbulb,
      title: "Ideation & Strategy",
      description: "Defining problems, brainstorming solutions, and creating user flows and wireframes.",
    },
    {
      icon: Palette,
      title: "Design & Prototype",
      description: "Creating high-fidelity designs and interactive prototypes for testing.",
    },
    {
      icon: Code,
      title: "Test & Iterate",
      description: "Conducting usability tests, gathering feedback, and refining the design.",
    },
  ];

  const experience = [
    {
      role: "Senior Interactive Systems Designer",
      company: "Digital Innovation Studio",
      period: "2023 - Present",
      description: "Leading design initiatives for enterprise clients and mentoring junior designers.",
    },
    {
      role: "Interactive Systems Designer",
      company: "TechFlow Solutions",
      period: "2021 - 2023",
      description: "Designed mobile and web applications for fintech and e-commerce clients.",
    },
    {
      role: "Junior Designer",
      company: "Creative Agency Co.",
      period: "2020 - 2021",
      description: "Worked on various digital projects, focusing on user interface design and prototyping.",
    },
  ];

  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ position: 'relative' }}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-visible">
        <div className="desktop-content-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="mt-4 md:mt-8 lg:mt-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 sm:mb-8" style={{ fontFamily: '"Bangla MN", serif' }}>
                Hi, I'm <span className="text-accent" style={{ color: theme === 'dark' ? '#E879F9' : '#FFA500' }}>Emilie</span>!
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed w-full lg:ml-0">
                <span style={{ fontSize: '1.08em' }} className="max-w-2xl block">
                  I’m a designer interested in exploring ideas at the intersection of design, technology, and human experience. I enjoy experimenting with different creative concepts and building interactive and generative systems through creative coding that turn curiosity into playful, intuitive experiences—bringing ideas to fruition through hands-on exploration and iteration.
                  <br />
                  <span className="block mt-4">
                    Outside of design and coding, I spend time crocheting, painting or sketching, experimenting with mixing music, and hangning out with my cat. One key detail about me: I'm always looking for new ways to stay creative and inspired!
                  </span>
                </span>
              </p>
            </div>
            <div className="relative order-first lg:order-last flex items-start">
              <div className="flex flex-row items-start relative" style={{ height: '26rem' }}>
                <div className="relative w-[22rem] h-[28rem]">
                  <div
                    className="absolute right-0 top-0 transition-transform duration-300"
                    style={{
                      width: '22rem',
                      height: '30rem',
                      zIndex: 50,
                      transform: hoveredLeft
                        ? 'translate(-40px, -120px) scale(1.07) rotate(-4deg)'
                        : 'translate(-40px, -100px)',
                      transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredLeft(true)}
                    onMouseLeave={() => setHoveredLeft(false)}
                  >
                    <ImageWithFallback
                      src="/ME.png"
                      alt="Portrait of Emilie"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                </div>
              </div>
              {/* Absolutely position the bottom image at the right edge of the About section */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: '-40px',
                  width: '22rem',
                  height: '30rem',
                  zIndex: 20,
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
                  transform: hoveredRight
                    ? 'scale(1.08) rotate(3deg)'
                    : 'none',
                }}
                onMouseEnter={() => setHoveredRight(true)}
                onMouseLeave={() => setHoveredRight(false)}
              >
                <ImageWithFallback
                  src="/Suki.png"
                  alt="Suki the cat"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="text-center mt-2 text-sm text-muted-foreground font-medium">My cat, Suki</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Skills */}



      {/* Passion Projects */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="desktop-content-gutter">
          <div className="rounded-2xl p-8" style={{ fontFamily: 'Poppins, sans-serif', background: 'none', boxShadow: 'none' }}>
            <div className="mb-12 sm:mb-16">
              {/* Passion Projects label removed */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 sm:mb-6" style={{ fontFamily: '"Bangla MN", serif', position: 'relative' }}>
                Passion Projects
                <span className="block w-12 h-1 mt-2 rounded-full" style={{ background: 'var(--accent)', opacity: 0.7 }} />
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10">
                A collection of personal creative explorations! Each project is a hands-on journey into new materials, techniques, and playful ideas.
              </p>
              <div className="space-y-12">
                {/* ...crochet project block removed... */}
                {/* Dining Table Painting - Left aligned */}
                <Dialog.Root>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex flex-row flex-wrap gap-6 mb-2">
                        <div className="flex flex-col items-center mr-6">
                          <div className="flex flex-row gap-2 mb-1">
                            <Dialog.Trigger asChild>
                              <img src="/Fish%20table.png" alt="Fish Table Painting" className="w-64 h-96 object-cover rounded-lg cursor-pointer" />
                            </Dialog.Trigger>
                            <Dialog.Trigger asChild>
                              <img src="/Table%20Progress.png" alt="Table Progress Painting" className="w-64 h-96 object-cover rounded-lg cursor-pointer" />
                            </Dialog.Trigger>
                          </div>
                          <span className="block text-xs text-muted-foreground text-center mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Dining table I painted with the help of my roommates
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
                    <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-background rounded-lg shadow-lg w-60 h-100 flex flex-col items-center justify-center p-4">
                        {/* The actual previewed media will be rendered here by Radix Dialog's asChild prop */}
                        <Dialog.Close className="absolute top-4 right-4 text-2xl text-muted-foreground cursor-pointer">×</Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                {/* Mural Image & Video - Right aligned, moved down */}
                <Dialog.Root>
                  <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex flex-row flex-wrap gap-6 mb-2 justify-end">
                        <div className="flex flex-col items-center">
                          <div className="flex flex-row gap-2 mb-1">
                            <Dialog.Trigger asChild>
                              <img src="/bunny%20chow.png" alt="Bunny Chow Painting" className="w-[30rem] h-80 object-cover rounded-lg cursor-pointer" />
                            </Dialog.Trigger>
                            <Dialog.Trigger asChild>
                              <video className="w-56 h-80 object-cover rounded-lg cursor-pointer" controls>
                                <source src="/bunnychow.mov" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </Dialog.Trigger>
                          </div>
                          <span className="block text-xs text-muted-foreground text-center mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Painted a large-scale world map mural for a local restaurant in San Diego
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
                    <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-background rounded-lg shadow-lg w-60 h-100 flex flex-col items-center justify-center p-4">
                        {/* The actual previewed media will be rendered here by Radix Dialog's asChild prop */}
                        <Dialog.Close className="absolute top-4 right-4 text-2xl text-muted-foreground cursor-pointer">×</Dialog.Close>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                {/* ...sketchbook project block removed... */}
                {/* Music Mashup Demo - Right aligned */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-1">
                    <div className="w-[28rem] h-44 flex flex-col items-start justify-center rounded-2xl mb-4 shadow-lg border-2"
                      style={{
                        background: theme === 'dark'
                          ? 'rgba(36, 18, 54, 0.65)'
                          : 'rgba(255, 255, 255, 0.65)',
                        borderColor: theme === 'dark' ? '#E879F9' : '#FFA500',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <audio
                          controls
                          controlsList="nodownload"
                          className="w-[25rem] mb-1"
                          style={{ filter: theme === 'dark' ? 'invert(0.85)' : 'none', borderRadius: '0.75rem' }}
                        >
                          <source src="/Dontcha%20x%20Your%20Teeth%20in%20My%20Neck.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <span className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'Poppins, sans-serif', width: '100%', display: 'block', textAlign: 'center' }}>
                          Click play to listen
                        </span>
                      </div>
                    </div>
                    <div className="w-[28rem] flex justify-center">
                      <p className="text-sm text-muted-foreground text-center max-w-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Experimenting with mixing music:  Dontcha by The Internet x Your Teeth in My Neck by Kali Uchis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* Playground Section removed as requested */}
    </div>
  );
}