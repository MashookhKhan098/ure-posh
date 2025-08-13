'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, Download, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Poster {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  status: string;
  featured: boolean;
  download_count: number;
  view_count: number;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function AdminPostersPage() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    tags: '',
    price: '',
    featured: false,
    status: 'active'
  });

  useEffect(() => {
    fetchPosters();
    fetchCategories();
  }, []);

  const fetchPosters = async () => {
    try {
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosters(data || []);
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('poster_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreatePoster = async () => {
    try {
      const { data, error } = await supabase
        .from('posters')
        .insert({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          price: parseFloat(formData.price),
          featured: formData.featured,
          status: formData.status
        })
        .select()
        .single();

      if (error) throw error;

      setPosters([data, ...posters]);
      setShowCreateDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error creating poster:', error);
      alert('Failed to create poster');
    }
  };

  const handleUpdatePoster = async () => {
    if (!editingPoster) return;

    try {
      const { data, error } = await supabase
        .from('posters')
        .update({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          price: parseFloat(formData.price),
          featured: formData.featured,
          status: formData.status
        })
        .eq('id', editingPoster.id)
        .select()
        .single();

      if (error) throw error;

      setPosters(posters.map(p => p.id === editingPoster.id ? data : p));
      setEditingPoster(null);
      resetForm();
    } catch (error) {
      console.error('Error updating poster:', error);
      alert('Failed to update poster');
    }
  };

  const handleDeletePoster = async (id: string) => {
    if (!confirm('Are you sure you want to delete this poster?')) return;

    try {
      const { error } = await supabase
        .from('posters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosters(posters.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting poster:', error);
      alert('Failed to delete poster');
    }
  };

  const handleEdit = (poster: Poster) => {
    setEditingPoster(poster);
    setFormData({
      title: poster.title,
      description: poster.description,
      image_url: poster.image_url,
      category: poster.category,
      tags: poster.tags.join(', '),
      price: poster.price.toString(),
      featured: poster.featured,
      status: poster.status
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: '',
      tags: '',
      price: '',
      featured: false,
      status: 'active'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Posters</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Poster
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Poster</DialogTitle>
            </DialogHeader>
            <PosterForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleCreatePoster}
              onCancel={() => setShowCreateDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.map((poster) => (
          <Card key={poster.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={poster.image_url}
                alt={poster.title}
                className="w-full h-48 object-cover"
              />
              {poster.featured && (
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge className={`absolute top-2 left-2 ${
                poster.status === 'active' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}>
                {poster.status}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{poster.title}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{poster.description}</p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  {poster.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  {poster.view_count}
                  <Download className="w-4 h-4" />
                  {poster.download_count}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-green-600">
                  ₹{poster.price}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(poster)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePoster(poster.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {poster.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingPoster} onOpenChange={() => setEditingPoster(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Poster</DialogTitle>
          </DialogHeader>
          <PosterForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            onSubmit={handleUpdatePoster}
            onCancel={() => setEditingPoster(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface PosterFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: Category[];
  onSubmit: () => void;
  onCancel: () => void;
}

function PosterForm({ formData, setFormData, categories, onSubmit, onCancel }: PosterFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter poster title"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter poster description"
        />
      </div>
      
      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="Enter image URL"
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Enter tags separated by commas"
        />
      </div>
      
      <div>
        <Label htmlFor="price">Price (₹)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="Enter price"
        />
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured Poster</Label>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={onSubmit} className="flex-1">
          Save
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
