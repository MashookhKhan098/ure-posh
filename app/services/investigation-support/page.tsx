import Link from "next/link"
import { ArrowRight, Search, FileText, CheckCircle, Shield, Scale, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InvestigationSupportPage() {
  const services = [
    {
      title: "Complaint Investigation",
      description: "Professional investigation of harassment complaints with thorough fact-finding and evidence collection.",
      features: ["Independent investigation", "Witness interviews", "Evidence documentation", "Detailed report"]
    },
    {
      title: "Expert Testimony",
      description: "Expert witness services for legal proceedings and tribunal hearings related to workplace harassment.",
      features: ["Court testimony", "Expert opinions", "Case analysis", "Legal documentation"]
    },
    {
      title: "Investigation Training",
      description: "Training for internal committee members on proper investigation procedures and techniques.",
      features: ["Investigation methodology", "Interview techniques", "Report writing", "Legal compliance"]
    }
  ]

  const investigationProcess = [
    { step: 1, title: "Initial Assessment", desc: "Review complaint and determine investigation scope" },
    { step: 2, title: "Evidence Collection", desc: "Gather documents, communications, and physical evidence" },
    { step: 3, title: "Witness Interviews", desc: "Conduct structured interviews with all relevant parties" },
    { step: 4, title: "Analysis & Findings", desc: "Analyze evidence and determine factual findings" },
    { step: 5, title: "Report Preparation", desc: "Prepare comprehensive investigation report" },
    { step: 6, title: "Recommendations", desc: "Provide recommendations for corrective actions" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Search className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Investigation Support
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Professional investigation services to ensure fair, thorough, and legally compliant handling of workplace harassment complaints.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Investigation Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced investigators provide impartial, thorough, and legally sound investigation services 
              to help organizations handle harassment complaints effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investigation Process */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Investigation Process
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We follow a systematic, thorough approach to ensure fair and legally compliant investigations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investigationProcess.map((phase, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {phase.step}
                    </div>
                    <h4 className="font-semibold text-gray-900">{phase.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Why Choose Our Investigation Services?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our team brings extensive experience in workplace investigations, combining legal expertise 
                with sensitivity to create a fair and thorough process for all parties involved.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Impartial & Independent", desc: "Unbiased investigations free from organizational conflicts of interest" },
                  { icon: Scale, title: "Legally Compliant", desc: "All investigations follow proper legal procedures and requirements" },
                  { icon: Clock, title: "Timely Resolution", desc: "Efficient process that respects urgency while ensuring thoroughness" },
                  { icon: Users, title: "Experienced Team", desc: "Qualified investigators with extensive workplace harassment expertise" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Investigation Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Comprehensive investigation report",
                    "Factual findings and conclusions", 
                    "Evidence documentation",
                    "Witness statement summaries",
                    "Recommended corrective actions",
                    "Legal compliance assessment",
                    "Follow-up recommendations"
                  ].map((deliverable, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-gray-600 text-sm">{deliverable}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Confidentiality Assured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We maintain strict confidentiality throughout the investigation process, 
                    ensuring all parties' privacy is protected while conducting a thorough and fair investigation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Need Professional Investigation Support?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ensure fair and legally compliant handling of workplace harassment complaints with our expert investigation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Request Investigation Support
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
