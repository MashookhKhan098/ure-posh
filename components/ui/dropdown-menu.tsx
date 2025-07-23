import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ExpertiseDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Handler for click toggle
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 text-gray-900 font-medium text-base hover:text-gray-700 transition-colors"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        Expertise
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="fixed top-[100%] left-0 w-screen bg-white shadow-2xl border border-gray-200 z-50">
          <div className="flex divide-x divide-gray-100">
            {/* Left: Compliance at ALL Work Place */}
            <div className="w-1/3 p-6 flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance at ALL Work Place</h3>
              <ul className="space-y-2 w-full">
                <li className="text-gray-700 text-sm">POSH Compliance Initiation</li>
                <li className="text-gray-700 text-sm">External Members from Renowned NGO</li>
                <li className="text-gray-700 text-sm">Compliant Redressal</li>
                <li className="text-gray-700 text-sm">Order Writing</li>
                <li className="text-gray-700 text-sm">Annual Report</li>
                <li className="text-gray-700 text-sm">Organisation Disclosure</li>
                <li className="text-gray-700 text-sm">POSH Audit</li>
              </ul>
            </div>
            {/* Middle: Trainings and Adaptability */}
            <div className="w-1/3 p-6 flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trainings and Adaptability</h3>
              <ul className="space-y-2 w-full">
                <li className="text-gray-700 text-sm">POSH Training for Workforce</li>
                <li className="text-gray-700 text-sm">POSH Training for IC Members</li>
                <li className="text-gray-700 text-sm">Quarterly Mandatory Training</li>
                <li className="text-gray-700 text-sm">Managers Level Training</li>
                <li className="text-gray-700 text-sm">Remote Training (Cost Effective)</li>
                <li className="text-gray-700 text-sm">POSH Training for Workforce</li>
                <li className="text-gray-700 text-sm">POSH Training for IC Members</li>
                <li className="text-gray-700 text-sm">Managers Level Training</li>
              </ul>
            </div>
            {/* Right: Organisation Counselling and Well-being */}
            <div className="w-1/3 p-6 flex flex-col items-start">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organisation Counselling and Well-being</h3>
              <ul className="space-y-2 w-full">
                <li className="text-gray-700 text-sm">Well Being Programmes</li>
                <li className="text-gray-700 text-sm">Code of Conduct Training</li>
                <li className="text-gray-700 text-sm">Mental Health Training</li>
                <li className="text-gray-700 text-sm">Inclusion at Work Place</li>
                <li className="text-gray-700 text-sm">LGBTQIA++ Inclusion</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}