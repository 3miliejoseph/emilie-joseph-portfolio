// Mapping: case study slug -> array of project slugs to show in Explore More
const exploreMoreMap: Record<string, string[]> = {
  planetology: ["mural", "3d-museum-project"],
  mural: ["3d-museum-project", "tank"],
  "3d-museum-project": ["tank", "tasksprout"],
  tank: ["tasksprout", "lesli-website"],
  tasksprout: ["lesli-website", "figma-experiments"],
  "lesli-website": ["figma-experiments", "playground"],
  "figma-experiments": ["playground", "planetology"],
  "playground": ["planetology", "mural"],
  // Add more as needed
};
import { MobileSun } from "./MobileSun";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Volume2, VolumeX, X, FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef, useMemo, type ComponentPropsWithoutRef, type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import { useMusic } from "../contexts/MusicContext";
import { NebulaSphere } from "./NebulaSphere";
import * as Dialog from "@radix-ui/react-dialog";

// Main projects array for homepage and modals
export const projects = [
  {
    id: 2,
    slug: "planetology",
    title: "Planetology — Interactive Planet Systems",
    category: "Generative Systems",
    description: "A 3D interactive solar system using hand tracking and particle systems to explore how learning can become immersive and experiential.",
    year: "2024",
    image: "https://drive.google.com/uc?export=download&id=1fvUoD6E0lrXAjyV2e2VOnUgKZT7T6omp",
    mediaAspectRatio: "4 / 3",
    tags: ["Interactive Systems", "Hand Tracking", "Three.js", "Generative Visuals"],
    previewVideo: "/Planetology.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Planetology is a browser-based interactive solar system created during a Figma Makeathon with Contra. It combines particle interaction, quizzes, and hand tracking to turn space education into a playful, immersive experience.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Most educational tools are passive—users read, scroll, and memorize. I wanted to create a system where learning happens through interaction, where users explore concepts by moving, playing, and directly engaging with content.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><span className="font-semibold text-foreground">Particle-based interaction system</span><br/>Users can move particles with their mouse, creating a dynamic environment that responds in real time and makes the interface feel alive.</li>
          <li><span className="font-semibold text-foreground">Hand tracking as input</span><br/>Hand tracking allows users to interact with planets using gestures, replacing traditional UI controls with a more natural interface.</li>
          <li><span className="font-semibold text-foreground">Embedded quiz system</span><br/>Each planet includes interactive quizzes to reinforce learning through participation rather than passive consumption.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li>Interactive learning systems</li>
          <li>Gesture-based interfaces</li>
          <li>Creative coding and generative visuals</li>
          <li>Designing for engagement through play</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
        <p className="text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Expanding multi-user interaction, refining gesture recognition, and introducing richer generative effects to deepen immersion.
        </p>
      </>
    ),
  },
  // Removed duplicate 'mural' project object
  {
    id: 4,
    slug: "mural",
    title: "MURAL — A Real-Time Collaborative Canvas",
    category: "Collaborative Systems",
    description: "A real-time collaborative canvas where multiple users draw simultaneously—turning individual devices into a shared, interactive system.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Real-time Systems", "Collaboration", "WebSockets", "Interactive Experience"],
    previewVideo: "/MURAL.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground">
          MURAL is a shared painting experience where any screen becomes a collaborative canvas. Users scan a QR code to turn their phones into brushes, allowing multiple people to create together in real time—no downloads, no setup.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Most creative tools are solitary—you make something alone, then share it. I wanted to design a system where the act of creation itself is social, where multiple people can contribute simultaneously in a shared space.<br/>
          I was also interested in removing friction from interaction. Your phone is already in your pocket, so instead of building a new interface, I wanted to transform an existing device into a creative input tool.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li><span className="font-semibold text-foreground">Phone as a real-time controller</span><br/>Users connect via QR code, instantly turning their phone into a brush. They can change color, adjust brush or stamp size, and switch tools directly from their device.</li>
          <li><span className="font-semibold text-foreground">WebSocket-based multi-user system</span><br/>Real-time communication allows multiple users to draw simultaneously on a shared canvas, with each device continuously sending input data to stay in sync.</li>
          <li><span className="font-semibold text-foreground">Dynamic brush and stamp system</span><br/>Users can paint freely or place stamps, enabling both expressive drawing and structured composition within the same environment.</li>
          <li><span className="font-semibold text-foreground">Session-based output</span><br/>At the end of each session, users can save the final canvas—capturing the collaborative artifact created together.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li>Real-time multi-user systems</li>
          <li>Cross-device interaction design</li>
          <li>Experimental UI using everyday hardware</li>
          <li>Creative coding for collaborative experiences</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
        <p className="text-base text-muted-foreground">
          Scaling to support larger groups, introducing more expressive tools (animated brushes, physics-based paint), and exploring projection-based installations for physical spaces.
        </p>
      </>
    ),
  },
  {
    id: 10,
    slug: "3d-museum-project",
    title: "Em’s Art Museum — A 3D Gallery Experience",
    category: "Spatial Interfaces",
    description: "A navigable 3D gallery experimenting with spatial interfaces and new modes of experiencing art, built in Antigravity.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1642756060888-aa5f4bc4d86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGRlc2lnbiUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzcyODY4Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    mediaAspectRatio: "4 / 3",
    tags: ["Spatial Interface", "3D Interaction", "Three.js", "Antigravity"],
    previewVideo: "/emsart.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Em’s Art Museum is a 3D virtual gallery where users navigate through a space to experience artwork, transforming a traditional portfolio into an interactive environment.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Most portfolios are static and linear, limiting how people experience creative work. I wanted to design a system where users explore my art through movement and spatial interaction rather than scrolling.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><span className="font-semibold text-foreground">3D navigation system</span><br/>Users move through a virtual environment, creating a sense of presence and exploration.</li>
          <li><span className="font-semibold text-foreground">Spatial artwork placement</span><br/>Paintings are arranged intentionally in 3D space to encourage discovery and flow.</li>
          <li><span className="font-semibold text-foreground">Web-based rendering</span><br/>Built for the browser to make the experience easily accessible without downloads.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li>Spatial interaction design</li>
          <li>3D interfaces and navigation</li>
          <li>Experimental portfolio systems</li>
          <li>Creative use of web-based graphics</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
        <p className="text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Adding multiplayer exploration, interactive artwork elements, and more immersive environmental details.
        </p>
      </>
    ),
  },
  {
    id: 3,
    slug: "tank",
    title: "Tank — Interactive Aquarium",
    category: "Interactive Systems",
    description: "A generative, bioluminescent aquarium where fish respond to user interaction—exploring behavior, motion, and emergent systems.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Generative Systems", "Behavioral Simulation", "Creative Coding", "Hand Tracking"],
    previewVideo: "/Tank.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What if a digital environment could behave like a living system?<br/>
          Tank is an interactive aquarium where users influence fish behavior in real time using hand tracking—feeding them, guiding their movement, or startling them through physical gestures.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Most digital environments are visually dynamic but behaviorally shallow—they respond, but they don’t behave. I wanted to create a system where interaction produces emergent responses, making the environment feel alive rather than animated.<br/>
          I was especially interested in how simple inputs—like hand movement or gesture—could drive complex, lifelike behaviors.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><span className="font-semibold text-foreground">Gesture-based interaction system</span><br/>Hand tracking translates user movement into input, allowing users to feed fish, guide them to follow their finger, or scare them by knocking.</li>
          <li><span className="font-semibold text-foreground">Behavior-driven animation model</span><br/>Fish are not pre-animated—they respond dynamically to stimuli, shifting between states like attraction, avoidance, and idle movement.</li>
          <li><span className="font-semibold text-foreground">Real-time response loop</span><br/>Every interaction immediately affects the system, creating a continuous feedback loop between user input and environmental behavior.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6">What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li>Behavioral systems design</li>
          <li>Gesture-based interaction</li>
          <li>Real-time feedback loops</li>
          <li>Creative coding for emergent systems</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6">Future Iterations</h2>
        <p className="text-base text-muted-foreground">
          Expanding the behavioral model with more complex state systems, adding multi-user interaction, and exploring more nuanced environmental responses.
        </p>
      </>
    ),
  },
  {
    id: 11,
    slug: "tasksprout",
    title: "TaskSprout — A Living Productivity System",
    category: "Behavioral Systems",
    description: "A productivity tool that visualizes tasks as a growing system—exploring how interaction design can influence behavior.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Interaction Design", "Behavioral Design", "UX Systems", "Prototyping"],
    previewVideo: "/Tasksprout.mp4",
    caseStudy: (
      <>
         <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground">
          TaskSprout is a digital task system where completing actions directly drives visual growth, turning productivity into a continuous, living feedback loop.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Most productivity tools rely on lists, notifications, and deadlines—but they rarely change how people feel about completing tasks. I wanted to design a system that motivates behavior through interaction and visual feedback rather than pressure.<br/>
          I was particularly interested in how small actions, when visualized over time, could create a stronger sense of progress and engagement.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li><span className="font-semibold text-foreground">Growth-based feedback system</span><br/>Each completed task contributes to the growth of a flower, creating a direct mapping between user behavior and visual output.</li>
          <li><span className="font-semibold text-foreground">Audio capture as input</span><br/>Users can record voice notes, expanding interaction beyond typing and allowing for more flexible task capture.</li>
          <li><span className="font-semibold text-foreground">Daily feedback loop</span><br/>At the end of the day, users see the cumulative result of their actions, reinforcing consistency through visual reward.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li>Behavioral systems design</li>
          <li>Interaction design for habit formation</li>
          <li>Real-time feedback loops</li>
          <li>Blending utility with experiential design</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
        <p className="text-base text-muted-foreground">
          Exploring adaptive growth patterns, long-term habit visualization, and shared systems for collaborative accountability.
        </p>
      </>
    ),
  },
  {
    id: 7,
    slug: "lesli-website",
    title: "Lesli’s Pet Services — Brand & Web Experience",
    category: "Web & Brand Design",
    description: "A full brand identity and responsive website for a small business, combining visual design with custom front-end interactions and motion.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1760071744047-5542cbfda184?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Brand Identity", "Web Design", "Interaction", "Front-end Development"],
    previewVideo: "/LPS.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Lesli’s Pet Services is a cohesive brand and web system that translates identity across digital and physical touchpoints—from website to business cards to merchandise.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Many small businesses lack cohesive, well-designed digital experiences, often resulting in fragmented branding and unclear communication. I wanted to create a unified system that builds trust while clearly expressing personality.<br/>
          I was also interested in how emerging tools like prompting could accelerate and influence the design process.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li><span className="font-semibold text-foreground">Prompt-driven design exploration</span><br/>Used prompting to rapidly generate and iterate on visual directions, treating AI as a collaborative tool within the design process.</li>
          <li><span className="font-semibold text-foreground">Cross-platform brand system</span><br/>Designed a consistent identity across web, print, and merchandise to ensure a unified experience at every touchpoint.</li>
          <li><span className="font-semibold text-foreground">Structured web experience</span><br/>Planned and organized the site architecture to create a clear, intuitive flow for users exploring services.</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li>Systems thinking across mediums</li>
          <li>Integrating AI into creative workflows</li>
          <li>Web design and front-end execution</li>
          <li>Translating identity into digital experiences</li>
        </ul>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
        <p className="text-base text-muted-foreground">
          Expanding the system with interactive features like booking flows, motion design, and more dynamic user interactions.
        </p>
      </>
    ),
  },
  {
    id: 5,
    slug: "figma-experiments",
    title: "Figma Demos — Interactive Prototypes",
    category: "Prototpying",
    description: "A collection of interactive prototypes exploring motion, design systems, and micro-interactions to test how interface behavior shapes user experience.",
    year: "2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Prototyping", "Motion", "Design Systems", "Interaction Design"],
    previewVideo: "/Figma.mp4",
    caseStudy: (
      <></>
    ),
  },
  {
    id: 6,
    slug: "playground",
    title: "Playground",
    category: "Creative Coding",
    description: "A collection of creative coding experiments exploring generative visuals, interaction, and innovative interfaces.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    mediaAspectRatio: "4 / 3",
    tags: ["Creative Coding", "Generative Art", "Experimental UI", "Interaction", "Visual Exploration"],
    previewVideo: "/Static.mp4",
    caseStudy: (
      <>
        <h2 className="text-lg font-semibold mb-2 text-foreground">Interactive Playground</h2>
        <p className="mb-4 text-base text-muted-foreground">
          Playground is a space for experimenting with generative particles and user input. The demo lets users draw, play, and discover emergent patterns in real time.
        </p>
        <h2 className="text-lg font-semibold mb-2 text-foreground mt-6">Features</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
          <li>Interactive particle system</li>
          <li>Custom color gradients</li>
          <li>Responsive to mouse and touch</li>
        </ul>
      </>
    ),
  },
];

// Inline styles for viewport-specific sun scaling
const sunScaleStyles = `
  .mobile-sun-container {
    transform: translate3d(-50%, 0, 0) scale(0.40);
    -webkit-transform: translate3d(-50%, 0, 0) scale(0.40);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000px;
    -webkit-perspective: 1000px;
  }
  
  @keyframes sunSpin {
    0% {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  
  @-webkit-keyframes sunSpin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  .sun-icon {
    animation: sunSpin 20s linear infinite;
    -webkit-animation: sunSpin 20s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  
  @media (max-height: 900px) {
    .mobile-sun-container {
      transform: translate3d(-50%, 0, 0) scale(0.39);
      -webkit-transform: translate3d(-50%, 0, 0) scale(0.39);
    }
  }
  
  /* Android Compact (typical: 360x640) */
  @media (max-width: 400px) and (max-height: 700px) {
    .mobile-sun-container {
      top: -68% !important;
    }
  }
  
  /* Phones 399px and less */
  @media (max-width: 399px) {
    .mobile-sun-container {
      transform: translate3d(-50%, 0, 0) scale(0.376);
      -webkit-transform: translate3d(-50%, 0, 0) scale(0.376);
      top: -78% !important;
    }
  }
  
  /* iPhone 14 Pro (393x852) - Safari specific */
  @media (width: 393px) and (height: 852px) {
    .mobile-sun-container {
      top: -81% !important;
    }
  }
  
  /* iPhone 16 Pro Max (430x932) */
  @media (min-width: 400px) and (max-width: 450px) and (min-height: 900px) {
    .mobile-sun-container {
      top: -63% !important;
    }
  }
  
  /* Tablets and phones 450px to 1021px */
  @media (min-width: 450px) and (max-width: 1021px) {
    .mobile-sun-container {
      top: -76% !important;
    }
  }
  
  /* General range 399px to 1023px - move down 5% */
  @media (min-width: 399px) and (max-width: 1023px) {
    .mobile-sun-container {
      top: calc(var(--sun-top, -95%) + 5%) !important;
    }
  }
  
  /* Width 399-1023px with height 852px or more - center between navbar and text */
  @media (min-width: 399px) and (max-width: 1023px) and (min-height: 852px) {
    .mobile-sun-container {
      top: -70% !important;
    }
  }
  
  /* iPhone SE (375x667) - Most specific, should override */
  @media (min-width: 370px) and (max-width: 380px) and (min-height: 660px) and (max-height: 670px) {
    .mobile-sun-container {
      transform: translate3d(-50%, 0, 0) scale(0.35) !important;
      -webkit-transform: translate3d(-50%, 0, 0) scale(0.35) !important;
      top: -165% !important;
      z-index: 0 !important;
    }
  }
  
  /* Android Medium (700x840) - Most specific, should override */
  @media (min-width: 700px) and (max-width: 700px) and (min-height: 840px) and (max-height: 840px) {
    .mobile-sun-container {
      top: -74% !important;
    }
  }
`;

function PlaygroundInteractivePreview() {
  const columns = 66;
  const rows = 41;
  const particleCount = columns * rows;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [litParticles, setLitParticles] = useState<Record<number, number>>({});
  const clearTimersRef = useRef<Record<number, ReturnType<typeof window.setTimeout>>>({});
  const lastPointerRef = useRef<{ xRatio: number; yRatio: number } | null>(null);
  const gradientStops = [
    [255, 145, 64],
    [255, 94, 192],
    [172, 104, 255],
    [31, 174, 225],
  ];

  const colorFromColumn = (column: number) => {
    const t = columns <= 1 ? 0 : column / (columns - 1);
    const segments = gradientStops.length - 1;
    const scaled = t * segments;
    const segment = Math.min(Math.floor(scaled), segments - 1);
    const localT = scaled - segment;
    const [r1, g1, b1] = gradientStops[segment];
    const [r2, g2, b2] = gradientStops[segment + 1];
    const r = Math.round(r1 + (r2 - r1) * localT);
    const g = Math.round(g1 + (g2 - g1) * localT);
    const b = Math.round(b1 + (b2 - b1) * localT);
    return `${r},${g},${b}`;
  };

  const smileyGlowFromCell = (column: number, row: number) => {
    const x = (column / (columns - 1) - 0.5) * 2;
    const y = (row / (rows - 1) - 0.5) * 2;
    const xAdjusted = x * 1.51;
    const yAdjusted = y + 4 / (rows - 1);
    const xFace = xAdjusted * 0.9;
    const yFace = yAdjusted * 0.9;

    const baseFaceRadius = 0.82;
    const faceRadius = 0.74;
    const ratioScale = faceRadius / baseFaceRadius;
    const colWidth = 2 * 1.51 / (columns - 1);
    const faceDistance = Math.hypot(xFace, yFace);
    const baseRingThickness = 0.036 * ratioScale;
    const sideExtraThickness = colWidth * 0.2;
    const isSideArc = Math.abs(xFace) > Math.abs(yFace) + 0.08;
    const faceRing =
      Math.abs(faceDistance - faceRadius) <=
      baseRingThickness + (isSideArc ? sideExtraThickness : 0);

    if (!faceRing && faceDistance > faceRadius) {
      return 0;
    }

    const leftEyeDx = xAdjusted + 0.28 * ratioScale;
    const rightEyeDx = xAdjusted - 0.28 * ratioScale;
    const eyeDy = yAdjusted + 0.22 * ratioScale + 0.05;
    const eyeRadiusX = 0.069 * ratioScale;
    const eyeRadiusY = 0.125 * ratioScale;
    const leftEye =
      (leftEyeDx * leftEyeDx) / (eyeRadiusX * eyeRadiusX) +
        (eyeDy * eyeDy) / (eyeRadiusY * eyeRadiusY) <=
      1;
    const rightEye =
      (rightEyeDx * rightEyeDx) / (eyeRadiusX * eyeRadiusX) +
        (eyeDy * eyeDy) / (eyeRadiusY * eyeRadiusY) <=
      1;

    const mouthCx = 0;
    const mouthCy = 0.12 * ratioScale;
    const mouthRadius = 0.42 * ratioScale;
    const mouthThickness = 0.042 * ratioScale;
    const mouthDistance = Math.hypot(xAdjusted - mouthCx, yAdjusted - mouthCy);
    const circularMouth = yAdjusted > mouthCy && Math.abs(mouthDistance - mouthRadius) <= mouthThickness;
    const rowHeight = 2 / (rows - 1);
    const mouthBottomY = mouthCy + mouthRadius;
    const lastRowExtension = yAdjusted >= mouthBottomY - rowHeight && yAdjusted <= mouthBottomY + rowHeight && Math.abs(xAdjusted) <= 3 * colWidth;
    const mouth = circularMouth || lastRowExtension;

    // Second row extension for eyes (add 1 particle to each eye's second row)
    const secondRowY = eyeDy + eyeRadiusY - rowHeight;
    const isSecondRow = Math.abs(yAdjusted - secondRowY) < rowHeight * 0.5;
    const leftEyeSecondRowExtension = isSecondRow && Math.abs(leftEyeDx - colWidth) < colWidth * 0.4;
    const rightEyeSecondRowExtension = isSecondRow && Math.abs(rightEyeDx + colWidth) < colWidth * 0.4;

    if (leftEye || rightEye || leftEyeSecondRowExtension || rightEyeSecondRowExtension || mouth || faceRing) {
      return 0.9;
    }

    return 0;
  };

  const particles = useMemo(() => Array.from({ length: particleCount }, (_, index) => index), [particleCount]);

  useEffect(() => {
    return () => {
      for (const key in clearTimersRef.current) {
        window.clearTimeout(clearTimersRef.current[key]);
      }
    };
  }, []);

  const indexFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const yRatio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 0.999);
    const col = Math.floor(xRatio * columns);
    const row = Math.floor(yRatio * rows);
    return row * columns + col;
  };

  const indexFromRatios = (xRatio: number, yRatio: number) => {
    const clampedX = Math.min(Math.max(xRatio, 0), 0.999);
    const clampedY = Math.min(Math.max(yRatio, 0), 0.999);
    const col = Math.floor(clampedX * columns);
    const row = Math.floor(clampedY * rows);
    return row * columns + col;
  };

  const lightParticle = (index: number, durationMs: number, intensity: number) => {
    setLitParticles((prev: Record<number, number>) => ({ ...prev, [index]: intensity }));

    if (clearTimersRef.current[index]) {
      window.clearTimeout(clearTimersRef.current[index]);
    }

    clearTimersRef.current[index] = window.setTimeout(() => {
      setLitParticles((prev: Record<number, number>) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
      delete clearTimersRef.current[index];
    }, durationMs);
  };

  const paintAt = (centerIndex: number) => {
    const centerCol = centerIndex % columns;
    const centerRow = Math.floor(centerIndex / columns);

    for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
      for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
        const row = centerRow + rowDelta;
        const col = centerCol + colDelta;
        if (row < 0 || row >= rows || col < 0 || col >= columns) {
          continue;
        }

        const particleIndex = row * columns + col;
        const distance = Math.abs(rowDelta) + Math.abs(colDelta);
        const intensity = distance === 0 ? 1 : distance === 1 ? 0.7 : 0.45;
        lightParticle(particleIndex, 1500, intensity);
      }
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const yRatio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 0.999);
    const index = indexFromRatios(xRatio, yRatio);
    setHoveredIndex(index);

    const previous = lastPointerRef.current;
    if (previous) {
      const dx = (xRatio - previous.xRatio) * columns;
      const dy = (yRatio - previous.yRatio) * rows;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) * 1.75));

      for (let step = 1; step <= steps; step += 1) {
        const t = step / steps;
        const sampleX = previous.xRatio + (xRatio - previous.xRatio) * t;
        const sampleY = previous.yRatio + (yRatio - previous.yRatio) * t;
        paintAt(indexFromRatios(sampleX, sampleY));
      }
    } else {
      paintAt(index);
    }

    lastPointerRef.current = { xRatio, yRatio };
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    const index = indexFromPointer(event);
    setHoveredIndex(index);
    paintAt(index);

    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const yRatio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 0.999);
    lastPointerRef.current = { xRatio, yRatio };
  };

  const handlePointerLeave = () => {
    setHoveredIndex(null);
    lastPointerRef.current = null;
  };

  const isInteracting = hoveredIndex !== null || Object.keys(litParticles).length > 0;

  // Touch event handlers for mobile
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) {
      event.preventDefault();
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();
      const xRatio = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 0.999);
      const yRatio = Math.min(Math.max((touch.clientY - rect.top) / rect.height, 0), 0.999);
      const index = indexFromRatios(xRatio, yRatio);
      setHoveredIndex(index);
      paintAt(index);
      lastPointerRef.current = { xRatio, yRatio };
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) {
      event.preventDefault();
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();
      const xRatio = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 0.999);
      const yRatio = Math.min(Math.max((touch.clientY - rect.top) / rect.height, 0), 0.999);
      const index = indexFromRatios(xRatio, yRatio);
      setHoveredIndex(index);
      const previous = lastPointerRef.current;
      if (previous) {
        const dx = (xRatio - previous.xRatio) * columns;
        const dy = (yRatio - previous.yRatio) * rows;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) * 1.75));
        for (let step = 1; step <= steps; step += 1) {
          const t = step / steps;
          const sampleX = previous.xRatio + (xRatio - previous.xRatio) * t;
          const sampleY = previous.yRatio + (yRatio - previous.yRatio) * t;
          paintAt(indexFromRatios(sampleX, sampleY));
        }
      } else {
        paintAt(index);
      }
      lastPointerRef.current = { xRatio, yRatio };
    }
  };

  const handleTouchEnd = () => {
    setHoveredIndex(null);
    lastPointerRef.current = null;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#06070f]">
      <div
        className="absolute inset-0 grid gap-[1px] p-2 sm:p-2"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          touchAction: 'none',
        }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {particles.map((particleIndex: number) => {
          const col = particleIndex % columns;
          const row = Math.floor(particleIndex / columns);

          let hoverGlow = 0;
          if (hoveredIndex !== null) {
            const hoverCol = hoveredIndex % columns;
            const hoverRow = Math.floor(hoveredIndex / columns);
            const distance = Math.abs(hoverCol - col) + Math.abs(hoverRow - row);
            hoverGlow = distance === 0 ? 0.5 : distance === 1 ? 0.3 : distance === 2 ? 0.14 : 0;
          }

          const drawGlow = litParticles[particleIndex] ?? 0;
          const smileyGlow = isInteracting ? 0 : smileyGlowFromCell(col, row);
          const glow = Math.max(hoverGlow, drawGlow, smileyGlow);
          const interactionColor = colorFromColumn(col);
          const color = interactionColor;
          const baseAlpha = 0.11;
          const alpha = baseAlpha + glow * 0.84;

          return (
            <div
              key={particleIndex}
              className="aspect-square rounded-full transition-all duration-200"
              style={{
                backgroundColor: glow > 0 ? `rgba(${color}, ${alpha})` : `rgba(143, 154, 188, ${baseAlpha})`,
                boxShadow:
                  glow > 0
                    ? `0 0 ${2 + glow * 8}px rgba(${color}, ${0.28 + glow * 0.34}), 0 0 ${6 + glow * 12}px rgba(${color}, ${0.14 + glow * 0.26})`
                    : "none",
                transform: glow > 0 ? `scale(${0.72 + glow * 0.16})` : "scale(0.58)",
              }}
            />
          );
        })}
      </div>
      <div className="hidden sm:block absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.16em] text-white/75 sm:text-[11px]">
        Hover to Draw
      </div>
    </div>
  );
}

type ModalEmbedFrameProps = ComponentPropsWithoutRef<"iframe"> & {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

function ModalEmbedFrame({ scrollContainerRef: _scrollContainerRef, ...iframeProps }: ModalEmbedFrameProps) {
  return (
    <div className="relative h-full w-full">
      <iframe {...iframeProps} />
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const staticPreviewVideo = "/Static.mp4";
  const muralPreviewVideo = "/MURAL.mp4";
  const lesliPreviewVideo = "/LPS.mp4";
  const figmaPreviewVideo = "/Figma.mp4";
  const tankPreviewVideo = "/Tank.mp4";
  const { theme, setTheme } = useTheme();
  const { isPlaying, toggleMusic } = useMusic();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);
  const [showMusicTooltip, setShowMusicTooltip] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [interactiveHoverIndex, setInteractiveHoverIndex] = useState<number | null>(null);
  
  // Refs for sphere rotation animation
  const mobileSphereContainerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const closeTimeoutRef = useRef<number | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const pushCaseStudyState = (slug: string, expanded: boolean) => {
    window.history.pushState({ caseStudy: true, slug, expanded }, "", window.location.href);
  };

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsDesktopViewport(width >= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExpandToFullPage = () => {
    if (!selectedProject) return;

    // Set expanding state to trigger fullscreen animation
    setIsExpanding(true);
    window.history.replaceState(
      { caseStudy: true, slug: selectedProject.slug, expanded: true },
      "",
      window.location.href,
    );
  };

  const closeProjectModal = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsExpanding(false);

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
      // Replace state to remove case study flag so back button doesn't re-open popup
      window.history.replaceState(null, "", window.location.href);
    }, 220);
  };

  const handleProjectClick = (project: typeof projects[0]) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsClosing(false);

    if (!isDesktopViewport) {
      // On mobile/smaller tablets, navigate directly to the case-study page route.
      navigate(`/project/${project.slug}`);
      return;
    }

    setSelectedProject(project);
    setIsExpanding(false);
    pushCaseStudyState(project.slug, false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeZone = (date: Date) => {
    const tzPart = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short'
    })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value;

    return tzPart || Intl.DateTimeFormat().resolvedOptions().timeZone;
  };
  

// Handles browser back/forward navigation for project modal
function handlePopState(event: PopStateEvent) {
  const state = event.state;
  if (state && state.caseStudy && state.slug) {
    const found = projects.find((p) => p.slug === state.slug);
    if (found) {
      setSelectedProject(found);
      setIsExpanding(!!state.expanded);
    }
  } else {
    setSelectedProject(null);
    setIsExpanding(false);
  }
}

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden overflow-y-visible">
      {/* Inject viewport-specific scaling styles */}
      <style>{sunScaleStyles}</style>
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-visible pt-24 sm:pt-28 md:pt-32 lg:pt-0 flex items-start lg:items-center">
        <div className="desktop-content-gutter w-full overflow-visible">
          {/* Mobile and tablet sun - placed in normal flow between nav and intro text */}
          <div className="lg:hidden flex w-full justify-center -mt-5 sm:-mt-4 md:-mt-3 mb-10 sm:mb-12 md:mb-14">
            <div className="w-[360px] h-[360px] overflow-visible pointer-events-none scale-[1.64] sm:scale-[1.92] md:scale-[2.16] origin-center mx-auto">
              <MobileSun
                theme={theme}
                width={360}
                height={360}
                sunScale={1.08}
                densityVariant="reduced"
                particleScale={1.12}
              />
            </div>
          </div>

          {/* Left side - Name and Bio */}
          <div className="space-y-5 sm:space-y-7 flex-shrink-0 relative text-center lg:text-left lg:max-w-[50%] mt-0 sm:mt-1 lg:mt-[calc(0.5rem+33vh)]" style={{ zIndex: 30 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight lg:-translate-y-[16vh]" style={{ fontFamily: '"Bangla MN", sans-serif' }}>
              Emilie Joseph
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground lg:-translate-y-[16vh]">
              Building <span className="font-bold">bold</span>,{" "}
              <span className="inline-block cursor-default">
                {[..."interactive"].map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="inline-block"
                    onMouseEnter={() => setInteractiveHoverIndex(index)}
                    onMouseLeave={() => setInteractiveHoverIndex(null)}
                    onTouchStart={() => setInteractiveHoverIndex(index)}
                    onTouchEnd={() => setInteractiveHoverIndex(null)}
                    onTouchCancel={() => setInteractiveHoverIndex(null)}
                    animate={(() => {
                      const distance =
                        interactiveHoverIndex === null
                          ? 999
                          : Math.abs(index - interactiveHoverIndex);
                      const intensity =
                        distance === 0 ? 1 : distance === 1 ? 0.65 : distance === 2 ? 0.35 : 0;

                      return {
                        color: intensity > 0 ? (theme === "light" ? "#FFA500" : "#E879F9") : "inherit",
                        y: -2.5 * intensity,
                        textShadow:
                          intensity > 0
                            ? theme === "light"
                              ? `0 0 10px rgba(255,165,0,${0.42 * intensity})`
                              : `0 0 10px rgba(232,121,249,${0.42 * intensity})`
                            : "0 0 0 rgba(0,0,0,0)",
                      };
                    })()}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>{" "}
              systems <br className="hidden md:block" /> that bring creative ideas to{" "}
              <span className="inline-block">
                {[..."life"].map((letter, index) => (
                  <motion.span
                    key={`life-${letter}-${index}`}
                    className="inline-block"
                    style={{ color: theme === "light" ? "#FFA500" : "#E879F9" }}
                    animate={{
                      y: [0, -2.5, 0],
                      scale: [1, 1.045, 1],
                      rotate: [0, -1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.12,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              .
            </p>
            <div className="pt-2 flex items-center gap-3 relative justify-center lg:justify-start lg:-translate-y-[16vh]">
              {isDesktopViewport && (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-3 border border-border rounded-full hover:bg-accent transition-colors"
                      aria-label="Toggle theme"
                      onMouseEnter={() => setShowThemeTooltip(true)}
                      onMouseLeave={() => setShowThemeTooltip(false)}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5 sun-icon" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                    <AnimatePresence>
                      {showThemeTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs rounded-md whitespace-nowrap pointer-events-none z-50"
                        >
                          Light/Dark Mode
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative">
                    <button
                      onClick={toggleMusic}
                      className="p-3 border border-border rounded-full hover:bg-accent transition-colors"
                      aria-label="Toggle music"
                      onMouseEnter={() => setShowMusicTooltip(true)}
                      onMouseLeave={() => setShowMusicTooltip(false)}
                    >
                      {isPlaying ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <VolumeX className="w-5 h-5" />
                      )}
                    </button>
                    <AnimatePresence>
                      {showMusicTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs rounded-md whitespace-nowrap pointer-events-none z-50"
                        >
                          Tunes while you explore!
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
            <div className="pt-1 text-muted-foreground text-center lg:text-left">
              <div className="text-lg sm:text-xl md:text-2xl font-medium tracking-[0.015em] lg:-translate-y-[16vh]">
                {formatTime(currentTime)}
                <span className="ml-2">{formatTimeZone(currentTime)}</span>
              </div>
              <div className="text-lg sm:text-xl tracking-[0.015em] mt-2 lg:-translate-y-[16vh]">{formatDate(currentTime)}</div>
            </div>
          </div>

          {/* Right side - Nebula Sphere - desktop */}
          {isDesktopViewport && (
            <div className="absolute top-[45.5%] overflow-visible z-20" style={{ right: '29%', transform: 'translate(50%, -50%) scale(0.7885)' }}>
              <NebulaSphere 
                theme={theme}
                primaryColor={theme === "light" ? "#FDB813" : "#8B5CF6"}
                secondaryColor={theme === "light" ? "#FFDD57" : "#6366F1"}
                tertiaryColor={theme === "light" ? "#FFA500" : "#D946EF"}
                particleCount={2222}
                width={1800}
                height={1800}
              />
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-background py-16 sm:py-24 md:py-32 lg:py-24">
        <div className="desktop-content-gutter">
          {/* Header */}
          <div className="mb-7 sm:mb-10 md:mb-14 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 font-medium" style={{ fontFamily: '"Poppins", sans-serif' }}>Work</h2>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {project.slug === "tasksprout" ? (
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="group cursor-pointer block w-full text-left"
                  >
                    <motion.div 
                      className="relative overflow-hidden aspect-video mb-6 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-[1.015] bg-muted"
                      transition={{ duration: 0.3 }}
                    >
                      <video
                        src="/Tasksprout.mov"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 border text-xs rounded-full"
                            style={{ borderColor: theme === 'light' ? '#FFA500' : '#E879F9' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="group cursor-pointer block w-full text-left"
                  >
                    <div
                      className="relative overflow-hidden mb-6 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-[1.015] aspect-video bg-muted"
                    >
                      {project.slug === "playground" ? (
                        <PlaygroundInteractivePreview />
                      ) : project.previewVideo ? (
                        <video
                          src={project.previewVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster={project.image}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                          preload="metadata"
                          onError={(e) => {
                            console.error('Video loading error:', project.previewVideo, e);
                            const target = e.target as HTMLVideoElement;
                            target.poster = project.image;
                          }}
                          onLoadStart={() => {
                            console.log('Video loading started:', project.previewVideo);
                          }}
                          onCanPlay={(e) => {
                            console.log('Video can play:', project.previewVideo);
                            const target = e.target as HTMLVideoElement;
                            // Try to play if autoplay failed
                            if (target.paused) {
                              target.play().catch(err => {
                                console.log('Autoplay blocked, will play on interaction:', err);
                              });
                            }
                          }}
                        />
                      ) : (
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {project.category}
                      </div>
                      
                      <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 border text-xs rounded-full"
                            style={{ borderColor: theme === 'light' ? '#FFA500' : '#E879F9' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Project Modal */}
      <Dialog.Root 
        modal={true}
        open={!!selectedProject} 
        onOpenChange={(open) => {
          if (!open) {
            closeProjectModal();
          }
        }}
      >
        <Dialog.Portal>
          {!isExpanding && (
            <Dialog.Overlay
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeProjectModal();
                }
              }}
              onPointerDown={(e) => {
                if (e.target === e.currentTarget && e.button === 0) {
                  closeProjectModal();
                }
              }}
              className={
                `fixed inset-0 z-[101] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ` +
                (theme === 'light'
                  ? 'bg-black/40 backdrop-blur-[2px] backdrop-saturate-110'
                  : 'bg-black/70 backdrop-blur-[2px] backdrop-saturate-110')
              }
              style={{ pointerEvents: 'auto' }}
            />
          )}
          <Dialog.Content asChild onOpenAutoFocus={(event) => event.preventDefault()}>
          <motion.div
            key={selectedProject?.id ?? "project-modal"}
            className={
              "fixed z-[102] isolate bg-white dark:bg-zinc-900 shadow-lg border-2 border-zinc-200 dark:border-zinc-700 p-0 flex min-h-0 flex-col overflow-hidden border-radius-[1.5rem]"
            }
            initial={
              {
                top: '6vh',
                left: '50%',
                x: '-50%',
                y: 0,
                width: '88vw',
                maxWidth: '1200px',
                maxHeight: '88vh',
                borderRadius: '1.5rem',
                borderWidth: 2,
                opacity: 0,
                scale: 0.985,
              }
            }
            animate={
              isExpanding
                ? {
                    top: 0,
                    left: 0,
                    x: 0,
                    y: 0,
                    width: '100vw',
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    borderRadius: 0,
                    borderWidth: 0,
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    top: '6vh',
                    left: '50%',
                    x: '-50%',
                    y: 0,
                    width: '90vw',
                    maxWidth: '1250px',
                    maxHeight: '88vh',
                    borderRadius: '1.5rem',
                    borderWidth: 2,
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={{ 
              ...(isClosing
                ? { duration: 0.22, ease: [0.4, 0, 0.2, 1] }
                : { type: "spring", stiffness: 220, damping: 26, mass: 0.9 }),
            }}
          >
            {selectedProject && (
              <>
                {/* Show nav bar at top when expanded */}
                {isExpanding && (
                  <nav className="fixed top-0 left-0 right-0 z-[110]">
                    <div className="mx-4 mt-4 sm:mx-6 lg:mx-[30px] flex justify-center">
                      <div
                        className="backdrop-blur-[20px] border rounded-full pl-[14px] pr-[8px] md:pr-[14px]"
                        style={{
                          borderColor: theme === "light" ? "rgba(255, 165, 0, 0.3)" : "rgba(139, 92, 246, 0.3)",
                          backgroundColor: theme === "light" ? "rgba(250, 248, 245, 0.4)" : "rgba(0, 0, 0, 0.4)",
                          boxShadow: theme === "light"
                            ? "0 8px 32px 0 rgba(255, 165, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
                            : "0 8px 32px 0 rgba(139, 92, 246, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex items-center gap-3 md:gap-12 h-14 md:h-16">
                          <a
                            href="/"
                            className="text-xs md:text-sm transition-colors"
                            style={{ color: theme === "light" ? '#222' : '#fff' }}
                            onMouseEnter={e => { e.currentTarget.style.color = theme === 'light' ? '#FFA500' : '#E879F9'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = theme === 'light' ? '#222' : '#fff'; }}
                          >
                            Work
                          </a>
                          <a
                            href="/about"
                            className="text-xs md:text-sm transition-colors"
                            style={{ color: theme === "light" ? '#222' : '#fff' }}
                            onMouseEnter={e => { e.currentTarget.style.color = theme === 'light' ? '#FFA500' : '#E879F9'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = theme === 'light' ? '#222' : '#fff'; }}
                          >
                            About
                          </a>
                          <a
                            href="/Emilie_Joseph_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm transition-colors"
                            style={{ color: theme === "light" ? '#222' : '#fff' }}
                            onMouseEnter={e => { e.currentTarget.style.color = theme === 'light' ? '#FFA500' : '#E879F9'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = theme === 'light' ? '#222' : '#fff'; }}
                          >
                            Resume
                          </a>
                          <a
                            href="mailto:emilieneha@gmail.com"
                            className="text-xs md:text-sm transition-colors px-4 py-3.5 border rounded-full md:border-border"
                            style={
                              theme === "light"
                                ? {
                                    backgroundColor: "#FFA500",
                                    borderColor: "#FFA500",
                                    color: "#000",
                                  }
                                : {
                                    backgroundColor: "#E879F9",
                                    borderColor: "#8B5CF6",
                                    color: "#fff",
                                  }
                            }
                            onMouseEnter={e => {
                              if (theme === "light") {
                                e.currentTarget.style.backgroundColor = "#FFD700";
                              } else {
                                e.currentTarget.style.backgroundColor = "#8B5CF6";
                              }
                            }}
                            onMouseLeave={e => {
                              if (theme === "light") {
                                e.currentTarget.style.backgroundColor = "#FFA500";
                              } else {
                                e.currentTarget.style.backgroundColor = "#E879F9";
                              }
                            }}
                          >
                            Contact
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                )}

                {/* Footer in expanded view */}
                {/* Footer in expanded view - moved to bottom after Explore More */}

                {/* Expand Button - Top Left - Only show when not expanded */}
                {!isExpanding && (
                  <button
                    onClick={handleExpandToFullPage}
                    className="absolute top-4 left-4 z-10 p-2 hover:bg-accent transition-colors rounded-md"
                  >
                    {/* Diagonal expand arrows (↖ ↘) */}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7L3 3m0 0v4m0-4h4m10 14l4 4m0 0v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                )}

                {/* Close Button - Top Right - Only show when not expanded */}
                {!isExpanding && (
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 p-2 hover:bg-accent transition-colors rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                {/* Scrollable Content */}
                <div
                  ref={modalScrollRef}
                  className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent pt-6 pb-12 sm:pb-16 flex flex-col"
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
                >
                  {/* Project Details */}
                  <div className="p-6 sm:p-8">
                    {/* Project Title, Label, Description, and Tags at the Top */}
                    <div className="desktop-content-gutter">
                      <div className="flex items-center gap-3 mb-4 mt-8">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          {selectedProject.category}
                        </span>
                      </div>
                      <Dialog.Title className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectedProject.title}
                      </Dialog.Title>
                      <Dialog.Description className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                        {selectedProject.description}
                      </Dialog.Description>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.tags && selectedProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 border text-sm rounded-full"
                            style={{ borderColor: theme === 'light' ? '#FFA500' : '#8B5CF6' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Embedded Project Content - Now Below */}
                    <div className="desktop-content-gutter mb-6">
                                            {selectedProject.slug === "figma-experiments" && (
                                              <div className="space-y-4">
                                                <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                                                  <ModalEmbedFrame
                                                    scrollContainerRef={modalScrollRef}
                                                    src="https://embed.figma.com/proto/KgUYsHwHqSJCjEhIjIpN1N/QueueNection?node-id=5-51&scaling=scale-down&content-scaling=fixed&page-id=5%3A45&starting-point-node-id=5%3A46&embed-host=share"
                                                    className="w-full h-full"
                                                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                                                    allowFullScreen
                                                    title="Figma Demo Prototype 1"
                                                  />
                                                </div>
                                                <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] h-[78vh] rounded-2xl overflow-visible border-none p-0">
                                                  <div className={`flex flex-row items-start w-full h-full gap-6 ${isExpanding ? '' : ''}`}>
                                                    <div className={`w-full ${isExpanding ? 'max-w-3xl' : 'max-w-xl'} h-full`}>
                                                      <ModalEmbedFrame
                                                        scrollContainerRef={modalScrollRef}
                                                        src="https://embed.figma.com/proto/KRHLrDyaZMGVgPTFdBWz3N/Final-Project-Redesign?page-id=0%3A1&node-id=33-9&starting-point-node-id=33%3A9&embed-host=share"
                                                        className="w-full h-full rounded-2xl"
                                                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}
                                                        allowFullScreen
                                                        title="Figma Demo Prototype 2"
                                                      />
                                                    </div>
                                                    <div className={`w-full ${isExpanding ? 'max-w-3xl' : 'max-w-xl'} h-full`}>
                                                      <ModalEmbedFrame
                                                        scrollContainerRef={modalScrollRef}
                                                        src="https://embed.figma.com/proto/mVE9KxGxQtc1iPjTjsg8cM/Star-Wars-Club-UCSD?page-id=720%3A121&node-id=933-5148&viewport=-5774%2C-1639%2C0.22&scaling=scale-down&content-scaling=fixed&starting-point-node-id=933%3A5075&embed-host=share"
                                                        className="w-full h-full rounded-2xl"
                                                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}
                                                        allowFullScreen
                                                        title="Figma Demo Prototype 3"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* Third Figma Embed Below the Row */}
                                                                                                {/* Fourth Figma Embed Below the Third */}
                                                                                                <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] h-[78vh] rounded-2xl overflow-hidden border border-border mt-8">
                                                                                                  <ModalEmbedFrame
                                                                                                    scrollContainerRef={modalScrollRef}
                                                                                                    src="https://embed.figma.com/proto/D0f4bA8hTs7pXaL7RLImMd/Houseplant?page-id=0%3A1&node-id=1-2&starting-point-node-id=1%3A2&embed-host=share"
                                                                                                    className="w-full h-full rounded-2xl"
                                                                                                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}
                                                                                                    allowFullScreen
                                                                                                    title="Figma Demo Prototype 5"
                                                                                                  />
                                                                                                </div>
                                                <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] h-[78vh] rounded-2xl overflow-hidden border border-border mt-8">
                                                  <ModalEmbedFrame
                                                    scrollContainerRef={modalScrollRef}
                                                    src="https://embed.figma.com/proto/BeCgfbk1aXFaGQY0jeXrvi/Airpods-Max?page-id=0%3A1&node-id=1-2&embed-host=share"
                                                    className="w-full h-full rounded-2xl"
                                                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}
                                                    allowFullScreen
                                                    title="Figma Demo Prototype 4"
                                                  />
                                                </div>
                                                {/* Case Study Content Section */}
                                                <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                  {selectedProject.caseStudy}
                                                </section>
                                              </div>
                                            )}
                      {selectedProject.slug === "tasksprout" && (
                        <div className="space-y-4">
                          <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                            <ModalEmbedFrame
                              scrollContainerRef={modalScrollRef}
                              src="https://task-sprout.vercel.app/"
                              className="w-full h-full"
                              style={{ transform: 'scale(0.75)', transformOrigin: 'center top', width: '133.33%', height: '133.33%', marginLeft: '-16.665%', marginTop: '0' }}
                              title="TaskSprout Live Project"
                            />
                          </div>
                          <div className="flex items-center mt-4 justify-end">
                            <a
                              href="https://task-sprout.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                            >
                              Try it
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
                          </div>
                          {/* Case Study Content Section */}
                          <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {selectedProject.caseStudy}
                          </section>
                        </div>
                      )}
                      {selectedProject.slug === "planetology" && (
                        <div className="space-y-4">
                          <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                            <ModalEmbedFrame
                              scrollContainerRef={modalScrollRef}
                              src="https://planetology.figma.site/"
                              className="w-full h-full"
                              style={{ transform: 'scale(0.75)', transformOrigin: 'center top', width: '133.33%', height: '133.33%', marginLeft: '-16.665%', marginTop: '0' }}
                              title="Planetology Live Project"
                              allow="fullscreen"
                            />
                          </div>
                          <div className="flex items-center mt-4 justify-end">
                            <a
                              href="https://planetology.figma.site/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                            >
                              Try it
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
                          </div>
                          {/* Case Study Content Section */}
                          <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {selectedProject.caseStudy}
                          </section>
                        </div>
                      )}

                      {selectedProject.slug === "3d-museum-project" && (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground italic text-left">Best experienced on laptop or desktop.</p>
                          <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                            <ModalEmbedFrame
                              scrollContainerRef={modalScrollRef}
                              src="https://ems-art-museum.vercel.app/"
                              className="w-full h-full rounded-2xl"
                              style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '1rem' }}
                              title="Em's Art Museum Live Project"
                              allow="fullscreen"
                            />
                          </div>
                          <div className="flex items-center mt-4 justify-end">
                            <a
                              href="https://ems-art-museum.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                            >
                              Try it
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
                          </div>
                          {/* Case Study Content Section */}
                          <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {selectedProject.caseStudy}
                          </section>
                        </div>
                      )}
                      {selectedProject.slug === "lesli-website" && (
                          <div className="space-y-4">
                            <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px]">
                              <div className="mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                                <ModalEmbedFrame
                                  scrollContainerRef={modalScrollRef}
                                  src="https://leslispetservices.figma.site"
                                  className="w-full h-full"
                                  style={{ transform: 'scale(0.75)', transformOrigin: 'center top', width: '133.33%', height: '133.33%', marginLeft: '-16.665%', marginTop: '0' }}
                                  title="Lesli Website Live Project"
                                />
                              </div>
                              <div className="flex items-center mt-4 justify-end">
                                <a
                                  href="https://leslispetservices.figma.site"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                                >
                                  Try it
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
                              </div>
                            </div>
                            {/* Brand Photos Placeholder Section - moved below embed and button */}
                            <div className="flex flex-col sm:flex-row gap-6 mb-8 mt-4">
                              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-muted/40 p-6 min-h-[260px]">
                                <div className="flex flex-row gap-8 w-[38rem] h-72 items-center justify-center">
                                  <div className="flex-1 flex items-center justify-center">
                                    <img
                                      src="/Front.png"
                                      alt="Lesli’s Pet Services business card front"
                                      className="object-contain max-w-full max-h-full"
                                    />
                                  </div>
                                  <div className="flex-1 flex items-center justify-center">
                                    <img
                                      src="/Back.png"
                                      alt="Lesli’s Pet Services business card back"
                                      className="object-contain max-w-full max-h-full"
                                    />
                                  </div>
                                </div>
                                <span className="text-base font-semibold text-foreground -mt-6">Business cards (front & back)</span>
                              </div>
                              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-muted/40 p-6 min-h-[260px]">
                                <div className="w-72 h-72 flex items-center justify-center overflow-hidden -mt-6">
                                  <img
                                    src="/shirt%20design.png"
                                    alt="Lesli’s Pet Services t-shirt design"
                                    className="object-contain w-full h-full"
                                  />
                                </div>
                                <span className="text-base font-semibold text-foreground mt-4">Tshirt design</span>
                              </div>
                            </div>
                            {/* Case Study Content Section */}
                            <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full max-w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
                              <p className="mb-4 text-base text-muted-foreground">
                                Lesli’s Pet Services is a cohesive brand and web system that translates identity across digital and physical touchpoints—from website to business cards to merchandise.
                              </p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
                              <p className="mb-4 text-base text-muted-foreground">
                                Many small businesses lack cohesive, well-designed digital experiences, often resulting in fragmented branding and unclear communication. I wanted to create a unified system that builds trust while clearly expressing personality.
                              </p>
                              <p className="mb-4 text-base text-muted-foreground">
                                I was also interested in how emerging tools like prompting could accelerate and influence the design process.
                              </p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li><span className="font-semibold text-foreground">Prompt-driven design exploration</span><br/>
                                  Used prompting to rapidly generate and iterate on visual directions, treating AI as a collaborative tool within the design process.
                                </li>
                                <li><span className="font-semibold text-foreground">Cross-platform brand system</span><br/>
                                  Designed a consistent identity across web, print, and merchandise to ensure a unified experience at every touchpoint.
                                </li>
                                <li><span className="font-semibold text-foreground">Structured web experience</span><br/>
                                  Planned and organized the site architecture to create a clear, intuitive flow for users exploring services.
                                </li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li>Systems thinking across mediums</li>
                                <li>Integrating AI into creative workflows</li>
                                <li>Web design and front-end execution</li>
                                <li>Translating identity into digital experiences</li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
                              <p className="text-base text-muted-foreground">
                                Expanding the system with interactive features like booking flows, motion design, and more dynamic user interactions.
                              </p>
                            </section>
                          </div>
                        )}

                        {selectedProject.slug === "tank" && (
                          <div className="space-y-4">
                            <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                              <ModalEmbedFrame
                                scrollContainerRef={modalScrollRef}
                                src="https://tank-gilt.vercel.app/"
                                className="w-full h-full"
                                style={{ transform: 'scale(0.75)', transformOrigin: 'center top', width: '133.33%', height: '133.33%', marginLeft: '-16.665%', marginTop: '0' }}
                                title="Tank Live Project"
                              />
                            </div>
                            <div className="flex items-center mt-4 justify-end">
                              <a
                                href="https://tank-gilt.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                              >
                                Try it
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
                            </div>
                            {/* Case Study Content Section */}
                            <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full max-w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
                              <p className="mb-4 text-base text-muted-foreground">
                                What if a digital environment could behave like a living system?
                              </p>
                              <p className="mb-4 text-base text-muted-foreground">
                                Tank is an interactive aquarium where users influence fish behavior in real time using hand tracking—feeding them, guiding their movement, or startling them through physical gestures.
                              </p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
                              <p className="mb-4 text-base text-muted-foreground">
                                Most digital environments are visually dynamic but behaviorally shallow—they respond, but they don't behave. I wanted to create a system where interaction produces emergent responses, making the environment feel alive rather than animated.
                              </p>
                              <p className="mb-4 text-base text-muted-foreground">
                                I was especially interested in how simple inputs—like hand movement or gesture—could drive complex, lifelike behaviors.
                              </p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li><span className="font-semibold text-foreground">Gesture-based interaction system</span><br/>
                                  Hand tracking translates user movement into input, allowing users to feed fish, guide them to follow their finger, or scare them by knocking.
                                </li>
                                <li><span className="font-semibold text-foreground">Behavior-driven animation model</span><br/>
                                  Fish are not pre-animated—they respond dynamically to stimuli, shifting between states like attraction, avoidance, and idle movement.
                                </li>
                                <li><span className="font-semibold text-foreground">Real-time response loop</span><br/>
                                  Every interaction immediately affects the system, creating a continuous feedback loop between user input and environmental behavior.
                                </li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li>Behavioral systems design</li>
                                <li>Gesture-based interaction</li>
                                <li>Real-time feedback loops</li>
                                <li>Creative coding for emergent systems</li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
                              <p className="text-base text-muted-foreground">
                                Expanding the behavioral model with more complex state systems, adding multi-user interaction, and exploring more nuanced environmental responses.
                              </p>
                            </section>
                          </div>
                        )}

                        {selectedProject.slug === "mural" && (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground italic text-left">Multiple devices needed - phones used as the brush, not the canvas.</p>
                            <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] mt-8 h-[78vh] bg-muted rounded-2xl overflow-hidden border border-border">
                              <ModalEmbedFrame
                                scrollContainerRef={modalScrollRef}
                                src="https://mural-t9uc.onrender.com/"
                                className="w-full h-full"
                                style={{ transform: 'scale(0.75)', transformOrigin: 'center top', width: '133.33%', height: '133.33%', marginLeft: '-16.665%', marginTop: '0' }}
                                title="MURAL Live Project"
                              />
                            </div>
                            <div className="flex items-center mt-4 justify-end">
                              <a
                                href="https://mural-t9uc.onrender.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                              >
                                Try it
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
                            </div>
                            {/* Case Study Content Section */}
                            <section className="mt-8 mb-2 px-0 sm:px-0 lg:px-0 w-full max-w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              <h2 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>The Idea</h2>
                              <p className="mb-4 text-base text-muted-foreground">MURAL is a shared painting experience where your phone becomes a brush. Open the canvas on any big screen — a laptop, a TV, a projector — and anyone in the room can scan a QR code and start painting together in real time. No app download. No login. Just pick up your phone and make something.</p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>The Problem I Wanted to Solve</h2>
                              <p className="mb-4 text-base text-muted-foreground">Most creative tools are solitary—you make something alone, then share it. I wanted to design a system where the act of creation itself is social, where multiple people can contribute simultaneously in a shared space.<br/><br/>I was also interested in removing friction from interaction. Your phone is already in your pocket, so instead of building a new interface, I wanted to transform an existing device into a creative input tool.</p>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Decisions</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li><span className="font-semibold text-foreground">Phone as a real-time controller:</span> Users connect via QR code, instantly turning their phone into a brush. They can change color, adjust brush or stamp size, and switch tools directly from their device.</li>
                                <li><span className="font-semibold text-foreground">WebSocket-based multi-user system:</span> Real-time communication allows multiple users to draw simultaneously on a shared canvas, with each device continuously sending input data to stay in sync.</li>
                                <li><span className="font-semibold text-foreground">Dynamic brush and stamp system:</span> Users can paint freely or place stamps, enabling both expressive drawing and structured composition within the same environment.</li>
                                <li><span className="font-semibold text-foreground">Session-based output:</span> At the end of each session, users can save the final canvas—capturing the collaborative artifact created together.</li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>What It Demonstrates</h2>
                              <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-muted-foreground">
                                <li>Real-time multi-user systems</li>
                                <li>Cross-device interaction design</li>
                                <li>Experimental UI using everyday hardware</li>
                                <li>Creative coding for collaborative experiences</li>
                              </ul>
                              <h2 className="text-lg font-semibold mb-2 text-foreground mt-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Future Iterations</h2>
                              <p className="text-base text-muted-foreground">
                                Scaling to support larger groups, introducing more expressive tools (animated brushes, physics-based paint), and exploring projection-based installations for physical spaces.
                              </p>
                            </section>
                          </div>
                        )}

                        {selectedProject.slug === "playground" ? (
                          <div className="space-y-20">
                            <div className="space-y-4">
                              <div className="w-auto mx-auto mt-8 bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                                <ModalEmbedFrame
                                  scrollContainerRef={modalScrollRef}
                                  src="https://3miliejoseph.github.io/magic8ball/"
                                  className="block"
                                  style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '1rem', aspectRatio: '16/9', minWidth: 320, minHeight: 180 }}
                                  title="Magic 8 Ball Playground"
                                  allow="fullscreen"
                                />
                              </div>
                              <div className="flex items-center mt-4 justify-end">
                                <a
                                  href="https://3miliejoseph.github.io/magic8ball/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                                >
                                  Try it
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
                              </div>
                              <div className="mt-4 text-muted-foreground text-base text-left">
                                A playful interactive system that responds to user questions with dynamic, generative answers—exploring randomness, anticipation, and delight in digital experiences.
                              </div>
                            </div>

                            {/* New Embed for emiliejoseph.xyz */}
                            {/* Static Brand Embed (remains above) */}
                            <div className="space-y-4">
                              <div className="w-auto mx-auto mt-8 bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                                <ModalEmbedFrame
                                  scrollContainerRef={modalScrollRef}
                                  src="https://static-brand.vercel.app/"
                                  className="block"
                                  style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '1rem', aspectRatio: '16/9', minWidth: 320, minHeight: 180 }}
                                  title="Static Brand Live Project"
                                  allow="fullscreen"
                                />
                              </div>
                              <div className="flex items-center mt-4 justify-end">
                                <a
                                  href="https://static-brand.vercel.app/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                                >
                                  Try it
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
                              </div>
                              <div className="mt-4 text-muted-foreground text-base text-left">
                                An experimental brand investigating how visual systems can express ideas through structured yet flexible design language.
                              </div>
                            </div>

                            {/* emiliejoseph.xyz Embed (now below static brand) */}
                            <div className="space-y-4">
                              <div className="w-auto mx-auto mt-8 bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                                <video
                                  src="/Portfolio.mp4"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="block aspect-video rounded-2xl"
                                  style={{ transform: 'scale(1.03)' }}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                              <div className="flex items-center mt-4 justify-end">
                                <a
                                  href="https://emiliejoseph.xyz/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors ml-auto block"
                                >
                                  Visit Site
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
                              </div>
                              <div className="mt-4 text-muted-foreground text-base text-left">
                                Looking for more personality? Visit my previous, bold and playful portfolio!
                              </div>
                            </div>
                            <p
                              className="text-[18px] text-left font-medium"
                              style={{ color: theme === "light" ? "#FFA500" : "#E879F9" }}
                            >
                              Stay tuned —more experiments coming soon!
                            </p>
                          </div>
                        ) : null}
                    </div>
                  </div>

                  <div className="desktop-content-gutter">
                  {/* Removed duplicate title, category, description, and tags section below the embedded project. Only the top section remains. */}

                  {/* Explore More Section - Only show in expanded view */}
                  {isExpanding && (
                    <>
                      <div className="w-full px-0 border-t border-border pt-8 pb-8 flex flex-col min-h-0 flex-1">
                        <h3 className="text-2xl sm:text-3xl font-medium mb-3 text-left" style={{ fontFamily: 'Poppins, sans-serif', marginLeft: 0, paddingLeft: 0 }}>Explore More</h3>
                        <div className="w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+6rem)] sm:-mx-12 lg:w-[calc(100%+60px)] lg:-mx-[30px] grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          {selectedProject &&
                            (exploreMoreMap[selectedProject.slug] || [])
                              .map(slug => {
                                const project = projects.find(p => p.slug === slug);
                                if (!project) return null;
                                return (
                                  <button
                                    key={project.slug}
                                    onClick={() => {
                                      // Store the current selected project as the origin before navigating
                                      window.history.pushState(
                                        { caseStudy: true, slug: selectedProject.slug, expanded: true, origin: true },
                                        "",
                                        window.location.href,
                                      );
                                      setSelectedProject(project);
                                      setIsExpanding(true);
                                      window.history.replaceState(
                                        { caseStudy: true, slug: project.slug, expanded: true, fromExploreMore: true },
                                        "",
                                        window.location.href,
                                      );
                                    }}
                                    className="group cursor-pointer block w-full text-left rounded-xl p-5 flex flex-col border border-border transition-transform duration-300 ease-out hover:scale-[1.015]"
                                  >
                                    <div className="relative overflow-hidden aspect-video mb-4 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-[1.015]">
                                      {project.slug === "playground" ? (
                                        <PlaygroundInteractivePreview />
                                      ) : project.previewVideo ? (
                                        <video
                                          src={project.previewVideo}
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          poster={project.image}
                                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                          preload="metadata"
                                          onError={(e) => {
                                            console.error('Modal video loading error:', project.previewVideo, e);
                                            const target = e.target as HTMLVideoElement;
                                            target.poster = project.image;
                                          }}
                                          onCanPlay={(e) => {
                                            console.log('Modal video can play:', project.previewVideo);
                                            const target = e.target as HTMLVideoElement;
                                            if (target.paused) {
                                              target.play().catch(err => {
                                                console.log('Modal autoplay blocked:', err);
                                              });
                                            }
                                          }}
                                        />
                                      ) : project.slug === "planetology" ? (
                                        <video
                                          src="/Planetology.mp4"
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                        />
                                      ) : project.slug === "mural" ? (
                                        <video
                                          src={muralPreviewVideo}
                                          autoPlay
                                          loop
                                          muted
                                          playsInline
                                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                        />
                                      ) : project.image ? (
                                        <ImageWithFallback
                                          src={project.image}
                                          alt={project.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : null}
                                    </div>
                                    <div className="font-semibold text-lg mb-1">{project.title}</div>
                                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{project.category}</div>
                                    <div className="text-muted-foreground text-sm mb-2">{project.description}</div>
                                  </button>
                                );
                              })}
                        </div>
                        {/* View All Projects Button ...existing code... */}
                      </div>
                    </>
                  )}
                  {/* Footer-like Section for expanded case study, always at the bottom */}
                  {isExpanding && (
                    <section className="pt-2 pb-0 sm:pt-4">
                      <div className="w-full px-0">
                        <div className="w-full max-w-none px-0">
                          <div
                            className="border-t-[1.5px] mb-0"
                            style={{ borderColor: theme === "light" ? "rgba(255, 165, 0, 0.35)" : "rgba(139, 92, 246, 0.35)" }}
                          ></div>
                          <div className="flex flex-col items-center gap-3 sm:items-start">
                            <div className="flex items-center gap-6">
                              <div style={{ marginLeft: '-25px' }}>
                                <MobileSun
                                  isStatic
                                  theme={theme}
                                  width={220}
                                  height={220}
                                  sunScale={1.3}
                                />
                              </div>
                              <span
                                className="text-[34px] sm:text-[46px] font-medium leading-none relative"
                                style={{ fontFamily: '"Bangla MN", sans-serif', left: '-26px', top: '8px', color: theme === "light" ? "#000" : "#fff" }}
                                id="footer-emilie-joseph"
                              >
                                Emilie Joseph
                              </span>
                            </div>
                            <div className="mt-2 sm:mt-0" style={{ position: 'relative', left: '198px', top: '-28px' }}>
                              <div className="flex flex-col items-start mb-1">
                                <span
                                  className="text-[15px] sm:text-[18px] font-medium"
                                  style={{ fontFamily: 'Poppins, sans-serif', color: theme === "light" ? "#000" : "#fff" }}
                                >
                                  Let's Connect!
                                </span>
                                <a
                                  href="mailto:emilieneha@gmail.com"
                                  className="text-[13px] sm:text-[15px] mt-1"
                                  style={{ fontFamily: 'Poppins, sans-serif', textDecoration: 'none', color: theme === "light" ? "#000" : "#fff", position: 'relative', top: '-2px' }}
                                  onMouseEnter={e => { e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9"; e.currentTarget.style.textDecoration = 'none'; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = theme === "light" ? "#000" : "#fff"; e.currentTarget.style.textDecoration = 'none'; }}
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
                                  style={{ color: theme === "light" ? "#000" : "#fff", marginRight: '0.5rem' }}
                                  onMouseEnter={e => { e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9"; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = theme === "light" ? "#000" : "#fff"; }}
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
                                  style={{ color: theme === "light" ? "#000" : "#fff", marginRight: '0.5rem' }}
                                  onMouseEnter={e => { e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9"; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = theme === "light" ? "#000" : "#fff"; }}
                                >
                                  <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                  </svg>
                                </a>
                                <a
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="transition-colors flex items-center"
                                  style={{ color: theme === "light" ? "#000" : "#fff" }}
                                  onMouseEnter={e => { e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9"; }}
                                  onMouseLeave={e => { e.currentTarget.style.color = theme === "light" ? "#000" : "#fff"; }}
                                >
                                  <FileText className="w-[22px] h-[22px]" />
                                </a>
                              </div>
                            </div>
                            <div className="mt-8 sm:mt-4 mb-6 text-muted-foreground text-sm flex justify-center w-full">
                              <span className="text-center">Built with React, Three.js, and interactive systems</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              {/* End of selectedProject modal content */}
              </div>
            </>
            )}
          </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}