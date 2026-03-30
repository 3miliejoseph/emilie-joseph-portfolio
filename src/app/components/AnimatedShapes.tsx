import { motion } from "motion/react";

export function AnimatedShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Large Pink/Magenta Circle - Top Left */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full"
        style={{ 
          backgroundColor: "#FF10F0",
          boxShadow: "0 0 40px #FF10F0, 0 0 80px #FF10F0"
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neon Yellow Star - Top Center */}
      <motion.div
        className="absolute top-[8%] left-[45%]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <defs>
            <filter id="glow-yellow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M35 0 L40 30 L70 35 L40 40 L35 70 L30 40 L0 35 L30 30 Z"
            fill="#FFE600"
            filter="url(#glow-yellow)"
          />
        </svg>
      </motion.div>

      {/* Cyan Blue Rounded Rectangle - Top Right */}
      <motion.div
        className="absolute top-[18%] right-[12%] w-40 h-28 rounded-[32px]"
        style={{ 
          backgroundColor: "#00F0FF",
          boxShadow: "0 0 40px #00F0FF, 0 0 80px #00F0FF"
        }}
        animate={{
          rotate: [-5, 5, -5],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Electric Purple Arc - Left Center */}
      <motion.div
        className="absolute top-[42%] left-[15%]"
        animate={{
          rotate: [0, -15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="110" height="70" viewBox="0 0 110 70">
          <defs>
            <filter id="glow-purple">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 15 60 Q 55 -5 95 60"
            fill="none"
            stroke="#B026FF"
            strokeWidth="16"
            strokeLinecap="round"
            filter="url(#glow-purple)"
          />
        </svg>
      </motion.div>

      {/* Hot Pink Circle - Center */}
      <motion.div
        className="absolute top-[48%] left-[48%] w-24 h-24 rounded-full"
        style={{ 
          backgroundColor: "#FF0080",
          boxShadow: "0 0 40px #FF0080, 0 0 80px #FF0080"
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neon Green Rounded Square - Bottom Left */}
      <motion.div
        className="absolute bottom-[22%] left-[18%] w-36 h-36 rounded-[28px]"
        style={{ 
          backgroundColor: "#39FF14",
          boxShadow: "0 0 40px #39FF14, 0 0 80px #39FF14"
        }}
        animate={{
          rotate: [0, 8, -8, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Electric Blue Small Circle - Bottom Center */}
      <motion.div
        className="absolute bottom-[15%] left-[42%] w-20 h-20 rounded-full"
        style={{ 
          backgroundColor: "#00FFFF",
          boxShadow: "0 0 40px #00FFFF, 0 0 80px #00FFFF"
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neon Pink Pill Shape - Right Center */}
      <motion.div
        className="absolute top-[55%] right-[10%] w-48 h-24 rounded-full"
        style={{ 
          backgroundColor: "#FF006E",
          boxShadow: "0 0 40px #FF006E, 0 0 80px #FF006E"
        }}
        animate={{
          rotate: [0, 10, -10, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Neon Orange Circle - Bottom Right */}
      <motion.div
        className="absolute bottom-[25%] right-[18%] w-28 h-28 rounded-full"
        style={{ 
          backgroundColor: "#FF9500",
          boxShadow: "0 0 40px #FF9500, 0 0 80px #FF9500"
        }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Electric Red Small Square - Top Center Right */}
      <motion.div
        className="absolute top-[35%] right-[28%] w-16 h-16 rounded-2xl"
        style={{ 
          backgroundColor: "#FF003C",
          boxShadow: "0 0 30px #FF003C, 0 0 60px #FF003C"
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Violet Small Circle - Center Left */}
      <motion.div
        className="absolute top-[28%] left-[35%] w-14 h-14 rounded-full"
        style={{ 
          backgroundColor: "#9D00FF",
          boxShadow: "0 0 30px #9D00FF, 0 0 60px #9D00FF"
        }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Lime Green Rounded Rectangle - Bottom */}
      <motion.div
        className="absolute bottom-[8%] left-[60%] w-32 h-20 rounded-3xl"
        style={{ 
          backgroundColor: "#CCFF00",
          boxShadow: "0 0 40px #CCFF00, 0 0 80px #CCFF00"
        }}
        animate={{
          rotate: [-8, 8, -8],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}