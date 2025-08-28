import Link from "next/link"
import { ArrowRight, Award, BookOpen, CheckCircle, Users, Clock, Star, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfessionalCertificationPage() {
  const certificationPrograms = [
    {
      title: "POSH Expert Certification",
      level: "Professional",
      duration: "40 Hours",
      format: "Blended Learning",
      description: "Comprehensive certification program for HR professionals and consultants.",
      modules: [
        "POSH Act fundamentals",
        "Investigation techniques",
        "Legal compliance",
        "Case study analysis",
        "Report writing",
        "Practical assessments"
      ]
    },
    {
      title: "Internal Committee Member Certification",
      level: "Intermediate",
      duration: "24 Hours",
      format: "Workshop + Online",
      description: "Specialized training for internal committee members and workplace representatives.",
      modules: [
        "Committee roles & responsibilities",
        "Complaint handling procedures",
        "Interview techniques",
        "Confidentiality protocols",
        "Documentation standards",
        "Resolution strategies"
      ]
    },
    {
      title: "Advanced Investigation Certification",
      level: "Expert",
      duration: "60 Hours",
      format: "Intensive Program",
      description: "Advanced certification for experienced investigators and legal professionals.",
      modules: [
        "Complex case investigation",
        "Advanced interview techniques",
        "Evidence analysis",
        "Expert testimony preparation",
        "Legal procedure mastery",
        "Mentorship training"
      ]
    }
  ]

  const certificationBenefits = [
    "Industry-recognized credentials",
    "Enhanced career opportunities", 
    "Professional network access",
    "Continuing education credits",
    "Expert knowledge validation",
    "Practical skill development",
    "Legal compliance expertise",
    "Ongoing support and updates"
  ]

  const certificationProcess = [
    { step: 1, title: "Application & Assessment", desc: "Submit application and complete initial assessment" },
    { step: 2, title: "Training Program", desc: "Complete structured learning modules and workshops" },
    { step: 3, title: "Practical Evaluation", desc: "Demonstrate skills through practical assessments" },
    { step: 4, title: "Final Examination", desc: "Pass comprehensive written and practical examinations" },
    { step: 5, title: "Certification Award", desc: "Receive official certification and digital credentials" },
    { step: 6, title: "Ongoing Support", desc: "Access to resources and continuing education opportunities" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Award className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Professional Certification
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Industry-recognized certification programs to validate your expertise in POSH compliance, 
              investigation, and workplace harassment prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certification Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive certification programs designed for different experience levels 
              and professional requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {certificationPrograms.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {program.title}
                  </CardTitle>
                  <div className="flex justify-center gap-2 mt-3">
                    <Badge variant="secondary">{program.level}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {program.duration}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="mt-2">{program.format}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{program.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Program Modules:</h4>
                    {program.modules.map((module, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                        <span className="text-xs text-gray-600">{module}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certification Process */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Certification Process
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our comprehensive certification process ensures you gain both theoretical knowledge 
                and practical skills needed for POSH expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationProcess.map((phase, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {phase.step}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{phase.title}</h4>
                  </div>
                  <p className="text-gray-600 text-xs">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Why Get POSH Certified?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Professional certification validates your expertise, enhances credibility, 
                and opens new career opportunities in the growing field of workplace harassment prevention.
              </p>
              <div className="space-y-3">
                {certificationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-500" />
                    Certification Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Interactive online learning platform",
                    "Expert-led live sessions",
                    "Real-world case studies",
                    "Practical assessment exercises",
                    "Peer learning opportunities",
                    "Resource library access",
                    "Industry networking events"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Certification Validity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Our certifications are valid for 3 years and can be renewed through 
                    continuing education credits and professional development activities.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">3 Year Validity</Badge>
                    <Badge variant="outline">Renewable</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Prerequisites & Requirements */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Prerequisites & Requirements
              </h3>
              <p className="text-gray-600">
                Different certification programs have varying requirements to ensure appropriate skill levels
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "POSH Expert",
                  requirements: [
                    "Bachelor's degree",
                    "2+ years HR/Legal experience",
                    "Basic employment law knowledge"
                  ],
                  icon: BookOpen
                },
                {
                  title: "IC Member",
                  requirements: [
                    "Employee status",
                    "Committee member designation",
                    "Basic training completion"
                  ],
                  icon: Users
                },
                {
                  title: "Advanced Investigation",
                  requirements: [
                    "POSH Expert certification",
                    "5+ years investigation experience", 
                    "Legal or HR background"
                  ],
                  icon: Target
                }
              ].map((req, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <req.icon className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 text-center mb-4">{req.title}</h4>
                  <ul className="space-y-2">
                    {req.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Certified?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the next step in your professional journey with industry-recognized POSH certification 
              that validates your expertise and enhances your career prospects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 px-8 py-4">
                  Apply for Certification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
