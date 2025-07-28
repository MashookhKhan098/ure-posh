import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
  achievements: string[]
}

interface TeamSliceCarouselProps {
  teamMembers: TeamMember[]
}

const overlayColors = [
  "bg-pink-600/40",
  "bg-teal-500/40",
  "bg-blue-400/40",
  "bg-purple-500/40",
  "bg-fuchsia-600/40",
  "bg-gray-500/40",
]

export const TeamSliceCarousel: React.FC<TeamSliceCarouselProps> = ({ teamMembers }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const sliceCount = teamMembers.length
  const baseWidth = 100 / sliceCount // equal width for all slices
  const expandedWidth = 50 // expanded width when hovered
  const collapsedWidth = (100 - expandedWidth) / (sliceCount - 1) // remaining width distributed among others

  return (
    <div className="relative w-full max-w-6xl mx-auto h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] flex items-center select-none px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-full">
        {teamMembers.map((member, idx) => {
          // Calculate positions and widths based on hover state
          let left, width;
          
          if (activeIdx === null) {
            // No hover - equal distribution
            left = `${idx * baseWidth}%`;
            width = `${baseWidth}%`;
          } else if (activeIdx === idx) {
            // This is the hovered item - expanded
            left = `${idx * collapsedWidth}%`;
            width = `${expandedWidth}%`;
          } else if (idx < activeIdx) {
            // Items before the hovered item
            left = `${idx * collapsedWidth}%`;
            width = `${collapsedWidth}%`;
          } else {
            // Items after the hovered item
            left = `${expandedWidth + (idx - 1) * collapsedWidth}%`;
            width = `${collapsedWidth}%`;
          }

          const zIndex = activeIdx === idx ? 30 : 20 + idx

          return (
            <motion.div
              key={idx}
              className="absolute top-0 h-full transition-all duration-700 cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl group"
              style={{ left, width, zIndex }}
              animate={{
                left,
                width,
                zIndex,
                boxShadow: activeIdx === idx ? "0 20px 40px 0 rgba(0,0,0,0.2)" : "0 8px 25px 0 rgba(0,0,0,0.1)",
              }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                mass: 0.8
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(idx)}
              onTouchEnd={() => setActiveIdx(null)}
              whileHover={{ 
                scale: activeIdx === idx ? 1.01 : 1.005,
                y: activeIdx === idx ? -3 : -1
              }}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`object-cover w-full h-full transition-all duration-1000 ${activeIdx === idx ? "brightness-110 scale-105" : "brightness-90 scale-100"}`}
                  draggable={false}
                />
                
                {/* Gradient Overlay - Lighter */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-all duration-700 ${activeIdx === idx ? "opacity-100" : "opacity-70"}`} />
                
                {/* Overlay color - Much lighter */}
                <motion.div
                  className={`absolute inset-0 ${overlayColors[idx % overlayColors.length]} transition-all duration-700 pointer-events-none`}
                  animate={{ opacity: activeIdx === idx ? 0.1 : 0.3 }}
                />
              </div>
              
              {/* Name & Role (always visible) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-11/12 z-10">
                <motion.div 
                  className="text-white font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg tracking-wide mb-1"
                  animate={{ y: activeIdx === idx ? 0 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {member.name}
                </motion.div>
                <motion.div 
                  className="text-white/90 text-sm md:text-base font-medium drop-shadow"
                  animate={{ y: activeIdx === idx ? 0 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {member.role}
                </motion.div>
              </div>
              
              {/* Expanded info on hover/tap - Lighter background */}
              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 backdrop-blur-md px-6 py-8 text-center"
                    style={{ zIndex: 40 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <Users className="w-10 h-10 text-white mb-4 mx-auto" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-white text-xl lg:text-2xl font-bold mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {member.name}
                    </motion.div>
                    
                    <motion.div 
                      className="text-fuchsia-200 text-base lg:text-lg font-semibold mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {member.role}
                    </motion.div>
                    
                    <motion.div 
                      className="text-white/90 text-sm lg:text-base mb-6 line-clamp-3 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      {member.bio}
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-wrap justify-center gap-2 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="bg-white/25 text-white text-xs lg:text-sm rounded-full px-3 py-1.5 backdrop-blur-sm font-medium shadow-lg border border-white/30 hover:bg-white/35 transition-all duration-300">
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col items-center gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      {member.achievements.map((ach, i) => (
                        <span key={i} className="text-green-200 text-sm lg:text-base flex items-center gap-2 font-medium">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-green-300">
                            <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          {ach}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Hover Glow Effect - Lighter */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700 pointer-events-none" />
            </motion.div>
          )
        })}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {teamMembers.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              activeIdx === idx 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
} 