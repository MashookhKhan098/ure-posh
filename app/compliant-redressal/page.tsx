import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe, AlertTriangle } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4 mr-2" />
              POSH Compliance Services | Workplace Harassment Redressal
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              POSH-Compliant <span className="text-pink-600">Redressal</span>
            </h1>
            <p className="text-base text-gray-600 mb-4 text-balance leading-relaxed">
              India, UK & US Workplace Compliance Guide - Build safer, legally compliant workplaces with URE POSH
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+911199999444807"
                className="group bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="border-2 border-pink-200 text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 flex items-center justify-center"
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
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-2xl mb-3">
              <Building className="h-6 w-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🏢 What Does POSH-Compliant Redressal Mean?
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              POSH-compliant redressal means having a legally aligned, transparent, and fair system for preventing and
              addressing workplace sexual harassment.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              It is not just a legal mandate—it signals that your company values:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "✔️ Employee safety",
                "✔️ Workplace dignity",
                "✔️ Equality of opportunity",
                "✔️ Global compliance readiness",
              ].map((value, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-2xl text-center">
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🇮🇳 India: POSH-Compliant Redressal Process
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto mb-3">
            <p className="text-base text-gray-700 leading-relaxed text-center">
              The Prevention of Sexual Harassment (POSH) Act, 2013 makes it mandatory for organizations with 10+
              employees to establish a compliance framework.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Policy", desc: "Draft & circulate a written POSH policy." },
              {
                title: "Internal Committee (IC)",
                desc: "Formed with a Presiding Officer, employees, and one external NGO/legal expert.",
              },
              { title: "Training", desc: "Regular awareness for employees & IC members." },
              { title: "Reporting", desc: "Confidential complaint reporting channels." },
              { title: "Investigation", desc: "Impartial inquiries completed within 90 days." },
              { title: "Recordkeeping", desc: "Registers, reports, and annual filings under Section 21." },
            ].map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-2xl">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-900">Penalty for Non-Compliance:</h3>
            </div>
            <p className="text-red-800 text-sm">Up to ₹50,000, license cancellation, and reputational risk.</p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🇬🇧 UK: Workplace Harassment & Equality Compliance
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto mb-3">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              The Equality Act 2010 requires employers to provide a workplace free from harassment and discrimination.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Clear Anti-Harassment Policy with grievance procedure.",
              "Equality & Diversity Training for employees & managers.",
              "Grievance Redressal Mechanisms – internal panels or external advisors.",
              "External Advisors – NGOs, HR, or legal experts in complex cases.",
              "Documentation & Transparency – investigation reports and actions taken.",
            ].map((practice, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">{practice}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-2xl">
            <p className="text-blue-800 font-medium">
              UK Regulators Expect: Swift, fair, and documented responses to complaints.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🇺🇸 US: Workplace Harassment Redressal & Compliance
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto mb-3">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              In the US, sexual harassment is prohibited under Title VII of the Civil Rights Act of 1964, enforced by
              the Equal Employment Opportunity Commission (EEOC).
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Anti-Harassment Policy – acknowledged by all staff.",
              "Complaint Process – confidential reporting and escalation.",
              "Prompt Investigation – impartial, time-bound inquiries.",
              "Mandatory Training – in many states (e.g., California, New York).",
              "External Investigators – for objectivity in sensitive cases.",
              "Documentation – maintain records for litigation defense & audits.",
            ].map((element, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <p className="text-gray-700 font-medium leading-relaxed">{element}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🌍 Why Choose URE POSH for POSH & Harassment Compliance?
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ End-to-End POSH Compliance (India) – Policy drafting, IC setup, training, reporting.",
              "✔️ Global Alignment (UK & US) – Policies tailored to Equality Act 2010 & EEOC standards.",
              "✔️ Training & Awareness Programs – for employees, managers, and IC.",
              "✔️ Neutral Investigations – with external NGO/legal experts.",
              "✔️ Audit-Ready Recordkeeping – compliant with ESG & investor due diligence.",
            ].map((service, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold text-pink-600">
              URE POSH = Your Global Partner for Safe, Compliant Workplaces.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                question: "1. What is POSH-compliant redressal?",
                answer:
                  "It is a structured grievance-handling process aligned with POSH Act 2013 in India, Equality Act 2010 in the UK, and Title VII in the US. It ensures complaints are addressed in a fair, timely, confidential, and documented manner.",
              },
              {
                question: "2. How do you set up a POSH Internal Committee (IC) in India?",
                answer:
                  "Presiding Officer: Senior woman employee. At least two employees with credibility or legal knowledge. One external member (NGO/social worker/legal expert). At least 50% women representation. Formal notification and training are mandatory.",
              },
              {
                question: "3. What timelines must be followed under POSH Act, 2013?",
                answer:
                  "Complaint filing: within 3 months of incident (extendable). IC inquiry: completed within 90 days. Report submission: within 10 days of inquiry. Employer action: within 60 days of report.",
              },
              {
                question: "4. How are UK companies legally bound to address harassment?",
                answer:
                  'Under the Equality Act 2010, failure to prevent harassment can lead to claims in Employment Tribunals. Employers must show they took "reasonable steps" like training, policies, and swift investigations.',
              },
              {
                question: "5. What are EEOC's expectations in the US?",
                answer:
                  "Employers must: Adopt zero-tolerance policies. Conduct prompt, impartial investigations. Provide remedies & corrective action. Prevent retaliation against complainants.",
              },
              {
                question: "6. What is the role of external members in IC/HR panels?",
                answer:
                  "They bring neutrality, expertise, and credibility, preventing internal bias. In India, external members are legally mandatory. In the UK/US, external advisors are a best practice for complex or high-stakes cases.",
              },
              {
                question: "7. How is confidentiality maintained across jurisdictions?",
                answer:
                  "India – Section 16 of POSH Act prohibits disclosure. UK – Confidentiality agreements & GDPR compliance. US – Non-retaliation policies + attorney-client privilege in legal reviews.",
              },
              {
                question: "8. What records must be maintained for compliance?",
                answer:
                  "Complaint registers. IC meeting minutes. Training attendance logs. Annual reports filed with local authorities (India). Documentation for tribunal/EEOC defense (UK/US).",
              },
              {
                question: "9. How do global companies align POSH compliance across India, UK, and US offices?",
                answer:
                  "By adopting a global anti-harassment policy framework with localized addendums for each jurisdiction's legal requirements, supported by cross-border compliance audits.",
              },
              {
                question: "10. Can online training fulfill POSH/EEOC requirements?",
                answer:
                  "Yes, but it must be interactive, certified, and documented. Many regulators require annual refreshers and state-specific training (US: California, New York).",
              },
              {
                question: "11. What corrective actions can employers take after inquiry?",
                answer:
                  "Warning or reprimand. Salary deduction or promotion freeze. Transfer or termination. Counseling and workplace environment changes.",
              },
              {
                question: "12. How does POSH compliance align with ESG reporting?",
                answer:
                  "Investors and regulators increasingly demand Social Governance metrics. POSH compliance demonstrates: Commitment to human rights & equality. Mitigation of reputational and litigation risks. Strengthened ESG scores for global investment readiness.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">
            ✨ Protect your workplace. Safeguard your brand. Stay compliant.
          </p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH – India's Leading POSH & Global Workplace Compliance Firm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-3">
            <a
              href="tel:+911199999444807"
              className="group flex items-center space-x-3 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              <span>📞 +91-11-99999 44807</span>
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
          <p className="text-gray-400 text-lg">
            POSH-Compliant Redressal: India, UK, and US Workplace Compliance Guide
          </p>
        </div>
      </footer>
    </div>
  )
}
