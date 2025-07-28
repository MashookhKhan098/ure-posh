'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestWriterRequest() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    bio: '',
    expertise: '',
    portfolio: '',
    blockchainWallet: ''
  })
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/writer-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          socialLinks: {
            linkedin: '',
            twitter: '',
            github: ''
          }
        })
      })

      const data = await res.json()
      setResponse({ status: res.status, data })
    } catch (error) {
      setResponse({ status: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const testGet = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/writer-request')
      const data = await res.json()
      setResponse({ status: res.status, data })
    } catch (error) {
      setResponse({ status: 'error', data: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Writer Request API</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Writer Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Expertise</label>
                  <Input
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="Technology, Business, AI"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Portfolio URL</label>
                  <Input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://portfolio.example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Blockchain Wallet</label>
                  <Input
                    name="blockchainWallet"
                    value={formData.blockchainWallet}
                    onChange={handleChange}
                    placeholder="0x1234567890abcdef..."
                  />
                </div>
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response */}
          <Card>
            <CardHeader>
              <CardTitle>API Response</CardTitle>
              <Button onClick={testGet} variant="outline" size="sm">
                Test GET Request
              </Button>
            </CardHeader>
            <CardContent>
              {response && (
                <div className="space-y-4">
                  <div>
                    <strong>Status:</strong> {response.status}
                  </div>
                  <div>
                    <strong>Response:</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-96">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 