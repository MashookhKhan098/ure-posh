import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight, Globe } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Employee Well-Being Programmes | Workplace Wellness & Compliance | URE POSH
            </div>
            <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3 text-balance leading-tight">
              Employee <span className="text-pink-600">Well-Being Programmes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 text-balance leading-relaxed">
              URE POSH designs Employee Well-Being Programmes aligned with global MNC standards. Covering mental health,
              physical wellness, financial well-being, DEI, and compliance, our programmes boost productivity,
              retention, and ESG scores.
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
              About URE POSH Well-Being Programmes
            </h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
              Employee well-being is not just HR practice—it's a business priority. Top MNCs (Google, Unilever,
              Deloitte, Microsoft) have proven that structured well-being programmes:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                "✔️ Increase productivity by 20–30%",
                "✔️ Reduce attrition & absenteeism",
                "✔️ Strengthen employer brand",
                "✔️ Support compliance with global ESG & DEI standards",
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
              At URE POSH, we offer customized well-being programmes that meet international benchmarks and integrate
              with:
              <br />
              <strong>India</strong> – POSH Act obligations (safe workplace environment).
              <br />
              <strong>UK</strong> – Equality Act & HSE (Health & Safety Executive) guidelines.
              <br />
              <strong>US</strong> – OSHA workplace health regulations + EEOC.
              <br />
              <strong>Global Standards</strong> – WHO Well-Being Framework, UN SDGs, ESG compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-8 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 How Our Programmes Work</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              {
                title: "Assessment",
                desc: "Workplace surveys, audits, and risk mapping.",
              },
              {
                title: "Design",
                desc: "Tailored well-being programmes aligned with business & legal goals.",
              },
              {
                title: "Implementation",
                desc: "Workshops, digital platforms, wellness partners.",
              },
              {
                title: "Measurement",
                desc: "KPIs: absenteeism rate, productivity metrics, retention.",
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

      {/* Services Section */}
      <section id="services" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Our Well-Being Programmes</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              {
                title: "1. Mental Health & Resilience",
                items: [
                  "Corporate counselling helplines.",
                  "Mindfulness & stress management workshops.",
                  "Mental health first-aid training for managers.",
                  "Quarterly resilience assessments.",
                  "Global Example: Deloitte offers mental health champions programme with trained employees as first points of contact.",
                ],
              },
              {
                title: "2. Physical Wellness & Fitness",
                items: [
                  "Annual health check-ups.",
                  "Ergonomics training (remote + onsite staff).",
                  "Subsidized gym/wellness memberships.",
                  "On-site yoga, Zumba, meditation sessions.",
                  "Global Example: Google provides on-site gyms, nap pods, and health clinics to reduce burnout.",
                ],
              },
              {
                title: "3. Financial Well-Being",
                items: [
                  "Financial literacy sessions.",
                  "Retirement & savings plan awareness.",
                  "Debt management counselling.",
                  "Employee stock ownership plan (ESOP) guidance.",
                  "Global Example: Microsoft runs financial wellness coaching tied to employee benefit programs.",
                ],
              },
              {
                title: "4. Diversity, Equity & Inclusion (DEI) Support",
                items: [
                  "Training on respect & dignity.",
                  "Safe-space employee resource groups (ERGs).",
                  "Celebrating cultural/ethnic diversity events.",
                  "Policy reviews for inclusivity (gender-neutral leave, equal pay).",
                  'Global Example: Unilever runs "Unstereotype" training modules to challenge unconscious bias.',
                ],
              },
              {
                title: "5. Work-Life Balance Initiatives",
                items: [
                  "Hybrid & flexible work models.",
                  "Mandatory vacation days.",
                  '"No meeting Fridays" or "mental health days."',
                  "Employee assistance programs (EAPs).",
                  "Global Example: Salesforce offers Wellbeing Reimbursement Program ($100/month for fitness/wellness expenses).",
                ],
              },
              {
                title: "6. Compliance & Safe Workplace Integration",
                items: [
                  "Integration with POSH Act obligations in India.",
                  "Grievance redressal & awareness campaigns.",
                  "Quarterly compliance reporting.",
                  "ESG-linked certification for investors.",
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
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">🔹 Key Benefits for Corporates</h2>
            <div className="w-16 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "✔️ Legal & Compliance Readiness – POSH, OSHA, HSE, EEOC.",
              "✔️ Productivity Boost – happier employees = higher output.",
              "✔️ Employer Brand – attract and retain global talent.",
              "✔️ ESG & Investor Advantage – measurable governance metrics.",
              "✔️ Employee Loyalty – lower attrition, stronger culture.",
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
                question: "1. What is an employee well-being programme?",
                answer:
                  "A structured set of policies, initiatives, and resources aimed at improving employees' mental, physical, financial, and social health while ensuring compliance with workplace safety and anti-harassment laws.",
              },
              {
                question: "2. Are well-being programmes mandatory?",
                answer:
                  "India: Indirectly mandated under POSH Act (safe workplace obligation). UK: HSE requires employers to manage employee stress & safety. US: OSHA mandates safe workplace standards; many states require mental health initiatives.",
              },
              {
                question: "3. How do well-being programmes impact compliance?",
                answer:
                  "They strengthen compliance with POSH, Equality, and EEOC standards, reduce litigation risks, and improve ESG governance scores.",
              },
              {
                question: "4. What are the core pillars of a well-being programme?",
                answer:
                  "Mental health, physical wellness, financial well-being, diversity/inclusion, and work-life balance.",
              },
              {
                question: "5. How do MNCs integrate well-being into culture?",
                answer:
                  "Through employee resource groups (ERGs), dedicated wellness budgets, and making well-being part of leadership KPIs.",
              },
              {
                question: "6. How is effectiveness measured?",
                answer:
                  "KPIs: employee engagement scores, attrition %, sick days used, productivity uplift, grievance reports.",
              },
              {
                question: "7. How often should well-being programmes be run?",
                answer: "Best practice: Quarterly activities + annual assessments.",
              },
              {
                question: "8. Can SMEs adopt MNC-style programmes?",
                answer:
                  "Yes—scaled versions like virtual counselling, flexible hours, and low-cost awareness sessions.",
              },
              {
                question: "9. What documentation is needed for audits?",
                answer:
                  "Programme policies. Participation logs. Wellness partner contracts. Annual well-being reports.",
              },
              {
                question: "10. How do programmes align with ESG?",
                answer:
                  'Well-being initiatives support the "S" in ESG (Social Governance) and strengthen investor reporting.',
              },
              {
                question: "11. How does URE POSH customize programmes?",
                answer:
                  "By assessing industry-specific risks (e.g., IT burnout, manufacturing safety, BFSI stress levels) and tailoring solutions.",
              },
              {
                question: "12. Does URE POSH provide certification?",
                answer:
                  "Yes—we issue Well-Being Compliance Certificates for ESG reports, investor due diligence, and CSR disclosures.",
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Healthy Employees = Healthy Business.</p>
          <p className="text-xl mb-3 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Well-Being Programmes aligned with global MNC standards and compliance frameworks.
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
            Employee Well-Being Programmes | Workplace Wellness & Compliance | URE POSH
          </p>
        </div>
      </footer>
    </div>
  )
}

