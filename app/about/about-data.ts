import {
    Heart,
    Users,
    Target,
    Lightbulb,
    Shield,
    Sparkles,
    Phone,
    Mail,
    MapPin,
    Building2,
  } from "lucide-react";
  
  export interface CoreValue {
    title: string;
    description: string;
    icon: string;
    color: string;
    stats?: string;
    details: string[];
  }
  
  export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    description: string;
    quote: string;
    expertise: string[];
    experience: string;
    education: string;
    achievements: string[];
    linkedin?: string;
    twitter?: string;
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    company: string;
    companyLogo?: string;
    quote: string;
    image: string;
    rating: number;
    industry: string;
    companySize: string;
    results: string[];
  }
  
  export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: "compliance" | "pricing" | "implementation" | "support";
    helpful?: boolean;
  }
  
  export interface ContactInfo {
    type: string;
    value: string;
    description: string;
    responseTime?: string;
    icon: React.ComponentType<any>;
    availability: string;
    preferredFor: string[];
  }
  
  export interface CompanyStats {
    number: string;
    label: string;
    description: string;
    growth?: string;
  }
  
  export const coreValues = [
    {
      title: "Inclusion as Foundation",
      description: "We approach every partnership understanding that inclusion isn't optional—it's the cornerstone of thriving organizations. Our methodology ensures authentic representation and belonging.",
      icon: "users",
      color: "from-violet-500 via-purple-500 to-fuchsia-500",
      stats: "98% satisfaction rate",
      details: [
        "Comprehensive diversity assessment and gap analysis",
        "Customized inclusion roadmaps for every organization",
        "Continuous monitoring and improvement frameworks",
        "Intersectional approach to identity and belonging"
      ]
    },
    {
      title: "Safety Without Compromise",
      description: "Every workplace should be a sanctuary of respect and dignity. We don't just implement policies—we cultivate cultures where safety is lived, not just documented.",
      icon: "shield",
      color: "from-rose-500 via-pink-500 to-red-500",
      stats: "Zero tolerance success",
      details: [
        "Proactive risk identification and mitigation strategies",
        "Trauma-informed investigation and support processes",
        "24/7 confidential reporting mechanisms",
        "Holistic support systems for all stakeholders"
      ]
    },
    {
      title: "Innovation in Tradition",
      description: "We revolutionize compliance by making it meaningful, engaging, and transformative. Traditional training becomes immersive experiences that create lasting behavioral change.",
      icon: "lightbulb",
      color: "from-emerald-500 via-teal-500 to-cyan-500",
      stats: "300% engagement increase",
      details: [
        "Gamified learning experiences with real-world scenarios",
        "Virtual reality training for immersive understanding",
        "AI-powered personalization for maximum impact",
        "Microlearning modules for sustained retention"
      ]
    },
    {
      title: "Diversity as Power",
      description: "We honor the full spectrum of human experience and identity. Our approach recognizes that true strength comes from authentic diversity across all dimensions of identity.",
      icon: "sparkles",
      color: "from-amber-500 via-orange-500 to-yellow-500",
      stats: "40+ identity dimensions",
      details: [
        "Intersectional lens in all program development",
        "Culturally responsive training methodologies",
        "Accessibility-first design principles",
        "Multi-generational and multi-cultural perspectives"
      ]
    },
    {
      title: "Impact Over Activity",
      description: "We measure success not by hours trained or policies created, but by cultural transformation and sustained behavioral change that creates lasting organizational impact.",
      icon: "target",
      color: "from-blue-500 via-indigo-500 to-purple-500",
      stats: "85% culture transformation",
      details: [
        "Comprehensive pre and post-implementation analytics",
        "Long-term culture tracking and measurement",
        "ROI documentation for all interventions",
        "Continuous improvement based on data insights"
      ]
    },
  ];
  
  export const teamMembers: TeamMember[] = [
    {
      id: "samantha-chen",
      name: "Samantha Chen",
      role: "Chief Learning Officer & Co-Founder",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Samantha revolutionizes corporate learning by transforming compliance training into engaging, memorable experiences. Her innovative methodologies have helped over 200 organizations create cultures of continuous learning and growth.",
      quote: "Learning should ignite passion, not extinguish it. When people connect emotionally with content, transformation becomes inevitable.",
      expertise: ["Learning Experience Design", "Behavioral Psychology", "Neuroscience-Based Training", "Digital Learning Innovation"],
      experience: "15+ years",
      education: "PhD in Organizational Psychology, Stanford University",
      achievements: [
        "Published researcher on adult learning methodologies",
        "TEDx speaker on 'The Future of Corporate Learning'",
        "Winner of 'Learning Innovation Award 2023'",
        "Certified in Design Thinking from IDEO"
      ],
      linkedin: "https://linkedin.com/in/samantha-chen",
      twitter: "https://twitter.com/samantha_learns"
    },
    {
      id: "raj-patel",
      name: "Raj Patel",
      role: "Chief Experience Officer & Co-Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Raj crafts seamless, intuitive experiences that make complex compliance concepts feel natural and approachable. His human-centered design approach ensures every touchpoint creates positive lasting impressions.",
      quote: "Great experiences don't just happen—they're designed with intention, empathy, and relentless attention to human needs.",
      expertise: ["Human-Centered Design", "Service Design", "User Research", "Digital Product Strategy"],
      experience: "12+ years",
      education: "Masters in Design Strategy, Parsons School of Design",
      achievements: [
        "Former Senior UX Director at Fortune 500 companies",
        "Design mentor for Y Combinator startups",
        "Featured in 'Design Week' for innovative approaches",
        "Certified Design Sprint facilitator"
      ],
      linkedin: "https://linkedin.com/in/raj-ux-design"
    },
    {
      id: "priya-sharma",
      name: "Dr. Priya Sharma",
      role: "Head of Content & Research",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Dr. Sharma leads our content strategy, ensuring every word resonates with authenticity and cultural sensitivity. Her research-backed approach creates content that not only informs but transforms perspectives.",
      quote: "Content has the power to change hearts and minds. When we write with purpose and research with rigor, we create lasting change.",
      expertise: ["Content Strategy", "Cultural Anthropology", "Research Methodology", "Inclusive Communication"],
      experience: "18+ years",
      education: "PhD in Cultural Anthropology, JNU; Masters in Communications",
      achievements: [
        "Published author of 3 books on workplace culture",
        "Research fellow at Harvard Kennedy School",
        "Consultant to UN Women on gender equality",
        "Award-winning journalist covering social justice"
      ],
      linkedin: "https://linkedin.com/in/dr-priya-sharma"
    },
    {
      id: "amit-kumar",
      name: "Amit Kumar",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Amit architects learning technology that scales human connection. His platforms make complex training accessible, engaging, and measurable while maintaining the human touch that drives real change.",
      quote: "Technology should amplify human potential, not replace human connection. The best platforms disappear, leaving only meaningful experiences.",
      expertise: ["EdTech Architecture", "AI/ML Implementation", "Scalable Platform Design", "Data Analytics"],
      experience: "14+ years",
      education: "BTech Computer Science, IIT Delhi; Executive MBA, ISB",
      achievements: [
        "Former Tech Lead at top EdTech unicorns",
        "Patent holder for adaptive learning algorithms",
        "Speaker at major tech conferences",
        "Mentor at multiple startup accelerators"
      ],
      linkedin: "https://linkedin.com/in/amit-tech-leader"
    },
    {
      id: "neha-gupta",
      name: "Neha Gupta",
      role: "Head of Operations & Client Success",
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Neha ensures flawless execution of every client engagement. Her operational excellence and client-first mindset have resulted in industry-leading satisfaction rates and long-term partnerships.",
      quote: "Excellence lives in the details. When every interaction exceeds expectations, trust and transformation naturally follow.",
      expertise: ["Operations Excellence", "Client Success Management", "Process Innovation", "Quality Assurance"],
      experience: "11+ years",
      education: "MBA Operations Management, XLRI; Lean Six Sigma Black Belt",
      achievements: [
        "Achieved 99.2% client satisfaction rate",
        "Scaled operations to serve 500+ organizations",
        "Certified Project Management Professional (PMP)",
        "Winner of 'Operations Excellence Award 2022'"
      ],
      linkedin: "https://linkedin.com/in/neha-operations"
    },
    {
      id: "rohit-sharma",
      name: "Rohit Sharma",
      role: "Senior Learning Strategist",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Rohit translates organizational challenges into transformative learning strategies. His deep understanding of adult learning principles helps organizations create sustainable cultural shifts.",
      quote: "True learning happens when knowledge becomes wisdom, and wisdom becomes action. That's where sustainable change begins.",
      expertise: ["Adult Learning Theory", "Organizational Development", "Change Management", "Performance Consulting"],
      experience: "10+ years",
      education: "Masters in Learning & Development, TISS; Certified Learning Professional",
      achievements: [
        "Transformed learning cultures in 100+ organizations",
        "Certified in Kirkpatrick Evaluation Methodology",
        "Faculty member at leading business schools",
        "Published expert on learning ROI measurement"
      ],
      linkedin: "https://linkedin.com/in/rohit-learning-strategy"
    },
  ];
  
  export const testimonials: Testimonial[] = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      companyLogo: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100",
      quote: "Ureposh didn't just transform our compliance training—they revolutionized our entire workplace culture. What used to be dreaded mandatory sessions are now highlights of our professional development calendar. The engagement metrics speak for themselves.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      industry: "Technology",
      companySize: "2,500+ employees",
      results: [
        "95% completion rate (up from 47%)",
        "87% reported behavior change",
        "Zero harassment incidents in 18 months",
        "40% improvement in inclusion metrics"
      ]
    },
    {
      id: "michael-chen",
      name: "Dr. Michael Chen",
      company: "HealthCare Innovations Ltd",
      quote: "As a healthcare organization, we needed training that addressed the unique challenges of our environment. Ureposh created scenarios so realistic and relevant that our staff still reference them months later. The cultural shift has been remarkable.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      industry: "Healthcare",
      companySize: "5,000+ employees",
      results: [
        "92% knowledge retention after 6 months",
        "50% increase in proactive reporting",
        "Improved patient satisfaction scores",
        "Enhanced team collaboration metrics"
      ]
    },
    {
      id: "aisha-patel",
      name: "Aisha Patel",
      company: "RetailMax Group",
      quote: "Managing compliance across 200+ retail locations seemed impossible until we partnered with Ureposh. Their platform made rollout seamless, and the real-time analytics help us address issues before they become problems. It's been transformational.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      industry: "Retail",
      companySize: "15,000+ employees",
      results: [
        "Consistent compliance across all locations",
        "65% reduction in policy violations",
        "Improved employee satisfaction scores",
        "Streamlined reporting and documentation"
      ]
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      company: "Global Manufacturing Corp",
      quote: "The multilingual training modules and cultural sensitivity training have been game-changers for our diverse global workforce. Ureposh understood our unique challenges and delivered solutions that work across cultures and languages.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      industry: "Manufacturing",
      companySize: "8,000+ employees",
      results: [
        "Training delivered in 12 languages",
        "98% cross-cultural competency scores",
        "Reduced workplace conflicts by 70%",
        "Enhanced global team collaboration"
      ]
    },
  ];
  
  export const contactInfo: ContactInfo[] = [
    {
      type: "Email",
      value: "hello@ureposh.com",
      description: "Get expert guidance from our team",
      responseTime: "Within 2-4 hours",
      icon: Mail,
      availability: "24/7 for urgent matters",
      preferredFor: ["General inquiries", "Partnership discussions", "Support requests"]
    },
    {
      type: "Phone",
      value: "+91 98765 43210",
      description: "Speak directly with our specialists",
      responseTime: "Mon-Fri, 9 AM - 6 PM IST",
      icon: Phone,
      availability: "Business hours with emergency line",
      preferredFor: ["Urgent compliance issues", "Implementation planning", "Technical support"]
    },
    {
      type: "Office",
      value: "WeWork, Bandra Kurla Complex, Mumbai 400051",
      description: "Visit our collaborative workspace",
      responseTime: "By appointment only",
      icon: MapPin,
      availability: "Monday to Friday, 10 AM - 5 PM",
      preferredFor: ["In-person consultations", "Workshop planning", "Team meetings"]
    },
  ];
  
  export const faqs: FAQ[] = [
    {
      id: "compliance-timeline",
      question: "How quickly can you help us achieve POSH compliance?",
      answer: "Our rapid implementation program can get you compliant within 2-4 weeks for basic requirements. However, we recommend our comprehensive 6-8 week program that includes thorough training, policy customization, and culture assessment to ensure lasting compliance and genuine workplace transformation.",
      category: "compliance"
    },
    {
      id: "ongoing-support",
      question: "What ongoing support do you provide after implementation?",
      answer: "We offer comprehensive ongoing support including quarterly compliance audits, annual IC training refreshers, 24/7 incident support hotline, policy updates as regulations change, advanced analytics dashboard, and access to our expert consultation network. Our partnership doesn't end at implementation—it evolves with your organization.",
      category: "support"
    },
    {
      id: "industry-experience",
      question: "Do you have experience with our specific industry?",
      answer: "We've successfully implemented compliance programs across 25+ industries including IT/Tech, Healthcare, Manufacturing, Retail, Financial Services, Education, Government, Startups, and Non-profits. Each industry has unique challenges, and we customize our approach based on specific regulatory requirements, cultural contexts, and operational realities.",
      category: "implementation"
    },
    {
      id: "case-investigation",
      question: "Can you help with ongoing harassment investigations?",
      answer: "Yes, we provide comprehensive investigation support including expert guidance for active cases, trauma-informed interview techniques, proper documentation and evidence management, legal compliance throughout the process, and post-investigation support and remediation planning. Our team includes certified investigators with extensive experience.",
      category: "compliance"
    },
    {
      id: "pricing-structure",
      question: "How is your pricing structured?",
      answer: "Our pricing is tailored to your organization's size, complexity, and needs. We offer packages starting from ₹50,000 for small organizations (up to 50 employees) to enterprise solutions for large corporations. Pricing includes initial setup, training, ongoing support, and our technology platform. We provide detailed quotes after understanding your specific requirements.",
      category: "pricing"
    },
    {
      id: "multilingual-support",
      question: "Do you provide training in regional languages?",
      answer: "Absolutely! We conduct training in 12+ languages including Hindi, English, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese. Our content is culturally adapted, not just translated, ensuring authentic communication that resonates with diverse teams across India.",
      category: "implementation"
    },
    {
      id: "remote-training",
      question: "Can you handle remote and hybrid workforce training?",
      answer: "Yes, our platform is designed for modern workforces. We offer live virtual sessions, self-paced online modules, mobile-responsive content, interactive virtual reality experiences, and hybrid training models. Our technology ensures engagement and completion tracking regardless of location, making it perfect for distributed teams.",
      category: "implementation"
    },
    {
      id: "customization-level",
      question: "How much can you customize the training to our company culture?",
      answer: "Extensive customization is our specialty. We create company-specific scenarios, incorporate your values and policies, use your branding and messaging, include role-specific content, address industry-specific challenges, and adapt to your organizational hierarchy and communication styles. Every program is uniquely yours.",
      category: "implementation"
    },
  ];
  
  export const companyStats: CompanyStats[] = [
    {
      number: "500+",
      label: "Organizations Transformed",
      description: "From startups to Fortune 500 companies across India",
      growth: "+150% YoY"
    },
    {
      number: "75,000+",
      label: "Professionals Trained",
      description: "Creating safer workplaces one person at a time",
      growth: "+200% YoY"
    },
    {
      number: "99.2%",
      label: "Client Satisfaction",
      description: "Consistently exceeding expectations",
      growth: "Maintained for 3+ years"
    },
    {
      number: "24/7",
      label: "Expert Support",
      description: "Always available when you need us most",
      growth: "365 days a year"
    },
  ];
  
  export const trustedCompanies = [
    { name: "TechCorp Solutions", logo: "TC", industry: "Technology" },
    { name: "HealthCare Innovations", logo: "HI", industry: "Healthcare" },
    { name: "RetailMax Group", logo: "RM", industry: "Retail" },
    { name: "Global Finance Ltd", logo: "GF", industry: "Finance" },
    { name: "EduTech Partners", logo: "EP", industry: "Education" },
    { name: "Manufacturing Excellence", logo: "ME", industry: "Manufacturing" },
    { name: "StartupHub India", logo: "SH", industry: "Technology" },
    { name: "GovTech Solutions", logo: "GS", industry: "Government" },
  ];
  
  export const milestones = [
    {
      year: "2019",
      title: "Foundation",
      description: "Founded with a mission to humanize compliance training",
      achievements: ["First 10 clients", "Core team assembled", "Initial platform launch"]
    },
    {
      year: "2020",
      title: "Innovation",
      description: "Pivoted to virtual training during pandemic",
      achievements: ["100+ virtual sessions", "Mobile platform launch", "Industry recognition"]
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Scaled across multiple industries and languages",
      achievements: ["500+ companies served", "12 languages supported", "Series A funding"]
    },
    {
      year: "2022",
      title: "Leadership",
      description: "Became India's leading POSH compliance partner",
      achievements: ["50,000+ trained", "AI-powered platform", "Award recognition"]
    },
    {
      year: "2023",
      title: "Transformation",
      description: "Expanding beyond compliance to culture transformation",
      achievements: ["Global partnerships", "75,000+ users", "Research publications"]
    },
  ];