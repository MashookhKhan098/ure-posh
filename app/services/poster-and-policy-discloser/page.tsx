"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Star, Shield, ShoppingCart, Heart, Eye, Zap, X, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// ===================== Razorpay Setup =====================
function loadRazorpayScript(src: string) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Razorpay Setup with backend order creation (fix 401 Unauthorized)
async function handleRazorpayPayment({
  amount,
  name,
  email,
  phone,
  productName,
  onSuccess,
}: {
  amount: number,
  name: string,
  email: string,
  phone: string,
  productName: string,
  onSuccess: (paymentId: string) => void
}) {
  // 1. Load Razorpay script
  const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // 2. Create order on backend
  let orderData;
  try {
    const orderRes = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // paise, ensure integer
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
      }),
    });
    orderData = await orderRes.json();
    if (!orderRes.ok || !orderData.orderId) {
      throw new Error(orderData.error || "Failed to create Razorpay order");
    }
  } catch (err: any) {
    alert("Failed to initiate payment: " + (err?.message || "Unknown error"));
    return;
  }

  // 3. Open Razorpay checkout
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourKeyHere", // Use your real Razorpay key here
    amount: orderData.amount,
    currency: orderData.currency,
    name: "Ureposh",
    description: productName,
    image: "/logo.png",
    order_id: orderData.orderId,
    handler: function (response: any) {
      if (response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        alert("Payment failed or cancelled.");
      }
    },
    prefill: {
      name,
      email,
      contact: phone,
    },
    theme: {
      color: "#6366f1",
    },
    modal: {
      ondismiss: function () {
        // Optionally handle modal close
      }
    }
  };

  // @ts-ignore
  if (typeof window !== "undefined" && window.Razorpay) {
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  } else {
    alert("Razorpay SDK not loaded.");
  }
}



// ===================== Main Component =====================
export default function PosterAndPolicyDiscloserPage() {
  const [cartItems, setCartItems] = useState<{id: number, quantity: number}[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showCart, setShowCart] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [purchaseLoading, setPurchaseLoading] = useState(false)
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [posters, setPosters] = useState<any[]>([])
  const [loadingPosters, setLoadingPosters] = useState(false)
  const [postersError, setPostersError] = useState<string | null>(null)

  const fetchPosters = async () => {
    try {
      setLoadingPosters(true)
      setPostersError(null)
      const res = await fetch('/api/posters?limit=100')
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load posters')
      const mapped = (json.posters || []).map((p: any) => ({
        id: p.id,
        name: p.title,
        price: Number(p.price ?? 0),
        originalPrice: Number(p.price ?? 0),
        discount: 0,
        rating: 4.6,
        reviews: 0,
        image: p.image_url,
        description: p.description || '',
        features: Array.isArray(p.tags) && p.tags.length ? p.tags : ['Print Ready', 'High Resolution', 'Digital Download'],
        category: (p.category || 'Other').toString(),
        inStock: true,
        fastDelivery: !!p.featured,
        featured: !!p.featured,
      }))
      setPosters(mapped)
    } catch (e: any) {
      setPostersError(e?.message || 'Unable to load posters')
    } finally {
      setLoadingPosters(false)
    }
  }

  useEffect(() => {
    fetchPosters()
  }, [])

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Policy', value: 'policy' },
    { name: 'Safety', value: 'safety' },
    { name: 'Equality', value: 'equality' },
    { name: 'Empowerment', value: 'empowerment' }
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
      const product = posters.find(p => p.id === item.id)
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

  // Checkout from cart: open purchase dialog with all cart items
  const handleCartCheckout = () => {
    if (cartItems.length > 0) {
      const firstProduct = posters.find(p => p.id === cartItems[0].id);
      setSelectedProduct(firstProduct);
      setShowPurchaseDialog(true);
    }
  }

  // Razorpay-only purchase handler
  const handlePurchase = async () => {
    if (!selectedProduct) return;
    if (!customerDetails.name || !customerDetails.email) {
      alert("Please fill in your name and email.");
      return;
    }
    setPurchaseLoading(true);
    try {
      await handleRazorpayPayment({
        amount: selectedProduct.price,
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        productName: selectedProduct.name,
        onSuccess: (paymentId: string) => {
          setPaymentId(paymentId);
          setShowPurchaseDialog(false);
          setShowSuccessDialog(true);
        }
      });
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setPurchaseLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  // Filter and sort products
  const filteredProducts = posters.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || (product.category || '').toLowerCase() === selectedCategory.toLowerCase()
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">100% Legal Compliant</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Women's Rights</span>
                <br />
                <span className="text-white">& Safety Posters</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed mb-8">
                Professional, print‑ready posters to promote women's rights and workplace safety.
                <span className="block text-blue-100 font-medium mt-2">Premium quality • High resolution • Instant access</span>
              </p>

              {/* In-hero search and trust markers removed per request */}
            </div>

            {/* Right: Enhanced multi-size collage */}
            <div className="relative hidden lg:block">
              <div className="relative h-[520px]">
                {/* Soft glow background */}
                <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-white/20 via-blue-300/20 to-purple-300/20 blur-2xl opacity-50 -z-10" />

                {/* Tile A: Main portrait */}
                <div className="absolute left-0 top-8 h-[74%] w-[58%] rotate-[-3deg]">
                  <div className="bg-white/95 rounded-3xl p-2 shadow-2xl border border-white/30">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={(posters[0]?.image || posters[0]?.image_url) || '/placeholder.jpg'}
                        alt={posters[0]?.name || 'Poster A'}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-600 truncate">
                      {posters[0]?.name || 'Featured poster'}
                    </div>
                  </div>
                </div>

                {/* Tile B: Tall right */}
                <div className="absolute right-0 top-0 h-[58%] w-[38%] rotate-[4deg]">
                  <div className="bg-white/95 rounded-3xl p-2 shadow-xl border border-white/30">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={(posters[1]?.image || posters[1]?.image_url) || '/placeholder.jpg'}
                        alt={posters[1]?.name || 'Poster B'}
                        className="w-full h-[230px] object-cover"
                      />
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-600 truncate">
                      {posters[1]?.name || 'Curated pick'}
                    </div>
                  </div>
                </div>

                {/* Tile C: Bottom right square */}
                <div className="absolute right-4 bottom-2 h-[54%] w-[42%] rotate-[-2deg]">
                  <div className="bg-white/95 rounded-3xl p-2 shadow-xl border border-white/30">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={(posters[2]?.image || posters[2]?.image_url) || '/placeholder.jpg'}
                        alt={posters[2]?.name || 'Poster C'}
                        className="w-full h-[210px] object-cover"
                      />
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-600 truncate">
                      {posters[2]?.name || 'Editor’s choice'}
                    </div>
                  </div>
                </div>

                {/* Tile D: Top center small */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 h-[30%] w-[28%] rotate-[2deg]">
                  <div className="bg-white/95 rounded-3xl p-2 shadow-lg border border-white/30">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={(posters[3]?.image || posters[3]?.image_url) || '/placeholder.jpg'}
                        alt={posters[3]?.name || 'Poster D'}
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Tile E: Bottom left wide */}
                <div className="absolute left-3 bottom-0 h-[32%] w-[36%] rotate-[2deg]">
                  <div className="bg-white/95 rounded-3xl p-2 shadow-xl border border-white/30">
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        src={(posters[4]?.image || posters[4]?.image_url) || '/placeholder.jpg'}
                        alt={posters[4]?.name || 'Poster E'}
                        className="w-full h-[120px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Tile F: Small circular thumb */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/70 shadow-xl border border-white/50">
                  <img
                    src={(posters[5]?.image || posters[5]?.image_url) || '/placeholder.jpg'}
                    alt={posters[5]?.name || 'Poster F'}
                    className="w-full h-full object-cover"
                  />
                </div>
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



      {/* Download tab removed */}

      {/* Browse Posters */}
      <>
          {/* Filters and Sort */}
          <div className="bg-white border-b -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5">
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
                      <Button variant="outline" size="lg" className="px-6">
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Cart ({getCartCount()})
                      </Button>
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
                            const product = posters.find(p => p.id === item.id)
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
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                    >
                                      -
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                    >
                                      +
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
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
                            <Button 
                              onClick={() => {
                                setShowCart(false);
                                handleCartCheckout();
                              }}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              disabled={cartItems.length === 0}
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Checkout
                            </Button>
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
          <div id="posters-grid" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-md transition-all duration-300 overflow-hidden border-0 shadow-sm">
                  <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2.5 left-2.5 bg-yellow-500 hover:bg-yellow-600 text-[10px] px-1.5 py-0.5">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="w-7 h-7 p-0 rounded-full shadow">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-7 h-7 p-0 rounded-full shadow">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.discount > 0 && (
                      <Badge className="absolute bottom-2.5 left-2.5 bg-red-500 text-white px-2 py-0.5 text-[10px] font-semibold shadow">
                        {product.discount}% OFF
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-white bg-gray-800 px-2.5 py-0.5 text-xs">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5">{product.category}</Badge>
                      <div className="text-lg font-bold text-green-600">
                        ₹{product.price}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-[10px] text-gray-600">({product.reviews} reviews)</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {product.features.slice(0, 2).map((feature: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                        <Badge key={index} variant="secondary" className="text-[10px] py-0.5 px-1.5">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Price Comparison */}
                      {product.originalPrice > product.price && (
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-[10px] text-gray-500 line-through">₹{product.originalPrice}</span>
                        <span className="text-[10px] text-green-600 font-semibold">
                          Save ₹{product.originalPrice - product.price}
                        </span>
                      </div>
                    )}

                    {/* Delivery Info */}
                    <div className="flex items-center justify-between mb-2.5">
                      {product.fastDelivery && (
                        <Badge className="bg-green-100 text-green-800 text-[10px] py-0.5">
                          <Zap className="w-3 h-3 mr-1" />
                          Fast Delivery
                        </Badge>
                      )}
                      <span className="text-[10px] text-gray-500">Free delivery</span>
                    </div>
                  </CardContent>
                  
                  <CardContent className="pt-1">
  <div className="flex gap-2">
    {getCartItem(product.id) ? (
      <div className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2 py-1.5">
        <Check className="w-3 h-3 text-green-600" />
        <span className="text-[11px] text-green-700 font-medium">
          In Cart ({getCartItem(product.id)?.quantity})
        </span>
      </div>
    ) : (
      <Button 
        onClick={() => addToCart(product.id)}
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-8 text-xs"
        disabled={!product.inStock}
      >
        <ShoppingCart className="w-3.5 h-3.5 mr-2" />
        Add to Cart
      </Button>
    )}
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
      
      {/* Purchase Dialog (Razorpay) */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Checkout with Razorpay</DialogTitle>
            <DialogDescription>
              Enter your details and pay securely via Razorpay.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Summary */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedProduct.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-green-600">₹{selectedProduct.price}</span>
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
              {/* Razorpay Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPurchaseDialog(false)}
                  className="flex-1"
                  disabled={purchaseLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={purchaseLoading || !customerDetails.name || !customerDetails.email}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {purchaseLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay with Razorpay
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Payment Successful! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your purchase. Your payment was processed via Razorpay.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <Check className="w-12 h-12 text-green-600 mx-auto mb-2" />
            {paymentId && (
              <p className="text-sm text-green-700">
                Payment ID: <span className="font-mono">{paymentId}</span>
              </p>
            )}
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
