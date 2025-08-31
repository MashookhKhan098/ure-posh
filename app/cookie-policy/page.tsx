"use client";
import React, { useEffect } from "react";

export default function CookiePolicy() {
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
        <h1 className="text-4xl font-extrabold mb-2 text-center tracking-tight text-pink-700">Cookie Policy</h1>
        <p className="text-lg text-center text-gray-600">URE POSH – An Arm of URE Consulting LLP, New Delhi</p>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">1. Introduction</h2>
          <p className="text-base leading-relaxed mb-2">This Cookie Policy explains how URE POSH (“we”, “our”, “us”) uses cookies and similar tracking technologies on our website <span className="font-semibold">ureposh.com</span> (“Platform”).</p>
          <p className="text-base leading-relaxed mb-2">By using our Platform, you agree to the use of cookies as described in this Policy. If you do not agree, you should adjust your browser settings or stop using our Platform.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">2. What Are Cookies?</h2>
          <p className="text-base leading-relaxed">Cookies are small text files stored on your device by your browser when you visit our website. They help us improve your experience by remembering your preferences, understanding user behaviour, and enhancing website functionality.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 space-y-2 text-base mb-2">
            <li><span className="font-semibold">Strictly Necessary Cookies</span> – Essential for the operation of our Platform (e.g., security, login, navigation).</li>
            <li><span className="font-semibold">Performance Cookies</span> – Collect anonymous data about how visitors use our Platform (e.g., analytics, load times).</li>
            <li><span className="font-semibold">Functionality Cookies</span> – Remember your preferences (e.g., language settings, region selection).</li>
            <li><span className="font-semibold">Targeting/Advertising Cookies</span> – May be used to deliver relevant content or measure marketing campaign performance.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">4. Third-Party Cookies</h2>
          <p className="text-base leading-relaxed">We may allow trusted third-party service providers (e.g., analytics tools, social media platforms, payment gateways) to place cookies on your device for the purposes described above.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">5. Managing Cookies</h2>
          <p className="text-base leading-relaxed">You can control or delete cookies via your browser settings. Please note that disabling cookies may affect website functionality and your user experience.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">6. Updates to This Policy</h2>
          <p className="text-base leading-relaxed">We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated “Effective Date.”</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-3 text-pink-700">7. Contact</h2>
          <div className="space-y-1 text-base">
            <p><span className="font-semibold">Email:</span> <a href="mailto:ea@ureposh.com" className="text-blue-600 underline">ea@ureposh.com</a></p>
            <p><span className="font-semibold">Office:</span> New Delhi, India</p>
          </div>
        </section>
        <p className="mt-4 mb-2 text-center font-semibold text-gray-700 text-base">BY USING OUR PLATFORM, YOU CONFIRM THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THIS COOKIE POLICY.</p>
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
