"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Calendar } from "../../components/ui/calendar";
import { Badge } from "../../components/ui/badge"
import { Heart, Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar as CalendarIcon } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
              <Link href="/culture" className="text-gray-700 hover:text-rose-600 transition-colors">
                Culture
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-rose-600 transition-colors">
                Our People
              </Link>
              <Link href="/contact" className="text-rose-600 font-medium">
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
            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200">Contact Us</Badge>
            <h1 className="text-5xl font-bold text-gray-900">
              Let's{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Workplace
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to create a safer, more inclusive workplace? We're here to help. Reach out to discuss your POSH
              compliance needs and workplace safety goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-rose-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <MessageCircle className="h-6 w-6 text-rose-600 mr-2" />
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company/Organization
                  </label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <div className="mt-1">
                    <Calendar
                      mode="single"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-gray-700">
                    Service of Interest
                  </label>
                  <select className="w-full px-3 py-2 border border-rose-200 rounded-md focus:border-rose-400 focus:ring-rose-400 focus:ring-1">
                    <option value="">Select a service</option>
                    <option value="policy">POSH Policy Advisory</option>
                    <option value="ic-setup">IC Setup & Training</option>
                    <option value="investigation">Investigation Support</option>
                    <option value="audit">POSH Audits</option>
                    <option value="certification">Certification Programs</option>
                    <option value="training">Gender Sensitization</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements and how we can help..."
                    rows={4}
                    className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-rose-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Get in Touch</CardTitle>
                  <CardDescription className="text-gray-600">
                    Multiple ways to reach us for your convenience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">info@ureposh.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Visit Us</h4>
                      <p className="text-gray-600">Mumbai, Maharashtra, India</p>
                      <p className="text-sm text-gray-500">By appointment only</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                      <p className="text-sm text-gray-500">Closed on Sundays and holidays</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <CalendarIcon className="h-5 w-5 text-rose-600 mr-2" />
                    Schedule a Consultation
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Book a free 30-minute consultation to discuss your POSH compliance needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                    Book Free Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "How quickly can you help us become POSH compliant?",
                answer:
                  "Depending on your organization's size and current state, we can help you achieve basic compliance within 2-4 weeks. Complete implementation with training typically takes 6-8 weeks.",
              },
              {
                question: "Do you provide ongoing support after implementation?",
                answer:
                  "Yes, we provide continuous support including annual compliance reviews, IC training updates, investigation assistance, and policy updates as regulations change.",
              },
              {
                question: "What industries do you work with?",
                answer:
                  "We work with organizations across all industries including IT, manufacturing, healthcare, education, startups, and government organizations of all sizes.",
              },
              {
                question: "Can you help with existing harassment cases?",
                answer:
                  "Yes, we provide expert guidance for ongoing investigations, help with proper documentation, and ensure compliance with legal procedures throughout the process.",
              },
              {
                question: "What is the cost of your services?",
                answer:
                  "Our pricing varies based on organization size, services required, and complexity. We offer customized packages and provide detailed quotes after understanding your specific needs.",
              },
              {
                question: "Do you provide training in regional languages?",
                answer:
                  "Yes, we conduct training sessions in Hindi, English, and several regional languages to ensure effective communication and understanding across your organization.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-rose-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600">
            Take the first step towards creating a safer, more inclusive workplace for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
            >
              Start Your Journey Today
            </Button>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-rose-300 text-rose-700 hover:bg-rose-50 bg-transparent"
              >
                Explore Our Services
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
