"use client"
import React from 'react'

export default function FloatingMug() {
  return (
    <div className="relative w-24 h-24">
      {/* Steam particles */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="steam-particle" style={{ animationDelay: '0s' }}></div>
        <div className="steam-particle" style={{ animationDelay: '0.5s' }}></div>
        <div className="steam-particle" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Main mug */}
      <div className="relative w-full h-full">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full drop-shadow-lg"
          style={{
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          {/* Mug body */}
          <path 
            d="M20 30 L20 70 Q20 80 30 80 L70 80 Q80 80 80 70 L80 30 Q80 20 70 20 L30 20 Q20 20 20 30 Z" 
            fill="#8B4513" 
            stroke="#654321" 
            strokeWidth="2"
          />
          
          {/* Mug handle */}
          <path 
            d="M80 40 Q90 40 90 50 Q90 60 80 60" 
            fill="none" 
            stroke="#8B4513" 
            strokeWidth="3"
          />
          
          {/* Coffee liquid */}
          <path 
            d="M25 35 L25 65 Q25 70 30 70 L70 70 Q75 70 75 65 L75 35 Z" 
            fill="#654321"
            className="coffee-fill"
          />
          
          {/* Mug rim */}
          <path 
            d="M20 30 L80 30" 
            fill="none" 
            stroke="#654321" 
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes steam {
          0% { 
            opacity: 0; 
            transform: translateY(0) scale(0.5); 
          }
          50% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-40px) scale(0.5); 
          }
        }
        
        .steam-particle {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          position: absolute;
          animation: steam 2s ease-out infinite;
        }
        
        .coffee-fill {
          animation: fill 2s ease-in-out infinite;
        }
        
        @keyframes fill {
          0%, 100% { transform: scaleY(0.8); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
