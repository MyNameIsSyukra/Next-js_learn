"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { useAuth } from "@/hooks/use-auth";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, clearError } = useAuth();

  const handleSubmit = async () => {
    await login({ email, password });
  };

  const handleSwitchForm = () => {
    clearError();
    onSwitchToSignup();
  };
  return (
    <div className="p-8 md:p-10 flex items-center min-h-[600px]">
      <FieldGroup className="w-full">
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-sm text-balance">Login to your Acme Inc account</p>
        </div>
        <Field className="mb-3">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="login-email" type="email" placeholder="m@example.com" required className="h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field className="mb-3">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
              Forgot your password?
            </a> */}
          </div>
          <Input id="login-password" type="password" required className="h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field className="mb-3">
          <Button onClick={handleSubmit} className="w-full">
            Login
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-3">Or continue with</FieldSeparator>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={handleSwitchForm} className="underline hover:text-primary">
            Sign up
          </button>
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
