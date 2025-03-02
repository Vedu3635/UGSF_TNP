import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  Link,
  Linkedin,
  Twitter,
  Edit,
  ChevronDown,
  Award,
} from "lucide-react";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "James Wilson",
    headline: "Software Engineer at Google",
    location: "San Francisco, CA",
    imageUrl: null, // Will use initials instead
    contact: {
      email: "james.wilson@example.com",
      phone: "+1 (555) 123-4567",
      website: "jameswilson.dev",
      linkedin: "linkedin.com/in/jameswilson",
      twitter: "twitter.com/jameswilson",
    },
    about:
      "Experienced software engineer with a passion for building scalable web applications. I specialize in React, Node.js, and cloud infrastructure. During my time at University, I was part of the Computer Science Club and participated in several hackathons.",
    education: [
      {
        degree: "BS in Computer Science",
        school: "University of Technology",
        year: "2016 - 2020",
        achievements: "Dean's List, President of CS Club",
      },
    ],
    experience: [
      {
        title: "Software Engineer",
        company: "Google",
        location: "San Francisco, CA",
        period: "Jan 2022 - Present",
        description: "Working on Cloud infrastructure and developer tools.",
      },
      {
        title: "Frontend Developer",
        company: "Startupify",
        location: "Remote",
        period: "Jun 2020 - Dec 2021",
        description:
          "Built and maintained the company's main SaaS product using React and TypeScript.",
      },
    ],
    skills: [
      "React",
      "JavaScript",
      "Node.js",
      "Cloud",
      "TypeScript",
      "Python",
      "UI/UX",
      "DevOps",
    ],
    mentorship: {
      available: true,
      areas: [
        "Career guidance",
        "Technical interview prep",
        "React development",
      ],
    },
    testimonial:
      "My time at University shaped my career and gave me the foundation I needed to succeed in tech. The professors and peers challenged me to grow beyond my comfort zone.",
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Header - would be shared across pages */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">Alumni Portal</h1>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              JW
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="px-6 pb-6 relative">
            {/* Profile picture */}
            <div className="absolute -top-12">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                JW
              </div>
            </div>

            {/* Profile actions - positioned to the right */}
            <div className="flex justify-end mb-8">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium mt-4">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>

            {/* Profile info */}
            <div>
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-gray-600 mt-1">{profileData.headline}</p>
              <div className="flex items-center text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{profileData.location}</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">{profileData.contact.email}</span>
                </a>
                <a
                  href={`tel:${profileData.contact.phone}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  <span className="text-sm">{profileData.contact.phone}</span>
                </a>
                <a
                  href={`https://${profileData.contact.linkedin}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Linkedin className="h-4 w-4 mr-1" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                {profileData.contact.website && (
                  <a
                    href={`https://${profileData.contact.website}`}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <Link className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {profileData.contact.website}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* About section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{profileData.about}</p>
            </div>

            {/* Experience section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Experience</h2>
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-gray-200 pl-4 ml-2"
                  >
                    <div className="absolute -ml-6 mt-1 h-4 w-4 rounded-full bg-blue-600"></div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-gray-600">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-md">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-gray-500 text-sm">{edu.year}</p>
                      {edu.achievements && (
                        <p className="text-gray-700 mt-1 flex items-center">
                          <Award className="h-4 w-4 text-yellow-500 mr-1" />
                          {edu.achievements}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                University Testimonial
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 italic">
                  "{profileData.testimonial}"
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Skills section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentorship section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Mentorship</h2>
              {profileData.mentorship.available ? (
                <>
                  <div className="flex items-center mb-4">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-600 font-medium">
                      Available for mentorship
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">Areas of mentorship:</p>
                  <ul className="space-y-1">
                    {profileData.mentorship.areas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
                    Request Mentorship
                  </button>
                </>
              ) : (
                <p className="text-gray-500">
                  Not available for mentorship at this time.
                </p>
              )}
            </div>

            {/* Similar Alumni section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Connect with Similar Alumni
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-gray-600">
                        Software Engineer at Meta
                      </p>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 text-blue-600 text-sm font-medium">
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
