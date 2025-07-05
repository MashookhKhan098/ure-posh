"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import { coreValues } from "./about-data";
import { useState } from "react";

const CoreValuesSection = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-violet-100/40 to-blue-100/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-violet-100 via-blue-100 to-cyan-100 text-blue-700 px-8 py-4 text-sm font-semibold rounded-full border-0 shadow-lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Core Values
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            The Principles That{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Drive Us
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            These aren't just words on a wall. They're the living, breathing principles that guide 
            every decision, every interaction, and every solution we create.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
              onHoverStart={() => setHoveredValue(index)}
              onHoverEnd={() => setHoveredValue(null)}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${value.color} transition-all duration-500 ${hoveredValue === index ? 'h-3' : ''}`} />
                
                <div className="p-8 md:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Icon and Title */}
                    <motion.div 
                      className="lg:col-span-1 text-center lg:text-left"
                      variants={slideInLeft}
                    >
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 mx-auto lg:mx-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <value.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                        {value.title}
                      </CardTitle>
                      {value.stats && (
                        <Badge className={`bg-gradient-to-r ${value.color} text-white px-4 py-2 text-sm font-semibold rounded-full shadow-md`}>
                          {value.stats}
                        </Badge>
                      )}
                    </motion.div>

                    {/* Description */}
                    <div className="lg:col-span-1">
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {value.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-1">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg">How we deliver:</h4>
                      <div className="space-y-3">
                        {value.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
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
              Ready to Experience These Values in Action?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our value-driven approach can transform your workplace culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                View Case Studies
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;