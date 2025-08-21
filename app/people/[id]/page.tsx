import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import {
  Award,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Shield,
  TrendingUp,
  Target,
  BookOpen,
  Calendar,
} from "lucide-react"

type PageProps = {
  params: { id: string }
}

export const dynamic = "force-dynamic"

export default async function PersonResumePage({ params }: PageProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !data) {
    return notFound()
  }

  const person = {
    ...data,
    expertise: Array.isArray(data.expertise) ? data.expertise : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    education: Array.isArray(data.education) ? data.education : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
    recent_projects: Array.isArray(data.recent_projects) ? data.recent_projects : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className={`relative border-b ${person.color_gradient ? "bg-gradient-to-r " + person.color_gradient : "bg-gradient-to-r from-pink-500 to-rose-600"}`}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white/10 ring-4 ring-white overflow-hidden flex items-center justify-center">
                {person.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={person.image_url} alt={person.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">
                    {person.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              {person.featured && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1 shadow-lg" title="Featured"><Award className="h-5 w-5" /></span>
              )}
              {person.verified && (
                <span className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg" title="Verified"><CheckCircle className="h-5 w-5" /></span>
              )}
            </div>
            <div className="text-white flex-1">
              <h1 className="text-3xl font-extrabold leading-tight">{person.name}</h1>
              <p className="text-white/90 text-lg font-semibold mt-1">{person.title}</p>
              <p className="text-white/80 text-sm mt-1">{person.specialization}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-300" /><span className="font-semibold">{person.rating}</span><span className="opacity-80">({person.review_count})</span></div>
                <div className="flex items-center gap-1"><TrendingUp className="h-4 w-4 text-green-200" /><span>{person.projects} projects</span></div>
                <div className="flex items-center gap-1"><Shield className="h-4 w-4 text-blue-200" /><span>{person.completion_rate}% success</span></div>
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4 text-white/90" /><span>{person.experience}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <aside className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700"><Mail className="h-4 w-4 text-pink-600" /><span>{person.email}</span></div>
              {person.phone && (<div className="flex items-center gap-2 text-gray-700"><Phone className="h-4 w-4 text-pink-600" /><span>{person.phone}</span></div>)}
              <div className="flex items-center gap-2 text-gray-700"><MapPin className="h-4 w-4 text-pink-600" /><span>{person.location}</span></div>
              {person.website && (<div className="flex items-center gap-2 text-gray-700"><Globe className="h-4 w-4 text-pink-600" /><span>{person.website}</span></div>)}
            </div>
          </section>

          {person.languages.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {person.languages.map((lang: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-full text-sm font-medium">{lang}</span>
                ))}
              </div>
            </section>
          )}

          {person.skills.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
              <div className="space-y-3">
                {person.skills.map((skill: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 font-medium">{skill.name}</span><span className="text-pink-600 font-bold">{skill.level}%</span></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main */}
        <main className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3"><div className="bg-pink-500 rounded-xl p-2"><BookOpen className="h-5 w-5 text-white" /></div><h2 className="text-xl font-bold text-gray-900">Professional Summary</h2></div>
            <p className="text-gray-700 leading-relaxed">{person.detailed_description || person.description}</p>
          </section>

          {person.expertise.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3"><div className="bg-purple-500 rounded-xl p-2"><Target className="h-5 w-5 text-white" /></div><h2 className="text-xl font-bold text-gray-900">Core Expertise</h2></div>
              <div className="flex flex-wrap gap-2">
                {person.expertise.map((skill: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-full text-sm font-medium border border-pink-200">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {person.education.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
              <div className="space-y-3">
                {person.education.map((edu: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between border-b last:border-b-0 border-gray-100 pb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{edu.degree}</p>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {person.certifications.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Certifications</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {person.certifications.map((c: string, idx: number) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {person.recent_projects.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Recent Projects</h2>
              <div className="space-y-3">
                {person.recent_projects.map((proj: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-gray-900">{proj.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${proj.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>{proj.status}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-0.5">{proj.client}</p>
                    <p className="text-gray-500 text-sm">{proj.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {person.achievements.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Achievements</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {person.achievements.map((a: string, idx: number) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}


