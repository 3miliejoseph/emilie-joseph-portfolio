
import { useState } from "react";
import { motion } from "motion/react";
import { Palette, Lightbulb, Users, Code, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { generateSpiralPath } from "./spiralUtils";
import { ParticlesBackground } from "./ParticlesBackground";

export function About() {
    // ...existing code...
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
    <motion.div
      className="min-h-screen bg-background"
      style={{ position: 'relative' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Particle Background */}
      <ParticlesBackground />
      {/* Animated SVG Spirals with motion, above particles */}
      <motion.svg
        className="absolute -top-48 -left-8 w-[420px] h-[420px] z-0 opacity-40"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="spiral1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor={theme === 'light' ? '#FFA500' : '#E879F9'} />
            <stop offset="70%" stopColor={theme === 'light' ? '#FFB84D' : '#F472B6'} />
            <stop offset="100%" stopColor={theme === 'light' ? '#FFD700' : '#F9A8D4'} />
          </radialGradient>
        </defs>
        <path
          d={generateSpiralPath(260, 260, 7, 0, 7)}
          fill="none"
          stroke="url(#spiral1)"
          strokeWidth="8"
        />
      </motion.svg>
      <motion.svg
        className="absolute top-1/2 right-8 w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] z-10 opacity-30"
        style={{ transform: 'translateY(-50%)', overflow: 'visible' }}
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="spiral2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor={theme === 'light' ? '#FF8C00' : '#D946EF'} />
            <stop offset="85%" stopColor={theme === 'light' ? '#FFA500' : '#E879F9'} />
            <stop offset="100%" stopColor={theme === 'light' ? '#FFD700' : '#F9A8D4'} />
          </radialGradient>
        </defs>
        <path
          d={generateSpiralPath(210, 210, 5, 0, 5)}
          fill="none"
          stroke="url(#spiral2)"
          strokeWidth="7"
        />
      </motion.svg>
      <div className="desktop-content-gutter relative z-10">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-visible pt-4 sm:pt-8 md:pt-10 lg:pt-0 min-h-[auto] lg:min-h-screen flex items-start lg:items-center pb-10 sm:pb-14 lg:pb-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-12 order-2 lg:order-1">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left"
                style={{
                  fontFamily: '"Bangla MN", sans-serif',
                  color: theme === 'light' ? '#000' : '#fff',
                  transform: 'none',
                }}
                // No animation or transition
              >
                Hi, I'm{' '}
                <span
                  className="drop-shadow-lg"
                  style={{
                    color: theme === 'light' ? '#FFA500' : '#E879F9',
                  }}
                >
                  Emilie
                </span>
                !
              </motion.h1>
              <motion.p
                className="text-[18px] sm:text-[19px] md:text-[21px] text-muted-foreground leading-relaxed w-full text-center lg:text-left lg:ml-0 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              >
                I’m a designer interested in exploring ideas at the intersection of design, technology, and human experience. I enjoy experimenting with different creative concepts and building interactive and generative systems through creative coding that turn curiosity into playful, intuitive experiences—bringing ideas to fruition through hands-on exploration and iteration.
                <br />
                <span className="block mt-4">
                  Outside of design and coding, I spend time crocheting, painting or sketching, experimenting with mixing music, and hanging out with my cat. One key detail about me: I'm always looking for new ways to stay creative and inspired!
                </span>
              </motion.p>
              {/* ...existing code... */}
            </div>
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-start">
              {/* Desktop: side-by-side portraits */}
              <div className="hidden lg:flex flex-row items-start gap-6">
                <div
                  className="overflow-hidden rounded-2xl shadow-lg"
                  style={{
                    width: '22rem',
                    height: '30rem',
                    transition: 'transform 0.4s cubic-bezier(.4,2,.6,1), z-index 0s',
                    transform: hoveredLeft ? 'scale(1.06) rotate(-4deg) translateY(-20px)' : 'rotate(-2deg) translateY(-20px)',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: hoveredLeft ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredLeft(true)}
                  onMouseLeave={() => setHoveredLeft(false)}
                >
                  <ImageWithFallback
                    src="/ME.png"
                    alt="Portrait of Emilie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="flex flex-col items-center"
                  style={{ position: 'relative', zIndex: hoveredRight ? 10 : 1, marginTop: '80px' }}
                >
                  <div
                    className="overflow-hidden rounded-2xl shadow-lg"
                    style={{
                      width: '22rem',
                      height: '30rem',
                      transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
                      transform: hoveredRight ? 'scale(1.06) rotate(4deg)' : 'rotate(2deg)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredRight(true)}
                    onMouseLeave={() => setHoveredRight(false)}
                  >
                    <ImageWithFallback
                      src="/Suki.png"
                      alt="Suki the cat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left mt-2 text-sm text-muted-foreground font-medium">My cat, Suki</div>
                </div>
              </div>
              <div className="flex w-full max-w-full sm:max-w-[22rem] md:max-w-[26rem] flex-row gap-3 sm:flex-col sm:gap-4 lg:hidden">
                <div className="flex-1 overflow-hidden rounded-2xl shadow-lg aspect-[3/4] sm:w-full sm:aspect-[4/5] border border-border/40 bg-muted/20 -rotate-2 sm:rotate-0">
                  <ImageWithFallback
                    src="/ME.png"
                    alt="Portrait of Emilie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 sm:w-full">
                  <div className="overflow-hidden rounded-2xl shadow-lg aspect-[3/4] sm:aspect-[4/5] border border-border/40 bg-muted/20 rotate-2 sm:rotate-0">
                    <ImageWithFallback
                      src="/Suki.png"
                      alt="Suki the cat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground font-medium mt-2 sm:hidden">My cat, Suki</div>
                </div>
                <div className="hidden text-center text-sm text-muted-foreground font-medium sm:block">My cat, Suki</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
        </div>



      {/* Hobbies/Interests as Emoji Row */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-8 mb-12 text-3xl sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        aria-label="Hobbies and Interests"
      >
        {/* Emojis removed */}
        {/* Emojis removed */}
      </motion.div>
      {/* Skills */}



      {/* Passion Projects */}
      <div className="desktop-content-gutter relative z-10 py-16 sm:py-24 md:py-32">
        <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-12 relative z-10">
              <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 lg:text-left"
              style={{
                fontFamily: '"Bangla MN", sans-serif',
                position: 'relative',
                color: theme === 'light' ? '#FFA500' : '#E879F9',
              }}
            >
              Passion Projects
              <span className="block h-1 mt-2 rounded-full" style={{ width: '515px', background: theme === 'light' ? '#FFA500' : '#E879F9', opacity: 0.7 }} />
            </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 text-center lg:text-left">
                A collection of personal creative explorations! Each project is a hands-on journey into new materials, techniques, and playful ideas.
              </p>
              <div className="space-y-12">
                {/* ...crochet project block removed... */}
                {/* Dining Table Painting - Left aligned */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  <div className="flex-1">
                    <div className="flex flex-row flex-wrap gap-6 mb-2 justify-center md:justify-start">
                      <div className="flex flex-col items-center md:mr-6 w-full md:w-auto">
                        <div className="flex flex-col sm:flex-row gap-2 mb-1 w-full items-center">
                          <img src="/Fish%20table.png" alt="Fish Table Painting" className="w-full max-w-64 h-auto sm:h-96 aspect-[2/3] object-cover rounded-lg" />
                          <img src="/Table%20Progress.png" alt="Table Progress Painting" className="w-full max-w-64 h-auto sm:h-96 aspect-[2/3] object-cover rounded-lg" />
                        </div>
                        <span className="block text-sm text-muted-foreground text-center mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Dining table I painted with the help of my roommates
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mural Image & Video - Right aligned, moved down */}
                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6 md:gap-8">
                  <div className="flex-1">
                    <div className="flex flex-row flex-wrap gap-6 mb-2 justify-end">
                      <div className="flex flex-col items-center w-full md:w-auto">
                        <div className="flex flex-col sm:flex-row gap-2 mb-1 w-full items-center md:items-start md:justify-end">
                          <img src="/bunny%20chow.png" alt="Bunny Chow Painting" className="w-full max-w-[30rem] h-auto sm:h-80 aspect-[3/2] object-cover rounded-lg" />
                          <video className="w-full max-w-56 h-auto sm:h-80 aspect-[7/10] object-cover rounded-lg" controls>
                            <source src="/bunnychow.mov" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <span className="block text-sm text-muted-foreground text-center mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Painted a large-scale world map mural for a local restaurant in San Diego
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ...sketchbook project block removed... */}
                {/* Music Mashup Demo - Right aligned */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                  <div className="flex-1">
                    <div className="w-full max-w-[28rem] min-h-44 flex flex-col items-start justify-center rounded-2xl mb-4 shadow-lg border-2 px-3 sm:px-0"
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
                          className="w-full max-w-[25rem] mb-1"
                          style={{ filter: theme === 'dark' ? 'invert(0.85)' : 'none', borderRadius: '0.75rem' }}
                        >
                          <source src="https://media.githubusercontent.com/media/3miliejoseph/emilie-joseph-portfolio/main/public/Dontcha%20x%20Your%20Teeth%20in%20My%20Neck.mp3" type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <span className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'Poppins, sans-serif', width: '100%', display: 'block', textAlign: 'center' }}>
                          Click play to listen
                        </span>
                      </div>
                    </div>
                    <div className="w-full max-w-[28rem] flex justify-center px-2 sm:px-0">
                      <p className="text-sm text-muted-foreground text-center max-w-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Experimenting with mixing music:  Dontcha by The Internet x Your Teeth in My Neck by Kali Uchis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>


        {/* Playground Section removed as requested */}
    </motion.div>
  );
}