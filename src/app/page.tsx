"use client";

import React, { useState, useEffect } from "react";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

/**
 * Curated list of high-quality medical/healthcare backgrounds.
 */
const MEDICAL_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000", // Abstract Tech Blue
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000", // Modern Hospital Corridor Blur
  "https://images.unsplash.com/photo-1516549655169-df83a063b36c?auto=format&fit=crop&q=80&w=2000", // Operating Theatre
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2000", // Clean Lab
];

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [bgImage, setBgImage] = useState(MEDICAL_BACKGROUNDS[0]);

  // Rotate background on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MEDICAL_BACKGROUNDS.length);
    setBgImage(MEDICAL_BACKGROUNDS[randomIndex]);
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 font-sans text-neutral-900 overflow-x-hidden">
      <div className="w-full max-w-sm md:max-w-6xl mx-auto">
        {/* Main Card Container 
            Increased min-h to 800px to prevent clipping on signup form with errors
        */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[800px] flex flex-col md:flex-row ring-1 ring-black/5">
          {/* 
            LAYER 1: Main Grid
            Left: Login Form
            Right: Background Image
          */}
          <div className="w-full h-full absolute inset-0 grid md:grid-cols-2">
            {/* Left Side: Login Form Container */}
            <div className="h-full w-full relative z-10 bg-white">
              <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
            </div>

            {/* Right Side: Visual (Login Mode) */}
            <div className="hidden md:block relative h-full w-full overflow-hidden bg-black">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img src={bgImage} alt="Hospital background" className="h-full w-full object-cover opacity-60 animate-ken-burns grayscale" />

              {/* Fixed Text Overlay - Positioned safely away from edges */}
              <div className="absolute bottom-12 left-12 right-12 z-20">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">System Operational</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">MediCore Intelligence</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed opacity-90">Secure, real-time access to electronic health records. Streamlining patient care with precision data.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 
            LAYER 2: Signup Overlay (Sliding Sheet)
            Slides in from Right -> Left
          */}
          <div className={`absolute inset-0 bg-white transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] z-30 ${isSignup ? "translate-x-0" : "translate-x-full"}`}>
            <div className="grid md:grid-cols-2 h-full w-full">
              {/* Left Side: Visual (Signup Mode) */}
              <div className="hidden md:block relative h-full w-full overflow-hidden bg-black">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img src={bgImage} alt="Medical background" className="h-full w-full object-cover scale-x-[-1] opacity-60 animate-ken-burns-reverse grayscale" />

                {/* Quote Overlay - Positioned safely */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <blockquote className="text-white/90 text-xl md:text-2xl font-serif italic leading-relaxed border-l-2 border-white pl-6 max-w-lg">"Medicine is a science of uncertainty and an art of probability."</blockquote>
                  <cite className="text-neutral-400 mt-4 block text-xs md:text-sm font-semibold tracking-wider uppercase">— Sir William Osler</cite>
                </div>
              </div>

              {/* Right Side: Signup Form */}
              <div className="h-full w-full relative z-10 bg-white">
                <SignupForm onSwitchToLogin={() => setIsSignup(false)} onSuccess={() => setIsSignup(false)} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <div className="flex gap-6 text-xs font-medium text-neutral-400">
            <a href="#" className="hover:text-black transition-colors">
              Help
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
          </div>
          <p className="text-[10px] text-neutral-300 uppercase tracking-widest">MediCore Health System © 2024</p>
        </div>
      </div>

      {/* Animations & Utils */}
      <style>{`
        @keyframes ken-burns {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        @keyframes ken-burns-reverse {
            0% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .animate-ken-burns {
            animation: ken-burns 25s ease-out infinite alternate;
        }
        .animate-ken-burns-reverse {
            animation: ken-burns-reverse 30s ease-out infinite alternate;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
