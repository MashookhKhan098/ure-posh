import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="h-4 w-4 mr-2" />
              Quarterly Mandatory Training | Workplace Harassment & POSH Compliance | URE POSH
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              Quarterly Mandatory <span className="text-pink-600">Training</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              URE POSH delivers Quarterly Mandatory Training programs aligned with the POSH Act (India), Equality Act
              (UK), and EEOC (US). Build a harassment-free, compliant, and respectful workplace with recurring awareness
              and certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919999944807"
                className="group bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-pink-200 text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-2xl mb-6">
              <Building className="h-8 w-8 text-pink-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🏢 About URE POSH Quarterly Training</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              Workplace compliance is not a one-time exercise—laws and employees demand continuous awareness and
              sensitization. At URE POSH, we conduct Quarterly Mandatory Training Programs that keep organizations
              audit-ready, globally compliant, and culturally safe.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "✔️ Aligned with POSH Act, 2013 (India) requirements of periodic awareness.",
                "✔️ Covers Equality Act, 2010 (UK) and ACAS training guidelines.",
                "✔️ Meets EEOC & state mandates (US) for harassment prevention refreshers.",
                "✔️ ESG & CSR integrated for investor confidence.",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our quarterly programs ensure your employees, managers, and Internal Committee (IC) remain updated,
              trained, and certified.
            </p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Why Quarterly Training is Essential
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Compliance",
                desc: 'POSH Act in India mandates "regular workshops and awareness." EEOC & Equality Act recommend periodic refreshers.',
              },
              {
                title: "Changing Workforce",
                desc: "New hires, interns, and contractors must be trained quarterly.",
              },
              {
                title: "Continuous Risk Mitigation",
                desc: "Prevents legal liability, tribunal cases, and penalties.",
              },
              {
                title: "Audit-Readiness",
                desc: "Training logs & certificates serve as compliance proof.",
              },
              {
                title: "Global Best Practices",
                desc: "ESG/CSR boards demand regular reporting on training initiatives.",
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Our Quarterly Training Programs</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "1. Employee Awareness Modules",
                items: [
                  "Workplace harassment definition & examples.",
                  "Rights & responsibilities under POSH, Equality Act, EEOC laws.",
                  "Reporting mechanisms and confidentiality.",
                ],
              },
              {
                title: "2. Manager & Leadership Training",
                items: [
                  "Duty of care obligations.",
                  "Preventing retaliation.",
                  "Handling complaints professionally.",
                  "Case studies of tribunal/EEOC rulings.",
                ],
              },
              {
                title: "3. Internal Committee (IC) Quarterly Refreshers",
                items: [
                  "POSH timelines & case handling.",
                  "Mock inquiries & role-plays.",
                  "Report writing workshops.",
                  "Legal precedent updates.",
                ],
              },
              {
                title: "4. Global Policy Integration",
                items: [
                  "India: POSH compliance updates.",
                  "UK: Equality Act & ACAS codes.",
                  "US: EEOC + state-specific (CA, NY) requirements.",
                  "Cross-border consistency for MNCs.",
                ],
              },
              {
                title: "5. Digital & On-Site Formats",
                items: [
                  "Quarterly webinars + live workshops.",
                  "Interactive e-learning modules.",
                  "AI-powered training dashboards with attendance tracking & certificates.",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="bg-pink-50 p-8 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">{service.title}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-pink-600 rounded-full mt-2"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Key Benefits of URE POSH Quarterly Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "✔️ 100% Legal Compliance – India, UK, US.",
              "✔️ Reduced Litigation Risk – trained staff = fewer violations.",
              "✔️ Improved Workplace Culture – trust, safety, inclusion.",
              "✔️ Audit & ESG-Ready Proof – attendance logs, certificates, reports.",
              "✔️ Global Standardization – consistent framework across all offices.",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-pink-100"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "1. Is quarterly training legally mandatory?",
                answer:
                  'India: POSH Act requires "regular workshops." Quarterly sessions are best practice for compliance. UK: Equality Act expects employers to take "reasonable steps" (training included). US: EEOC recommends regular training; some states mandate annual refreshers (quarterly ensures readiness).',
              },
              {
                question: "2. Who must attend quarterly training?",
                answer: "All employees, contractors, interns, leadership, and Internal Committee members.",
              },
              {
                question: "3. What topics are covered?",
                answer:
                  "POSH Act, 2013 provisions. Equality Act, 2010 requirements. EEOC & Title VII obligations. Respect, inclusion, reporting, confidentiality.",
              },
              {
                question: "4. How is attendance tracked?",
                answer:
                  "Through digital LMS dashboards, sign-in sheets, and certification records—maintained for compliance audits.",
              },
              {
                question: "5. Can training be online?",
                answer: "Yes. E-learning + live webinars are legally acceptable if interactive and documented.",
              },
              {
                question: "6. What proof is required for compliance audits?",
                answer: "Training logs. Certificates. Annual compliance report annexures.",
              },
              {
                question: "7. What are penalties for not conducting regular training?",
                answer:
                  "India: ₹50,000 fine, cancellation of business license. UK: Tribunal rulings with financial penalties. US: EEOC lawsuits and settlements.",
              },
              {
                question: "8. How do quarterly trainings help new employees?",
                answer:
                  "Ensures immediate sensitization of new hires, interns, and contractors, preventing compliance gaps.",
              },
              {
                question: "9. Can one session cover all geographies?",
                answer:
                  "Yes—global modules with localized legal annexures (India, UK, US) for jurisdictional compliance.",
              },
              {
                question: "10. How do managers benefit from quarterly sessions?",
                answer: "They are trained as first responders, ensuring complaints are handled legally & respectfully.",
              },
              {
                question: "11. How do investors view quarterly training?",
                answer:
                  "Quarterly training strengthens ESG (Social Governance) scores and helps in due diligence checks.",
              },
              {
                question: "12. Does URE POSH certify quarterly compliance?",
                answer:
                  "Yes. We issue Quarterly Compliance Certificates confirming that the organization is POSH-compliant and globally audit-ready.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-pink-50 p-8 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">📢 Call to Action</h2>
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Compliance is not annual—it's continuous.</p>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Quarterly Mandatory Training that meets global compliance standards and
            strengthens workplace culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="tel:+919999944807"
              className="group flex items-center space-x-3 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              <span>📞 +91-99999 44807</span>
            </a>
            <a
              href="mailto:ea@ureposh.com"
              className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>📧 ea@ureposh.com</span>
            </a>
            <a
              href="https://www.ureposh.com"
              className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
            >
              <Globe className="h-5 w-5" />
              <span>🌍 www.ureposh.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">URE POSH</span>
          </div>
          <p className="text-gray-400 text-lg">
            Quarterly Mandatory Training | Workplace Harassment & POSH Compliance | URE POSH
          </p>
        </div>
      </footer>
    </div>
  )
}
