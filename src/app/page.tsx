"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { FieldDescription } from "@/components/ui/field";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <Card className="overflow-hidden p-0 relative min-h-[600px]">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Login Form - Left Side */}
            <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
            {/* Background Image - Right Side */}
            <div className="bg-muted relative hidden md:block">
              <img src="/asset.jpg" alt="Authentication background" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
          </CardContent>

          {/* Signup Form Overlay - Slides from Right */}
          <div className={`absolute inset-0 bg-background transition-transform duration-500 ease-in-out ${isSignup ? "translate-x-0" : "translate-x-full"}`}>
            <div className="grid md:grid-cols-2 h-full">
              {/* Background Image in Signup */}
              <div className="bg-muted relative hidden md:block">
                <img src="/asset.jpg" alt="Authentication background" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
              </div>

              {/* Signup Form */}
              <SignupForm onSwitchToLogin={() => setIsSignup(false)} onSuccess={() => setIsSignup(false)} />
            </div>
          </div>
        </Card>
        <FieldDescription className="px-6 text-center mt-6">By clicking continue, you agree to our Terms of Service and Privacy Policy.</FieldDescription>
      </div>
    </div>
  );
}
