import { CheckCircle, Phone, Mail, Shield, Building, ArrowRight } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="h-4 w-4 mr-2" />
              India, UK, and US Compliance Guide
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
              POSH Committee and <span className="text-pink-600">External NGO Members</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-balance leading-relaxed">
              India, UK, and US Compliance Guide for workplace harassment prevention with expert external members
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
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is POSH Committee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-2xl mb-6">
              <Building className="h-8 w-8 text-pink-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">What is a POSH Committee?</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              A POSH Committee, also known as the Internal Committee (IC), is a specialized team that helps
              organizations prevent and address workplace sexual harassment. Having an effective POSH Committee is
              crucial not only for legal compliance but also for building a truly safe and inclusive environment.
            </p>
          </div>
        </div>
      </section>

      {/* POSH Committee Structure Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              POSH Committee Structure in India: The Power of External Members
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Under India's POSH Act, 2013, every company with 10 or more employees is required to establish an
                Internal Committee to address complaints of sexual harassment. A unique feature of this law is the
                mandatory inclusion of an external member, a representative from a respected NGO or a professional with
                experience in women's issues.
              </p>
            </div>
            <div className="bg-pink-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Why Include External Members from Renowned NGOs?
              </h3>
              <div className="space-y-4">
                {[
                  "Neutrality & Objectivity: External members provide an unbiased voice, ensuring fair investigations and decisions.",
                  "Credibility: Their presence reassures employees that the process is trustworthy and professional.",
                  "Expertise: NGO professionals bring deep experience in gender issues, legal requirements, and trauma-sensitive care.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NGO Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              Well-known NGOs whose members serve as external IC members include:
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["WCRT", "Breakthrough India", "Jagori", "Majlis Legal Centre", "CSR India", "SAKSHI"].map(
              (ngo, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-center p-6 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors"
                >
                  <span className="text-gray-700 font-semibold text-lg">{ngo}</span>
                </div>
              ),
            )}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Having these NGO experts on your POSH Committee not only fulfills legal needs but shows your
              organization's genuine commitment to a respectful workplace.
            </p>
          </div>
        </div>
      </section>

      {/* UK and US Standards Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              POSH & Harassment Committees: UK and US Standards
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">UK Approach:</h3>
              <p className="text-gray-700 leading-relaxed">
                Businesses may invite external HR professionals or NGO representatives—such as those from the Equality
                and Human Rights Commission or Women's Aid—to ensure transparency and fairness in investigations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">US Practice:</h3>
              <p className="text-gray-700 leading-relaxed">
                US firms often include external legal experts or NGO specialists like those from the National Women's
                Law Center (NWLC) or RAINN to bring unbiased perspectives in sensitive cases.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              While the UK and US do not have a law identical to India's POSH Act, workplace harassment and gender
              equality are taken very seriously. Companies are encouraged to form harassment committees or ethics boards
              to deal with complaints, and it's considered best practice to involve external advisors for impartiality.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
              Benefits of Involving External NGO Members:
            </h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Unbiased investigation and resolution",
              "Up-to-date knowledge of local and global laws",
              "Enhanced employee trust and confidence",
              "Public demonstration of ethical leadership",
            ].map((benefit, index) => (
              <div
                key={index}
                className="group flex items-center space-x-4 p-6 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How UREPosh Can Help Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">How UREPosh Can Help</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
              Our network includes leading NGO professionals and compliance specialists ready to serve as external POSH
              Committee members for organizations in India and as external advisors for companies in the UK and US. We
              help you:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Select qualified external IC members",
                "Stay audit-ready and compliant with the latest laws",
                "Foster a culture of respect, trust, and safety",
              ].map((service, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-sm border border-pink-100 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors">
                    <CheckCircle className="h-6 w-6 text-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">Frequently Asked:</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                question: "Who can be an external member of the POSH Committee in India?",
                answer:
                  "An external member of the POSH Committee in India is typically a person who is not an employee of the organization and brings relevant expertise in areas such as legal matters, gender sensitivity, or workplace harassment prevention. This individual can be a lawyer, a gender sensitivity trainer, a psychologist, or a representative from an NGO working on women's rights. The external member is appointed to ensure impartiality, objectivity, and specialized knowledge in handling sensitive complaints related to sexual harassment and must meet the qualifications outlined under the POSH Act to effectively support the Internal Committee.",
              },
              {
                question: "Why should my company have an external NGO member on the harassment committee?",
                answer:
                  "Having an external NGO member on the harassment committee is important because it brings unbiased, specialized expertise in handling cases of sexual harassment and gender issues. An NGO representative can provide an objective perspective, ensure transparency, and help create a safe and supportive environment for complainants. Their involvement also demonstrates the company's commitment to upholding gender sensitivity and compliance with legal requirements under the POSH Act, thereby enhancing trust and credibility in the organization's efforts to prevent and address workplace harassment.",
              },
              {
                question: "What is the international standard for workplace harassment investigations?",
                answer:
                  "The international standard for workplace harassment investigations emphasizes fairness, confidentiality, thoroughness, and impartiality. Investigations should be conducted promptly and objectively, ensuring that all parties involved are given an equal opportunity to present their case. Investigators must gather evidence diligently, maintain confidentiality to protect the privacy of all parties, and avoid biases. The process should be transparent, with clear communication about the steps involved, and outcomes should be based on factual findings. Additionally, organizations are encouraged to follow established best practices and legal frameworks to ensure a safe and respectful work environment, aligned with international human rights standards.",
              },
              {
                question: "How do I appoint an external expert for my company's committee?",
                answer:
                  "To appoint an external expert for your company's committee, identify the specific expertise needed and research reputable professionals or organizations with relevant experience. Verify their credentials and define their roles and responsibilities clearly. Then, formalize the appointment through a written agreement outlining scope, confidentiality, and terms of engagement. Seek approval from senior management or the board as required, and onboard the expert by introducing them to the committee and providing necessary information. This process ensures a transparent and effective appointment aligned with organizational standards.",
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Connect with Us:</h2>
          <p className="text-xl mb-12 text-pink-100 text-balance max-w-3xl mx-auto">
            UREPosh: Trusted Partners for POSH, Harassment Committee Compliance, and Workplace Inclusion
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="tel:+919999644807"
              className="group flex items-center space-x-3 bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              <span>📞9999644807</span>
            </a>
          </div>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
            <Phone className="h-6 w-6 mr-3 text-pink-200" />
            <a href="tel:+919999644807" className="text-2xl font-bold text-white hover:text-pink-200 transition-colors">
              📞9999644807
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
            Trusted Partners for POSH, Harassment Committee Compliance, and Workplace Inclusion
          </p>
        </div>
      </footer>
    </div>
  )
}
