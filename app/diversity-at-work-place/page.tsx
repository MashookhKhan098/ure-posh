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
              Diversity at Workplace | Global DEI Consulting & Compliance | URE POSH
            </div>
            <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              Diversity at <span className="text-pink-600">Workplace</span> & Modern Issues
            </h1>
            <p className="text-xl text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH offers Diversity at Workplace consulting aligned with global standards (POSH Act, Equality Act,
              EEOC). We help organizations address modern DEI issues, implement policies, and achieve compliance across
              India, UK, and US.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🏢 About URE POSH Diversity Consulting
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              At URE POSH, we believe workplace diversity is not just a moral imperative, but a compliance and business
              requirement. We support organizations in India, the UK, and the US with strategic diversity consulting,
              helping them:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "✔️ Draft & implement Diversity, Equity, and Inclusion (DEI) policies.",
                "✔️ Align with legal mandates: POSH Act (India), Equality Act (UK), EEOC & Title VII (US).",
                "✔️ Address modern challenges like unconscious bias, generational diversity, and intersectionality.",
                "✔️ Achieve ESG and CSR-linked diversity metrics for global investors.",
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Why Diversity Consulting Matters</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              {
                title: "India – POSH Act + Equal Remuneration Act mandate non-discrimination.",
                desc: "",
              },
              {
                title:
                  "UK – Equality Act, 2010 requires fair treatment across gender, race, disability, age, and religion.",
                desc: "",
              },
              {
                title: "US – EEOC enforces anti-discrimination laws under Title VII, ADA, and ADEA.",
                desc: "",
              },
              {
                title: "Investors & ESG Standards – Global boards demand diversity data in governance reports.",
                desc: "",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Talent & Innovation</strong> – Companies with diverse teams report 19% higher innovation revenue
              (BCG).
            </p>
          </div>
        </div>
      </section>

      {/* Modern Issues Section */}
      <section id="services" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Modern Issues in Workplace Diversity
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. Gender Pay Gap & Leadership Representation",
                items: [
                  "Women & non-binary employees underrepresented in leadership.",
                  "Compliance: Equal Pay Act (India/UK/US).",
                ],
              },
              {
                title: "2. Unconscious Bias & Hiring Practices",
                items: ["Recruitment algorithms replicating bias.", "Blind hiring as compliance best practice."],
              },
              {
                title: "3. Generational Diversity (Gen Z to Boomers)",
                items: ["Differing work styles causing friction.", "Cross-generational mentoring as a solution."],
              },
              {
                title: "4. Disability Inclusion & Accessibility",
                items: [
                  "ADA (US), Equality Act (UK), RPwD Act (India) mandate accommodations.",
                  "Gaps in implementation remain.",
                ],
              },
              {
                title: "5. LGBTQ+ Inclusion",
                items: [
                  "US: EEOC protects sexual orientation/gender identity.",
                  "India: Supreme Court decriminalized Section 377 but workplace bias persists.",
                ],
              },
              {
                title: "6. Cultural & Linguistic Diversity",
                items: ["Multilingual communication challenges.", "Training to reduce miscommunication & prejudice."],
              },
              {
                title: "7. Intersectionality",
                items: [
                  "Employees facing multiple layers of discrimination (e.g., race + gender + disability).",
                  "Global best practice: Intersectional DEI strategies.",
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

      {/* Consulting Approach Section */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Our Consulting Approach</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Assessment & Audit",
                desc: "Workforce demographics, policy review, diversity gap analysis.",
              },
              {
                title: "Policy Drafting & Customization",
                desc: "DEI frameworks aligned with global + local laws.",
              },
              {
                title: "Training & Sensitization",
                desc: "Unconscious bias, inclusive leadership, IC training.",
              },
              {
                title: "Complaint Handling Support",
                desc: "Integration with POSH/EEOC grievance systems.",
              },
              {
                title: "Monitoring & Reporting",
                desc: "ESG/CSR-linked diversity dashboards, annual reports.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
              🔹 Key Benefits of URE POSH Diversity Consulting
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ Legal Compliance – India, UK, US diversity laws.",
              "✔️ Audit-Ready Documentation – for regulators, boards, investors.",
              "✔️ Inclusive Culture – better retention, lower attrition.",
              "✔️ ESG/CSR Metrics – strengthens global governance reports.",
              "✔️ Reputation Shield – progressive employer brand.",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-pink-50 rounded-2xl">
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
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                question: "1. What is workplace diversity?",
                answer:
                  "It means representation of employees across gender, race, age, disability, sexual orientation, religion, and socioeconomic backgrounds.",
              },
              {
                question: "2. Is workplace diversity a compliance requirement?",
                answer:
                  "Yes. India (Equal Remuneration Act, POSH), UK (Equality Act), US (EEOC Title VII) all mandate non-discrimination.",
              },
              {
                question: "3. How do modern MNCs address diversity gaps?",
                answer:
                  "Through structured DEI strategies, employee resource groups (ERGs), diversity councils, and leadership accountability.",
              },
              {
                question: "4. What is intersectionality in workplace diversity?",
                answer:
                  "It refers to employees facing multiple forms of bias simultaneously (e.g., a woman of color with disability). Compliance strategies must recognize these overlaps.",
              },
              {
                question: "5. How is diversity linked with ESG?",
                answer:
                  'Diversity metrics are part of the "S" in ESG (Social Governance), impacting investor ratings and funding.',
              },
              {
                question: "6. What are penalties for non-compliance?",
                answer:
                  "India: Fines under POSH/Equal Remuneration Acts. UK: Tribunal penalties, unlimited compensation. US: EEOC lawsuits, multi-million-dollar settlements.",
              },
              {
                question: "7. What role do managers play in diversity compliance?",
                answer:
                  "Managers are first responders—they must prevent bias, escalate complaints, and enforce inclusive policies.",
              },
              {
                question: "8. How do we measure diversity progress?",
                answer:
                  "Gender pay gap analysis. Leadership representation ratios. Employee satisfaction surveys. Attrition trends.",
              },
              {
                question: "9. Can SMEs adopt global diversity standards?",
                answer: "Yes. Scaled DEI frameworks with training, audits, and policy updates can be cost-effective.",
              },
              {
                question: "10. How does URE POSH customize diversity consulting?",
                answer:
                  "By aligning policies with local labor laws and embedding them into global governance frameworks.",
              },
              {
                question: "11. Is diversity training mandatory?",
                answer:
                  'While not always explicit, most regulators (POSH in India, ACAS in UK, EEOC in US) expect regular training as "reasonable steps."',
              },
              {
                question: "12. Does URE POSH provide certifications?",
                answer:
                  "Yes—we issue Diversity Compliance Certificates for ESG reporting, audits, and investor due diligence.",
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

      {/* Call to Action Section */}
      <section className="py-8 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3 text-balance">📢 Call to Action</h2>
          <p className="text-2xl mb-4 text-pink-100 font-semibold">
            ✨ Diversity is not an initiative—it's compliance, culture, and competitiveness.
          </p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for International Diversity Consulting that meets modern challenges and global legal
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
          <p className="text-gray-400 text-lg">
            Diversity at Workplace | Global DEI Consulting & Compliance | URE POSH
          </p>
        </div>
      </footer>
    </div>
  )
}
