"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Shield, Zap, Globe, Users, TrendingUp, Star, BarChart3, PieChart, Target, Award, Settings, Cog, Phone, Mail, MapPin, Download, Play, CheckCircle, Building, GraduationCap, Factory, Computer } from 'lucide-react';

export default function UreposhHomepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [gearRotation, setGearRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Optimized gear animation with reduced frequency
    const animateGears = () => {
      setGearRotation(prev => prev + (isHovering ? 0.8 : 0.2));
      animationRef.current = requestAnimationFrame(animateGears);
    };
    
    setIsVisible(true);
    animationRef.current = requestAnimationFrame(animateGears);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Priya Sharma", role: "HR Director, TechFlow India", text: "Ureposh transformed our workplace culture completely. Their POSH compliance solutions are comprehensive and culturally sensitive.", rating: 5 },
    { name: "Rajesh Kumar", role: "CEO, InnovateCorp", text: "The most professional and thorough POSH compliance partner we've worked with. Our employees feel safer and more valued.", rating: 5 },
    { name: "Anita Desai", role: "Legal Head, FinanceFirst", text: "Expert guidance, seamless implementation, and ongoing support. Ureposh made POSH compliance effortless for our organization.", rating: 5 }
  ];

  const features = [
    { icon: <Shield className="w-8 h-8" />, title: "POSH Policy Development", desc: "Comprehensive policies tailored to your organization's unique needs and culture", gear: "Policy Engine" },
    { icon: <Users className="w-8 h-8" />, title: "Expert Training Programs", desc: "Certified trainers delivering impactful sessions across 15+ languages", gear: "Training Hub" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Compliance Audits", desc: "Regular assessments ensuring continuous adherence to legal requirements", gear: "Audit System" },
    { icon: <Target className="w-8 h-8" />, title: "Investigation Support", desc: "Professional investigation services with complete confidentiality", gear: "Support Network" }
  ];

  // Simplified Gear Component - optimized for performance
  const OptimizedGear = ({ className = "", size = 120, teeth = 12, rotation = 0, variant = "primary" }) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size / 2 - 6;
    const toothHeight = size * 0.06;
    const innerRadius = outerRadius * 0.4;
    
    const variants = {
      primary: {
        body: "url(#pinkGradient)",
        stroke: "#ec4899",
        center: "#f9a8d4"
      },
      secondary: {
        body: "url(#whiteGradient)", 
        stroke: "#f472b6",
        center: "#fce7f3"
      }
    };
    
    const currentVariant = variants[variant as keyof typeof variants] || variants.primary;
    
    // Simplified gear path for better performance
    const createGearPath = () => {
      let path = '';
      const angleStep = (2 * Math.PI) / teeth;
      
      for (let i = 0; i < teeth; i++) {
        const angle1 = i * angleStep - angleStep * 0.2;
        const angle2 = i * angleStep + angleStep * 0.2;
        const angle3 = i * angleStep;
        
        const x1 = centerX + Math.cos(angle1) * outerRadius;
        const y1 = centerY + Math.sin(angle1) * outerRadius;
        const x2 = centerX + Math.cos(angle2) * outerRadius;
        const y2 = centerY + Math.sin(angle2) * outerRadius;
        const x3 = centerX + Math.cos(angle3) * (outerRadius + toothHeight);
        const y3 = centerY + Math.sin(angle3) * (outerRadius + toothHeight);
        
        if (i === 0) {
          path += `M ${x1} ${y1}`;
        }
        
        path += ` L ${x3} ${y3} L ${x2} ${y2}`;
        
        if (i < teeth - 1) {
          const nextAngle = (i + 1) * angleStep - angleStep * 0.2;
          const nextX = centerX + Math.cos(nextAngle) * outerRadius;
          const nextY = centerY + Math.sin(nextAngle) * outerRadius;
          path += ` A ${outerRadius} ${outerRadius} 0 0 1 ${nextX} ${nextY}`;
        }
        
        if (i === teeth - 1) {
          path += ' Z';
        }
      }
      return path;
    };

    const gearId = `gear-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <svg width={size} height={size} className={className}>
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf2f8" />
            <stop offset="30%" stopColor="#fce7f3" />
            <stop offset="70%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef7ff" />
            <stop offset="70%" stopColor="#fdf2f8" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>
          
          <filter id={`shadow-${gearId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.2" floodColor="#ec4899"/>
          </filter>
        </defs>
        
        <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
          {/* Main gear body */}
          <path
            d={createGearPath()}
            fill={currentVariant.body}
            stroke={currentVariant.stroke}
            strokeWidth="2"
            filter={`url(#shadow-${gearId})`}
          />
          
          {/* Inner circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill={currentVariant.center}
            stroke={currentVariant.stroke}
            strokeWidth="2"
          />
          
          {/* Center bore */}
          <circle
            cx={centerX}
            cy={centerY}
            r={size * 0.08}
            fill="#f472b6"
            stroke="#ec4899"
            strokeWidth="1"
          />
          
          {/* Simple spokes */}
          {[0, 72, 144, 216, 288].map(angle => (
            <line
              key={angle}
              x1={centerX}
              y1={centerY}
              x2={centerX + Math.cos((angle * Math.PI) / 180) * (innerRadius - 8)}
              y2={centerY + Math.sin((angle * Math.PI) / 180) * (innerRadius - 8)}
              stroke="#ec4899"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
    );
  };

  // Simplified connecting mechanism
  const ConnectingRods = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      {/* Main horizontal drive shaft */}
      <div className="absolute top-1/2 left-0 w-full h-2 transform -translate-y-1/2">
        <div className="h-full bg-gradient-to-r from-transparent via-pink-200 to-transparent rounded-full" />
            </div>

      {/* Vertical drive shaft */}
      <div className="absolute left-1/2 top-0 w-2 h-full transform -translate-x-1/2">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent rounded-full" />
      </div>

      {/* Connection points */}
      {[
        { x: '25%', y: '50%' },
        { x: '75%', y: '50%' },
        { x: '50%', y: '33%' },
        { x: '50%', y: '67%' }
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white to-pink-200 rounded-full border-2 border-pink-300 shadow-sm" />
                            </div>
      ))}
                            </div>
  );

  const stats = [
    { icon: <Target className="w-6 h-6" />, label: "Lives Transformed", value: "50,000+", color: "from-pink-500 to-rose-500" },
    { icon: <Building className="w-6 h-6" />, label: "Organizations", value: "500+", color: "from-pink-400 to-pink-600" },
    { icon: <Star className="w-6 h-6" />, label: "Client Rating", value: "4.9/5", color: "from-rose-400 to-pink-500" },
    { icon: <CheckCircle className="w-6 h-6" />, label: "Success Rate", value: "99.2%", color: "from-pink-500 to-rose-400" }
  ];

  const industries = [
    { icon: <Computer className="w-8 h-8" />, name: "Information Technology", growth: "+32%", count: "180+", color: "from-pink-400 to-pink-500" },
    { icon: <Building className="w-8 h-8" />, name: "Financial Services", growth: "+25%", count: "75+", color: "from-pink-500 to-rose-500" },
    { icon: <Factory className="w-8 h-8" />, name: "Manufacturing", growth: "+22%", count: "120+", color: "from-rose-400 to-pink-500" },
    { icon: <GraduationCap className="w-8 h-8" />, name: "Education & Research", growth: "+35%", count: "65+", color: "from-pink-300 to-pink-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-pink-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Shield className="w-5 h-5 text-pink-500 mr-3" />
              <span className="text-sm font-semibold text-gray-700">India's Leading POSH Compliance Partner</span>
              <div className="flex ml-3 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-pink-400 text-pink-400" />
                ))}
                          </div>
                        </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-800 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight">
              Creating Safe &
              <br />
              <span className="text-5xl md:text-7xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Inclusive Workplaces
                              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We transform organizational cultures through comprehensive POSH compliance, expert training, 
              and innovative solutions that make workplaces safer, more inclusive, and legally compliant across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center shadow-xl">
                Get Free Consultation
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </button>
              
              <button className="px-10 py-5 border-2 border-pink-300 hover:border-pink-400 text-gray-700 hover:text-pink-600 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-pink-50/50 shadow-lg hover:shadow-xl flex items-center">
                <Play className="mr-3 w-5 h-5" />
                Watch Demo
                          </button>
                    </div>
                  </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 hover:border-pink-300/70 transition-all duration-300 group hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {stat.icon}
                      </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-pink-300 rounded-full flex justify-center shadow-lg bg-white/50 backdrop-blur-sm">
            <div className="w-2 h-4 bg-gradient-to-b from-pink-400 to-rose-400 rounded-full mt-2 animate-pulse" />
                            </div>
                            </div>
      </section>

      {/* Optimized Gear Mechanism Section */}
      <section className="py-32 px-6 relative bg-gradient-to-br from-pink-25 to-rose-25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-6 shadow-md">
              WHY CHOOSE UREPOSH
                              </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-800">
              Your Trusted
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> POSH Partner</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine legal expertise, cultural understanding, and innovative technology to deliver 
              comprehensive workplace safety solutions that protect your organization and empower your people.
                              </p>
                            </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ConnectingRods />
            
            {/* Central Master Gear */}
            <div className="flex justify-center mb-20">
              <div className="relative">
                <OptimizedGear 
                  size={200} 
                  teeth={16} 
                  rotation={gearRotation} 
                  variant="primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl border-2 border-pink-200">
                    <Settings className="w-8 h-8 text-pink-600" />
                          </div>
                          </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 border border-pink-200 shadow-xl">
                    <div className="font-bold text-gray-800 text-lg">Compliance Engine</div>
                    <div className="text-sm text-gray-600">360° Coverage System</div>
                        </div>
                      </div>
                    </div>
                  </div>

            {/* Feature Gears Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Optimized Gear */}
                  <div className="relative mb-8">
                    <OptimizedGear
                      size={140}
                      teeth={12}
                      rotation={-gearRotation * (index % 2 === 0 ? 1 : -1)}
                      variant={index % 2 === 0 ? "primary" : "secondary"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl border-2 border-pink-200">
                        <div className="text-pink-600">
                          {feature.icon}
                </div>
              </div>
        </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-32">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-pink-200 shadow-lg">
                        <div className="font-semibold text-xs text-gray-700">{feature.gear}</div>
            </div>
          </div>
      </div>

                  {/* Feature Info */}
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                        </div>
              ))}
                        </div>
                    </div>
                      </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-pink-50/50 to-rose-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-6 shadow-md">
              INDUSTRIES WE SERVE
                      </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-800">
              Trusted Across
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> All Sectors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From innovative startups to established enterprises, we've helped organizations across 
              diverse industries create inclusive, safe workplaces that drive business success.
            </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-pink-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${industry.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {industry.icon}
                      </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{industry.growth}</div>
                    <div className="text-sm text-gray-500">Growth</div>
                    </div>
                  </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800">{industry.name}</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-pink-600">{industry.count}</div>
                    <div className="text-sm text-gray-600">Organizations</div>
                      </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">Transformed</div>
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${industry.color} rounded-full`} style={{ width: '85%' }} />
                    </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-6 shadow-md">
              CLIENT SUCCESS STORIES
                        </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-800">
              Trusted by
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"> Industry Leaders</span>
            </h2>
                    </div>

          <div className="relative h-80">
            {testimonials.map((testimonial, index) => (
                          <div
                            key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-pink-200/50 max-w-4xl mx-auto shadow-2xl">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-pink-400 text-pink-400 mx-1" />
                      ))}
                    </div>
                  <blockquote className="text-2xl mb-8 text-gray-700 italic text-center leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800 mb-1">{testimonial.name}</div>
                    <div className="text-pink-600 font-medium">{testimonial.role}</div>
                  </div>
                      </div>
                    </div>
            ))}
                  </div>

          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                          key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-md ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 scale-125 shadow-lg' 
                    : 'bg-pink-200 hover:bg-pink-300'
                }`}
              />
                      ))}
                    </div>
                  </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-pink-500 to-rose-500 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Ready to Transform
              <br />
              Your Workplace?
            </h2>
            <p className="text-xl text-pink-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join 500+ forward-thinking organizations that have created safer, more inclusive workplaces with Ureposh. 
              Start your transformation journey today.
            </p>
                  </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Phone className="w-8 h-8 text-white" />
                      </div>
              <h3 className="text-xl font-bold text-white mb-4">Speak with Expert</h3>
              <p className="text-pink-100 mb-4">+91 98765 43210</p>
              <p className="text-sm text-pink-200">Available Mon-Fri, 9 AM - 6 PM IST</p>
              <button className="mt-4 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                Call Now
              </button>
                  </div>

            {/* Email Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Mail className="w-8 h-8 text-white" />
                      </div>
              <h3 className="text-xl font-bold text-white mb-4">Email Consultation</h3>
              <p className="text-pink-100 mb-4">hello@ureposh.com</p>
              <p className="text-sm text-pink-200">Response within 4 hours</p>
              <button className="mt-4 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                Send Email
              </button>
                  </div>

            {/* Office Visit */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-white" />
                      </div>
              <h3 className="text-xl font-bold text-white mb-4">Visit Our Office</h3>
              <p className="text-pink-100 mb-4">Mumbai, Maharashtra</p>
              <p className="text-sm text-pink-200">Schedule appointment</p>
              <button className="mt-4 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                Book Visit
              </button>
                    </div>
                  </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <button className="group bg-white text-pink-600 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center shadow-xl">
                Get Free Consultation
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
              
              <button className="px-10 py-5 border-2 border-white/40 hover:border-white/60 text-white rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10 shadow-lg flex items-center">
                <Download className="mr-3 w-5 h-5" />
                Download Resources
                      </button>
                    </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-pink-100">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>100% Confidential</span>
                </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Legal Compliance</span>
                </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                <span>Quick Response</span>
                </div>
                </div>
                </div>
              </div>
      </section>
            </div>
  );
}