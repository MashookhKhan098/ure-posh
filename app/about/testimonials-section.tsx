"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, Building2, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
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

  const testimonials = [
    {
      name: "Vikas Khanna",
      title: "Michelin Chef, Host of Master Chef India and High Priest of Bungalow NYC",
      quote: "I love Children's Hope India because of the work they do. I have been a part of their journey since a long time, and through them I have gained opportunities to make a difference by uplifting the most vulnerable, back home. What they do has an amazing impact: empowering lives -- children, parents and communities.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Mira Nair",
      title: "Filmmaker and Philanthropist",
      quote: "The center of the world is in places where things happen and it matters, and Children's Hope India somehow has always had the antenna to understand where things could make a difference. I really appreciate that this is a very long term service effort here in New York. It doesn't matter what we have achieved and what we have come to, but to change even one child's life is basically the key, as this is what brings about long-term, positive and sustainable change. We don't have long to love, so making sure we do is critic.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Juhi Chawla",
      title: "Actor and Philanthropist",
      quote: "The holistic growth and wholesome development of children is critical in ensuring a better present and brighter future for each one of us. Early Childhood Education, Health and Nutrition, Mental Health and acquiring 21st century skill sets are vital for a child to become a contributing member for his/her family, community and society, besides achieving independence. To ensure this, each one of us has a role to play. I have witnessed the impact that Children's Hope India has had on the lives of many, and can only say I wish them more strength to continue the good work that they do, so that they reach many more in dire need of support. Let us help bring about positive and sustainable change, as best as we can, at an individual level and by serving as Ambassadors of Change for organizations such as Children's Hope India.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Hillary Rodham Clinton",
      title: "Former First Lady, Senator, and Secretary of State",
      quote: "Through your mission, Children's Hope gives children the possibility of a brighter future. Your remarkable efforts have touched the lives of many children, improving their quality of life. We are grateful for your dedication to this important cause that not only strengthens families but also communities.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Michael Bloomberg",
      title: "Former New York City Mayor",
      quote: "New Yorkers are known for their charitable spirit and dedication to giving back to their communities, and together with organizations like Children's Hope India, we are working to make a difference in the lives of those who need it most. Children's Hope India has made a significant difference in the lives and futures of so many young people. Its efforts embody the spirit of charity and goodwill that characterizes our city—ensuring a brighter future for us all.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Andrew Cuomo",
      title: "New York Governor",
      quote: "Over the last two decades, this organization has supported a worthy mission and I applaud the members of Children's Hope India for their commitment to youth.",
      image: "/placeholder-user.jpg"
    }
  ];

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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Voices of Support
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            Hear why our supporters believe in us and the change we're making
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
            <Card className="border border-gray-200 shadow-2xl bg-gradient-to-br from-white to-blue-50 overflow-hidden">
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
                      {/* Quote */}
                      <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed relative">
                        <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-200" />
                        "{testimonials[activeTestimonial].quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex flex-col items-center gap-4 pt-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                          {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900 text-xl">
                            {testimonials[activeTestimonial].name}
                          </p>
                          <p className="text-gray-600 font-medium">
                            {testimonials[activeTestimonial].title}
                          </p>
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300"
              size="icon"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300"
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
                  ? 'bg-blue-600 scale-125' 
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Step Up and Inspire Change
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join us in making a difference in children's lives across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Involved
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Connect with Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;