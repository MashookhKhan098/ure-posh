import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe } from "lucide-react"

export default function LGBTQIAInclusionPage() {
  return (
    <div className="min-h-screen bg-white">
    
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="h-4 w-4 mr-2" />
              LGBTQIA++ Inclusion | Workplace Equality & Compliance Consulting | URE POSH
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              LGBTQIA++ <span className="text-pink-600">Inclusion</span> – URE POSH
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              URE POSH delivers LGBTQIA++ workplace inclusion consulting aligned with India's POSH & Transgender Rights
              Act, UK's Equality Act, and US EEOC/Title VII. Build a diverse, inclusive, and compliant workplace culture
              with global best practices.
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
              🏢 About URE POSH LGBTQIA++ Consulting
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              At URE POSH, we help organizations build workplaces where every identity is respected. LGBTQIA++ inclusion
              is not just a diversity goal but also a compliance, governance, and ESG requirement for global employers.
              We design and implement:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "✔️ LGBTQIA++ inclusive workplace policies",
                "✔️ Training & sensitization programmes for employees & managers",
                "✔️ Equal opportunity audits (pay, promotion, benefits)",
                "✔️ Support systems & grievance redressal linked with IC/HR panels",
                "✔️ Global compliance alignment (India, UK, US frameworks)",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Why LGBTQIA++ Inclusion Matters</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title:
                  "India – Supreme Court recognized LGBTQIA+ rights (Navtej Johar v. Union of India, 2018). Transgender Persons Act, 2019 mandates non-discrimination in employment.",
                desc: "",
              },
              {
                title: "UK – Equality Act, 2010 protects sexual orientation & gender reassignment.",
                desc: "",
              },
              {
                title:
                  "US – Title VII (Civil Rights Act) interpreted by EEOC/Supreme Court to cover sexual orientation & gender identity.",
                desc: "",
              },
              {
                title: "ESG & Investors – Global boards demand measurable DEI metrics, including LGBTQIA++ policies.",
                desc: "",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Talent Attraction</strong> – Inclusive companies see up to 50% higher retention among LGBTQIA+
              employees.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Issues Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Modern Issues in LGBTQIA++ Workplace Inclusion
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "1. Legal Compliance Gaps",
                items: [
                  "Inconsistent enforcement of non-discrimination laws.",
                  "Lack of transgender-inclusive policies.",
                ],
              },
              {
                title: "2. Workplace Discrimination & Bias",
                items: ["Hiring discrimination.", "Lack of representation in leadership roles."],
              },
              {
                title: "3. Benefits & Equal Opportunity",
                items: [
                  "Health insurance & parental leave often exclude LGBTQIA++ partners.",
                  "Unequal pay and promotion opportunities.",
                ],
              },
              {
                title: "4. Harassment & Microaggressions",
                items: ["Subtle exclusion, jokes, or cultural bias.", "Fear of retaliation prevents complaints."],
              },
              {
                title: "5. Policy & Infrastructure Gaps",
                items: ["Lack of gender-neutral restrooms.", "Inadequate confidential grievance redressal systems."],
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

      {/* Consulting Approach Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Our LGBTQIA++ Consulting Approach</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Policy Audit & Review",
                desc: "Align policies with India's Transgender Rights Act, UK Equality Act, US EEOC guidelines.",
              },
              {
                title: "Policy Drafting",
                desc: "Gender-neutral leave, equal pay, healthcare benefits, partner inclusion.",
              },
              {
                title: "Training & Sensitization",
                desc: "Awareness workshops for staff, leadership, IC/HR panels.",
              },
              {
                title: "Complaint Redressal Mechanisms",
                desc: "Confidential systems integrated with POSH/HR processes.",
              },
              {
                title: "Employee Support Systems",
                desc: "LGBTQIA++ employee resource groups (ERGs).",
              },
              {
                title: "Global Best Practices",
                desc: "Learning from Google, Accenture, IBM, Deloitte inclusion models.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Key Benefits of URE POSH LGBTQIA++ Inclusion
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "✔️ 100% Legal Compliance – India, UK, US frameworks.",
              "✔️ Audit-Ready Certification – ESG/CSR & investor reporting.",
              "✔️ Higher Retention & Engagement – inclusive culture = loyalty.",
              "✔️ Reduced Litigation Risk – prevents discrimination claims.",
              "✔️ Employer Brand Advantage – progressive, global reputation.",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-pink-50 rounded-2xl">
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
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">❓ 12 Detailed & Technical FAQs</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "1. What does LGBTQIA++ inclusion mean in workplaces?",
                answer:
                  "It refers to ensuring equal opportunity, respect, and non-discrimination for individuals identifying as lesbian, gay, bisexual, transgender, queer, intersex, asexual, and beyond.",
              },
              {
                question: "2. Is LGBTQIA++ workplace inclusion a legal requirement?",
                answer:
                  "Yes. India: Transgender Persons Act, 2019. UK: Equality Act, 2010. US: EEOC enforces Title VII (includes sexual orientation & gender identity).",
              },
              {
                question: "3. What are common challenges in LGBTQIA++ workplace policies?",
                answer:
                  "Exclusion from benefits, lack of gender-neutral facilities, and absence of anti-discrimination clauses.",
              },
              {
                question: "4. How do MNCs implement LGBTQIA++ strategies?",
                answer: "Through ERGs, leadership accountability, inclusive benefits, and annual diversity audits.",
              },
              {
                question: "5. What role does POSH Act play in LGBTQIA++ protection in India?",
                answer:
                  "While POSH primarily protects women, URE POSH integrates policies to extend safe workplace practices for all genders and identities.",
              },
              {
                question: "6. How does inclusion impact ESG ratings?",
                answer:
                  "LGBTQIA++ policies strengthen social governance metrics, influencing investor decisions and sustainability rankings.",
              },
              {
                question: "7. Are gender-neutral restrooms mandatory?",
                answer:
                  "Not mandatory everywhere, but considered best practice globally (recommended in India, legally expected in UK/US).",
              },
              {
                question: "8. Can health insurance cover same-sex partners in India?",
                answer: "Yes, many insurers now allow it, but employers must negotiate inclusive benefit packages.",
              },
              {
                question: "9. How do grievance systems support LGBTQIA++ employees?",
                answer: "By ensuring confidentiality, preventing retaliation, and involving trained IC/HR members.",
              },
              {
                question: "10. How often should LGBTQIA++ sensitization training occur?",
                answer: "At least annually, with quarterly refreshers for managers and IC members.",
              },
              {
                question: "11. What documentation is required for audits?",
                answer:
                  "Policies & benefits manuals. Training logs. ERG activity records. Annual DEI compliance reports.",
              },
              {
                question: "12. Does URE POSH provide certifications?",
                answer:
                  "Yes, we issue LGBTQIA++ Inclusion Compliance Certificates, used in ESG/CSR reports and global investor audits.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100">
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
            ✨ Inclusion is not optional—it's compliance, culture, and competitiveness.
          </p>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for LGBTQIA++ Inclusion Consulting that meets legal, cultural, and investor
            expectations.
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
            LGBTQIA++ Inclusion | Workplace Equality & Compliance Consulting | URE POSH
          </p>
        </div>
      </footer>
    </div>
  )
}
