import { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";
import { useTheme } from "next-themes";

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle music change when theme changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Reload the audio source when theme changes
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Playback failed after theme change:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [theme, isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        {theme === "dark" ? (
          <source src="https://cdn.jsdelivr.net/gh/3miliejoseph/emilie-joseph-portfolio/public/MJ%20Human%20Nature.mp3" type="audio/mpeg" />
        ) : (
          <source src="https://cdn.jsdelivr.net/gh/3miliejoseph/emilie-joseph-portfolio/public/Here%20Comes%20The%20Sun.mp3" type="audio/mpeg" />
        )}
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
