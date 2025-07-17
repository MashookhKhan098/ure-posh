"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PeopleSection = () => {
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const teamMembers = [
    {
      name: "Dr Priya Sharma",
      role: "Founder & CEO",
      image: "/images/2.jpg",
      description:
        "Leading workplace transformation with 15+ years of experience in organizational psychology and compliance.",
      expertise: [
        "Organizational Psychology",
        "Compliance Strategy",
        "Leadership Development"
      ],
      stats: "500+ Organizations Transformed"
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Legal & Compliance",
      image: "/images/3.jpg",
      description:
        "Expert in POSH Act implementation with deep understanding of Indian workplace regulations.",
      expertise: ["Legal Compliance", "Policy Development", "Risk Management"],
      stats: "99.2% Compliance Rate"
    },
    {
      name: "Anjali Mehta",
      role: "Director of Training",
      image: "/images/4.jpg",
      description:
        "Specialist in creating engaging, culturally-sensitive training programs for diverse workplaces.",
      expertise: ["Training Design", "Cultural Sensitivity", "Adult Learning"],
      stats: "75,000+ Professionals Trained"
    },
    {
      name: "Suresh Patel",
      role: "Head of Technology",
      image: "/images/5.jpg",
      description:
        "Driving innovation in compliance technology with AI-powered solutions for workplace safety.",
      expertise: ["Technology Innovation", "AI Solutions", "Digital Transformation"],
      stats: "24/7 Support System"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Global Leadership Team
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Meet the experts transforming workplaces and empowering lives.
          </p>
        </div>

        {/* Horizontal Strip with Hover Reveal */}
        <div className="flex items-stretch justify-center overflow-hidden rounded-2xl relative h-[400px]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-[25%] h-full flex-shrink-0 overflow-hidden cursor-pointer group transition-all duration-500"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={600}
                className="object-cover object-center h-full w-full group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-end p-3 text-white z-10">
                <p className="text-sm font-semibold leading-tight">
                  {member.name}
                </p>
                <p className="text-xs text-gray-300">{member.role}</p>
              </div>

              {/* Popup Full Profile */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-white text-black z-50 shadow-2xl rounded-xl p-5 overflow-y-auto"
                >
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-blue-700 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm mb-3 leading-relaxed">
                    {member.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">
                      Expertise:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {member.expertise.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-green-700">
                    {member.stats}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gray-900 text-white rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-cyan-300">150+</p>
              <p className="text-sm mt-2">Projects Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pink-300">98%</p>
              <p className="text-sm mt-2">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400">50+</p>
              <p className="text-sm mt-2">Industry Awards</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-400">24/7</p>
              <p className="text-sm mt-2">Expert Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
