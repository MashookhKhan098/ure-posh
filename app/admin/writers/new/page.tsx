"use client";

import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddWriterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    field_allotted: '',
    expertise: '',
    phone: '',
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.username || !form.password) {
      setError('Name, username and password are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to create writer');
      }
      router.replace('/admin/dashboard?tab=writers');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-6">
      <div className="max-w-3xl mx-auto lg:ml-auto lg:mr-0">
        <div className="flex items-center justify-start mb-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 border border-pink-200 text-pink-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 p-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">Add Writer</h1>
          <p className="text-sm text-gray-600 mb-4">Create a new writer account with assigned fields</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="unique handle"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="secure password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Allotted</label>
                <input
                  type="text"
                  value={form.field_allotted}
                  onChange={(e) => handleChange('field_allotted', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="Technology, Sports, Politics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                <input
                  type="text"
                  value={form.expertise}
                  onChange={(e) => handleChange('expertise', e.target.value)}
                  className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                  placeholder="Comma-separated areas"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={2}
                value={form.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black resize-none"
                placeholder="Brief bio about the writer"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 rounded-xl bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 disabled:opacity-70"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Creating...' : 'Create Writer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}


