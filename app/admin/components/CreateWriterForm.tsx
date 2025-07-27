'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  UserPlus, 
  X, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  AtSign,
  Briefcase,
  Award,
  Star
} from 'lucide-react';

interface CreateWriterFormProps {
  onClose: () => void;
  onWriterCreated: (writer: any) => void;
}

export default function CreateWriterForm({ onClose, onWriterCreated }: CreateWriterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    fullName: '',
    specialization: '',
    experienceLevel: 'Beginner',
    role: 'writer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        onWriterCreated(data);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Failed to create writer');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate username from name if not provided
  const generateUsername = () => {
    if (!formData.username && formData.name) {
      const username = formData.name.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      handleInputChange('username', username);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-md border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Writer Created Successfully!</h3>
              <p className="text-slate-600">The writer account has been created and can now log in.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Create New Writer</CardTitle>
                <CardDescription className="text-slate-600">Add a new writer to the platform</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter writer's full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={generateUsername}
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-700 flex items-center">
                <AtSign className="w-4 h-4 mr-2" />
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter unique username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500">This will be used for login</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter writer's email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter a secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  minLength={8}
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </Button>
              </div>
              <p className="text-xs text-slate-500">Password must be at least 8 characters long</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-sm font-medium text-slate-700 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Specialization
              </Label>
              <Input
                id="specialization"
                type="text"
                placeholder="e.g., Technology, Business, Lifestyle"
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel" className="text-sm font-medium text-slate-700 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Experience Level
              </Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="Advanced">Advanced (5-10 years)</SelectItem>
                  <SelectItem value="Expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-slate-700 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="writer">Writer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.username}
              >
                {isLoading ? 'Creating...' : 'Create Writer'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 