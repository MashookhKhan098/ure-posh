import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Safe Workplace Audit | POSH & Harassment Compliance Certification | URE POSH
            </div>
            <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              Safe Workplace <span className="text-pink-600">Audit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH offers Safe Workplace Audits aligned with the POSH Act, Equality Act (UK), and EEOC (US). We
              assess policies, training, IC effectiveness, disclosures, and reporting to certify harassment-free,
              globally compliant workplaces.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              About URE POSH Safe Workplace Audits
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              At URE POSH, we believe compliance is more than a policy—it's proof of commitment to safety, equality, and
              global governance.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              Our Safe Workplace Audit is a 360° compliance assessment that benchmarks your organization against:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "✔️ Indian POSH Act, 2013",
                "✔️ UK Equality Act, 2010 (ACAS standards)",
                "✔️ US EEOC & Title VII requirements",
                "✔️ UN Women's Empowerment Principles & ILO conventions",
                "✔️ ESG (Environmental, Social, Governance) global standards",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              We ensure your company is legally compliant, audit-ready, and investor-trusted.
            </p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Why Safe Workplace Audits Matter</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Legal Requirement",
                desc: "POSH compliance in India, EEO/Equality compliance in UK & US.",
              },
              {
                title: "Risk Mitigation",
                desc: "Prevent fines, litigation, and reputational loss.",
              },
              {
                title: "Investor Confidence",
                desc: "ESG/CSR reports demand proof of safe workplace practices.",
              },
              {
                title: "Employee Trust",
                desc: "Builds transparency, safety, and retention.",
              },
              {
                title: "Global Standardization",
                desc: "Unified compliance across multi-country operations.",
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Our Safe Workplace Audit Services</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. Policy & Document Review",
                items: [
                  "POSH policy (India), Anti-harassment policy (UK/US).",
                  "Disclosures, posters, HR manuals, handbooks.",
                  "Verification of policy updates & legal alignment.",
                ],
              },
              {
                title: "2. Internal Committee (IC) Assessment",
                items: [
                  "Constitution as per POSH Act, 2013.",
                  "External member appointment & compliance.",
                  "Meeting frequency, records, and resolutions.",
                ],
              },
              {
                title: "3. Training & Awareness Audit",
                items: [
                  "Employee sensitization records.",
                  "IC training sessions.",
                  "Leadership accountability programs.",
                ],
              },
              {
                title: "4. Reporting & Recordkeeping",
                items: [
                  "Annual POSH report filing under Section 21 (India).",
                  "EEOC recordkeeping compliance (US).",
                  "UK grievance documentation requirements.",
                ],
              },
              {
                title: "5. Workplace Disclosure Check",
                items: [
                  "Posters displayed at conspicuous locations.",
                  "Digital policy disclosures via intranet/HRMS.",
                  "Multilingual availability.",
                ],
              },
              {
                title: "6. Complaint Redressal Audit",
                items: [
                  "Complaint registers & timelines.",
                  "Inquiry procedures & confidentiality adherence.",
                  "Implementation of disciplinary measures.",
                ],
              },
              {
                title: "7. ESG & Investor-Readiness Certification",
                items: [
                  "Audit-ready reports for investors, boards, and CSR disclosures.",
                  "Integration with sustainability & governance frameworks.",
                  "Certification issued by URE POSH.",
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Key Benefits of URE POSH Audit</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ 100% Compliance Proof – Prevents penalties & ensures audit readiness.",
              "✔️ Global Policy Alignment – India, UK, US standards integrated.",
              "✔️ Stronger Governance – ESG & CSR-ready reports.",
              "✔️ Legal Risk Mitigation – Prevents harassment claims escalating to courts.",
              "✔️ Reputation Shield – Trusted employer brand for employees & investors.",
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
                question: "1. What is a Safe Workplace Audit?",
                answer:
                  "It is an independent, structured review of an organization's POSH compliance, harassment policies, IC effectiveness, disclosures, and reporting practices, benchmarked against legal and global standards.",
              },
              {
                question: "2. Is a Safe Workplace Audit mandatory in India?",
                answer:
                  "While not expressly mandated, the POSH Act, 2013 requires employers to maintain policies, IC records, and reports. An audit ensures full compliance and avoids penalties during inspections.",
              },
              {
                question: "3. What are the key components of the audit?",
                answer:
                  "Policy & IC compliance. Training & awareness sessions. Annual reports & filings. Recordkeeping & documentation. Grievance redressal effectiveness.",
              },
              {
                question: "4. Who conducts the Safe Workplace Audit?",
                answer:
                  "At URE POSH, audits are led by a team of lawyers, compliance experts, HR specialists, and external POSH trainers with global expertise.",
              },
              {
                question: "5. What happens if non-compliance is found?",
                answer:
                  "We provide: Compliance gap report. Corrective action plan. Updated policies, IC restructuring, and training.",
              },
              {
                question: "6. What are the penalties for non-compliance in India?",
                answer:
                  "Fine up to ₹50,000. License cancellation for repeat offenses. Civil & criminal liability for directors/employers.",
              },
              {
                question: "7. How are Safe Workplace Audits different in UK & US?",
                answer:
                  "UK: Equality Act compliance, Employment Tribunal risk mitigation, ACAS alignment. US: EEOC reporting, Title VII compliance, mandatory training in some states.",
              },
              {
                question: "8. How often should audits be conducted?",
                answer: "Minimum: Annual audit. Best practice: Bi-annual or quarterly reviews in large corporations.",
              },
              {
                question: "9. What records must companies maintain for compliance?",
                answer:
                  "Complaint registers. Inquiry proceedings. IC meeting minutes. Training attendance records. Annual POSH reports (India).",
              },
              {
                question: "10. Can digital tools be used in audits?",
                answer:
                  "Yes. We use digital complaint portals, HRMS integration, and AI-powered compliance dashboards to track records and flag risks.",
              },
              {
                question: "11. How does this audit support ESG & CSR reporting?",
                answer:
                  "A Safe Workplace Audit strengthens Social Governance metrics, demonstrates human rights compliance, and improves investor ratings.",
              },
              {
                question: "12. Does URE POSH issue compliance certificates?",
                answer:
                  "Yes. After the audit, we issue a Safe Workplace Compliance Certificate that can be showcased in investor presentations, ESG reports, and corporate disclosures.",
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Audit Today. Secure Tomorrow.</p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Safe Workplace Audits that meet Indian laws and international compliance
            standards.
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
          <p className="text-gray-400 text-lg">Safe Workplace Audit – POSH & Harassment Compliance Certification</p>
        </div>
      </footer>
    </div>
  )
}

