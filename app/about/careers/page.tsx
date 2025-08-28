import Link from "next/link"
import { ArrowRight, Briefcase, Users, Award, MapPin, Clock, CheckCircle, ArrowLeft, Heart, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior POSH Trainer & Consultant",
      department: "Training & Development",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Lead comprehensive POSH training programs and provide expert consultation to organizations across various sectors.",
      requirements: [
        "Master's degree in HR, Psychology, or Law",
        "3+ years experience in POSH training",
        "Certification in workplace harassment prevention",
        "Excellent presentation and communication skills",
        "Experience with corporate training programs"
      ],
      skills: ["POSH Act", "Training Design", "Public Speaking", "Consultation", "Report Writing"]
    },
    {
      title: "Legal Compliance Specialist",
      department: "Legal & Compliance",
      location: "Delhi, India",
      type: "Full-time", 
      experience: "2-4 years",
      description: "Ensure legal compliance for client organizations and provide expert guidance on POSH regulations and implementation.",
      requirements: [
        "LLB/LLM degree with labor law specialization",
        "2+ years in employment law or compliance",
        "Knowledge of POSH Act and related regulations",
        "Strong analytical and research skills",
        "Experience in policy development"
      ],
      skills: ["Employment Law", "POSH Regulations", "Policy Development", "Legal Research", "Compliance Audits"]
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing & Communications",
      location: "Bangalore, India / Remote",
      type: "Full-time",
      experience: "2-3 years",
      description: "Drive digital marketing initiatives to expand our reach and educate organizations about workplace harassment prevention.",
      requirements: [
        "Bachelor's degree in Marketing or Communications",
        "2+ years in digital marketing",
        "Experience with content marketing and social media",
        "Knowledge of SEO and digital analytics",
        "Creative content creation abilities"
      ],
      skills: ["Digital Marketing", "Content Creation", "SEO", "Social Media", "Analytics"]
    },
    {
      title: "Investigation Specialist",
      department: "Investigation Services",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-6 years",
      description: "Conduct thorough and impartial investigations of workplace harassment complaints while maintaining highest standards of confidentiality.",
      requirements: [
        "Background in HR, Law, or Investigation",
        "4+ years investigation experience",
        "Strong interviewing and analytical skills",
        "Experience with sensitive workplace matters",
        "Excellent report writing abilities"
      ],
      skills: ["Investigation Techniques", "Interview Skills", "Report Writing", "Confidentiality", "Analytical Thinking"]
    }
  ]

  const benefits = [
    {
      title: "Professional Development",
      description: "Continuous learning opportunities, certifications, and conference attendance",
      icon: Award
    },
    {
      title: "Flexible Work Options",
      description: "Hybrid work model with flexible hours to maintain work-life balance",
      icon: Clock
    },
    {
      title: "Meaningful Impact",
      description: "Be part of creating safer, more inclusive workplaces across India",
      icon: Heart
    },
    {
      title: "Competitive Benefits",
      description: "Comprehensive health insurance, performance bonuses, and growth opportunities",
      icon: TrendingUp
    },
    {
      title: "Inclusive Culture",
      description: "Diverse, respectful workplace that practices what we preach",
      icon: Users
    },
    {
      title: "Global Exposure",
      description: "Opportunities to work with international clients and best practices",
      icon: Globe
    }
  ]

  const values = [
    "Commitment to workplace equality and justice",
    "Passion for continuous learning and improvement",
    "Strong ethical foundation and integrity",
    "Collaborative mindset and team-first approach",
    "Empathy and understanding for workplace challenges",
    "Innovation in solving complex workplace issues"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Briefcase className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Career Opportunities
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join our mission to transform workplace cultures and create environments where everyone 
              feels safe, valued, and empowered to succeed.
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

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work with UREPOSH?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join a team that's passionate about creating positive change and building your career 
              in one of the most meaningful fields in human resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What We Look For */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What We Look For
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We seek passionate individuals who share our values and commitment to creating positive workplace change.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-md">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Current Openings
              </h3>
              <p className="text-gray-600">
                Explore exciting opportunities to grow your career while making a meaningful impact
              </p>
            </div>

            <div className="space-y-8">
              {openPositions.map((position, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {position.department}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {position.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {position.type}
                          </Badge>
                          <Badge variant="outline">
                            {position.experience}
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Role Description</h4>
                          <p className="text-gray-600">{position.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {position.skills.map((skill, i) => (
                              <Badge key={i} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                        <ul className="space-y-2">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Application Process
              </h3>
              <p className="text-gray-600">
                Our transparent and fair hiring process ensures we find the right fit for both candidates and our team
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Application Review", desc: "Submit your resume and cover letter through our portal" },
                { step: "2", title: "Initial Screening", desc: "Phone/video call with our HR team to discuss your background" },
                { step: "3", title: "Technical Interview", desc: "In-depth discussion with hiring manager and team members" },
                { step: "4", title: "Final Decision", desc: "Reference checks and final offer discussion" }
              ].map((step, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't see the perfect role yet? We're always looking for talented individuals who share our passion. 
              Send us your resume and let's start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Submit Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/leadership">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
