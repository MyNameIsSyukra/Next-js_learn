"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ErrorAlert } from "@/components/ui/error-alert";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export function SignupForm({ onSwitchToLogin, onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading, error, clearError } = useAuth();

  const handleSubmit = async () => {
    const success = await register({
      email,
      password,
      password_confirmation: confirmPassword,
    });

    if (success) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onSuccess();
    }
  };

  const handleSwitchForm = () => {
    clearError();
    onSwitchToLogin();
  };
  return (
    <div className="p-8 md:p-10 flex items-center">
      <FieldGroup className="w-full">
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">Enter your email below to create your account</p>
        </div>
        {error && <ErrorAlert message={error} className="mb-4" />}
        <Field className="mb-3">
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <FieldDescription className="text-xs">We&apos;ll use this to contact you.</FieldDescription>
        </Field>
        <Field className="mb-3">
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Field>
          </div>
          <FieldDescription className="text-xs">Must be at least 8 characters.</FieldDescription>
        </Field>
        <Field className="mb-3">
          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Create Account"}
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mb-3">Or continue with</FieldSeparator>
        <FieldDescription className="text-center">
          Already have an account?{" "}
          <button type="button" onClick={handleSwitchForm} className="underline hover:text-primary">
            Sign in
          </button>
        </FieldDescription>
      </FieldGroup>
    </div>
  );
}
