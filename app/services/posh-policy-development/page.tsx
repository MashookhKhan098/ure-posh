import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, Users, Scale, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function POSHPolicyDevelopmentPage() {
  const benefits = [
    "Legal compliance with POSH Act 2013",
    "Customized policy framework for your industry",
    "Clear reporting and grievance procedures",
    "Regular policy updates and maintenance",
    "Employee awareness and training materials",
    "Implementation support and guidance"
  ]

  const industries = [
    "IT & Software", "Manufacturing", "Banking & Finance", "Healthcare", 
    "Retail", "Education", "Government", "Startups"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              POSH Policy Development
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Create comprehensive, legally compliant POSH policies tailored to your organization's unique needs and industry requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Overview */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comprehensive Policy Framework
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our expert team develops customized POSH policies that not only meet legal requirements but also 
                  create a foundation for respectful, inclusive workplace culture. Each policy is tailored to your 
                  organization's size, industry, and unique challenges.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Process */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Scale className="h-6 w-6 text-blue-500" />
                    Our Development Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Organization Assessment", desc: "Analyze your current policies, culture, and industry requirements" },
                      { step: "2", title: "Custom Framework Design", desc: "Develop tailored policy structure and content" },
                      { step: "3", title: "Legal Review", desc: "Ensure full compliance with POSH Act 2013 and regulations" },
                      { step: "4", title: "Stakeholder Consultation", desc: "Review with leadership and HR teams" },
                      { step: "5", title: "Final Implementation", desc: "Deploy policy with training and communication support" }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Industries Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Building className="h-6 w-6 text-blue-500" />
                Industries We Serve
              </h3>
              <p className="text-gray-600">
                We have experience developing POSH policies across various sectors
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-white text-gray-700 border border-gray-200">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Develop Your POSH Policy?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our experts create a comprehensive, compliant POSH policy that protects your organization and employees.
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