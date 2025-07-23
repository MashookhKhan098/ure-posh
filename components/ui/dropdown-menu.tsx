import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ExpertiseDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Handler for click toggle
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Trigger */}
      <button
        className="flex items-center gap-2 px-4 py-2 text-gray-900 font-medium text-base hover:text-gray-700 transition-colors"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        Expertise
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="fixed top-[100%] left-0 w-screen bg-white shadow-2xl border border-gray-200 z-50">
          <div className="flex divide-x divide-gray-200">
            {/* Left: Compliance at ALL Work Place */}
            <div className="w-1/3 p-10 bg-[#f7f8fa] flex flex-col items-start border-r border-gray-200">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Compliance at ALL Work Place</h3>
              <div className="w-16 h-1 bg-teal-500 mb-6"></div>
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                POSH Compliance Initiation<br/>
                External Members from Renowned NGO<br/>
                Compliant Redressal<br/>
                Order Writing<br/>
                Annual Report<br/>
                Organisation Disclosure<br/>
                POSH Audit
              </p>
            </div>

            {/* Middle: Trainings and Adaptability */}
            <div className="w-1/3 p-10 bg-white flex flex-col items-start">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Trainings and Adaptability</h3>
              <ul className="space-y-3 w-full">
                <li className="text-gray-600 text-base font-normal">POSH Training for Workforce</li>
                <li className="text-gray-600 text-base font-normal">POSH Training for IC Members</li>
                <li className="text-gray-600 text-base font-normal">Quarterly Mandatory Training</li>
                <li className="text-gray-600 text-base font-normal">Managers Level Training</li>
                <li className="text-gray-600 text-base font-normal">Remote Training (Cost Effective)</li>
                <li className="text-gray-600 text-base font-normal">POSH Training for Workforce</li>
                <li className="text-gray-600 text-base font-normal">POSH Training for IC Members</li>
                <li className="text-gray-600 text-base font-normal">Managers Level Training</li>
              </ul>
            </div>

            {/* Right: Organisation Counselling and Well-being */}
            <div className="w-1/3 p-10 bg-white flex flex-col items-start">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Organisation Counselling and Well-being</h3>
              <ul className="space-y-3 w-full">
                <li className="text-gray-600 text-base font-normal">Well Being Programmes</li>
                <li className="text-gray-600 text-base font-normal">Code of Conduct Training</li>
                <li className="text-gray-600 text-base font-normal">Mental Health Training</li>
                <li className="text-gray-600 text-base font-normal">Inclusion at Work Place</li>
                <li className="text-gray-600 text-base font-normal">LGBTQIA++ Inclusion</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}