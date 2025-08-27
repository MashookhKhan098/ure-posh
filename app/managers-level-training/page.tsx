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
              Managers Level Training | POSH & Workplace Compliance Programs | URE POSH
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              Manager-Level <span className="text-pink-600">Training</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              URE POSH provides Manager-Level Compliance Training aligned with the POSH Act (India), Equality Act (UK),
              and EEOC (US). Train managers to handle workplace harassment, respect, and compliance obligations with
              global best practices.
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🏢 About URE POSH Manager-Level Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              Managers are the first line of defense in creating a respectful, safe, and compliant workplace. Their
              actions directly impact employee trust, organizational culture, and legal liability. At URE POSH, our
              Manager-Level Training programs equip leaders with the skills, knowledge, and compliance framework needed
              to:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "✔️ Identify and prevent harassment, bias, and discrimination.",
                "✔️ Handle complaints fairly, confidentially, and lawfully.",
                "✔️ Lead with respect and inclusion.",
                "✔️ Ensure compliance with India's POSH Act, UK's Equality Act, and US EEOC guidelines.",
                "✔️ Strengthen ESG and governance credibility for investors and boards.",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-pink-50 rounded-2xl">
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
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Why Manager Training is Critical</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "India (POSH Act, 2013)",
                desc: "Employers must ensure managers are sensitized to workplace harassment prevention and IC cooperation.",
              },
              {
                title: "UK (Equality Act, 2010)",
                desc: 'Employers must take "reasonable steps" (training managers is key to defense in Employment Tribunals).',
              },
              {
                title: "US (EEOC & state mandates)",
                desc: "Supervisors must undergo harassment prevention training in states like California & New York.",
              },
              {
                title: "Global ESG Reporting",
                desc: "Boards and investors demand leadership-level accountability in workplace compliance.",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Our Manager-Level Training Modules
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "1. Legal Frameworks for Managers",
                items: [
                  'POSH Act duties of "Employer" & "Responsible Officers."',
                  "Equality Act, 2010: Preventing liability in UK tribunals.",
                  "EEOC and Title VII responsibilities in US workplaces.",
                ],
              },
              {
                title: "2. Identifying Workplace Misconduct",
                items: [
                  "Recognizing harassment, bullying, microaggressions.",
                  "Understanding protected characteristics.",
                  "Case studies from courts and tribunals.",
                ],
              },
              {
                title: "3. Handling Complaints & Escalations",
                items: [
                  "Receiving complaints respectfully.",
                  "Escalation to Internal Committee (India), HR/grievance panels (UK/US).",
                  "Confidentiality & non-retaliation best practices.",
                ],
              },
              {
                title: "4. Manager as Role Model",
                items: [
                  "Leading by example.",
                  "Building inclusive team culture.",
                  "Promoting diversity & equal opportunities.",
                ],
              },
              {
                title: "5. Reporting & Documentation",
                items: [
                  "Maintaining defensible compliance records.",
                  "IC/HR cooperation.",
                  "ESG/CSR disclosure reporting.",
                ],
              },
              {
                title: "6. Interactive Learning",
                items: [
                  "Role-plays on handling sensitive situations.",
                  "Mock complaint redressal exercises.",
                  "Leadership self-assessment & certification.",
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
              🔹 Key Benefits of URE POSH Manager Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "✔️ 100% Legal Compliance – India, UK, US standards.",
              "✔️ Reduced Employer Liability – managers trained to prevent escalations.",
              "✔️ Improved Culture & Retention – employees trust managers to act fairly.",
              "✔️ Audit-Ready Records – training certificates & logs.",
              "✔️ ESG & Investor Alignment – leadership accountability built into governance.",
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
                question: "1. Is Manager-Level Training legally required?",
                answer:
                  "Yes. POSH Act (India) mandates regular sensitization. In the UK, tribunals expect manager training. In the US, EEOC & many states mandate supervisor training.",
              },
              {
                question: "2. Who should attend Manager-Level Training?",
                answer: "All line managers, team leaders, HR managers, compliance officers, and department heads.",
              },
              {
                question: "3. What are managers' legal duties under POSH Act?",
                answer:
                  "Prevent harassment. Support IC inquiries. Ensure confidentiality. Implement IC recommendations.",
              },
              {
                question: "4. How does manager training protect companies in UK tribunals?",
                answer:
                  'Training demonstrates "reasonable steps" under Equality Act, helping employers defend against harassment claims.',
              },
              {
                question: "5. What is the consequence of untrained managers in the US?",
                answer:
                  "EEOC may impose fines, settlements, or mandatory training orders. Courts often hold companies liable if managers ignore or mishandle complaints.",
              },
              {
                question: "6. How often should managers undergo training?",
                answer: "At least annually; quarterly refreshers are recommended for high-risk industries.",
              },
              {
                question: "7. What skills do managers gain?",
                answer: "Complaint handling. Respectful communication. Bias recognition. Legal documentation.",
              },
              {
                question: "8. Can training be conducted online?",
                answer: "Yes. Virtual training is valid if interactive, trackable, and certified.",
              },
              {
                question: "9. What documentation must be kept?",
                answer:
                  "Attendance logs. Training certificates. Policy acknowledgment forms. Case simulation assessments.",
              },
              {
                question: "10. What role do managers play in ESG compliance?",
                answer:
                  "They provide governance accountability, ensuring workplace respect is embedded in corporate reporting.",
              },
              {
                question: "11. Can global MNCs have unified manager training?",
                answer: "Yes—one global framework with localized modules for India, UK, and US compliance.",
              },
              {
                question: "12. Does URE POSH certify managers post-training?",
                answer:
                  "Yes. We issue Manager-Level Training Certificates recognized in legal audits, ESG reviews, and investor due diligence.",
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Strong Managers = Strong Compliance.</p>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Manager-Level Training that ensures safe, respectful, and globally compliant
            workplaces.
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
            Managers Level Training | POSH & Workplace Compliance Programs | URE POSH
          </p>
        </div>
      </footer>
    </div>
  )
}
