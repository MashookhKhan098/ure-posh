import Link from "next/link"
import { ArrowRight, Users, Mail, Linkedin, ArrowLeft, Award, BookOpen, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function LeadershipPage() {
  const leaders = [
    {
      name: "Pradeep Kumar",
      title: "Founder & Chief Executive Officer",
      bio: "Pradeep is a visionary leader with over 15 years of experience in workplace compliance and human rights advocacy. He founded UREPOSH with the mission to create harassment-free workplaces across India.",
      specialization: [
        "POSH Act Implementation",
        "Workplace Investigation",
        "Policy Development",
        "Legal Compliance",
        "Training & Development"
      ],
      achievements: [
        "Certified POSH Trainer & Investigator",
        "500+ Organizations Served",
        "10,000+ Employees Trained",
        "Industry Speaker & Thought Leader",
        "Published Researcher on Workplace Rights"
      ],
      image: "/images/pradeep-ceo.jpg",
      contact: {
        email: "pradeep@ureposh.com",
        linkedin: "#"
      }
    },
    {
      name: "Sarah Johnson",
      title: "Chief Operating Officer", 
      bio: "Sarah brings extensive operational excellence and strategic planning expertise, ensuring our services reach organizations effectively and efficiently across all sectors.",
      specialization: [
        "Operations Management",
        "Strategic Planning", 
        "Quality Assurance",
        "Client Relations",
        "Team Leadership"
      ],
      achievements: [
        "MBA in Operations Management",
        "15+ Years Leadership Experience",
        "Process Innovation Expert",
        "Client Satisfaction Champion",
        "Operational Excellence Award Winner"
      ],
      image: "/images/sarah-coo.jpg",
      contact: {
        email: "sarah@ureposh.com",
        linkedin: "#"
      }
    },
    {
      name: "Dr. Anjali Sharma",
      title: "Head of Training & Development",
      bio: "Dr. Sharma is an expert psychologist and trainer specializing in workplace behavior, harassment prevention, and creating inclusive organizational cultures.",
      specialization: [
        "Behavioral Psychology",
        "Training Design",
        "Cultural Transformation",
        "Counseling & Support",
        "Research & Analytics"
      ],
      achievements: [
        "PhD in Organizational Psychology",
        "Certified Professional Trainer",
        "Research Publications Author",
        "Workshop Design Expert",
        "Mental Health Advocate"
      ],
      image: "/images/anjali-training.jpg", 
      contact: {
        email: "anjali@ureposh.com",
        linkedin: "#"
      }
    },
    {
      name: "Rajesh Patel",
      title: "Head of Legal & Compliance",
      bio: "Rajesh is a seasoned legal expert with deep knowledge of employment law, POSH regulations, and corporate compliance frameworks.",
      specialization: [
        "Employment Law",
        "POSH Regulations",
        "Legal Compliance",
        "Policy Drafting",
        "Risk Assessment"
      ],
      achievements: [
        "LLM in Labor & Employment Law",
        "20+ Years Legal Practice",
        "Corporate Compliance Expert",
        "Regulatory Advisory Specialist",
        "Legal Training Facilitator"
      ],
      image: "/images/rajesh-legal.jpg",
      contact: {
        email: "rajesh@ureposh.com", 
        linkedin: "#"
      }
    }
  ]

  const advisors = [
    {
      name: "Prof. Meera Krishnan",
      title: "Senior Advisor - Academic Partnerships",
      expertise: "Women's Rights & Gender Studies",
      background: "Former Dean, Gender Studies Department"
    },
    {
      name: "Mr. Vikram Singh",
      title: "Senior Advisor - Corporate Relations", 
      expertise: "Corporate Governance & Ethics",
      background: "Former CHRO at Fortune 500 Company"
    },
    {
      name: "Justice (Retd.) Kavita Menon",
      title: "Legal Advisor",
      expertise: "Employment Law & Judicial Procedures",
      background: "Former High Court Judge"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Leadership Team
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Meet the passionate leaders driving our mission to create safer, more inclusive workplaces 
              across India and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/about" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team brings together expertise from legal, psychology, operations, and training backgrounds 
              to deliver comprehensive POSH solutions.
            </p>
          </div>

          <div className="space-y-12">
            {leaders.map((leader, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  {/* Photo and Basic Info */}
                  <div className="text-center lg:text-left">
                    <div className="w-48 h-48 mx-auto lg:mx-0 mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Users className="h-20 w-20 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">{leader.name}</h3>
                      <p className="text-lg text-blue-600 font-medium">{leader.title}</p>
                      <div className="flex justify-center lg:justify-start gap-3 mt-4">
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Bio and Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">{leader.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Specialization */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-500" />
                          Areas of Expertise
                        </h4>
                        <div className="space-y-2">
                          {leader.specialization.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="mr-2 mb-2">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {leader.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Advisory Board */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advisory Board
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our distinguished advisory board provides strategic guidance and industry insights 
                to enhance our service delivery and impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advisors.map((advisor, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-10 w-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {advisor.name}
                    </CardTitle>
                    <p className="text-blue-600 font-medium text-sm">{advisor.title}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">Expertise</h5>
                      <p className="text-gray-600 text-sm">{advisor.expertise}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">Background</h5>
                      <p className="text-gray-600 text-sm">{advisor.background}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Philosophy */}
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Leadership Philosophy
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our leadership approach is built on collaboration, innovation, and a deep commitment 
                to creating positive change in workplace cultures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Servant Leadership",
                  desc: "We lead by serving our team, clients, and community",
                  icon: Users
                },
                {
                  title: "Continuous Learning",
                  desc: "We invest in growth and stay current with best practices",
                  icon: BookOpen
                },
                {
                  title: "Ethical Foundation",
                  desc: "Every decision is guided by our moral compass",
                  icon: Shield
                },
                {
                  title: "Results-Driven",
                  desc: "We measure success by the positive impact we create",
                  icon: Award
                }
              ].map((principle, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                  <principle.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{principle.title}</h4>
                  <p className="text-gray-600 text-sm">{principle.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Work with Industry Leaders?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with our experienced team to transform your workplace culture and ensure 
              comprehensive POSH compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/careers">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Join Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
