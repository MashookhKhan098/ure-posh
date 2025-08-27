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
              Workplace Respect Training | Harassment Prevention & Compliance | URE POSH
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              Workplace Respect <span className="text-pink-600">Training</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              URE POSH offers Workplace Respect & Harassment Prevention Training aligned with the POSH Act (India),
              Equality Act (UK), and EEOC (US). Build respectful, inclusive, and globally compliant workplaces with
              certified training programs.
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
              🏢 About URE POSH Workplace Respect Training
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              At URE POSH, we believe that a safe workplace begins with respect. Policies and audits alone are not
              enough—behaviors must change. Our Workplace Respect Training programs help employees, managers, and
              leaders:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                "✔️ Understand the boundaries of professional conduct.",
                "✔️ Recognize unconscious bias, microaggressions, and harassment.",
                "✔️ Learn the global legal framework (India, UK, US).",
                "✔️ Build a culture of dignity, inclusivity, and accountability.",
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{service}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our programs are interactive, scenario-based, and legally compliant—designed for both in-person and
              digital learning formats.
            </p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              🔹 Why Workplace Respect Training Matters
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "India – POSH Act, 2013",
                desc: "mandates regular awareness & sensitization.",
              },
              {
                title: "UK – Equality Act, 2010",
                desc: "+ ACAS guidelines require training to prevent Employment Tribunal claims.",
              },
              {
                title: "US – EEOC & state laws",
                desc: "(e.g., California, New York) mandate annual harassment prevention training.",
              },
              {
                title: "Global ESG Standards",
                desc: "– Investors and boards expect DEI & workplace respect metrics.",
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h3 className="font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Without training, compliance is incomplete—companies face legal penalties, litigation costs, and
              reputational damage.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Our Training Modules</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "1. Foundations of Workplace Respect",
                items: [
                  "Principles of dignity & inclusion.",
                  "Legal overview: POSH Act, Equality Act, EEOC laws.",
                  "Rights & responsibilities of employees.",
                ],
              },
              {
                title: "2. Recognizing Harassment & Discrimination",
                items: [
                  "Quid pro quo & hostile work environment.",
                  "Subtle bias, bullying, microaggressions.",
                  "Protected characteristics (gender, race, age, religion, disability, sexual orientation).",
                ],
              },
              {
                title: "3. Role of Managers & Leadership",
                items: [
                  "Duty of care and accountability.",
                  "Handling complaints without retaliation.",
                  "Role modeling respectful behavior.",
                ],
              },
              {
                title: "4. Complaint Redressal & Reporting",
                items: [
                  "How to raise concerns safely.",
                  "Role of Internal Committee (India), grievance panels (UK), HR/EEOC (US).",
                  "Confidentiality obligations.",
                ],
              },
              {
                title: "5. Global Best Practices",
                items: [
                  "Case studies from India, UK, and US.",
                  "Cross-cultural communication.",
                  "ESG-linked respect programs.",
                ],
              },
              {
                title: "6. Interactive Workshops & E-Learning",
                items: [
                  "Role-plays and simulations.",
                  "Quizzes & certifications.",
                  "Digital learning dashboards for large organizations.",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">🔹 Key Benefits of URE POSH Training</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "✔️ 100% Legal Compliance – POSH Act, Equality Act, EEOC.",
              "✔️ Improved Workplace Culture – safer, more inclusive, more productive.",
              "✔️ Reduced Litigation Risk – employees trained to prevent and report respectfully.",
              "✔️ Stronger Employer Brand – trusted by employees, investors, and clients.",
              "✔️ Certification – training completion certificates for compliance audits.",
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
                question: "1. Is Workplace Respect Training legally mandatory?",
                answer:
                  'India: Yes, POSH Act, 2013 mandates regular awareness. UK: Equality Act, 2010 expects "reasonable steps" including training. US: EEOC recommends it; many states (e.g., CA, NY) mandate annual sessions.',
              },
              {
                question: "2. What is included in respect training?",
                answer:
                  "Understanding harassment & discrimination. Respectful communication. Bystander intervention. Complaint handling.",
              },
              {
                question: "3. Who must attend the training?",
                answer:
                  "All employees (staff, contractual, interns). Managers & leadership (with advanced modules). IC members (India) must undergo specialized POSH training.",
              },
              {
                question: "4. How often should training be conducted?",
                answer:
                  "India: At least once a year. US: Annually in mandated states. UK: Regular refreshers; best practice = annual or biennial.",
              },
              {
                question: "5. Can online training fulfill legal requirements?",
                answer:
                  "Yes, provided it is interactive, trackable, and certified. India, UK, and US regulators accept e-learning if documentation is maintained.",
              },
              {
                question: "6. What proof of compliance is needed?",
                answer: "Training attendance logs. Certificates issued. Annual compliance report updates.",
              },
              {
                question: "7. How is confidentiality handled during training discussions?",
                answer:
                  "Trainers ensure safe, non-judgmental environments, with anonymized case studies and no recording of personal disclosures.",
              },
              {
                question: "8. What are consequences of not providing training?",
                answer:
                  "India: Penalties under POSH Act (₹50,000 fine, license cancellation). UK: Tribunal penalties, compensation to victims. US: EEOC lawsuits, multimillion-dollar settlements.",
              },
              {
                question: "9. Can global companies adopt a single training framework?",
                answer: "Yes—with a core global curriculum + jurisdiction-specific modules for India, UK, US laws.",
              },
              {
                question: "10. What role do managers play in respect training?",
                answer:
                  "Managers are first responders—trained to recognize, de-escalate, and report harassment without bias or retaliation.",
              },
              {
                question: "11. How is training effectiveness measured?",
                answer: "Pre/post training assessments. Complaint trend monitoring. Employee feedback surveys.",
              },
              {
                question: "12. Does URE POSH provide certification?",
                answer:
                  "Yes, we issue Workplace Respect Training Certificates recognized for legal audits, ESG reports, and investor governance checks.",
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
          <p className="text-2xl mb-4 text-pink-100 font-semibold">✨ Respect Builds Safety. Safety Builds Trust.</p>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            Partner with URE POSH for Workplace Respect Training that meets Indian laws and global compliance standards.
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
          <p className="text-gray-400 text-lg">Workplace Respect Training | Harassment Prevention & Compliance</p>
        </div>
      </footer>
    </div>
  )
}
