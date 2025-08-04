"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award, Heart, CheckCircle, Star, TrendingUp, Target } from "lucide-react";
import Image from "next/image";

const ImpactSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const impactCards = [
    {
      title: "Expert Team",
      description: "Legal professionals, certified trainers, and compliance experts with 15+ years average experience",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      stats: "15+ Years Experience"
    },
    {
      title: "Comprehensive Solutions",
      description: "End-to-end services from policy development to ongoing support and continuous improvement",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      stats: "500+ Organizations"
    },
    {
      title: "Cultural Sensitivity",
      description: "Deep understanding of Indian workplace culture with solutions adapted for regional diversity",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      stats: "15+ Languages"
    },
    {
      title: "Proven Results",
      description: "Track record of successful POSH implementations and workplace culture transformations",
      icon: Award,
      color: "from-purple-500 to-purple-600",
      stats: "99% Success Rate"
    }
  ];

  const renderCard = (card: any, index: number) => {
    const IconComponent = card.icon;
    const positionClasses = [
      "lg:col-start-1 lg:row-start-1", // Position 1
      "lg:col-start-3 lg:row-start-1", // Position 3
      "lg:col-start-1 lg:row-start-3", // Position 7
      "lg:col-start-3 lg:row-start-3"  // Position 9
    ];
    
    return (
      <motion.div 
        key={index}
        variants={fadeInUp}
        className={positionClasses[index]}
      >
        <div className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 ${card.color.split(' ')[1]} border-l-4 max-w-sm`}>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-3`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{card.description}</p>
          <div className={`text-xs font-semibold ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : index === 2 ? 'text-pink-600' : 'text-purple-600'}`}>
            {card.stats}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-pink-100/40 to-blue-100/40 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          {/* 3x3 Grid Layout with Logo in Center */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
            {/* Card 1 - Position 1 */}
            <motion.div variants={fadeInUp}>
              {renderCard(impactCards[0], 0)}
            </motion.div>
            
            {/* Empty space - Position 2 */}
            <div className="hidden lg:block"></div>
            
            {/* Card 2 - Position 3 */}
            <motion.div variants={fadeInUp}>
              {renderCard(impactCards[1], 1)}
            </motion.div>
            
            {/* Empty space - Position 4 */}
            <div className="hidden lg:block"></div>
            
            {/* Central Logo - Position 5 */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center"
            >
              <div className="relative">
                              <Image 
                src="/images/ureph.svg" 
                alt="UREPOSH Logo" 
                width={500} 
                height={200} 
                className="h-40 w-auto opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-105"
                priority
              />
                {/* Glow effect around logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl scale-110 -z-10"></div>
              </div>
            </motion.div>
            
            {/* Empty space - Position 6 */}
            <div className="hidden lg:block"></div>
            
            {/* Card 3 - Position 7 */}
            <motion.div variants={fadeInUp}>
              {renderCard(impactCards[2], 2)}
            </motion.div>
            
            {/* Empty space - Position 8 */}
            <div className="hidden lg:block"></div>
            
            {/* Card 4 - Position 9 */}
            <motion.div variants={fadeInUp}>
              {renderCard(impactCards[3], 3)}
            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection; 