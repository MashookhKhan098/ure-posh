import Link from "next/link"
import { ArrowRight, Newspaper, Calendar, Award, ExternalLink, ArrowLeft, Download, Eye, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PressPage() {
  const pressReleases = [
    {
      title: "UREPOSH Expands Services to Serve 500+ Organizations Nationwide",
      date: "March 15, 2024",
      category: "Company News",
      excerpt: "Leading POSH compliance provider reaches milestone of serving over 500 organizations across India, demonstrates growing commitment to workplace safety.",
      link: "#",
      featured: true
    },
    {
      title: "New Certification Program Launched for POSH Professionals",
      date: "February 20, 2024", 
      category: "Product Launch",
      excerpt: "Industry-first professional certification program aims to standardize expertise in workplace harassment prevention and investigation.",
      link: "#"
    },
    {
      title: "UREPOSH Partners with Leading Educational Institutions",
      date: "January 10, 2024",
      category: "Partnership",
      excerpt: "Strategic partnerships with universities and colleges enhance campus safety and promote awareness among future workforce.",
      link: "#"
    },
    {
      title: "Digital Platform Launch Revolutionizes POSH Compliance",
      date: "December 5, 2023",
      category: "Technology",
      excerpt: "New digital compliance platform streamlines POSH implementation, making it easier for organizations to maintain ongoing compliance.",
      link: "#"
    }
  ]

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution UREPOSH logos in various formats",
      type: "ZIP Archive",
      size: "2.4 MB",
      icon: Download
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      type: "ZIP Archive", 
      size: "8.7 MB",
      icon: Users
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "PDF",
      size: "156 KB",
      icon: Newspaper
    },
    {
      title: "Product Brochures",
      description: "Service overview and capability documents",
      type: "PDF Collection",
      size: "3.2 MB",
      icon: Eye
    }
  ]

  const awards = [
    {
      title: "Best Workplace Safety Solution Provider",
      organization: "HR Excellence Awards 2023",
      year: "2023",
      description: "Recognized for innovative approach to workplace harassment prevention and compliance."
    },
    {
      title: "Social Impact Leader",
      organization: "Business for Good Awards",
      year: "2022", 
      description: "Honored for creating positive social change through workplace culture transformation."
    },
    {
      title: "Innovation in HR Technology",
      organization: "Tech Innovators Summit",
      year: "2022",
      description: "Acknowledged for developing cutting-edge digital solutions for POSH compliance."
    }
  ]

  const mediaContact = {
    name: "Priya Sharma",
    title: "Communications Director",
    email: "media@ureposh.com",
    phone: "+91 98765 43210"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Newspaper className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Press & Media
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Stay updated with UREPOSH's latest news, announcements, and insights into 
              workplace harassment prevention and compliance.
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

      {/* Latest News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest News & Announcements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get the latest updates on our company milestones, product launches, partnerships, 
              and industry insights.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {pressReleases.map((release, index) => (
              <Card key={index} className={`border-0 shadow-lg bg-white hover:shadow-xl transition-shadow ${
                release.featured ? 'border-l-4 border-l-blue-500' : ''
              }`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={release.featured ? "default" : "secondary"}>
                          {release.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Calendar className="h-4 w-4" />
                          {release.date}
                        </div>
                        {release.featured && (
                          <Badge variant="destructive" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                        {release.title}
                      </CardTitle>
                      <p className="text-gray-600 leading-relaxed">{release.excerpt}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Read Full Story
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Media Kit & Resources
              </h3>
              <p className="text-gray-600">
                Download high-quality assets, company information, and media resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <div className="flex justify-center gap-2 text-xs text-gray-500">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Awards & Recognition
              </h3>
              <p className="text-gray-600">
                Celebrating our achievements and industry recognition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{award.title}</h4>
                  <p className="text-blue-600 font-medium text-sm mb-2">{award.organization}</p>
                  <Badge variant="outline" className="mb-3">{award.year}</Badge>
                  <p className="text-gray-600 text-sm">{award.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Media Contact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                For media inquiries, interview requests, or additional information, 
                please reach out to our communications team. We're available to provide 
                expert commentary on workplace harassment prevention, POSH compliance, 
                and industry trends.
              </p>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {mediaContact.name}
                  </CardTitle>
                  <p className="text-blue-600">{mediaContact.title}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Email:</span>
                    <Link href={`mailto:${mediaContact.email}`} className="text-blue-600 hover:underline">
                      {mediaContact.email}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Phone:</span>
                    <Link href={`tel:${mediaContact.phone}`} className="text-blue-600 hover:underline">
                      {mediaContact.phone}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Media Guidelines
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-gray-600 text-sm">We typically respond to media inquiries within 24 hours during business days.</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">Interview Availability</h4>
                  <p className="text-gray-600 text-sm">Our executives are available for interviews with advance notice. We can accommodate various formats including phone, video, and in-person meetings.</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-900 mb-2">Expert Commentary</h4>
                  <p className="text-gray-600 text-sm">We provide expert commentary on POSH compliance, workplace harassment prevention, HR best practices, and employment law topics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Connected
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates and insights, or subscribe to our newsletter 
              for regular updates on workplace safety and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/posts">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4">
                  Read Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/connect">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
