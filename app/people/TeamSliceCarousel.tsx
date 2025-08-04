import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search } from "lucide-react"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const sliceCount = teamMembers.length
  const baseWidth = 100 / sliceCount // equal width for all slices
  const expandedWidth = 50 // expanded width when hovered
  const collapsedWidth = (100 - expandedWidth) / (sliceCount - 1) // remaining width distributed among others

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="relative w-full max-w-6xl mx-auto h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] flex flex-col items-center select-none px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="w-full max-w-md mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search people by name, role, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-lg"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="w-full max-w-4xl mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{member.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.expertise.slice(0, 2).map((skill, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Carousel - With hover effects */}
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
              style={{ left, width, zIndex: 20 + idx }}
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
              whileHover={{ 
                scale: 1.01,
                y: -3
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
                <div className="text-white font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg tracking-wide mb-1">
                  {member.name}
                </div>
                <div className="text-white/90 text-sm md:text-base font-medium drop-shadow">
                  {member.role}
                </div>
              </div>
              
              {/* Small Info on Hover */}
              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center items-center px-4 py-6 text-center"
                    style={{ zIndex: 40 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="mb-3"
                    >
                      <Users className="w-8 h-8 text-white mx-auto" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-white text-lg lg:text-xl font-bold mb-2"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {member.name}
                    </motion.div>
                    
                    <motion.div 
                      className="text-blue-200 text-sm lg:text-base font-semibold mb-3"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {member.role}
                    </motion.div>
                    
                    <motion.div 
                      className="text-white/90 text-xs lg:text-sm mb-4 line-clamp-2 leading-relaxed"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      {member.bio}
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-wrap justify-center gap-1.5 mb-3"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      {member.expertise.slice(0, 2).map((skill, i) => (
                        <span key={i} className="bg-white/20 text-white text-xs rounded-full px-2 py-1 backdrop-blur-sm font-medium border border-white/30">
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="flex flex-col items-center gap-1"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      {member.achievements.slice(0, 1).map((ach, i) => (
                        <span key={i} className="text-green-200 text-xs flex items-center gap-1 font-medium">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-green-300">
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
    </div>
  )
} 