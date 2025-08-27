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
              Internal Committee Training | POSH Act Compliance | URE POSH
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              Internal Committee <span className="text-pink-600">Training</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              URE POSH provides Internal Committee (IC) training programs aligned with India's POSH Act, UK's Equality
              Act, and US EEOC standards. We empower IC members to conduct fair, confidential, and compliant workplace
              harassment inquiries with global best practices.
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
              🏢 About URE POSH Internal Committee Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              Every company with 10+ employees in India must form an Internal Committee (IC) under the POSH Act, 2013 to
              handle workplace harassment complaints. However, compliance does not stop at constitution—the committee
              must be trained to function legally, ethically, and effectively. At URE POSH, we deliver specialized
              Internal Committee training that equips members to:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "✔️ Understand their legal responsibilities under POSH Act.",
                "✔️ Conduct fair, unbiased, and confidential inquiries.",
                "✔️ Draft legally defensible inquiry reports.",
                "✔️ Align practices with UK Equality Act (2010) grievance mechanisms & US EEOC complaint procedures.",
                "✔️ Strengthen governance, ESG compliance, and investor trust.",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Why Internal Committee Training is Critical
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Mandate (India)",
                desc: "Section 4 of POSH Act requires IC formation + ongoing training.",
              },
              {
                title: "Employer Liability",
                desc: "Poorly trained ICs risk biased inquiries, legal challenges, and penalties.",
              },
              {
                title: "Global Governance",
                desc: "MNCs require consistent standards across India, UK, and US offices.",
              },
              {
                title: "Employee Confidence",
                desc: "A trained IC inspires trust, transparency, and reporting.",
              },
              {
                title: "Investor & ESG Compliance",
                desc: "Auditable, trained ICs are part of governance scorecards.",
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
              🔹 Our Internal Committee Training Modules
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "1. Legal Frameworks",
                items: [
                  "India: POSH Act, 2013 + Rules, 2013.",
                  "UK: Equality Act, 2010 & ACAS grievance codes.",
                  "US: EEOC procedures under Title VII.",
                ],
              },
              {
                title: "2. Roles & Responsibilities of IC Members",
                items: [
                  "Presiding Officer (senior woman employee).",
                  "Employee members.",
                  "External NGO/Legal expert.",
                  "Reporting & accountability to employer/District Officer.",
                ],
              },
              {
                title: "3. Complaint Handling Process",
                items: [
                  "Receiving written & digital complaints.",
                  "Timelines (90 days inquiry, 10 days report, 60 days action).",
                  "Confidentiality & anti-retaliation obligations.",
                ],
              },
              {
                title: "4. Conducting Inquiries",
                items: [
                  "Framing issues & notice to respondent.",
                  "Evidence gathering, witness examination.",
                  "Principles of natural justice.",
                  "Handling false or malicious complaints.",
                ],
              },
              {
                title: "5. Drafting Inquiry Reports",
                items: [
                  "Report structure: findings, recommendations, corrective action.",
                  "Legal language & compliance proof.",
                  "Filing reports with employer & District Officer.",
                ],
              },
              {
                title: "6. Global Best Practices",
                items: [
                  "UK grievance panels & mediation processes.",
                  "US independent investigations & EEOC cooperation.",
                  "Cross-border alignment for MNCs.",
                ],
              },
              {
                title: "7. ESG & Governance Linkage",
                items: [
                  "IC performance as a governance KPI.",
                  "Integration with CSR & sustainability reporting.",
                  "Audit-readiness for investor due diligence.",
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
              🔹 Key Benefits of URE POSH IC Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "✔️ 100% Legal Compliance – India, UK, US standards covered.",
              "✔️ Professional Inquiry Skills – unbiased, fair, confidential handling.",
              "✔️ Audit-Ready Documentation – inquiry records, reports, filings.",
              "✔️ Global Policy Alignment – for MNCs with multi-country offices.",
              "✔️ Certification – completion certificate for IC members, recognized in compliance audits.",
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
                question: "1. Is IC training legally mandatory in India?",
                answer:
                  "Yes. While the POSH Act does not prescribe a training frequency, Section 19(c) obligates employers to organize workshops and programs for IC members and employees.",
              },
              {
                question: "2. Who must be part of an Internal Committee (IC)?",
                answer:
                  "Presiding Officer: Senior woman employee. At least 2 employee members with social credibility or legal knowledge. 1 external member from an NGO/legal/social work background. At least 50% women representation.",
              },
              {
                question: "3. What are the legal timelines ICs must follow?",
                answer:
                  "Inquiry completion: 90 days. Report submission: 10 days post-inquiry. Employer action: 60 days from report.",
              },
              {
                question: "4. What happens if IC members are untrained?",
                answer:
                  "Risk of biased inquiries. Invalidation of reports in court. Employer liability for non-compliance fines.",
              },
              {
                question: "5. What are the penalties for IC non-compliance in India?",
                answer: "Fine up to ₹50,000. Repeat violations: business license cancellation.",
              },
              {
                question: "6. How is IC training handled in UK/US offices of Indian companies?",
                answer:
                  "UK: Training under Equality Act + ACAS grievance standards. US: EEOC investigation standards + state laws (California, New York).",
              },
              {
                question: "7. Can IC members from different branches be combined?",
                answer:
                  "Yes, if workplaces are small, cluster ICs can be formed as per POSH Rules, but each IC must cover designated locations and employees.",
              },
              {
                question: "8. Can external members be replaced?",
                answer:
                  "Yes, but every IC must have one external NGO/legal expert at all times. Their details must be disclosed in posters & policies.",
              },
              {
                question: "9. What records must ICs maintain?",
                answer:
                  "Complaint registers. Inquiry proceedings & witness statements. Final reports. Annual filings under Section 21.",
              },
              {
                question: "10. How is confidentiality ensured during IC inquiries?",
                answer:
                  "India: Section 16 of POSH Act prohibits disclosure. UK: GDPR + confidentiality policies. US: Non-retaliation policies + attorney-client privilege.",
              },
              {
                question: "11. How often should IC training be conducted?",
                answer: "Best practice: annual refreshers + immediate training for new IC members.",
              },
              {
                question: "12. Does URE POSH certify IC members post-training?",
                answer:
                  "Yes. We issue Internal Committee Training Certificates, which can be produced during audits, court inquiries, and investor ESG reviews.",
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">
            ✨ Train Your IC. Strengthen Compliance. Protect Your Workplace.
          </p>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Internal Committee Training programs designed to meet Indian laws and global
            standards.
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
          <p className="text-gray-400 text-lg">Internal Committee Training | POSH Act Compliance | URE POSH</p>
        </div>
      </footer>
    </div>
  )
}
