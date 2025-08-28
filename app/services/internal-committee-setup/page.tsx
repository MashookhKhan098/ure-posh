import Link from "next/link"
import { ArrowRight, Users, CheckCircle, UserCheck, Target, BookOpen, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InternalCommitteeSetupPage() {
  const services = [
    "Committee member selection and training",
    "Role and responsibility documentation",
    "Investigation procedure development",
    "Case management system setup",
    "Regular committee performance reviews",
    "Ongoing support and guidance"
  ]

  const requirements = [
    { title: "Presiding Officer", desc: "Senior woman employee from the organization" },
    { title: "Internal Members", desc: "At least two employees committed to women's rights" },
    { title: "External Member", desc: "NGO or association working for women's rights" },
    { title: "Quorum", desc: "Minimum 50% members including Presiding Officer" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Users className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Internal Committee Setup
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Expert guidance in establishing effective Internal Committees for POSH compliance with properly trained members and clear processes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Professional Committee Formation
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Every organization with 10 or more employees must constitute an Internal Committee under the POSH Act. 
                  We ensure your committee is properly formed, trained, and equipped to handle sensitive workplace issues 
                  with professionalism and confidentiality.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    What We Provide
                  </h3>
                  <ul className="space-y-3">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <UserCheck className="h-6 w-6 text-blue-500" />
                    Committee Composition Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{req.title}</h4>
                      <p className="text-gray-600 text-sm">{req.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Target className="h-6 w-6 text-blue-500" />
                Our Setup Process
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Assessment", desc: "Evaluate your organization's needs and current structure" },
                { step: "2", title: "Selection", desc: "Help identify and select qualified committee members" },
                { step: "3", title: "Training", desc: "Comprehensive training on roles, responsibilities, and procedures" },
                { step: "4", title: "Support", desc: "Ongoing guidance and performance monitoring" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Training Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: BookOpen,
                title: "Comprehensive Training",
                desc: "In-depth training on POSH Act, investigation procedures, and best practices"
              },
              {
                icon: Users,
                title: "Team Building",
                desc: "Foster effective collaboration and communication among committee members"
              },
              {
                icon: Shield,
                title: "Ongoing Support",
                desc: "Regular check-ins, updates, and assistance with complex cases"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Set Up Your Internal Committee?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our experts guide you through the complete process of establishing an effective, compliant Internal Committee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Get Started
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
