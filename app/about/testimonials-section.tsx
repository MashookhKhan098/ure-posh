"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, Building2, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "./about-data";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-violet-50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-50 to-pink-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-violet-100 via-blue-100 to-cyan-100 text-blue-700 px-8 py-4 text-sm font-semibold rounded-full border-0 shadow-lg">
              <Quote className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Transformations{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              That Speak
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Real stories from real organizations who've experienced the power of 
            meaningful compliance training and cultural transformation.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="p-12 md:p-16"
                  >
                    <div className="text-center space-y-8">
                      {/* Rating Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-8 h-8 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-2xl md:text-4xl font-medium text-gray-900 leading-relaxed relative">
                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-200" />
                        "{testimonials[activeTestimonial].quote}"
                      </blockquote>

                      {/* Client Info */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
                        <div className="flex items-center gap-6">
                          <img
                            src={testimonials[activeTestimonial].image}
                            alt={testimonials[activeTestimonial].name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className="text-left">
                            <p className="font-semibold text-gray-900 text-xl">
                              {testimonials[activeTestimonial].name}
                            </p>
                            <p className="text-blue-600 font-medium">
                              {testimonials[activeTestimonial].company}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {testimonials[activeTestimonial].industry}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {testimonials[activeTestimonial].companySize}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-6 border border-blue-100">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Key Results
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {testimonials[activeTestimonial].results.map((result, index) => (
                              <div key={index} className="text-sm text-gray-700 bg-white rounded-lg px-3 py-2 border">
                                {result}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <Button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-300"
              size="icon"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-300"
              size="icon"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>

        {/* Testimonial Navigation Dots */}
        <motion.div 
          variants={fadeInUp}
          className="flex justify-center space-x-4 mb-16"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlaying(false);
              }}
              className={`relative transition-all duration-300 ${
                index === activeTestimonial
                  ? 'w-12 h-4'
                  : 'w-4 h-4'
              }`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`} />
            </button>
          ))}
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              className="group cursor-pointer"
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlaying(false);
              }}
            >
              <Card className={`h-full border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                index === activeTestimonial 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-blue-600 text-xs font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 text-xs">
                      {testimonial.industry}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's create your organization's transformation story together.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;