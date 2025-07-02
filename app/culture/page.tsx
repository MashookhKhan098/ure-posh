import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Shield, Lightbulb, Target, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CulturePage() {
  const values = [
    {
      title: "Inclusion is the Starting Point",
      description:
        "We approach every partnership with the understanding that inclusion isn't optional—it's essential. Our work focuses on building spaces that welcome and respect all gender identities and expressions.",
      icon: Users,
      color: "from-rose-500 to-pink-600",
    },
    {
      title: "Everyone Deserves a Safe Workplace",
      description:
        "Safety at work is a basic right. We collaborate with organizations not just to meet POSH requirements, but to embed lasting values of respect, dignity, and zero tolerance for harassment.",
      icon: Shield,
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Rewriting Outdated Norms",
      description:
        "We challenge traditional systems that fail to protect or empower individuals. Our goal is to replace them with structures rooted in fairness, equality, and accountability.",
      icon: Lightbulb,
      color: "from-purple-500 to-rose-600",
    },
    {
      title: "Diversity is Our Strength",
      description:
        "We honor all forms of diversity—be it gender, culture, ability, or thought. Real progress happens when everyone is seen, heard, and represented.",
      icon: Sparkles,
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "From Words to Action",
      description:
        "Our commitment isn't just theoretical. We work hands-on with organizations to implement real, effective changes that go beyond compliance—and create cultures people can trust.",
      icon: Target,
      color: "from-pink-500 to-rose-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                UREPOSH
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-rose-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-rose-600 transition-colors">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-rose-600 transition-colors">
                Services
              </Link>
              <Link href="/culture" className="text-rose-600 font-medium">
                Culture
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-rose-600 transition-colors">
                Our People
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-rose-600 transition-colors">
                Contact
              </Link>
            </div>
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200">Our Culture</Badge>
            <h1 className="text-5xl font-bold text-gray-900">
              Where{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Care</span>{" "}
              Meets{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Compliance
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Ureposh, we treat our core values as everyday promises, not just ideas. We work hard to build
              workplaces that are safer, welcoming to everyone, and without harassment.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Diverse team collaboration"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl -z-10"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Belief System</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We believe every individual has the right to work in a space where they feel safe, respected, and
                  appreciated—no matter their gender or background. This belief drives all our actions, whether it's
                  creating POSH-aligned policies or supporting businesses to build inclusive environments.
                </p>
                <p>
                  Kindness, honesty, and taking action define us as a group. We're not here to tick boxes—we're here to
                  create impact. We help shape workspaces that protect, empower, and uplift every individual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="space-y-8">
            {values.map((value, index) => (
              <Card key={index} className="border-rose-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mx-auto lg:mx-0`}
                      >
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="lg:col-span-10 text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Creating Real Impact</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Ureposh, we're not here to tick boxes—we're here to create impact. We help shape workspaces that
                  protect, empower, and uplift every individual. Our approach goes beyond compliance to create lasting
                  cultural change.
                </p>
                <p>
                  We work hands-on with organizations to implement real, effective changes that go beyond compliance—and
                  create cultures people can trust. Every partnership is an opportunity to make workplaces more human,
                  more inclusive, and more respectful.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                    Learn Our Story
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-rose-300 text-rose-700 hover:bg-rose-50 bg-transparent">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Workplace transformation"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture in Action */}
      <section className="py-20 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Culture in Action</h2>
            <p className="text-xl text-gray-600">How our values translate into real-world impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Empowering Voices",
                description:
                  "We create safe spaces where every individual feels heard and valued, regardless of their position or background.",
                icon: Users,
                stats: "10,000+ employees empowered",
              },
              {
                title: "Building Trust",
                description:
                  "Through transparent processes and genuine care, we help organizations build cultures of trust and accountability.",
                icon: Heart,
                stats: "99% client satisfaction rate",
              },
              {
                title: "Driving Change",
                description:
                  "We don't just implement policies—we drive cultural transformation that creates lasting positive impact.",
                icon: Target,
                stats: "500+ organizations transformed",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-rose-200 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">{item.description}</CardDescription>
                  <div className="text-sm font-semibold text-rose-600">{item.stats}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Join Our Mission</h2>
          <p className="text-xl text-gray-600">
            Be part of creating workplaces where everyone feels safe, respected, and empowered to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
              >
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/team">
              <Button
                size="lg"
                variant="outline"
                className="border-rose-300 text-rose-700 hover:bg-rose-50 bg-transparent"
              >
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">UREPOSH</span>
              </div>
              <p className="text-gray-400">Creating safe, inclusive, and compliant workplaces across India.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-rose-400">
                    POSH Policy Advisory
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-rose-400">
                    IC Setup & Training
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-rose-400">
                    Investigation Support
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-rose-400">
                    POSH Audits
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-rose-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/culture" className="hover:text-rose-400">
                    Our Culture
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-rose-400">
                    Our People
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-rose-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@ureposh.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ureposh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
