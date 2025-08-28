import {
  CheckCircle,
  Phone,
  Mail,
  Globe,
  AlertTriangle,
  Shield,
  Users,
  Award,
  Scale,
  Building,
  ArrowRight,
} from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              India's Trusted POSH Compliance Partner
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              POSH Compliance <span className="text-pink-600">Initiation</span>
            </h1>
            <p className="text-base text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH is India's trusted workplace safety compliance company. We provide end-to-end POSH compliance
              initiation services – policy drafting, IC formation, employee training, legal audits, and annual filings.
            </p>
            <p className="text-sm text-gray-500 mb-6 text-balance">
              Build a harassment-free workplace with international standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919999644807"
                className="group bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-pink-200 text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">About Our POSH Compliance Services</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                At URE POSH, we specialize in Prevention of Sexual Harassment (POSH) compliance consulting, helping
                companies design, implement, and monitor safe workplace frameworks.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                We understand that today's corporates are evaluated not only on profitability but also on employee
                well-being, ESG compliance, and legal accountability.
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-2xl">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Our Core Services</h3>
              <div className="space-y-2">
                {[
                  "End-to-end POSH compliance initiation",
                  "Custom workplace policy drafting",
                  "Internal Committee (IC) constitution & training",
                  "Awareness & sensitization programs",
                  "Annual filings & compliance audit reports",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-4 h-4 bg-pink-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why POSH Compliance Matters */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              Why POSH Compliance Matters for Top Companies
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Scale,
                title: "Statutory Requirement",
                description: "Mandatory under POSH Act, 2013 for all companies with 10+ employees",
              },
              {
                icon: Shield,
                title: "Reputation Risk Mitigation",
                description: "Avoid litigation, penalties, and reputational damage",
              },
              {
                icon: Award,
                title: "Investor & ESG Alignment",
                description: "Global investors assess DEI & POSH compliance before funding",
              },
              {
                icon: Users,
                title: "Employee Trust",
                description: "Builds safe workplace culture, improves retention & employer brand",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white p-4 rounded-2xl shadow-sm border border-pink-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-pink-600 transition-colors">
                  <item.icon className="h-4 w-4 text-pink-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Penalties */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center mr-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-900 text-balance">Legal Penalties for Non-Compliance</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-2xl border border-red-200 shadow-sm">
                <h3 className="font-semibold text-red-900 mb-1 text-sm">Financial Penalties</h3>
                <p className="text-red-700 leading-relaxed text-xs">Penalty up to ₹50,000 for first-time violations</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-red-200 shadow-sm">
                <h3 className="font-semibold text-red-900 mb-1 text-sm">License Cancellation</h3>
                <p className="text-red-700 leading-relaxed text-xs">License cancellation for repeated non-compliance</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-red-200 shadow-sm">
                <h3 className="font-semibold text-red-900 mb-1 text-sm">Public Disclosure</h3>
                <p className="text-red-700 leading-relaxed text-xs">
                  Public disclosure & reputational loss in case of non-filing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              Our POSH Compliance Initiation Services
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. Policy Drafting & Customization",
                description: "We create legally sound, company-specific POSH policies aligned with:",
                items: [
                  "POSH Act, 2013",
                  "Supreme Court & High Court precedents",
                  "ILO & UN women workplace guidelines",
                ],
              },
              {
                title: "2. Internal Committee (IC) Formation",
                description: "Complete IC setup and training:",
                items: [
                  "Assistance in IC constitution as per law",
                  "Appointment of External Member (mandatory)",
                  "Role & responsibility training for IC members",
                ],
              },
              {
                title: "3. Employee Training & Sensitization",
                description: "Comprehensive training programs:",
                items: [
                  "Workshops on rights & responsibilities under POSH Act",
                  "Case study-based learning for employees & managers",
                  "Digital learning modules for large organizations",
                ],
              },
              {
                title: "4. Employer & Leadership Training",
                description: "Leadership-focused compliance training:",
                items: [
                  "Compliance duties of employer/HR heads",
                  "Role of management in preventing retaliation & victimization",
                  "Governance reporting for Board-level oversight",
                ],
              },
              {
                title: "5. Investigation & Advisory Support",
                description: "Expert guidance during inquiries:",
                items: [
                  "Handholding IC during inquiries",
                  "Drafting inquiry reports & legal recommendations",
                  "Advisory on confidentiality & disciplinary actions",
                ],
              },
              {
                title: "6. Annual Filings & Compliance Reporting",
                description: "Complete filing and reporting services:",
                items: [
                  "Preparation of Annual Report under Section 21 of POSH Act",
                  "Filing with District Officer / Local Committee",
                  "Record maintenance for audits & inspections",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-4 rounded-2xl shadow-sm border border-pink-100 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-3 leading-relaxed text-xs">{service.description}</p>
                <ul className="space-y-1">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-2.5 w-2.5 text-pink-600" />
                      </div>
                      <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Service */}
          <div className="mt-4 bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
            <h3 className="text-base font-semibold text-gray-900 mb-3">7. Compliance Audit & Certification</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-3 h-3 bg-pink-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-2 w-2 text-pink-600" />
                </div>
                <span className="text-gray-600 leading-relaxed text-xs">End-to-end POSH compliance audit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-3 h-3 bg-pink-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-2 w-2 text-pink-600" />
                </div>
                <span className="text-gray-600 leading-relaxed text-xs">
                  Certification for ESG reporting, CSR, and investor due diligence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">Benefits of Partnering with URE POSH</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Zero legal risk with 100% POSH compliance",
              "Internationally benchmarked training modules",
              "Stronger ESG & CSR reporting framework",
              "Reputation & employee brand protection",
              "Ready compliance for MNC standards & global investors",
            ].map((benefit, index) => (
              <div
                key={index}
                className="group flex items-center space-x-2 p-3 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors"
              >
                <div className="flex-shrink-0 w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed text-xs">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">12 Detailed & Technical FAQs</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                question: "Is POSH compliance mandatory for all companies?",
                answer:
                  "Yes. Under Section 4 of POSH Act, 2013, every workplace with 10 or more employees must constitute an Internal Committee (IC) and implement compliance measures.",
              },
              {
                question: "What are the legal penalties for non-compliance?",
                answer:
                  "Companies may face fines up to ₹50,000, cancellation of licenses, and reputational damage. Repeated violations invite higher penalties and disqualification of responsible officers.",
              },
              {
                question: "What are the duties of the employer under POSH Act?",
                answer:
                  "Employers must: Provide a safe workplace environment, Draft & communicate POSH policies, Constitute an IC with external member, Conduct awareness training, File annual compliance reports.",
              },
              {
                question: 'What constitutes "sexual harassment" under POSH Act?',
                answer:
                  "It includes: Unwelcome physical contact and advances, Demands for sexual favors, Sexually colored remarks, Showing pornography, Any unwelcome verbal, non-verbal, or physical conduct of sexual nature.",
              },
              {
                question: "How should the Internal Committee be structured?",
                answer:
                  "As per Rule 4 of POSH Rules, 2013: Presiding Officer: Senior woman employee, At least 2 employee members with social credibility, 1 external member (NGO/Legal expert), Total strength ≥ 4, with 50% women.",
              },
              {
                question: "What is the timeline for inquiry completion?",
                answer:
                  "An IC must complete inquiry within 90 days of complaint. The report must be submitted to the employer/District Officer within 10 days thereafter.",
              },
              {
                question: "How is confidentiality maintained during inquiries?",
                answer:
                  "Section 16 of POSH Act mandates strict confidentiality of complaints, witness statements, and inquiry proceedings. Breach attracts fines.",
              },
              {
                question: "What records must be maintained for POSH compliance?",
                answer:
                  "Complaint register, IC meeting minutes, Inquiry proceedings & recommendations, Annual reports submitted to District Officer.",
              },
              {
                question: "Is online POSH training sufficient for compliance?",
                answer:
                  "Legally, awareness programs must be conducted regularly. Online training is acceptable but must be supplemented with interactive sessions and documented evidence.",
              },
              {
                question: "What is the role of External Member in IC?",
                answer:
                  "They provide independent oversight, ensure fairness, and bring expertise in women's rights, law, or NGO/social work. Their presence ensures inquiries are unbiased.",
              },
              {
                question: "Can POSH compliance be integrated with ESG reporting?",
                answer:
                  "Yes. Investors & MNC partners now require proof of POSH compliance as part of ESG (Social Governance) audits. URE POSH provides compliance certification for global due diligence.",
              },
              {
                question: "How does URE POSH ensure international standard compliance?",
                answer:
                  "We align policies with: POSH Act, 2013 (India), ILO Workplace Harassment Guidelines, UN Women's Empowerment Principles (WEPs), Corporate ESG & CSR frameworks.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {index + 1}. {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-balance">
            Ensure 100% POSH Compliance – Protect Your Workplace & Reputation
          </h2>
          <p className="text-base mb-6 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH, India's most trusted POSH compliance consulting firm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
            <a
              href="tel:+919999644807"
              className="group flex items-center space-x-2 bg-white text-pink-600 px-4 py-2 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              <Phone className="h-3 w-3" />
              <span>+91-99999 44807</span>
            </a>
            <a
              href="mailto:ea@ureposh.com"
              className="group flex items-center space-x-2 bg-white text-pink-600 px-4 py-2 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              <Mail className="h-3 w-3" />
              <span>ea@ureposh.com</span>
            </a>
            <a
              href="https://www.ureposh.com"
              className="group flex items-center space-x-2 bg-white text-pink-600 px-4 py-2 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
            >
              <Globe className="h-3 w-3" />
              <span>www.ureposh.com</span>
            </a>
          </div>
          <p className="text-sm text-pink-100 mb-3">Get in touch for a free consultation or demo!</p>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl">
            <Phone className="h-4 w-4 mr-2 text-pink-200" />
            <a href="tel:+919999644807" className="text-lg font-bold text-white hover:text-pink-200 transition-colors">
              9999644807
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-1.5 rounded-xl">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">URE POSH</span>
          </div>
          <p className="text-gray-400 text-sm">India's trusted workplace safety compliance company</p>
        </div>
      </footer>
    </div>
  )
}
