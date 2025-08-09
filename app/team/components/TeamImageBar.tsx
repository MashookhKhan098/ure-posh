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
    name: "Shringarika",
    title: "Lead Designer",
    specialization: "UI/UX Design",
    description: "Crafting intuitive experiences that users love",
    longDescription: "With over 8 years of experience in design, Sarah specializes in creating user-centered digital experiences that seamlessly blend aesthetics with functionality. She leads our design team with a passion for innovation and attention to detail.",
    icon: Compass,
    color: "from-purple-500 via-pink-500 to-rose-500",
    accentColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b566?w=400&h=600&fit=crop&crop=face",
    achievements: ["Design Awards 2024", "User Experience Expert", "Design Thinking Leader"],
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    experience: "8+ Years",
    location: "San Francisco, CA",
    email: "sarah.chen@company.com",
    linkedin: "linkedin.com/in/sarahchen",
    github: "github.com/sarahchen"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Senior Developer",
    specialization: "Full Stack Development",
    description: "Building scalable solutions with cutting-edge tech",
    longDescription: "Marcus is a versatile full-stack developer with expertise in modern web technologies. He architected our core platform and mentors junior developers while staying at the forefront of emerging technologies.",
    icon: Zap,
    color: "from-blue-500 via-cyan-500 to-teal-500",
    accentColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    achievements: ["Tech Lead", "Open Source Contributor", "Cloud Architecture Expert"],
    skills: ["React", "Node.js", "Python", "Cloud Architecture"],
    experience: "10+ Years",
    location: "Austin, TX",
    email: "marcus.rodriguez@company.com",
    linkedin: "linkedin.com/in/marcusrodriguez",
    github: "github.com/marcusrodriguez"
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Product Manager",
    specialization: "Strategy & Innovation",
    description: "Driving product vision and strategic growth",
    longDescription: "Emily combines analytical thinking with creative problem-solving to drive product strategy. She has successfully launched 15+ products and has a proven track record of turning complex requirements into user-friendly solutions.",
    icon: Target,
    color: "from-emerald-500 via-green-500 to-teal-500",
    accentColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
    achievements: ["Product Innovation Award", "Strategy Expert", "Agile Certified"],
    skills: ["Product Strategy", "Data Analysis", "Roadmapping", "Stakeholder Management"],
    experience: "7+ Years",
    location: "New York, NY",
    email: "emily.johnson@company.com",
    linkedin: "linkedin.com/in/emilyjohnson"
  },
  {
    id: 4,
    name: "David Park",
    title: "Creative Director",
    specialization: "Brand & Visual Identity",
    description: "Creating memorable brands that stand out",
    longDescription: "David brings brands to life through compelling visual narratives. His creative vision has helped shape the identity of Fortune 500 companies and innovative startups alike, always pushing creative boundaries.",
    icon: Lightbulb,
    color: "from-orange-500 via-red-500 to-pink-500",
    accentColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    achievements: ["Creative Excellence", "Brand Specialist", "International Design Award"],
    skills: ["Brand Strategy", "Visual Design", "Motion Graphics", "Creative Direction"],
    experience: "12+ Years",
    location: "Los Angeles, CA",
    email: "david.park@company.com",
    linkedin: "linkedin.com/in/davidpark",
    github: "github.com/davidpark"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Business Analyst",
    specialization: "Data & Analytics",
    description: "Turning data into actionable insights",
    longDescription: "Lisa transforms complex data into strategic insights that drive business decisions. Her analytical expertise helps teams make data-driven choices that accelerate growth and optimize performance.",
    icon: Scale,
    color: "from-indigo-500 via-purple-500 to-violet-500",
    accentColor: "bg-indigo-500",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
    achievements: ["Data Science Certified", "Analytics Expert", "Business Intelligence Leader"],
    skills: ["SQL", "Python", "Tableau", "Statistical Analysis"],
    experience: "9+ Years",
    location: "Chicago, IL",
    email: "lisa.thompson@company.com",
    linkedin: "linkedin.com/in/lisathompson"
  },
  {
    id: 6,
    name: "Alex Kim",
    title: "Tech Lead",
    specialization: "Architecture & Systems",
    description: "Building robust, scalable architectures",
    longDescription: "Alex designs and implements large-scale system architectures that handle millions of users. His expertise in distributed systems and performance optimization ensures our platform scales seamlessly.",
    icon: Briefcase,
    color: "from-slate-600 via-gray-700 to-zinc-800",
    accentColor: "bg-slate-600",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    achievements: ["System Architecture", "Performance Optimization", "Cloud Native Expert"],
    skills: ["Kubernetes", "Microservices", "DevOps", "System Design"],
    experience: "11+ Years",
    location: "Seattle, WA",
    email: "alex.kim@company.com",
    linkedin: "linkedin.com/in/alexkim",
    github: "github.com/alexkim"
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

      {/* Enhanced Header Section */}
      <div className="relative z-10 text-center py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-4 mb-8 bg-white/5 backdrop-blur-sm rounded-full px-6 lg:px-8 py-3 lg:py-4 border border-white/10 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-6 w-6 lg:h-7 lg:w-7 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-semibold text-base lg:text-lg">Meet Our Elite Team</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 lg:mb-8 leading-tight">
            The Minds Behind
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Innovation
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 lg:mb-12 px-4">
            A carefully curated team of industry leaders, creative visionaries, and technical experts 
            who transform ambitious ideas into extraordinary digital experiences
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm lg:text-base text-gray-400">
            {[
              { icon: Award, text: "50+ Awards Won", color: "text-yellow-400" },
              { icon: Star, text: "100+ Projects Delivered", color: "text-cyan-400" },
              { icon: Users, text: "Global Recognition", color: "text-purple-400" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${item.color}`} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Responsive Team Slider with Balanced Hover */}
      <div className="relative z-10 w-full py-8 lg:py-12 px-4 sm:px-8">
        <div className="flex justify-center">
          <div className="relative w-full max-w-7xl">
            {/* Outer Glow Container */}
            <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-2xl lg:rounded-3xl blur-xl opacity-60" />
            
            <div className="relative flex rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-2xl border border-white/10 min-h-[400px] lg:min-h-[500px]">
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
                      className="h-[400px] lg:h-[500px] w-full bg-cover bg-center bg-no-repeat relative"
                      style={{ backgroundImage: `url(${member.image})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-50 transition-all duration-700`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Hover Enhancement Lines */}
                      <div className={`absolute left-0 top-0 w-1 h-full ${member.accentColor} transform transition-all duration-500 ${hoveredId === member.id ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`} />
                      <div className={`absolute right-0 top-0 w-1 h-full ${member.accentColor} transform transition-all duration-500 ${hoveredId === member.id ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`} style={{ transitionDelay: '100ms' }} />
                    </div>
                  ) : (
                    <div className={`h-[400px] lg:h-[500px] w-full bg-gradient-to-br ${member.color} flex items-center justify-center relative`}>
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

      {/* Responsive Team Stats Bar */}
      <div className="relative z-10 py-12 lg:py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-black/30 via-black/10 to-black/30 backdrop-blur-xl rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
              {[
                { value: "150+", label: "Projects Delivered", color: "text-cyan-400" },
                { value: "98%", label: "Client Satisfaction", color: "text-purple-400" },
                { value: "50+", label: "Industry Awards", color: "text-green-400" },
                { value: "24/7", label: "Expert Support", color: "text-orange-400" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2 transform transition-all duration-300 hover:scale-105">
                  <div className={`text-3xl lg:text-4xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-300 font-medium text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Responsive CTA Section */}
      <div className="relative z-10 text-center py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-2xl rounded-2xl lg:rounded-3xl p-8 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-6 lg:mb-8">
                <div className="p-3 lg:p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl lg:rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-110">
                  <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-white text-center lg:text-left">
                  Ready to Build the
                  <span className="block lg:inline bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"> Future?</span>
                </h2>
                <p className="text-gray-300 text-lg lg:text-xl font-medium mt-2 lg:mt-4">
                  Let's create something amazing together.
                </p>
                <button className="mt-6 lg:mt-8 inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg lg:rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg">
                  Get Started
                  <ArrowRight className="h-4 w-4 lg:h-6 lg:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}