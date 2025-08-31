
"use client";
import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    // Hide footer and navbar if present
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    // Hide Free Coffee button if present
  const freeCoffeeBtn = document.querySelector("button, a[href*='coffee']");
  if (freeCoffeeBtn && freeCoffeeBtn instanceof HTMLElement) freeCoffeeBtn.style.display = "none";
    document.body.style.background = "#fff";
    document.body.style.color = "#222";
    document.body.classList.add("!bg-white");
    return () => {
      if (footer) footer.style.display = "";
      if (nav) nav.style.display = "";
  if (freeCoffeeBtn && freeCoffeeBtn instanceof HTMLElement) freeCoffeeBtn.style.display = "";
      document.body.style.background = "";
      document.body.style.color = "";
      document.body.classList.remove("!bg-white");
    };
  }, []);

  return (
    <main className="w-full bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <style>{`footer { display: none !important; }`}</style>
      <div className="w-full max-w-3xl mx-auto px-4 pt-8 pb-0 text-gray-900 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-tight text-pink-700">Privacy Policy</h1>
        <p className="text-lg text-center text-gray-600">URE POSH – An Arm of URE Consulting LLP, New Delhi</p>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">Introduction</h2>
          <p className="text-base leading-relaxed mb-2">This Privacy Policy outlines how URE POSH (“URE POSH”, “we”, “our”, “us”), an arm of URE Consulting LLP, collects, uses, shares, and safeguards your personal information when you interact with our website <span className="font-semibold">ureposh.com</span> (“Platform”) or avail of our services.</p>
          <p className="text-base leading-relaxed mb-2">We are committed to maintaining the highest standards of privacy, integrity, and data protection in line with our mission to promote safe, inclusive, and harassment-free workplaces in compliance with the Prevention of Sexual Harassment at Workplace (POSH) Act, 2013 and other applicable laws.</p>
          <p className="text-base leading-relaxed">By visiting or using our Platform, or by providing your information to us, you expressly agree to the terms of this Privacy Policy and our <span className="underline">Terms of Service</span>. If you do not agree, please do not use or access the Platform.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">1. Scope & Applicability</h2>
          <p className="text-base leading-relaxed mb-2">This Privacy Policy applies to all personal data collected by URE POSH through our Platform, training programs, compliance audits, and related professional services.</p>
          <p className="text-base leading-relaxed">Our services and website are primarily intended for use within India. Any personal data provided will be stored and processed in India in accordance with applicable laws.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li><span className="font-semibold">Personal Identification Information:</span> Name, designation, company name, official address, contact number, and email address.</li>
            <li><span className="font-semibold">Sensitive Personal Data:</span> With your explicit consent, we may collect information necessary for POSH investigations, including gender, incident details, witness statements, or payment-related information (bank account/UPI for service transactions).</li>
            <li><span className="font-semibold">Usage Data:</span> Information about how you interact with our Platform, such as IP address, browser type, device identifiers, and activity logs.</li>
            <li><span className="font-semibold">Transaction Data:</span> Details of training registrations, compliance service engagements, and associated communications.</li>
          </ul>
          <p className="text-base leading-relaxed">You are not obliged to provide all information requested, but some services may not be available if certain data is not shared.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">3. Use of Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Delivering POSH compliance services, training programs, and investigations</li>
            <li>Fulfilling contractual obligations with client organizations</li>
            <li>Responding to queries, grievances, and legal compliance requests</li>
            <li>Enhancing user experience and Platform functionality</li>
            <li>Informing you about initiatives, resources, and updates</li>
            <li>Conducting research, surveys, and compliance analytics</li>
            <li>Ensuring adherence to legal obligations under the POSH Act and related laws</li>
          </ul>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">4. Sharing of Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Within URE Consulting LLP and its Affiliates: For service delivery and compliance reporting.</li>
            <li>With Authorized Third-Party Service Providers: Such as IT support, secure data storage, or payment processors.</li>
            <li>With Law Enforcement or Regulatory Authorities: Where required under applicable law or for statutory compliance.</li>
            <li>During POSH Proceedings: Only as necessary to comply with statutory investigation or reporting obligations.</li>
          </ul>
          <p className="text-base leading-relaxed">We are not responsible for the privacy practices of third-party platforms linked from our site and encourage you to review their privacy policies separately.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">5. Security Measures</h2>
          <p className="text-base leading-relaxed mb-2">We adopt reasonable security practices and technical safeguards to protect your data against unauthorised access, alteration, disclosure, or destruction. However, no method of electronic transmission is entirely secure, and we cannot guarantee absolute protection.</p>
          <p className="text-base leading-relaxed">You are responsible for keeping your login credentials confidential.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">6. Data Retention & Deletion</h2>
          <p className="text-base leading-relaxed mb-2">We retain your personal data only as long as necessary for the purposes collected, or as required by law.</p>
          <p className="text-base leading-relaxed mb-2">Requests for deletion of personal data may be made via <a href="mailto:info@ureposh.com" className="text-blue-600 underline">info@ureposh.com</a>. Deletion may be delayed where there are pending compliance matters, investigations, or legal requirements.</p>
          <p className="text-base leading-relaxed">Certain anonymised or aggregated data may be retained for research and audit purposes.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li><span className="font-semibold">Access, Rectification, and Update:</span> You may review or correct your personal information via your account or by contacting us.</li>
            <li><span className="font-semibold">Consent Withdrawal:</span> You may withdraw consent for specific uses by writing to our Grievance Officer. Withdrawal will not apply retrospectively.</li>
            <li><span className="font-semibold">Data Portability & Objection:</span> Subject to applicable law, you may request a copy of your data or object to specific processing activities.</li>
          </ul>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">8. Consent</h2>
          <p className="text-base leading-relaxed">By using our Platform or engaging our services, you consent to the collection, use, storage, and sharing of your information in accordance with this Privacy Policy. If you provide personal information about others, you confirm that you have obtained their consent.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">9. Policy Updates</h2>
          <p className="text-base leading-relaxed">This Privacy Policy may be updated periodically to reflect changes in law, technology, or our operations. Updates will be posted on this page, and significant changes may be notified as required by law.</p>
        </section>
        {/* ...existing code... */}
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">10. Contact & Grievance Redressal</h2>
          <div className="space-y-1 text-base">
            <p><span className="font-semibold">Grievance Officer:</span> CA Shweta Gupta</p>
            <p><span className="font-semibold">Designation:</span> Compliance Officer</p>
            <p><span className="font-semibold">URE POSH – An Arm of URE Consulting LLP</span></p>
            <p><span className="font-semibold">Registered Office:</span> New Delhi, India</p>
            <p><span className="font-semibold">Email:</span> <a href="mailto:ea@ureposh.com" className="text-blue-600 underline">ea@ureposh.com</a></p>
            <p><span className="font-semibold">Phone:</span> +91 99999 44807</p>
            <p><span className="font-semibold">Office Hours:</span> Monday – Friday (9:00 AM – 6:00 PM IST)</p>
          </div>
        </section>
        {/* ...existing code... */}
        <p className="mt-4 mb-2 text-center font-semibold text-gray-700 text-base">BY ACCESSING OR USING THIS PLATFORM, YOU CONFIRM THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS PRIVACY POLICY.</p>
        <div className="flex justify-center mt-2 mb-0">
          <button
            className="px-8 py-3 bg-pink-700 text-white rounded-xl font-semibold shadow-lg hover:bg-pink-800 transition text-lg"
            onClick={() => window.location.href = "/"}
          >
            Agree &amp; Go to Home
          </button>
        </div>
      </div>
    </main>
  );
}
