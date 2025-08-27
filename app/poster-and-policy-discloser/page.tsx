import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4 mr-2" />
              POSH Poster & Policy Disclosure | Workplace Harassment Compliance | URE POSH
            </div>
            <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              POSH Poster & Policy <span className="text-pink-600">Disclosure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH provides legally compliant POSH posters and workplace policy disclosure services. We help
              corporates in India, UK & US comply with POSH Act, Equality Act, and EEOC standards with audit-ready
              documentation.
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
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-2xl mb-3">
              <Building className="h-8 w-8 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🏢 About URE POSH</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              At URE POSH, we understand that compliance is not complete until it is visible. The POSH Act, 2013 and
              global workplace laws mandate that organizations display posters and disclose policies to ensure employees
              are aware of their rights and reporting mechanisms.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              We support corporates, MNCs, and startups by designing and implementing:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "✔️ Legally compliant POSH posters (English + regional languages)",
                "✔️ Workplace harassment policies (India, UK & US frameworks)",
                "✔️ Public disclosure protocols (digital & physical)",
                "✔️ Employee awareness through policy accessibility",
                "✔️ Annual compliance audits & certifications",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Why Poster & Policy Disclosure Matters
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Legal Mandate (India)",
                desc: "Section 19 of POSH Act, 2013 requires prominent display of posters with details of Internal Committee (IC) and complaint process.",
              },
              {
                title: "UK Standards",
                desc: "Equality Act 2010 and ACAS guidelines require employers to publicly disclose anti-harassment policies.",
              },
              {
                title: "US Standards",
                desc: "EEOC mandates display of anti-harassment and EEO rights posters in the workplace.",
              },
              {
                title: "Employee Empowerment",
                desc: "Visible disclosures build trust and encourage reporting.",
              },
              {
                title: "Audit Readiness",
                desc: "Posters & policies serve as proof of compliance during inspections, ESG reviews, and due diligence.",
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Our Services in Poster & Policy Disclosure
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. POSH Act-Compliant Posters (India)",
                items: [
                  "Multilingual posters (English + regional languages).",
                  "Display IC details: Presiding Officer, members, external NGO expert.",
                  "Complaint procedure & timelines.",
                  "QR codes for digital policy access.",
                ],
              },
              {
                title: "2. Anti-Harassment Policy Drafting",
                items: [
                  "Customized for India, UK, and US jurisdictions.",
                  "Covers complaint procedure, timelines, confidentiality, corrective actions.",
                  "Legally defensible & aligned with court precedents.",
                ],
              },
              {
                title: "3. Workplace Policy Disclosure",
                items: [
                  "Digital policy disclosure via intranet/HRMS.",
                  "Physical display at notice boards, reception, washrooms, cafeterias.",
                  "Cloud-stored policies for employee access anytime.",
                ],
              },
              {
                title: "4. Compliance Reporting & Audits",
                items: [
                  "Annual audit of posters & disclosures.",
                  "Preparation of disclosure compliance reports.",
                  "Certification for ESG & investor governance audits.",
                ],
              },
              {
                title: "5. International Policy Harmonization",
                items: [
                  "India: POSH Act compliance.",
                  "UK: Equality Act + ACAS guidelines.",
                  "US: EEOC + Title VII requirements.",
                  "Unified global policy with local addendums.",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="bg-pink-50 p-4 rounded-2xl">
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
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Key Benefits of URE POSH Disclosure Services
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ 100% Legal Compliance (India/UK/US)",
              "✔️ Audit & ESG Ready documentation",
              "✔️ Employee Awareness of rights & complaint process",
              "✔️ Global Standard Posters & Policies",
              "✔️ Investor-Friendly Compliance",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-pink-100"
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
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                question: '1. What does "POSH poster disclosure" mean?',
                answer:
                  "It refers to mandatory workplace display of POSH-related information including the IC details, complaint process, and employee rights under POSH Act, 2013.",
              },
              {
                question: "2. Is poster display legally mandatory in India?",
                answer:
                  "Yes. Section 19(b) of POSH Act, 2013 requires employers to display details of the IC and complaint redressal system at conspicuous places in the workplace.",
              },
              {
                question: "3. What must be included in a POSH poster in India?",
                answer:
                  "Contact details of IC members. Procedure for filing complaints. Timelines for redressal (90 days inquiry, 10 days report, 60 days action). Statement of zero tolerance.",
              },
              {
                question: "4. In what languages should POSH posters be displayed?",
                answer: "At least in English and the regional/local language where the workplace is located.",
              },
              {
                question: "5. What are the penalties for not displaying posters in India?",
                answer: "Fine up to ₹50,000. Cancellation of business license on repeat offense.",
              },
              {
                question: "6. What are the UK requirements for harassment policy disclosure?",
                answer:
                  "Employers must ensure policies are accessible to all staff via handbooks, notice boards, or intranet. Employment Tribunals often ask for proof of awareness training and policy display.",
              },
              {
                question: "7. What posters are mandatory in the US for harassment compliance?",
                answer:
                  'The EEOC "Know Your Rights" poster must be displayed prominently, along with any state-specific harassment/EEO posters (e.g., California, New York).',
              },
              {
                question: "8. Can posters be digital?",
                answer:
                  "Yes. In India, UK, and US, digital disclosure is allowed, provided it is accessible, documented, and communicated to employees. However, physical posters remain a best practice.",
              },
              {
                question: "9. How often should posters/policies be updated?",
                answer:
                  "India: Whenever IC members change. UK/US: Whenever laws or company policies are updated. At least annual review is recommended.",
              },
              {
                question: '10. What are "conspicuous places" for posters?',
                answer:
                  "Reception areas, HR departments, notice boards, washrooms, cafeterias, and digital intranet dashboards.",
              },
              {
                question: "11. Can policy disclosure be part of induction training?",
                answer:
                  "Yes. Disclosure must be included in employee onboarding, with acknowledgment forms for legal proof.",
              },
              {
                question: "12. How does URE POSH support multinational companies?",
                answer:
                  "We: Draft unified global harassment policies. Create country-specific annexures for India, UK, US. Provide multilingual posters & disclosure materials. Conduct annual compliance audits & certifications.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-pink-50 p-4 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-balance">📢 Call to Action</h2>
          <p className="text-2xl mb-4 text-pink-100 font-semibold">
            ✨ Make Your Compliance Visible. Make Your Workplace Safer.
          </p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Poster & Policy Disclosure Services – legally compliant, globally aligned, and
            audit-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-3">
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
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">URE POSH</span>
          </div>
          <p className="text-gray-400 text-lg">POSH Poster & Policy Disclosure – Workplace Safety Compliance</p>
        </div>
      </footer>
    </div>
  )
}
