import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle, Users, Clock, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExpertTrainingProgramsPage() {
  const programs = [
    {
      title: "Employee Awareness Training",
      duration: "2-4 Hours",
      audience: "All Employees",
      topics: ["Understanding POSH Act", "Recognizing Harassment", "Reporting Procedures", "Workplace Behavior"]
    },
    {
      title: "Leadership & Manager Training",
      duration: "4-6 Hours", 
      audience: "Managers & Leaders",
      topics: ["Leadership Responsibility", "Creating Safe Culture", "Handling Complaints", "Legal Implications"]
    },
    {
      title: "Internal Committee Training",
      duration: "8-12 Hours",
      audience: "IC Members",
      topics: ["Investigation Process", "Evidence Collection", "Report Writing", "Confidentiality"]
    }
  ]

  const benefits = [
    "Interactive and engaging sessions",
    "Industry-specific case studies",
    "Practical role-playing exercises",
    "Comprehensive training materials",
    "Certificate of completion",
    "Follow-up support and guidance"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Expert Training Programs
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Professional training programs designed to create awareness, build skills, and foster a respectful workplace culture.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Training Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our expert-led training programs are tailored to different audiences within your organization, 
              ensuring everyone understands their role in maintaining a harassment-free workplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {program.title}
                  </CardTitle>
                  <div className="flex justify-center gap-4 mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {program.duration}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {program.audience}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Key Topics Covered:</h4>
                  <ul className="space-y-2">
                    {program.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Why Choose Our Training Programs?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our training programs go beyond basic compliance to create genuine understanding and behavioral change. 
                We use interactive methods, real-world scenarios, and expert facilitation to ensure maximum engagement and learning outcomes.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Training Methodology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Interactive Workshops", desc: "Engaging discussions and activities to promote understanding" },
                    { title: "Case Study Analysis", desc: "Real-world scenarios relevant to your industry" },
                    { title: "Role-Playing Exercises", desc: "Practice handling difficult situations" },
                    { title: "Q&A Sessions", desc: "Open forum for addressing specific concerns" }
                  ].map((method, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.title}</h4>
                        <p className="text-gray-600 text-sm">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flexible Delivery Options
              </h3>
              <p className="text-gray-600">
                Choose the training format that works best for your organization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "In-Person Training",
                  desc: "On-site training at your location for maximum engagement",
                  icon: Users
                },
                {
                  title: "Virtual Sessions",
                  desc: "Online training sessions with interactive features",
                  icon: BookOpen
                },
                {
                  title: "Hybrid Approach",
                  desc: "Combination of in-person and virtual training modules",
                  icon: Target
                }
              ].map((option, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                  <option.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-gray-600 text-sm">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Empower Your Team?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Invest in comprehensive training that creates lasting change and builds a stronger workplace culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Schedule Training
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
