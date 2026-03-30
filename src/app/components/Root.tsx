import { Outlet, Link, useLocation } from "react-router";
import { MobileSun } from "./MobileSun";
import { Menu, X, Moon, Volume2, VolumeX, Home, Linkedin, Github, FileText } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MusicProvider, useMusic } from "../contexts/MusicContext";

function RootContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isPlaying, toggleMusic } = useMusic();

  const navItems = [
    { path: "/", label: "Work" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100]">
        <div className="mx-4 mt-4 sm:mx-6 lg:mx-[30px] flex justify-center">
          <div 
            className="backdrop-blur-[20px] border rounded-full px-[14px]" 
            style={{ 
              borderColor: theme === "light" ? "rgba(255, 165, 0, 0.3)" : "rgba(139, 92, 246, 0.3)",
              backgroundColor: theme === "light" ? "rgba(250, 248, 245, 0.4)" : "rgba(0, 0, 0, 0.4)",
              boxShadow: theme === "light" 
                ? "0 8px 32px 0 rgba(255, 165, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)"
                : "0 8px 32px 0 rgba(139, 92, 246, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
            }}
          >
            <div className="flex justify-between items-center h-14 md:h-16">
              {/* Navigation - Centered on all screen sizes */}
              <div className="flex items-center gap-3 md:gap-12">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-xs md:text-sm transition-colors"
                    style={{
                      color: isActive(item.path)
                        ? theme === "light"
                          ? "#FFA500"
                          : "#E879F9"
                        : "",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.currentTarget.style.color = "";
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://drive.google.com/file/d/1EuN8mWnQP6zZKy7y-yRidjpiSqzAftEI/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm transition-colors"
                  style={{ color: theme === "light" ? (isActive("/resume") ? "#FFA500" : "#222") : (isActive("/resume") ? "#E879F9" : "#fff") }}
                  onMouseEnter={e => { e.currentTarget.style.color = theme === 'light' ? '#FFA500' : '#E879F9'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = theme === 'light' ? '#222' : '#fff'; }}
                >
                  Resume
                </a>
                <a
                  href="mailto:emilieneha@gmail.com"
                  className="text-xs md:text-sm transition-colors px-4 py-3.5 border rounded-full md:border-border md:hover:bg-accent"
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
                  onMouseEnter={(e) => {
                    if (theme === "light") {
                      e.currentTarget.style.backgroundColor = "#FFD700";
                    } else {
                      e.currentTarget.style.backgroundColor = "#8B5CF6";
                    }
                  }}
                  onMouseLeave={(e) => {
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="pt-24 md:pt-20">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-2 pb-8 sm:pt-4 sm:pb-12">
        <div className="w-full px-3 sm:px-4 lg:px-[15px]">
          <div className="lg:px-[79px]">
            <div
              className="border-t-[1.5px] mb-0"
              style={{ borderColor: theme === "light" ? "rgba(255, 165, 0, 0.35)" : "rgba(139, 92, 246, 0.35)" }}
            ></div>
            <div className="flex flex-col items-start gap-3">
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
                  style={{ fontFamily: '"Bangla MN", serif', left: '-26px', top: '8px', color: theme === "light" ? "#000" : "#fff" }}
                  id="footer-emilie-joseph"
                >
                  Emilie Joseph
                </span>
              </div>

              {/* Let's Connect and Email */}
              <div style={{ position: 'relative', left: '198px', top: '-28px' }}>
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#000" : "#fff";
                    }}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#000" : "#fff";
                    }}
                  >
                    <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1EuN8mWnQP6zZKy7y-yRidjpiSqzAftEI/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors flex items-center"
                    style={{ color: theme === "light" ? "#000" : "#fff" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#FFA500" : "#E879F9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme === "light" ? "#000" : "#fff";
                    }}
                  >
                    <FileText className="w-[22px] h-[22px]" />
                  </a>
                </div>
              </div>
              <div className="mt-4 mb-6 text-muted-foreground text-sm flex justify-center w-full">
                <span className="text-center">Built with React, Three.js, and interactive systems</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Root() {
  return (
    <MusicProvider>
      <RootContent />
    </MusicProvider>
  );
}