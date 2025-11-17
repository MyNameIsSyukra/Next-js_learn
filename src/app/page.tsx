"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted");
  };

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <Card className="overflow-hidden p-0 relative min-h-[600px]">
          <CardContent className="grid p-0 md:grid-cols-2">
            {/* Login Form - Left Side */}
            <div className="p-8 md:p-10 flex items-center min-h-[600px]">
              <FieldGroup className="w-full">
                <div className="flex flex-col items-center gap-2 text-center mb-4">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-sm text-balance">Login to your Acme Inc account</p>
                </div>
                <Field className="mb-3">
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input id="login-email" type="email" placeholder="m@example.com" required />
                </Field>
                <Field className="mb-3">
                  <div className="flex items-center">
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="login-password" type="password" required />
                </Field>
                <Field className="mb-3">
                  <Button onClick={handleLoginSubmit} className="w-full">
                    Login
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-3">Or continue with</FieldSeparator>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setIsSignup(true)} className="underline hover:text-primary">
                    Sign up
                  </button>
                </FieldDescription>
              </FieldGroup>
            </div>

            {/* Background Image - Right Side */}
            <div className="bg-muted relative hidden md:block">
              <img src="/api/placeholder/800/1000" alt="Authentication background" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
          </CardContent>

          {/* Signup Form Overlay - Slides from Right */}
          <div className={`absolute inset-0 bg-background transition-transform duration-500 ease-in-out ${isSignup ? "translate-x-0" : "translate-x-full"}`}>
            <div className="grid md:grid-cols-2 h-full">
              {/* Background Image in Signup */}
              <div className="bg-muted relative hidden md:block">
                <img src="/api/placeholder/800/1000" alt="Authentication background" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
              </div>

              {/* Signup Form */}
              <div className="p-8 md:p-10 flex items-center">
                <FieldGroup className="w-full">
                  <div className="flex flex-col items-center gap-2 text-center mb-4">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">Enter your email below to create your account</p>
                  </div>
                  <Field className="mb-3">
                    <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                    <Input id="signup-email" type="email" placeholder="m@example.com" required />
                    <FieldDescription className="text-xs">We&apos;ll use this to contact you.</FieldDescription>
                  </Field>
                  <Field className="mb-3">
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                        <Input id="signup-password" type="password" required />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <Input id="confirm-password" type="password" required />
                      </Field>
                    </div>
                    <FieldDescription className="text-xs">Must be at least 8 characters.</FieldDescription>
                  </Field>
                  <Field className="mb-3">
                    <Button onClick={handleSignupSubmit} className="w-full">
                      Create Account
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-3">Or continue with</FieldSeparator>
                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setIsSignup(false)} className="underline hover:text-primary">
                      Sign in
                    </button>
                  </FieldDescription>
                </FieldGroup>
              </div>
            </div>
          </div>
        </Card>
        <FieldDescription className="px-6 text-center mt-6">By clicking continue, you agree to our Terms of Service and Privacy Policy.</FieldDescription>
      </div>
    </div>
  );
}
