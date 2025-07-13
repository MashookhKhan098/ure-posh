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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full blur-3xl" />
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
            <Badge className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black px-8 py-4 text-sm font-semibold rounded-full border border-gray-300 shadow-lg">
              <Quote className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Transformations{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              That Speak
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed"
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
            <Card className="border border-gray-200 shadow-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
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
                            <Star className="w-8 h-8 text-gray-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-2xl md:text-4xl font-medium text-black leading-relaxed relative">
                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gray-200" />
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
                            <p className="font-semibold text-black text-xl">
                              {testimonials[activeTestimonial].name}
                            </p>
                            <p className="text-gray-600 font-medium">
                              {testimonials[activeTestimonial].company}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-black">
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
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                          <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-gray-500" />
                            Key Results
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {testimonials[activeTestimonial].results.map((result, index) => (
                              <div key={index} className="text-sm text-black bg-white rounded-lg px-3 py-2 border border-gray-200">
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-black hover:text-gray-600 transition-all duration-300"
              size="icon"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-black hover:text-gray-600 transition-all duration-300"
              size="icon"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>

        {/* Testimonial Navigation Dots */}
        <motion.div 
          variants={fadeInUp}
          className="flex justify-center space-x-3"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial 
                  ? 'bg-gray-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
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
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your workplace culture and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-gray-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Your Journey
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-600 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                View More Stories
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;