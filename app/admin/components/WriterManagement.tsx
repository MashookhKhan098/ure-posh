'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  AtSign,
  Briefcase,
  Award,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  Star,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';

interface Writer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  postsCount: number;
  joinDate: string;
  lastActive: string;
}

interface WriterProfile {
  writer_id: string;
  username: string;
  email: string;
  full_name: string;
  specialization: string;
  experience_level: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

interface WritersData {
  users: Writer[];
  writerProfiles: WriterProfile[];
}

export default function WriterManagement() {
  const [writersData, setWritersData] = useState<WritersData>({ users: [], writerProfiles: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedWriter, setSelectedWriter] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWriters();
  }, []);

  const fetchWriters = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/writers');
      if (response.ok) {
              const data = await response.json();
      setWritersData(data);
      } else {
        setError('Failed to fetch writers');
      }
    } catch (error) {
      console.error('Error fetching writers:', error);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWriter = async (writerId: string) => {
    if (!confirm('Are you sure you want to delete this writer? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/writers/${writerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchWriters(); // Refresh the list
      } else {
        setError('Failed to delete writer');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleUpdateWriter = async (writerId: string, updateData: any) => {
    try {
      const response = await fetch(`/api/admin/writers/${writerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        fetchWriters(); // Refresh the list
        setShowEditModal(false);
      } else {
        setError('Failed to update writer');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) {
      return <Badge variant="destructive">Inactive</Badge>;
    }
    if (!isVerified) {
      return <Badge variant="secondary">Pending</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  const filteredWriters = writersData.writerProfiles?.filter(writer => {
    const matchesSearch = 
      (writer.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (writer.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (writer.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && writer.is_active) ||
      (filterStatus === 'inactive' && !writer.is_active) ||
      (filterStatus === 'verified' && writer.is_verified) ||
      (filterStatus === 'unverified' && !writer.is_verified);

    return matchesSearch && matchesFilter;
  }) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading writers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Writer Management</h2>
          <p className="text-slate-600">Manage writer accounts and profiles</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={fetchWriters} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Writers</p>
                <p className="text-2xl font-bold text-blue-900">{writersData.writerProfiles?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Active Writers</p>
                <p className="text-2xl font-bold text-green-900">
                  {writersData.writerProfiles?.filter(w => w.is_active).length || 0}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Verified Writers</p>
                <p className="text-2xl font-bold text-purple-900">
                  {writersData.writerProfiles?.filter(w => w.is_verified).length || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">New This Month</p>
                <p className="text-2xl font-bold text-orange-900">
                  {writersData.writerProfiles?.filter(w => {
                    const created = new Date(w.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length || 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search writers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 border-slate-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Writers</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="unverified">Unverified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writers List */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Writer Profiles</CardTitle>
          <CardDescription>Manage writer accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}



          <div className="space-y-4">
            {filteredWriters.map((writer) => (
              <div key={writer.writer_id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {(writer.full_name || writer.username || 'W').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                                         <div className="flex items-center space-x-2">
                       <h3 className="font-semibold text-slate-900">{writer.full_name || writer.username || 'Unknown Writer'}</h3>
                       {writer.is_verified && <Star className="w-4 h-4 text-yellow-500" />}
                     </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center">
                        <AtSign className="w-3 h-3 mr-1" />
                        {writer.username}
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {writer.email}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {writer.specialization || 'General'}
                      </span>
                      <span className="flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {writer.experience_level}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(writer.is_active, writer.is_verified)}
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedWriter(writer);
                        setShowEditModal(true);
                      }}
                      className="hover:bg-slate-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteWriter(writer.writer_id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWriters.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No writers found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {showEditModal && selectedWriter && (
        <EditWriterModal
          writer={selectedWriter}
          onClose={() => {
            setShowEditModal(false);
            setSelectedWriter(null);
          }}
          onUpdate={handleUpdateWriter}
        />
      )}
    </div>
  );
}

// Edit Writer Modal Component
function EditWriterModal({ writer, onClose, onUpdate }: {
  writer: WriterProfile;
  onClose: () => void;
  onUpdate: (writerId: string, data: any) => void;
}) {
  const [formData, setFormData] = useState({
    full_name: writer.full_name,
    username: writer.username,
    email: writer.email,
    specialization: writer.specialization,
    experience_level: writer.experience_level,
    is_active: writer.is_active,
    is_verified: writer.is_verified
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onUpdate(writer.writer_id, {
        writerProfile: formData
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Edit Writer Profile</CardTitle>
          <CardDescription>Update writer information and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level</Label>
              <Select value={formData.experience_level} onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_verified"
                  checked={formData.is_verified}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_verified: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_verified">Verified</Label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Writer'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 