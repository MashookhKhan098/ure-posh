import React, { useState, useEffect, useCallback } from 'react';
import { Scale, Users, Briefcase, Lightbulb, Target, Zap, Compass, ArrowRight, Star, Award, Sparkles, Mail, Linkedin, Github, MapPin, Calendar, Trophy, X } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  specialization: string;
  description: string;
  longDescription: string;
  icon: any;
  color: string;
  accentColor: string;
  image?: string;
  achievements: string[];
  skills: string[];
  experience: string;
  location: string;
  email: string;
  linkedin: string;
  github?: string;
}

const mockMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adv Shrigarika",
    title: "Legal Advisor",
    specialization: "Legal Compliance & POSH",
    description: "Expert in workplace harassment prevention and legal compliance",
    longDescription: "Adv Shrigarika brings extensive experience in legal compliance and workplace harassment prevention. She specializes in POSH (Prevention of Sexual Harassment) policies and ensures organizations maintain a safe and compliant work environment.",
    icon: Scale,
    color: "from-purple-500 via-pink-500 to-rose-500",
    accentColor: "bg-purple-500",
    image: "/images/URE%20POSH_/Adv%20Shrigarika.jpg",
    achievements: ["Legal Expert", "POSH Specialist", "Compliance Leader"],
    skills: ["Legal Compliance", "POSH Policies", "Workplace Safety", "Legal Advisory"],
    experience: "12+ Years",
    location: "India",
    email: "shrigarika@ureposh.com",
    linkedin: "linkedin.com/in/shrigarika"
  },
  {
    id: 2,
    name: "CA Shweta",
    title: "Chartered Accountant",
    specialization: "Financial Compliance & Audit",
    description: "Ensuring financial transparency and regulatory compliance",
    longDescription: "CA Shweta is a qualified Chartered Accountant with expertise in financial compliance, audit, and regulatory requirements. She ensures organizations maintain proper financial governance and compliance with statutory requirements.",
    icon: Briefcase,
    color: "from-blue-500 via-cyan-500 to-teal-500",
    accentColor: "bg-blue-500",
    image: "/images/URE%20POSH_/Ca%20Shweta%20.jpg",
    achievements: ["CA Qualified", "Audit Expert", "Financial Compliance Specialist"],
    skills: ["Financial Audit", "Compliance", "Tax Planning", "Financial Advisory"],
    experience: "10+ Years",
    location: "India",
    email: "shweta@ureposh.com",
    linkedin: "linkedin.com/in/cashweta"
  },
  {
    id: 3,
    name: "CS Aanchal",
    title: "Company Secretary",
    specialization: "Corporate Governance & Compliance",
    description: "Expert in corporate governance and statutory compliance",
    longDescription: "CS Aanchal is a qualified Company Secretary specializing in corporate governance, board management, and statutory compliance. She ensures organizations meet their regulatory obligations and maintain high standards of corporate governance.",
    icon: Users,
    color: "from-emerald-500 via-green-500 to-teal-500",
    accentColor: "bg-emerald-500",
    image: "/images/URE%20POSH_/CS%20Aanchal%20_1.jpeg",
    achievements: ["CS Qualified", "Governance Expert", "Compliance Specialist"],
    skills: ["Corporate Governance", "Board Management", "Regulatory Compliance", "Legal Documentation"],
    experience: "8+ Years",
    location: "India",
    email: "aanchal@ureposh.com",
    linkedin: "linkedin.com/in/csaanchal"
  },
  {
    id: 4,
    name: "CS Sarvargya",
    title: "Company Secretary",
    specialization: "Legal & Regulatory Affairs",
    description: "Specialized in legal documentation and regulatory compliance",
    longDescription: "CS Sarvargya brings expertise in legal affairs, regulatory compliance, and corporate secretarial practice. He assists organizations in navigating complex regulatory requirements and maintaining proper legal documentation.",
    icon: Target,
    color: "from-orange-500 via-red-500 to-pink-500",
    accentColor: "bg-orange-500",
    image: "/images/URE%20POSH_/CS%20Sarvargya%20_2.jpg",
    achievements: ["CS Professional", "Legal Expert", "Regulatory Specialist"],
    skills: ["Legal Documentation", "Regulatory Affairs", "Corporate Law", "Compliance Management"],
    experience: "7+ Years",
    location: "India",
    email: "sarvargya@ureposh.com",
    linkedin: "linkedin.com/in/cssarvargya"
  },
  {
    id: 5,
    name: "Pankaj",
    title: "Business Consultant",
    specialization: "Strategic Planning & Operations",
    description: "Driving business growth through strategic planning and operations",
    longDescription: "Pankaj is an experienced business consultant who specializes in strategic planning, operational efficiency, and business development. He helps organizations optimize their processes and achieve sustainable growth.",
    icon: Lightbulb,
    color: "from-indigo-500 via-purple-500 to-violet-500",
    accentColor: "bg-indigo-500",
    image: "/images/URE%20POSH_/Pankaj%202.jpeg",
    achievements: ["Business Strategy Expert", "Operations Specialist", "Growth Consultant"],
    skills: ["Strategic Planning", "Business Development", "Operations Management", "Process Optimization"],
    experience: "11+ Years",
    location: "India",
    email: "pankaj@ureposh.com",
    linkedin: "linkedin.com/in/pankaj"
  },
  {
    id: 6,
    name: "Pradeep",
    title: "Operations Manager",
    specialization: "Operations & Process Management",
    description: "Optimizing operations for maximum efficiency and compliance",
    longDescription: "Pradeep is an operations expert focused on process management, operational efficiency, and quality assurance. He ensures smooth operations while maintaining compliance with all regulatory requirements.",
    icon: Compass,
    color: "from-slate-600 via-gray-700 to-zinc-800",
    accentColor: "bg-slate-600",
    image: "/images/URE%20POSH_/Pradeep.jpeg",
    achievements: ["Operations Excellence", "Process Management", "Quality Assurance"],
    skills: ["Operations Management", "Process Improvement", "Quality Control", "Team Leadership"],
    experience: "9+ Years",
    location: "India",
    email: "pradeep@ureposh.com",
    linkedin: "linkedin.com/in/pradeep"
  }
];

// Floating particle component
const FloatingParticle = ({ delay, duration, className }: { delay: number; duration: number; className: string }) => (
  <div
    className={`absolute w-1 h-1 bg-white/20 rounded-full animate-pulse ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  />
);

export default function EnhancedTeamPage({ members = mockMembers }: { members?: TeamMember[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMemberHover = useCallback((memberId: number | null) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setHoveredId(memberId);
    
    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const handleMemberClick = useCallback((member: TeamMember) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto'; // Restore scroll
  }, []);

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const particles = React.useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      left: Math.random() * 100,
      top: Math.random() * 100
    })), []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Orbs with smoother animations */}
        <div className="absolute top-1/4 left-1/6 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl" />
        
        {/* Secondary Effects */}
        <div className="absolute top-1/6 right-1/3 w-[250px] h-[250px] bg-emerald-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/6 left-1/3 w-[300px] h-[300px] bg-rose-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Optimized Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <FloatingParticle
              key={particle.id}
              delay={particle.delay}
              duration={particle.duration}
              className={`left-[${particle.left}%] top-[${particle.top}%]`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Responsive Team Slider with Balanced Hover */}
      <div className="relative z-10 w-full pt-12 pb-0 lg:pt-16 lg:pb-0 px-4 sm:px-8">
        <div className="flex justify-center">
          <div className="relative w-full max-w-7xl">
            {/* Outer Glow Container */}
            <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-2xl lg:rounded-3xl blur-xl opacity-60" />
            
            <div className="relative flex rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-2xl border border-white/10 min-h-[450px] lg:min-h-[550px]">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className={`relative cursor-pointer transition-all duration-700 ease-out group ${
                    hoveredId === member.id 
                      ? 'w-[40%] lg:w-[35%]' // Reduced expansion - was flex-grow
                      : hoveredId !== null 
                      ? 'w-[12%] lg:w-[13%] flex-shrink-0' // Increased width for non-hovered - was w-16/w-20/w-14
                      : 'flex-1'
                  }`}
                  onMouseEnter={() => handleMemberHover(member.id)}
                  onMouseLeave={() => handleMemberHover(null)}
                  onClick={() => handleMemberClick(member)}
                >
                  {/* Background Image with Enhanced Overlay */}
                  {member.image ? (
                    <div 
                      className="h-[450px] lg:h-[550px] w-full bg-cover bg-center bg-no-repeat relative"
                      style={{ backgroundImage: `url(${member.image})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-50 transition-all duration-700`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Hover Enhancement Lines */}
                      <div className={`absolute left-0 top-0 w-1 h-full ${member.accentColor} transform transition-all duration-500 ${hoveredId === member.id ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`} />
                      <div className={`absolute right-0 top-0 w-1 h-full ${member.accentColor} transform transition-all duration-500 ${hoveredId === member.id ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`} style={{ transitionDelay: '100ms' }} />
                    </div>
                  ) : (
                    <div className={`h-[450px] lg:h-[550px] w-full bg-gradient-to-br ${member.color} flex items-center justify-center relative`}>
                      <member.icon className="h-16 w-16 lg:h-24 lg:w-24 text-white opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Collapsed State - Enhanced for Mobile */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-end p-4 lg:p-8 transition-all duration-500 ${
                    hoveredId === member.id ? 'opacity-0 pointer-events-none transform translate-y-4' : 'opacity-100'
                  }`}>
                    <div className="text-center space-y-2 lg:space-y-4">
                      {/* Professional Badge */}
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 lg:py-3 mb-2 lg:mb-4 border border-white/20">
                        <member.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white mx-auto mb-1 lg:mb-2" />
                        <div className={`w-6 lg:w-8 h-0.5 lg:h-1 ${member.accentColor} rounded-full mx-auto`} />
                      </div>
                      
                      {/* Name - Horizontal Only */}
                      <div>
                        <h3 className="text-white text-sm lg:text-lg font-bold tracking-wider">
                          {member.name}
                        </h3>
                        <p className="text-gray-300 text-xs lg:text-sm font-medium">
                          {member.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded State - Responsive Design */}
                  <div className={`absolute inset-0 flex flex-col justify-between p-4 lg:p-8 transition-all duration-700 ${
                    hoveredId === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}>
                    {/* Top Section */}
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 lg:w-20 h-1 lg:h-2 ${member.accentColor} rounded-full shadow-lg transform origin-left transition-all duration-500 ${hoveredId === member.id ? 'scale-x-100' : 'scale-x-0'}`} />
                        <div className="flex gap-1 lg:gap-2">
                          {member.achievements.slice(0, 2).map((achievement, i) => (
                            <div key={i} className="bg-yellow-500/20 backdrop-blur-sm rounded-full p-1.5 lg:p-2 transform transition-all duration-300">
                              <Trophy className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Professional Icon */}
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className={`p-2.5 lg:p-4 ${member.accentColor} rounded-xl lg:rounded-2xl shadow-xl transform transition-all duration-300`}>
                          <member.icon className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div className="text-white">
                          <div className="text-xs lg:text-sm text-gray-300 font-medium">{member.specialization}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="h-2.5 w-2.5 lg:h-3 lg:w-3" />
                            <span>{member.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="text-white space-y-3 lg:space-y-6 flex-1 py-2 lg:py-4">
                      {/* Name & Title */}
                      <div>
                        <h2 className="text-2xl lg:text-4xl font-black leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-1 lg:mb-2">
                          {member.name}
                        </h2>
                        <p className="text-cyan-300 font-bold text-base lg:text-xl mb-1">
                          {member.title}
                        </p>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span className="text-xs lg:text-sm">{member.location}</span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                        {member.description}
                      </p>
                      
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {member.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="bg-white/10 backdrop-blur-sm text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs font-medium border border-white/20 transform transition-all duration-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-3 lg:space-y-4">
                      {/* Key Achievements */}
                      <div className="space-y-1.5 lg:space-y-2">
                        {member.achievements.slice(0, 2).map((achievement, i) => (
                          <div key={i} className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-1">
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-cyan-400 rounded-full shadow-lg animate-pulse" />
                            <span className="text-xs lg:text-sm text-gray-300 font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 lg:gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMemberClick(member);
                          }}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="flex gap-1.5 lg:gap-2">
                          <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-110">
                            <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
                          </button>
                          <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-110">
                            <Linkedin className="h-3 w-3 lg:h-4 lg:w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-700 ${
                    hoveredId === member.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Slide Indicator */}
                  <div className={`absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 lg:h-1 bg-white/30 rounded-full transition-all duration-500 ${
                    hoveredId === member.id ? 'bg-cyan-400 w-12 lg:w-16' : 'w-8 lg:w-12'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member Profile Modal (if selectedMember) */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal} // Click on backdrop closes modal
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={e => e.stopPropagation()} // Prevent modal click from closing
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg border border-gray-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            {/* Modal Content (example, you can customize) */}
            <div className="flex flex-col items-center gap-4">
              <selectedMember.icon className="h-16 w-16 text-cyan-500" />
              <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
              <p className="text-cyan-600 font-semibold">{selectedMember.title}</p>
              <p className="text-gray-700 text-center">{selectedMember.longDescription}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedMember.skills.map((skill, i) => (
                  <span key={i} className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <a href={`mailto:${selectedMember.email}`} className="text-cyan-600 hover:underline flex items-center gap-1">
                  <Mail className="h-4 w-4" /> {selectedMember.email}
                </a>
                <a href={`https://${selectedMember.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                {selectedMember.github && (
                  <a href={`https://${selectedMember.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline flex items-center gap-1">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}