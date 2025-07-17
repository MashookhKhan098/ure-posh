"use client";

import React, { useState } from "react";

const topImages = [
  "/images/aarushi.jpg",
  "/images/abhijeet.jpg",
  "/images/abhilash.jpg",
  "/images/abhileen.jpg",
  // "/images/team5.jpg",
  // "/images/team6.jpg",
];

const allMembers = [
  {
    name: "Aarushi Jain",
    role: "Partner (Head - Media, Education & Gaming)",
    department: "General Corporate",
    sector: "Media",
    location: "Mumbai",
    email: "aarushi.jain@example.com",
    linkedin: "https://www.linkedin.com/in/aarushijain",
    image: "/images/aarushi.jpg",
  },
  {
    name: "Abhijeet Das",
    role: "Partner",
    department: "Insolvency & Bankruptcy",
    sector: "Banking",
    location: "Delhi",
    email: "abhijeet.das@example.com",
    linkedin: "https://www.linkedin.com/in/abhijeetdas",
    image: "/images/abhijeet.jpg",
  },
  {
    name: "Abhilash Pillai",
    role: "Partner",
    department: "Real Estate",
    sector: "Construction",
    location: "Mumbai",
    email: "abhilash.pillai@example.com",
    linkedin: "https://www.linkedin.com/in/abhilashpillai",
    image: "/images/abhilash.jpg",
  },
  {
    name: "Abhileen Chaturvedi",
    role: "Partner",
    department: "Disputes",
    sector: "Litigation",
    location: "Bangalore",
    email: "abhileen.chaturvedi@example.com",
    linkedin: "https://www.linkedin.com/in/abhileenchaturvedi",
    image: "/images/abhileen.jpg",
  },
];

export default function PeoplePage() {
  const [search, setSearch] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredMembers = allMembers.filter((member) => {
    return (
      member.name.toLowerCase().includes(search.toLowerCase()) &&
      (practiceArea ? member.department === practiceArea : true) &&
      (sector ? member.sector === sector : true) &&
      (location ? member.location === location : true)
    );
  });

  const clearFilters = () => {
    setPracticeArea("");
    setSector("");
    setLocation("");
    setSearch("");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ✅ FULL-WIDTH IMAGE STRIP WITHOUT GAPS */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-14">
  {topImages.map((src, idx) => (
    <div
      key={idx}
      className="bg-white shadow-md rounded-lg p-2 flex justify-center items-center"
    >
      <img
        src={src}
        alt={`team-${idx}`}
        className="max-h-[300px] w-auto object-contain rounded-md"
      />
    </div>
  ))}
</div>




      {/* ✅ PURPLE TITLE BAR (Centered) */}
      <div className="bg-purple-800 text-white text-center text-3xl font-bold py-6 mt-0">
        People
      </div>

      {/* ✅ DESCRIPTION */}
      <section className="py-10 text-center px-4">
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Our lawyers have an unmatched combination of academic pedigree,
          technical skills and an ahead-of-the-curve mindset, allowing them to
          deliver complex, innovative solutions to our clients.
        </p>
      </section>

      {/* ✅ SEARCH BAR */}
      <div className="flex justify-center mb-10 px-4">
        <input
          type="text"
          placeholder="Search people by name, service and location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 lg:w-1/2 border px-5 py-3 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
        {/* ✅ LEFT FILTERS */}
        <aside className="space-y-5 md:sticky md:top-10 self-start border rounded-md p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-purple-900 mb-4">
            Find Lawyers
          </h2>
          <select
            value={practiceArea}
            onChange={(e) => setPracticeArea(e.target.value)}
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          >
            <option value="">Select Practice Area</option>
            <option value="General Corporate">General Corporate</option>
            <option value="Insolvency & Bankruptcy">Insolvency & Bankruptcy</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Disputes">Disputes</option>
          </select>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          >
            <option value="">Select Sector</option>
            <option value="Media">Media</option>
            <option value="Banking">Banking</option>
            <option value="Construction">Construction</option>
            <option value="Litigation">Litigation</option>
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          >
            <option value="">Select Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md mt-4"
          >
            Clear Filters
          </button>
        </aside>

        {/* ✅ RIGHT SIDE - Lawyer Cards */}
        <section className="md:col-span-3">
          {filteredMembers.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No results found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.slice(0, visibleCount).map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded-md shadow hover:shadow-lg transition p-3"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover rounded-md"
                  />
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-sm text-purple-700 font-medium">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {member.department}
                    </p>
                    <div className="mt-3 text-sm space-y-1">
                      <a
                        href={`mailto:${member.email}`}
                        className="block text-blue-600 hover:underline"
                      >
                        {member.email}
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ✅ Load More Button */}
          {visibleCount < filteredMembers.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
