"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Award, Shield, Heart, CheckCircle, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
  achievements: string[]
  stats: string
}

interface TeamCarouselProps {
  teamMembers: TeamMember[]
}

const overlayColors = [
  "bg-pink-600/70",
  "bg-teal-500/70",
  "bg-blue-400/70",
  "bg-purple-500/70",
  "bg-fuchsia-600/70",
  "bg-gray-500/70",
]

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ teamMembers }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const sliceCount = teamMembers.length
  const collapsedWidth = 100 / (sliceCount + 1) // percent
  const expandedWidth = 40 // percent

  return (
    <div className="relative w-full max-w-4xl h-80 mx-auto flex items-center select-none">
      <div className="relative w-full h-full">
        {teamMembers.map((member, idx) => {
          // Calculate left position for each slice
          const left = activeIdx === null
            ? `${idx * collapsedWidth}%`
            : idx < activeIdx
              ? `${idx * ( (100 - expandedWidth) / (sliceCount - 1) )}%`
              : idx === activeIdx
                ? `${idx * ( (100 - expandedWidth) / (sliceCount - 1) )}%`
                : `${( (idx - 1) * ( (100 - expandedWidth) / (sliceCount - 1) ) ) + expandedWidth}%`

          const width = activeIdx === null
            ? `${collapsedWidth}%`
            : idx === activeIdx
              ? `${expandedWidth}%`
              : `${(100 - expandedWidth) / (sliceCount - 1)}%`

          const zIndex = activeIdx === idx ? 30 : 20 + idx

          return (
            <motion.div
              key={idx}
              className="absolute top-0 h-full transition-all duration-500 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
              style={{ left, width, zIndex }}
              animate={{
                left,
                width,
                zIndex,
                boxShadow: activeIdx === idx ? "0 8px 32px 0 rgba(0,0,0,0.25)" : "0 2px 8px 0 rgba(0,0,0,0.10)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(idx)}
              onTouchEnd={() => setActiveIdx(null)}
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className={`object-cover w-full h-full transition-all duration-500 ${activeIdx === idx ? "brightness-100" : "brightness-75"}`}
                draggable={false}
              />
              {/* Overlay color */}
              <motion.div
                className={`absolute inset-0 ${overlayColors[idx % overlayColors.length]} transition-all duration-500 pointer-events-none`}
                animate={{ opacity: activeIdx === idx ? 0.3 : 0.7 }}
              />
              {/* Name & Role (always visible, but more info on expand) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-11/12">
                <div className="text-white font-bold text-base md:text-lg drop-shadow-lg tracking-wide">
                  {member.name}
                </div>
                <div className="text-white/80 text-xs md:text-sm font-medium drop-shadow">
                  {member.role}
                </div>
              </div>
              {/* Expanded info on hover/tap */}
              <AnimatePresence>
                {activeIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 px-4 py-6 text-center"
                    style={{ zIndex: 40 }}
                  >
                    <Users className="w-8 h-8 text-white mb-2" />
                    <div className="text-white text-lg font-bold mb-1">{member.name}</div>
                    <div className="text-fuchsia-200 text-sm font-semibold mb-2">{member.role}</div>
                    <div className="text-white/90 text-sm mb-3 line-clamp-3">{member.bio}</div>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full font-semibold text-sm shadow-lg mb-3">
                      {member.stats}
                    </Badge>
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="bg-white/20 text-white text-xs rounded px-2 py-0.5 mr-1 mb-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {member.achievements.map((ach, i) => (
                        <span key={i} className="text-green-200 text-xs flex items-center gap-1">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                          {ach}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 