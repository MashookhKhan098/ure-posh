import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Razorpay script loader utility
function loadRazorpayScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Razorpay payment handler for buying poster
async function handleBuyPoster() {
  const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "rzp_test_YourKeyHere", // Replace with your Razorpay key
    amount: 49900, // Poster price in paise (e.g., ₹499)
    currency: "INR",
    name: "Ureposh",
    description: "POSH Poster Purchase",
    image: "/logo.png", // Optional: your logo path
    handler: function (response: any) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      // Add further logic here (e.g., show download link, send email, etc.)
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    theme: {
      color: "#6366f1",
    },
  };

  // @ts-ignore
  const rzp = new window.Razorpay(options);
  rzp.open();
}

export default function PosterAndPolicyDiscloserPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-4">
      <div className="max-w-lg w-full bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">Buy POSH Poster</h1>
        <p className="text-slate-600 mb-4">
          Get your legally compliant POSH poster for your workplace. Pay securely via Razorpay and download instantly.
        </p>
        <div className="mb-4">
          <Image
            src="/images/posh-poster-sample.jpg"
            alt="POSH Poster Sample"
            width={320}
            height={450}
            className="rounded-lg mx-auto shadow"
          />
        </div>
        <div className="mb-2">
          <span className="text-lg font-semibold text-green-700">₹499</span>
          <span className="ml-2 text-slate-500 text-sm">per poster (PDF)</span>
        </div>
        <Button
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
          onClick={handleBuyPoster}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
