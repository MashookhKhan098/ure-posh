'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShiprocketPayment } from '../components/ShiprocketPayment';
import { Search, Filter, ShoppingCart, Eye, Download, Star } from 'lucide-react';

// Sample poster data (you can replace this with database data later)
const samplePosters = [
  {
    id: '1',
    title: 'Success Mindset Blueprint',
    description: 'A comprehensive motivational poster designed to inspire success and achievement. Perfect for offices, classrooms, and personal spaces.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    category: 'Motivational',
    tags: ['motivation', 'success', 'mindset', 'achievement'],
    price: 299.00,
    currency: 'INR',
    featured: true,
    download_count: 45,
    view_count: 120,
    status: 'active'
  },
  {
    id: '2',
    title: 'Business Strategy Framework',
    description: 'Professional business strategy poster with modern design elements. Ideal for corporate environments and business meetings.',
    image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    category: 'Business',
    tags: ['business', 'strategy', 'professional', 'corporate'],
    price: 399.00,
    currency: 'INR',
    featured: true,
    download_count: 32,
    view_count: 89,
    status: 'active'
  },
  {
    id: '3',
    title: 'Digital Innovation Hub',
    description: 'Modern technology innovation poster showcasing the future of digital transformation and technological advancement.',
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    category: 'Technology',
    tags: ['technology', 'innovation', 'digital', 'future'],
    price: 349.00,
    currency: 'INR',
    featured: false,
    download_count: 28,
    view_count: 76,
    status: 'active'
  },
  {
    id: '4',
    title: 'Health & Wellness Guide',
    description: 'Comprehensive health and wellness poster promoting healthy lifestyle choices and well-being practices.',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    category: 'Health',
    tags: ['health', 'wellness', 'fitness', 'lifestyle'],
    price: 249.00,
    currency: 'INR',
    featured: false,
    download_count: 38,
    view_count: 95,
    status: 'active'
  },
  {
    id: '5',
    title: 'Creative Design Principles',
    description: 'Artistic and creative design poster featuring modern design principles and creative inspiration.',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    category: 'Artistic',
    tags: ['art', 'design', 'creative', 'inspiration'],
    price: 199.00,
    currency: 'INR',
    featured: true,
    download_count: 52,
    view_count: 134,
    status: 'active'
  },
  {
    id: '6',
    title: 'Sports Excellence',
    description: 'Dynamic sports and fitness poster celebrating athletic achievement and physical excellence.',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    category: 'Sports',
    tags: ['sports', 'fitness', 'athletic', 'excellence'],
    price: 279.00,
    currency: 'INR',
    featured: false,
    download_count: 41,
    view_count: 108,
    status: 'active'
  },
  {
    id: '7',
    title: 'Nature Conservation',
    description: 'Beautiful nature and environmental poster promoting conservation and environmental awareness.',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    category: 'Nature',
    tags: ['nature', 'environment', 'conservation', 'sustainability'],
    price: 229.00,
    currency: 'INR',
    featured: false,
    download_count: 35,
    view_count: 87,
    status: 'active'
  },
  {
    id: '8',
    title: 'Educational Excellence',
    description: 'Comprehensive educational poster designed to inspire learning and academic achievement.',
    image_url: 'https://images.unsplash.com/photo-1523240797358-5bbd9f0c3b0d?w=800&h=600&fit=crop',
    category: 'Educational',
    tags: ['education', 'learning', 'academic', 'knowledge'],
    price: 189.00,
    currency: 'INR',
    featured: false,
    download_count: 29,
    view_count: 73,
    status: 'active'
  }
];

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Motivational', value: 'Motivational' },
  { name: 'Business', value: 'Business' },
  { name: 'Technology', value: 'Technology' },
  { name: 'Health', value: 'Health' },
  { name: 'Artistic', value: 'Artistic' },
  { name: 'Sports', value: 'Sports' },
  { name: 'Nature', value: 'Nature' },
  { name: 'Educational', value: 'Educational' }
];

export default function PostersPage() {
  const [posters, setPosters] = useState(samplePosters);
  const [filteredPosters, setFilteredPosters] = useState(samplePosters);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Filter and sort posters
  useEffect(() => {
    let filtered = posters.filter(poster => poster.status === 'active');

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(poster => poster.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(poster =>
        poster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poster.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poster.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort posters
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => b.download_count - a.download_count);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()));
        break;
    }

    setFilteredPosters(filtered);
  }, [posters, searchTerm, selectedCategory, sortBy]);

  const handlePurchase = (poster) => {
    setSelectedPoster(poster);
    setShowPaymentDialog(true);
  };

  const handlePayment = async (paymentResult) => {
    if (!selectedPoster) return;

    if (paymentResult.success) {
      // Payment successful
      alert(`Order placed successfully! Order ID: ${paymentResult.orderId}`);
      setShowPaymentDialog(false);
      setSelectedPoster(null);
      
      // Update download count
      setPosters(prev => prev.map(p => 
        p.id === selectedPoster.id 
          ? { ...p, download_count: p.download_count + 1 }
          : p
      ));
    } else {
      // Payment failed
      alert(paymentResult.error || 'Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Digital Posters Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              High-quality, inspirational posters for every occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search posters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" />
            <span className="text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-gray-600">
            {filteredPosters.length} poster{filteredPosters.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosters.map((poster) => (
            <Card key={poster.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={poster.image_url}
                  alt={poster.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {poster.featured && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant="secondary" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    {poster.view_count}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    {poster.download_count}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{poster.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {poster.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{poster.category}</Badge>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{poster.price}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {poster.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <Button 
                  onClick={() => handlePurchase(poster)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredPosters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No posters found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPoster && (
            <ShiprocketPayment
              poster={selectedPoster}
              onPayment={handlePayment}
              onCancel={() => setShowPaymentDialog(false)}
              loading={paymentLoading}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
