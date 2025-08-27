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
              POSH Compliance & Workplace Harassment Reporting | URE POSH
            </div>
            <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              POSH & Workplace <span className="text-pink-600">Harassment Compliance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH is India's leading workplace safety compliance company, offering POSH compliance reporting,
              harassment investigations, global policy alignment, and ESG-ready certifications for corporates in India,
              UK, and US.
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
              At URE POSH, we enable organizations to move beyond compliance into global workplace excellence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              We specialize in POSH Act, 2013 compliance in India, Equality Act compliance in the UK, and EEOC/Title VII
              compliance in the US.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">Our consulting integrates:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "✔️ Policy drafting & compliance reporting",
                "✔️ Internal Committee (IC) constitution & training",
                "✔️ Awareness & prevention workshops",
                "✔️ Annual filings with regulators",
                "✔️ Audit-ready documentation for ESG & investors",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center font-semibold">
              We ensure your workplace is legally compliant, culturally inclusive, and globally respected.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Why POSH & Harassment Compliance Reporting Matters
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Legal Mandate",
                desc: "India's POSH Act 2013, UK's Equality Act 2010, and US Title VII (EEOC enforcement) make harassment reporting mandatory.",
              },
              {
                title: "Reputation Shield",
                desc: "Non-compliance can trigger public scandals, tribunal cases, and investor withdrawals.",
              },
              {
                title: "Employee Trust",
                desc: "Transparent reporting strengthens employee loyalty and reduces attrition.",
              },
              {
                title: "Global ESG Standards",
                desc: "Investors and boards now demand compliance certification for funding and governance.",
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

      <section id="services" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Our Services in POSH & Harassment Compliance Reporting
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. POSH Annual Reporting (India)",
                items: [
                  "Draft & file Annual Reports under Section 21 of POSH Act with the District Officer.",
                  "Maintain IC complaint registers & resolutions.",
                  "Submit Board/CSR compliance updates.",
                ],
              },
              {
                title: "2. Internal Committee (IC) Compliance",
                items: [
                  "Ensure IC is duly constituted with external NGO/legal expert.",
                  "Conduct quarterly IC meetings with records.",
                  "Train IC members on timelines, confidentiality, and inquiry protocols.",
                ],
              },
              {
                title: "3. Global Policy Alignment",
                items: [
                  "Align policies with Equality Act 2010 (UK).",
                  "Integrate EEOC & state-specific laws (US).",
                  "Draft multi-jurisdictional harassment policies for global firms.",
                ],
              },
              {
                title: "4. Workplace Harassment Reporting Frameworks",
                items: [
                  "Build confidential reporting channels (digital/anonymous portals).",
                  "Design case escalation protocols.",
                  "Assist in drafting investigation reports & disciplinary recommendations.",
                ],
              },
              {
                title: "5. ESG & Investor Compliance",
                items: [
                  "Prepare audit-ready DEI & POSH compliance reports for investors.",
                  "Integrate with CSR disclosures & sustainability reports.",
                  "Issue Compliance Certificates for due diligence.",
                ],
              },
              {
                title: "6. Independent Investigations & Advisory",
                items: [
                  "External support for sensitive or high-stakes harassment cases.",
                  "Draft legally defensible inquiry reports.",
                  "Ensure neutrality & fairness in grievance redressal.",
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

      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Key Benefits of Partnering with URE POSH
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ Zero Legal Risk – 100% compliance under Indian, UK, and US laws.",
              "✔️ Audit-Ready Documentation – for regulators, boards, and investors.",
              "✔️ Global Governance Alignment – ESG, CSR, and UN Women's Guidelines.",
              "✔️ Neutral Investigations – unbiased external expertise.",
              "✔️ Enhanced Employer Brand – trusted by employees & investors alike.",
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

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                question: "1. What is POSH compliance reporting?",
                answer:
                  "It refers to mandatory documentation and filing of harassment-related data, including complaints received, inquiries conducted, actions taken, and preventive steps, as required under POSH Act, 2013 in India and equivalent global laws.",
              },
              {
                question: "2. What must be included in the POSH Annual Report in India?",
                answer:
                  "Number of complaints received. Number of cases disposed of. Cases pending more than 90 days. Workshops/trainings conducted. IC meetings held.",
              },
              {
                question: "3. Who must the Annual POSH Report be filed with?",
                answer:
                  "With the District Officer (appointed under Section 5 of POSH Act) and simultaneously shared with the Company Board or CSR committee.",
              },
              {
                question: "4. What are penalties for non-reporting under POSH Act, 2013?",
                answer:
                  "Fine up to ₹50,000. License cancellation/withdrawal for repeated violations. Civil & criminal liability for employers and directors.",
              },
              {
                question: "5. How is harassment reporting handled in the UK?",
                answer:
                  "Under the Equality Act 2010, employers must show evidence of reasonable steps (policies, training, grievance handling). Reports are typically reviewed internally and may be escalated to Employment Tribunals.",
              },
              {
                question: "6. How do US companies report workplace harassment cases?",
                answer:
                  "Complaints are documented internally and may be escalated to the EEOC. Employers must maintain detailed records of complaints, investigations, and corrective actions to defend against lawsuits.",
              },
              {
                question: "7. What is the role of confidentiality in compliance reporting?",
                answer:
                  "India: Section 16 of POSH Act mandates confidentiality. UK: GDPR compliance applies. US: Confidentiality agreements + anti-retaliation protections.",
              },
              {
                question: "8. What records must companies maintain for compliance audits?",
                answer:
                  "Complaint registers. IC meeting minutes. Training records. Annual filings. Case outcome documentation.",
              },
              {
                question: "9. How does POSH compliance connect with ESG reporting?",
                answer:
                  "Investors now demand social governance metrics. POSH compliance demonstrates: Commitment to human rights. Risk mitigation of litigation. Strengthened sustainability & ESG scores.",
              },
              {
                question: "10. Can global companies adopt a single harassment policy?",
                answer:
                  "Yes—with global framework policies plus localized annexures for India, UK, and US to meet jurisdictional requirements.",
              },
              {
                question: "11. Are digital reporting tools acceptable?",
                answer:
                  "Yes. POSH Act allows digital complaint filing. In the US/UK, many firms use anonymous hotlines or whistleblower portals—but records must be secure & auditable.",
              },
              {
                question: "12. How does URE POSH ensure international compliance readiness?",
                answer:
                  "By integrating: POSH Act, 2013 (India), Equality Act 2010 (UK), Title VII & EEOC Guidelines (US), UN Women's Empowerment Principles & ILO standards",
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

      <section className="py-8 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-balance">📢 Call to Action</h2>
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Your Workplace. Safe. Compliant. Global.</p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH – India's Most Trusted POSH & Workplace Harassment Compliance Company.
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
          <p className="text-gray-400 text-lg">POSH Compliance & Workplace Harassment Reporting | URE POSH</p>
        </div>
      </footer>
    </div>
  )
}
