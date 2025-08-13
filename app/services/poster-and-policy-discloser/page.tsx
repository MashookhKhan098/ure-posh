"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Star, Shield, FileText, Users, Award, ShoppingCart, Heart, Eye, Search, Filter, TrendingUp, Zap, Clock, Download, X, CreditCard, Wallet, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
// Temporarily disabled QRCode import to fix 500 error
// import QRCode from 'qrcode'

export default function PosterAndPolicyDiscloserPage() {
  const [cartItems, setCartItems] = useState<{id: number, quantity: number}[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showCart, setShowCart] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending')
  const [upiDetails, setUpiDetails] = useState({
    upiId: '9871586017@pthdfc',
    merchantName: 'Ureposh',
    amount: 0,
    transactionId: '',
    qrCodeData: '',
    qrCodeUrl: '/images/image.png'
  })
  const [showUpiPayment, setShowUpiPayment] = useState(false)
  const [paymentTimer, setPaymentTimer] = useState(300) // 5 minutes
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'browse' | 'downloads'>('browse')
  const [downloadedPosters, setDownloadedPosters] = useState([
    {
      id: 1,
      name: "POSH Policy Compliance Poster",
      price: 299,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      downloadUrl: "/api/posters/1/download?order=TXN_123456789",
      downloadExpiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
      purchasedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      transactionId: "TXN_123456789",
      downloadCount: 2,
      maxDownloads: 5
    },
    {
      id: 2,
      name: "Women's Safety Guidelines Poster",
      price: 249,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      downloadUrl: "/api/posters/2/download?order=TXN_987654321",
      downloadExpiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      purchasedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      transactionId: "TXN_987654321",
      downloadCount: 1,
      maxDownloads: 5
    },
    {
      id: 5,
      name: "Women's Empowerment Poster",
      price: 349,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      downloadUrl: "/api/posters/5/download?order=TXN_456789123",
      downloadExpiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      purchasedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      transactionId: "TXN_456789123",
      downloadCount: 3,
      maxDownloads: 5
    }
  ])

  // Function to add newly purchased poster to downloads
  const addToDownloads = (product: any, customerDetails: any) => {
    const newPoster = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      downloadUrl: `/api/posters/${product.id}/download?order=TXN_${Date.now()}`,
      downloadExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      purchasedAt: new Date(),
      transactionId: `TXN_${Date.now()}`,
      downloadCount: 0,
      maxDownloads: 5
    }
    
    setDownloadedPosters(prev => [newPoster, ...prev])
  }

  const posterProducts = [
    {
      id: 1,
      name: "POSH Policy Compliance Poster",
      price: 299,
      originalPrice: 499,
      discount: 40,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      description: "Professional POSH policy poster for workplace compliance",
      features: ["A3 Size", "Print Ready", "Legal Compliant", "Digital Download"],
      category: "Policy",
      inStock: true,
      fastDelivery: true,
      featured: true
    },
    {
      id: 2,
      name: "Women's Safety Guidelines Poster",
      price: 249,
      originalPrice: 399,
      discount: 38,
      rating: 4.3,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      description: "Clear women's safety guidelines for workplace display",
      features: ["A2 Size", "High Quality", "Bilingual", "Instant Download"],
      category: "Safety",
      inStock: true,
      fastDelivery: true,
      featured: true
    },
    {
      id: 3,
      name: "Gender Equality Rights Poster",
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      description: "Comprehensive gender equality rights and responsibilities guide",
      features: ["A3 Size", "Colorful Design", "Easy to Read", "PDF Format"],
      category: "Equality",
      inStock: true,
      fastDelivery: false,
      featured: false
    },
    {
      id: 4,
      name: "Workplace Safety for Women",
      price: 179,
      originalPrice: 249,
      discount: 28,
      rating: 4.2,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "Essential workplace safety guidelines for women employees",
      features: ["A4 Size", "Safety Focused", "Visual Icons", "Print Ready"],
      category: "Safety",
      inStock: false,
      fastDelivery: true,
      featured: false
    },
    {
      id: 5,
      name: "Women's Empowerment Poster",
      price: 349,
      originalPrice: 599,
      discount: 42,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      description: "Promote women's empowerment and leadership in your workplace",
      features: ["A2 Size", "Modern Design", "Inclusive Language", "High Resolution"],
      category: "Empowerment",
      inStock: true,
      fastDelivery: true,
      featured: true
    },
    {
      id: 6,
      name: "Anti-Discrimination Policy Display",
      price: 399,
      originalPrice: 699,
      discount: 43,
      rating: 4.6,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1523240797358-5bbd9f0c3b0d?w=800&h=600&fit=crop",
      description: "Professional anti-discrimination policy for organizational display",
      features: ["A1 Size", "Premium Quality", "Customizable", "Legal Review"],
      category: "Policy",
      inStock: true,
      fastDelivery: false,
      featured: false
    },
    {
      id: 7,
      name: "Women's Rights Awareness Poster",
      price: 229,
      originalPrice: 349,
      discount: 34,
      rating: 4.4,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop",
      description: "Raise awareness about women's rights and gender equality",
      features: ["A3 Size", "Eye-catching Design", "Educational Content", "High Quality"],
      category: "Equality",
      inStock: true,
      fastDelivery: true,
      featured: false
    },
    {
      id: 8,
      name: "Workplace Harassment Prevention",
      price: 279,
      originalPrice: 399,
      discount: 30,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      description: "Comprehensive workplace harassment prevention guidelines",
      features: ["A2 Size", "Clear Guidelines", "Professional Design", "Legal Compliant"],
      category: "Safety",
      inStock: true,
      fastDelivery: true,
      featured: true
    },
    {
      id: 9,
      name: "Equal Pay Advocacy Poster",
      price: 189,
      originalPrice: 279,
      discount: 32,
      rating: 4.3,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      description: "Advocate for equal pay and fair compensation practices",
      features: ["A4 Size", "Modern Design", "Clear Messaging", "Print Ready"],
      category: "Equality",
      inStock: true,
      fastDelivery: false,
      featured: false
    }
  ]

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Policy', value: 'Policy' },
    { name: 'Safety', value: 'Safety' },
    { name: 'Equality', value: 'Equality' },
    { name: 'Empowerment', value: 'Empowerment' }
  ]

  const addToCart = (productId: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId)
      if (existingItem) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const getCartItem = (productId: number) => {
    return cartItems.find(item => item.id === productId)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = posterProducts.find(p => p.id === item.id)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product)
    setShowPurchaseDialog(true)
  }

  const handlePurchase = async () => {
    if (!selectedProduct) return
    
    if (selectedPaymentMethod === 'upi') {
      // Initialize UPI payment
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const amount = selectedProduct.price
      const qrCodeData = `upi://pay?pa=${upiDetails.upiId}&pn=${upiDetails.merchantName}&am=${amount}&tn=${transactionId}&cu=INR`
      
      setUpiDetails(prev => ({
        ...prev,
        amount,
        transactionId,
        qrCodeData
      }))
      
      setShowUpiPayment(true)
      setShowPurchaseDialog(false)
      startPaymentTimer()
      return
    }
    
    // For other payment methods, proceed with existing logic
    setPurchaseLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const downloadUrl = `/api/posters/${selectedProduct.id}/download?order=${transactionId}`
      
      addToDownloads(selectedProduct, customerDetails)
      
      setPurchaseResult({
        transactionId,
        downloadUrl,
        product: selectedProduct,
        customerDetails
      })
      
      setShowSuccessDialog(true)
      setShowPurchaseDialog(false)
      
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Purchase failed. Please try again.')
    } finally {
      setPurchaseLoading(false)
    }
  }

  // UPI Payment Functions
  const startPaymentTimer = () => {
    setPaymentTimer(300) // 5 minutes
    const interval = setInterval(() => {
      setPaymentTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setPaymentStatus('failed')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const generateQRCode = async (data: string) => {
    try {
      // Return the static QR code image from public folder
      return '/images/image.png'
    } catch (error) {
      console.error('QR code generation error:', error)
      return '/images/image.png'
    }
  }

  const verifyPayment = async () => {
    setPaymentStatus('processing')
    
    try {
      // Simulate payment verification
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // In real implementation, this would call your backend to verify payment
      const isPaymentSuccessful = Math.random() > 0.3 // 70% success rate for demo
      
      if (isPaymentSuccessful) {
        setPaymentStatus('completed')
        
        // Add to downloads
        addToDownloads(selectedProduct!, customerDetails)
        
        // Set purchase result
        setPurchaseResult({
          transactionId: upiDetails.transactionId,
          downloadUrl: `/api/posters/${selectedProduct!.id}/download?order=${upiDetails.transactionId}`,
          product: selectedProduct,
          customerDetails
        })
        
        // Show success dialog after a delay
        setTimeout(() => {
          setShowUpiPayment(false)
          setShowSuccessDialog(true)
        }, 2000)
        
      } else {
        setPaymentStatus('failed')
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      setPaymentStatus('failed')
    }
  }

  const cancelUpiPayment = () => {
    setShowUpiPayment(false)
    setPaymentStatus('pending')
    setPaymentTimer(300)
    setShowPurchaseDialog(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  // Filter and sort products
  const filteredProducts = posterProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 mt-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">100% Legal Compliant</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Women's Rights
              </span>
              <br />
              <span className="text-white">
                & Safety Posters
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Professional, legally compliant posters designed to promote women's rights and workplace safety. 
              <span className="block text-blue-100 font-medium mt-2">
                Instant download • Print ready • Premium quality
              </span>
            </p>
            
            {/* Search and Filter Section */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <Input
                    placeholder="Search for posters, policies, or safety guidelines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-xl text-lg focus:bg-white/20 focus:border-white/40 transition-all"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white rounded-xl py-3 text-lg">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button 
                  className="w-full lg:w-auto bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl text-lg font-semibold transition-all"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Posters
                </button>
              </div>
            </div>
            

          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity="0.25" 
              className="fill-white"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity="0.5" 
              className="fill-white"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-white"
            />
          </svg>
        </div>
      </div>



      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Browse Posters ({posterProducts.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'downloads'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                My Downloads ({downloadedPosters.length})
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'browse' ? (
        <>
          {/* Filters and Sort */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">
                    {sortedProducts.length} poster{sortedProducts.length !== 1 ? 's' : ''} found
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Women's Rights Focus
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={showCart} onOpenChange={setShowCart}>
                    <DialogTrigger asChild>
                        <button className="px-6">
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Cart ({getCartCount()})
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Shopping Cart</DialogTitle>
                        <DialogDescription>
                          Review your selected posters
                        </DialogDescription>
                      </DialogHeader>
                      
                      {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                          <p className="text-gray-500">Add some posters to get started!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map((item) => {
                            const product = posterProducts.find(p => p.id === item.id)
                            if (!product) return null
                            
                            return (
                              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{product.name}</h4>
                                  <p className="text-sm text-gray-600">₹{product.price}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      className="px-6"
                                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                    >
                                      -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                      className="px-6"
                                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                    >
                                      +
                                    </button>
                                    <button
                                      className="px-6"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">₹{product.price * item.quantity}</p>
                                </div>
                              </div>
                            )
                          })}
                          
                          <Separator />
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-lg font-semibold">Total: ₹{getCartTotal()}</p>
                              <p className="text-sm text-gray-600">{getCartCount()} items</p>
                            </div>
                            <button 
                              onClick={() => {
                                setShowCart(false)
                                setShowPurchaseDialog(true)
                              }}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Checkout
                            </button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                  <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 p-0 rounded-full shadow-lg">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 p-0 rounded-full shadow-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    {product.discount > 0 && (
                      <Badge className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                        {product.discount}% OFF
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-white bg-gray-800 px-4 py-2 text-base">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{product.price}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Price Comparison */}
                      {product.originalPrice > product.price && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="text-sm text-green-600 font-semibold">
                          Save ₹{product.originalPrice - product.price}
                        </span>
                      </div>
                    )}

                    {/* Delivery Info */}
                    <div className="flex items-center justify-between mb-4">
                      {product.fastDelivery && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Fast Delivery
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">Free delivery</span>
                    </div>
                  </CardContent>
                  
                  <CardContent className="pt-2">
                                     <div className="flex gap-3">
                       {getCartItem(product.id) ? (
                         <div className="flex-1 flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                           <Check className="w-4 h-4 text-green-600" />
                           <span className="text-sm text-green-700 font-medium">
                             In Cart ({getCartItem(product.id)?.quantity})
                           </span>
                         </div>
                       ) : (
                      <button 
                        onClick={() => addToCart(product.id)}
                           className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={!product.inStock}
                      >
                           <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                       )}
                      <button 
                         onClick={() => handleBuyNow(product)}
                         className="px-6"
                        disabled={!product.inStock}
                      >
                         <Download className="w-4 h-4 mr-2" />
                        Buy Now
                        </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No posters found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Downloads Section */}
          <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">My Downloads</h2>
                <p className="text-lg text-gray-600">
                  Access all your purchased posters. Download them anytime within the validity period.
                </p>
              </div>

              {downloadedPosters.length === 0 ? (
                <div className="text-center py-16">
                  <Download className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No downloads yet</h3>
                  <p className="text-gray-500 mb-6">Purchase some posters to see them here</p>
                  <button 
                    onClick={() => setActiveTab('browse')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Browse Posters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {downloadedPosters.map((poster) => {
                    const daysLeft = Math.ceil((poster.downloadExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    const isExpired = daysLeft <= 0
                    const isExpiringSoon = daysLeft <= 2
                    
                    return (
                      <Card key={poster.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                        <div className="relative">
                          <img
                            src={poster.image}
                            alt={poster.name}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Status Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {isExpired ? (
                              <Badge className="bg-red-500 text-white">
                                <Clock className="w-3 h-3 mr-1" />
                                Expired
                              </Badge>
                            ) : isExpiringSoon ? (
                              <Badge className="bg-orange-500 text-white">
                                <Clock className="w-3 h-3 mr-1" />
                                Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500 text-white">
                                <Check className="w-3 h-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-white/90 text-gray-700">
                              <Download className="w-3 h-3 mr-1" />
                              {poster.downloadCount}/{poster.maxDownloads}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg line-clamp-2">{poster.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            Purchased for ₹{poster.price}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {/* Purchase Info */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction ID:</span>
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {poster.transactionId.slice(-8)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Purchased:</span>
                              <span>{poster.purchasedAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Downloads:</span>
                              <span>{poster.downloadCount} of {poster.maxDownloads}</span>
                            </div>
                          </div>

                          {/* Validity Info */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            {isExpired ? (
                              <div className="text-center text-red-600">
                                <Clock className="w-4 h-4 mx-auto mb-1" />
                                <p className="text-sm font-medium">Download link expired</p>
                                <p className="text-xs">Contact support for renewal</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Clock className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                                <p className="text-sm font-medium text-gray-900">
                                  Valid for {daysLeft} more day{daysLeft !== 1 ? 's' : ''}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Expires on {poster.downloadExpiresAt.toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button 
                              onClick={() => window.open(poster.downloadUrl, '_blank')}
                              disabled={isExpired || poster.downloadCount >= poster.maxDownloads}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {isExpired ? 'Expired' : poster.downloadCount >= poster.maxDownloads ? 'Limit Reached' : 'Download'}
                            </button>
                            
                            <button 
                              className="px-4"
                              onClick={() => {
                                // Copy download link to clipboard
                                navigator.clipboard.writeText(poster.downloadUrl)
                                alert('Download link copied to clipboard!')
                              }}
                            >
                              <Link className="w-4 h-4" href={poster.downloadUrl} />
                              </button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Please provide your details to complete the purchase
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{selectedProduct.name}</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-bold text-green-600">₹{selectedProduct.price}</span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-sm text-gray-500 line-through">₹{selectedProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-4">
                <h4 className="font-semibold">Customer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h4 className="font-semibold">Payment Method</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod('upi')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-lg">UPI Payment</h5>
                        <p className="text-gray-600">Pay securely using UPI apps like Google Pay, PhonePe, Paytm</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            Instant Payment
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Shield className="w-3 h-3 mr-1" />
                            Secure
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions, including the poster usage policy and download limitations.
                  </Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowPurchaseDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={purchaseLoading || !customerDetails.name || !customerDetails.email || selectedPaymentMethod !== 'upi'}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
                >
                  {purchaseLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* UPI Payment Dialog */}
      <Dialog open={showUpiPayment} onOpenChange={setShowUpiPayment}>
        <DialogContent className="max-w-4xl">
          <DialogHeader className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">UPI Payment</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Complete your payment securely
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - QR Code */}
            <div className="space-y-4">
              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Amount: ₹{upiDetails.amount}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">
                    {upiDetails.transactionId.slice(-8)}
                  </span>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 inline-block">
                  <img 
                    src="/images/image.png" 
                    alt="UPI QR Code"
                    className="w-40 h-40 mx-auto object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">📱 Scan with any UPI app</p>
              </div>

              {/* UPI ID */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Pay to UPI ID:</p>
                <p className="text-lg font-mono font-bold text-blue-700">
                  {upiDetails.upiId}
                </p>
                <p className="text-xs text-gray-500">{upiDetails.merchantName}</p>
              </div>
            </div>

            {/* Right Side - Text & Controls */}
            <div className="space-y-4">
              {/* Auto Payment Status */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Auto Payment Detection</h3>
                    <p className="text-sm text-green-600">We'll automatically detect your payment</p>
                  </div>
                </div>
                
                {paymentStatus === 'pending' && (
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-yellow-700">Waiting for Payment</span>
                      </div>
                    </div>
                                  <div className="mt-2 text-xs text-gray-500">
                Time remaining: {Math.floor(paymentTimer / 60)}:{(paymentTimer % 60).toString().padStart(2, '0')}
              </div>
                  </div>
                )}

                {paymentStatus === 'processing' && (
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-blue-700">Verifying Payment</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentStatus === 'completed' && (
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-700">Payment Successful!</span>
                      </div>
                    </div>
                  </div>
                )}

                                {paymentStatus === 'failed' && (
                  <div className="bg-white rounded-lg p-3 border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-red-700">Payment Failed</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {paymentStatus === 'pending' && (
                <div className="space-y-3">
                  <button
                    onClick={verifyPayment}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    I've Made the Payment
                  </button>
                  
                  <button
                    onClick={cancelUpiPayment}
                    className="w-full"
                  >
                    Cancel Payment
                  </button>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <FileText className="w-3 h-3 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-800">Quick Steps:</h4>
                </div>
                <div className="space-y-2 text-sm text-amber-700">
                  <div>1. Open any UPI app</div>
                  <div>2. Scan the QR code</div>
                  <div>3. Verify details & pay</div>
                  <div>4. Wait for auto-detection</div>
                </div>
              </div>
            </div>
          </div>
            {paymentStatus === 'pending' && (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 mb-2">Waiting for payment...</p>
                <p className="text-sm text-gray-500">
                  Time remaining: {Math.floor(paymentTimer / 60)}:{(paymentTimer % 60).toString().padStart(2, '0')}
                </p>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Verifying payment...</p>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-semibold">Payment Successful!</p>
                <p className="text-sm text-gray-500">Redirecting to download...</p>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-red-600 font-semibold">Payment Failed</p>
                <p className="text-sm text-gray-500 mb-4">Please try again or contact support</p>
                <Button onClick={cancelUpiPayment} className="px-6" variant="outline" >
                  Try Again
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            {paymentStatus === 'pending' && (
              <div className="space-y-3">
                <button
                  onClick={verifyPayment}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  I've Made the Payment
                </button>
                
                <button
                  onClick={cancelUpiPayment}
                  className="w-full"
                >
                  Cancel Payment
                </button>
              </div>
            )}


          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Purchase Successful! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              Your poster has been purchased and is now available for download.
            </DialogDescription>
          </DialogHeader>
          
          {purchaseResult && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Check className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-700">
                  Transaction ID: <span className="font-mono">{purchaseResult.transactionId}</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.open(purchaseResult.downloadUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Poster
                </button>
                
                <button
                  onClick={() => {
                    setShowSuccessDialog(false)
                    setActiveTab('downloads')
                  }}
                  className="w-full"
                >
                  View My Downloads
                  </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
      
