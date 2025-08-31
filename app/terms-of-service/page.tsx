"use client";
import React, { useEffect } from "react";

export default function TermsOfService() {
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
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-tight text-pink-700">Terms of Service</h1>
        <p className="text-lg text-center text-gray-600">URE POSH – An Arm of URE Consulting LLP, New Delhi</p>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">1. Introduction</h2>
          <p className="text-base leading-relaxed mb-2">These Terms of Service (“Terms”) govern your access to and use of URE POSH (“we,” “our,” “us”) services, website <span className="font-semibold">ureposh.com</span>, and all related offerings, including POSH compliance services, training programs, advisory services, and workplace investigation assistance (collectively, the “Services”).</p>
          <p className="text-base leading-relaxed mb-2">By using our Services, you agree to be bound by these Terms, along with our <span className="underline">Privacy Policy</span>, <span className="underline">Cookie Policy</span>, and <span className="underline">Compliance Statement</span>. If you do not agree to these Terms, you must not use our Services.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">2. Scope of Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>External IC Member services</li>
            <li>POSH awareness and sensitization training programs</li>
            <li>Drafting and reviewing workplace policies</li>
            <li>Compliance audits and reporting</li>
            <li>Advisory support for POSH investigations</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">3. Eligibility</h2>
          <p className="text-base leading-relaxed">Our Services are intended for use by corporate entities, institutions, registered organizations, and authorized representatives. By engaging us, you confirm that you are authorized to act on behalf of your organization.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">4. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>All payments for our Services are to be made 100% in advance, prior to the commencement of any work, training session, or consultation.</li>
            <li>All fees are non-transferable and non-refundable under any circumstances, except as provided under Clause 8 (Exceptional Circumstances).</li>
            <li>We will not initiate any Services until payment has been received in full in our designated account.</li>
            <li>Any taxes, levies, or statutory deductions applicable will be borne by the client in addition to the agreed service fee.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">5. Non-Transferability of Services</h2>
          <p className="text-base leading-relaxed">Services purchased are specific to the client organization and cannot be transferred, resold, or reassigned to any other party without our prior written consent.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">6. Client Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Provide accurate and complete information necessary for service delivery.</li>
            <li>Ensure timely cooperation with our team to avoid delays.</li>
            <li>Maintain confidentiality of all proprietary material provided by us.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">7. Limitation of Liability</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Consequences of delays caused by the client’s failure to provide required information.</li>
            <li>Legal or regulatory action arising from incomplete or false information provided by the client.</li>
            <li>Any indirect, incidental, or consequential loss resulting from the use or inability to use our Services.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">8. Exceptional Circumstances – Amicable Resolution</h2>
          <p className="text-base leading-relaxed mb-2">In rare and exceptional situations, such as a government order, force majeure event, or an unavoidable cancellation caused by URE POSH, both parties agree to discuss and resolve the matter amicably. Possible resolutions may include:</p>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Rescheduling the service delivery at a mutually agreed date</li>
            <li>Adjusting the scope of services without additional cost</li>
            <li>Providing partial credit for future services (at our sole discretion)</li>
          </ul>
          <p className="text-base leading-relaxed">Note: Refunds, if any, will be made solely at the discretion of URE POSH and shall be considered only in extraordinary cases.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">9. Intellectual Property</h2>
          <p className="text-base leading-relaxed">All training materials, templates, policies, and other deliverables provided remain the intellectual property of URE POSH and may not be reproduced, distributed, or shared without prior written consent.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">10. Confidentiality</h2>
          <p className="text-base leading-relaxed">Both parties shall maintain strict confidentiality regarding all proprietary and sensitive information exchanged during the course of engagement, except where disclosure is required by law.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">11. Governing Law, Jurisdiction & Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>These Terms shall be governed by and construed in accordance with the laws of India.</li>
            <li>All disputes, differences, or claims arising out of or in connection with these Terms shall first be referred to mediation at Patiala House Courts, New Delhi.</li>
            <li>If mediation fails, the matter shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration at New Delhi. The arbitral tribunal shall consist of a sole arbitrator appointed mutually by both parties.</li>
            <li>The courts at New Delhi, including the Hon’ble High Court of Delhi, shall have exclusive jurisdiction over all matters arising under or in connection with these Terms.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">12. Contact Information</h2>
          <div className="space-y-1 text-base">
            <p><span className="font-semibold">URE POSH – An Arm of URE Consulting LLP</span></p>
            <p><span className="font-semibold">Email:</span> <a href="mailto:ea@ureposh.com" className="text-blue-600 underline">ea@ureposh.com</a></p>
            <p><span className="font-semibold">Office:</span> New Delhi, India</p>
          </div>
        </section>
        <p className="mt-4 mb-2 text-center font-semibold text-gray-700 text-base">BY ENGAGING OUR SERVICES OR ACCESSING OUR PLATFORM, YOU CONFIRM THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO THESE TERMS OF SERVICE.</p>
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
