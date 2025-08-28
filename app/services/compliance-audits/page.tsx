import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, FileText, Users, Calendar, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ComplianceAuditsPage() {
  const auditAreas = [
    {
      title: "Policy Review & Assessment",
      description: "Comprehensive evaluation of existing POSH policies and procedures.",
      checklist: [
        "Policy comprehensiveness review",
        "Legal compliance verification",
        "Gap identification",
        "Best practice recommendations"
      ]
    },
    {
      title: "Internal Committee Evaluation",
      description: "Assessment of Internal Committee structure, training, and effectiveness.",
      checklist: [
        "Committee composition analysis",
        "Member qualification review",
        "Training adequacy assessment",
        "Process effectiveness evaluation"
      ]
    },
    {
      title: "Complaint Handling Review",
      description: "Analysis of complaint management processes and case handling procedures.",
      checklist: [
        "Complaint process evaluation",
        "Response time analysis",
        "Investigation quality review",
        "Resolution effectiveness assessment"
      ]
    }
  ]

  const auditBenefits = [
    "Legal compliance assurance",
    "Risk mitigation strategies",
    "Process improvement recommendations",
    "Training gap identification",
    "Best practice implementation",
    "Documentation enhancement",
    "Stakeholder confidence building"
  ]

  const auditProcess = [
    { phase: "Pre-Audit Preparation", desc: "Document review and audit planning", duration: "1-2 Days" },
    { phase: "On-Site Assessment", desc: "Interviews, observations, and data collection", duration: "2-3 Days" },
    { phase: "Analysis & Evaluation", desc: "Comprehensive analysis of findings", duration: "3-5 Days" },
    { phase: "Report Preparation", desc: "Detailed audit report with recommendations", duration: "2-3 Days" },
    { phase: "Presentation & Follow-up", desc: "Findings presentation and implementation support", duration: "1 Day" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Compliance Audits
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive POSH compliance audits to assess your organization's adherence to legal requirements and identify areas for improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Audit Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Audit Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our thorough compliance audits examine all aspects of your POSH implementation 
              to ensure legal compliance and organizational effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {auditAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{area.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Audit Checklist:</h4>
                    {area.checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Audit Process */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Audit Process
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A systematic approach to evaluating your POSH compliance and identifying improvement opportunities
              </p>
            </div>

            <div className="space-y-6">
              {auditProcess.map((phase, index) => (
                <div key={index} className="flex items-start gap-6 bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{phase.phase}</h4>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {phase.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Benefits of POSH Compliance Audits
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Regular compliance audits help organizations maintain high standards, 
                identify potential risks, and continuously improve their harassment prevention measures.
              </p>
              <div className="space-y-3">
                {auditBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    Audit Deliverables
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Comprehensive audit report",
                    "Compliance status assessment",
                    "Gap analysis and recommendations",
                    "Risk assessment matrix",
                    "Implementation roadmap",
                    "Best practice guidelines",
                    "Follow-up action plan"
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
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our audits are conducted by certified professionals with extensive experience 
                    in POSH compliance, ensuring thorough and accurate assessments that meet 
                    the highest industry standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Audit Frequency */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Recommended Audit Frequency
              </h3>
              <p className="text-gray-600">
                Regular audits ensure ongoing compliance and continuous improvement
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Annual Comprehensive Audit",
                  desc: "Complete assessment of all POSH compliance areas",
                  frequency: "Once per year",
                  icon: Shield
                },
                {
                  title: "Quarterly Reviews",
                  desc: "Focused reviews of specific areas or recent changes",
                  frequency: "Every 3 months",
                  icon: FileText
                },
                {
                  title: "Ad-hoc Assessments",
                  desc: "Targeted audits following incidents or policy changes",
                  frequency: "As needed",
                  icon: Target
                }
              ].map((option, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                  <option.icon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{option.desc}</p>
                  <Badge variant="outline">{option.frequency}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Assess Your Compliance?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a comprehensive POSH compliance audit to ensure your organization meets all legal requirements 
              and industry best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8 py-4">
                  Schedule Compliance Audit
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
