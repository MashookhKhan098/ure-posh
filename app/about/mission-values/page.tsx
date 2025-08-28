import Link from "next/link"
import { ArrowRight, Target, Heart, Award, Shield, Users, Globe, Zap, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MissionValuesPage() {
  const coreValues = [
    {
      title: "Integrity",
      description: "We conduct our work with the highest ethical standards, transparency, and honesty. Every decision we make is guided by doing what's right, not what's easy.",
      icon: Shield,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Excellence", 
      description: "We strive for exceptional quality in everything we do, continuously improving our services and setting new standards in workplace harassment prevention.",
      icon: Award,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Empowerment",
      description: "We believe in empowering individuals and organizations to create positive change, providing them with the knowledge and tools they need to succeed.",
      icon: Users,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Innovation",
      description: "We continuously evolve our approaches to meet changing workplace needs, leveraging technology and best practices to deliver cutting-edge solutions.",
      icon: Zap,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Inclusivity",
      description: "We embrace diversity in all its forms and work to create environments where everyone feels valued, respected, and able to contribute their best.",
      icon: Globe,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Compassion",
      description: "We approach every situation with empathy and understanding, recognizing the human impact of workplace harassment and the courage it takes to speak up.",
      icon: Heart,
      color: "from-rose-500 to-pink-600"
    }
  ]

  const principles = [
    "We put people first in everything we do",
    "We maintain the highest standards of confidentiality and discretion",
    "We provide practical, actionable solutions",
    "We measure our success by the positive impact we create",
    "We continuously learn and adapt to serve our clients better",
    "We believe prevention is better than cure"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Our Mission & Values
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Discover the driving force behind everything we do and the values that guide our commitment 
              to creating safer, more inclusive workplaces.
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                At UREPOSH, our mission is to empower organizations with expert POSH compliance solutions that 
                promote mutual respect and safety in the workplace. We provide training, policy development, 
                and strategic guidance that not only meet legal requirements but also encourage an environment 
                where dignity, inclusivity, and equality are at the forefront.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are dedicated to supporting businesses in creating a workplace where everyone feels protected, 
                valued, and free from harassment, discrimination, or bias.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Our Commitment</h3>
                <ul className="space-y-2">
                  {principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-8 w-8 text-pink-600" />
                    <CardTitle className="text-2xl font-bold text-gray-900">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Our vision is to lead the way in POSH compliance, known for our commitment to advancing 
                    workplace equality, safety, and integrity. We aim to offer world-class training, 
                    customized solutions, and effective consultation services that help organizations maintain 
                    the highest standards of professionalism and respect.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-700 font-medium italic">
                      "We envision a future where every workplace is a safe space for all, where sexual 
                      harassment no longer exists, and where respect is the foundation of every workplace culture."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide every decision we make and shape our approach 
                to creating positive workplace transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How We Live Our Values */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How We Live Our Values
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our values aren't just words on a wall – they're the foundation of how we operate, 
                serve our clients, and contribute to positive workplace change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3">In Our Client Relationships</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We listen actively and respond with tailored solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We maintain absolute confidentiality and trust</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We deliver measurable results and ongoing support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3">In Our Community Impact</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We advocate for workplace rights and equality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We share knowledge through education and awareness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We support organizations of all sizes and sectors</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3">In Our Team Culture</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We practice what we preach with inclusive leadership</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We invest in continuous learning and development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We celebrate diversity and different perspectives</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-3">In Our Innovation</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We embrace new technologies and methodologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We adapt to evolving workplace dynamics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">We pioneer best practices in harassment prevention</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Partner with Purpose?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in our mission to create workplaces where respect, dignity, and inclusion are the norm, 
              not the exception.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about/leadership">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Meet Our Leadership
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
