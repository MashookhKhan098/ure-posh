"use client";
import React, { useEffect } from "react";

export default function ComplianceStatement() {
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
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-tight text-pink-700">Compliance Statement</h1>
        <p className="text-lg text-center text-gray-600">URE POSH – An Arm of URE Consulting LLP, New Delhi</p>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">Commitment to Legal & Ethical Compliance</h2>
          <p className="text-base leading-relaxed mb-2">At URE POSH, we are committed to full compliance with:</p>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) and related Rules.</li>
            <li>Applicable provisions of the Indian Penal Code, Information Technology Act, 2000, and other workplace safety regulations.</li>
            <li>International best practices for gender equality, inclusion, and safe workplace environments.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">Our Compliance Practices Include</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Serving as External Members on Internal Committees (IC) in accordance with the POSH Act.</li>
            <li>Providing awareness and training programs to employees, managers, and IC members.</li>
            <li>Assisting organizations in drafting and implementing POSH-compliant workplace policies.</li>
            <li>Conducting impartial workplace investigations and compliance audits.</li>
            <li>Maintaining strict confidentiality in all proceedings, as required under Section 16 of the POSH Act.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">Non-Negotiable Standards</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Zero Tolerance towards sexual harassment, discrimination, and victimisation.</li>
            <li>Confidentiality & Privacy protection for all parties involved in POSH proceedings.</li>
            <li>Ethical Conduct & Integrity in every engagement.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">Jurisdiction & Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li>Any disputes arising out of or relating to our services or compliance activities shall:</li>
            <li>First be referred to mediation at Patiala House Courts, New Delhi.</li>
            <li>If mediation fails, be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration at New Delhi.</li>
            <li>Be subject to the exclusive jurisdiction of the Hon’ble High Court of Delhi and other competent courts at New Delhi, India.</li>
          </ul>
        </section>
        <p className="mt-4 mb-2 text-center font-semibold text-gray-700 text-base">© 2025 URE POSH. All rights reserved.</p>
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
