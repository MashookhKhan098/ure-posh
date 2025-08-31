"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


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
                    {/* All icons removed from expanded view */}
                    <div className="text-white text-lg font-bold mb-1">{member.name}</div>
                    <div className="text-fuchsia-200 text-sm font-semibold mb-2">{member.role}</div>
                    <div className="text-white/90 text-sm mb-3 line-clamp-3">{member.bio}</div>
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

const teamData = [
  {
    name: "Pradeep Kumar",
    specialization: "POSH Expert - IC Enquiry Redressal",
    experience: "10 Years",
    education: "LLB, M.Com, M.A Eco",
    linkedin: "https://www.linkedin.com/in/pradeepadv/",
    about: `Pradeep Kumar is a seasoned legal and compliance professional with 12+ years of experience in taxation, litigation, corporate governance, fundraising, and workplace safety. As a certified POSH (Prevention of Sexual Harassment) consultant, he has been instrumental in helping organizations create safe, inclusive, and legally compliant workplaces across industries including FMCG, defense, banking, manufacturing, real estate, and startups.

With a strong foundation in law (LLB), commerce (B.Com, M.Com), and professional qualifications (CA & CS Inter), Pradeep combines legal expertise with practical corporate insights. Over the past decade, he has:
Conducted 100+ POSH awareness sessions and IC trainings for corporates, PSUs, and startups.

Guided 90+ MNC/organizations in forming and strengthening Internal Committees (IC) in line with the POSH Act, 2013.
Advised on sensitive workplace harassment cases with confidentiality, fairness, and neutrality.

Drafted and implemented POSH policies & compliance reports aligned with Indian law, ILO guidelines, and ESG standards.
Alongside POSH, Pradeep has successfully managed litigation before High Courts, ITAT, and regulatory bodies, raised INR 329 Cr in equity and debt for businesses, and carried out statutory audits for leading banks and corporates.
Today, he brings this unique blend of legal, financial, and workplace compliance expertise to help organizations not just meet statutory obligations but also build cultures of respect, trust, and inclusion.`,
    email: "pradeep@ureposh.com, pradeeep.adv@hotmail.com"
  },
  {
    name: "Shringarika Tyagi",
    specialization: "External Member - POSH Expert - IC Enquiry Redressal",
    experience: "5 Years and Law Practice",
    education: "M.Phil and LLB",
    linkedin: "https://www.linkedin.com/in/shringarika-tyagi-8893a2361",
    about: `Shringarika Tyagi is a POSH Expert and practicing lawyer with 5 years of experience in workplace compliance and IC enquiries. As an External Member on Internal Committees, she specializes in enquiry redressal, POSH policy drafting, and IC/employee training. With an M.Phil and LLB, she combines strong legal knowledge with practical expertise to help organizations build safe and compliant workplaces.`,
    email: "Shrigarika@ureposh.com"
  },
  {
    name: "Pankaj Jha",
    specialization: "External Member - POSH Expert - IC Enquiry Redressal",
    experience: "5 Years POSH compliance and Law Practice",
    education: "LLM, LLB and BBA",
    linkedin: "https://www.linkedin.com/in/advocate-pankaj-jha-30947b36/",
    about: `Pankaj Jha is a POSH Expert and legal professional with 5 years of experience in POSH compliance and law practice. As an External Member on Internal Committees (ICs), he specializes in enquiry redressal, compliance advisory, and policy implementation under the POSH Act, 2013. With qualifications in LLM, LLB, and BBA, he brings a strong legal and business perspective to building safe, inclusive, and compliant workplaces.`,
    email: "pankaj@poshlaw.com"
  },
  {
    name: "CA Shweta Gupta",
    specialization: "External Member - POSH Expert - IC Enquiry Redressal",
    experience: "5 Year Corporate Professional - Financial Reporting",
    education: "B.Com, CA (ICAI)",
    linkedin: "",
    about: `CA Shweta Gupta is a POSH Expert and corporate professional with 5 years of experience in financial reporting and compliance. Serving as an External Member on Internal Committees (ICs), she brings expertise in POSH enquiry redressal, compliance audits, and workplace governance. A qualified Chartered Accountant (ICAI) with a B.Com degree, she blends her corporate background with POSH advisory to help organizations maintain safe, transparent, and compliant workplaces.`,
    email: "Shweta@ureposh.com"
  },
  {
    name: "CS Aanchal Chopra",
    specialization: "External Member - POSH Expert - IC Enquiry Redressal",
    experience: "5 Year Corporate Professional - Compliance Financial Reporting",
    education: "B.Com and CS (ICSI)",
    linkedin: "https://www.linkedin.com/in/aanchal-chopra-03ba861b6/",
    about: `CS Aanchal Chopra is a POSH Expert and corporate compliance professional with 5 years of experience in compliance management and financial reporting. As an External Member on Internal Committees (ICs), she specializes in POSH enquiry redressal, policy compliance, and workplace governance. A qualified Company Secretary (ICSI) with a B.Com degree, she combines her legal-corporate expertise with POSH advisory to ensure safe, ethical, and compliant workplaces.`,
    email: "aanchal@ureposh.com"
  }
];