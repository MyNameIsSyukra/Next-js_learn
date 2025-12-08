import React, { useState } from "react";
import { Button, Input, ErrorAlert } from "./ui/Elements";
import { useAuth } from "../hooks/use-auth";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  // State for fields requested: Name, Phone, Role, Email, Password
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhone] = useState("");
  const [Keahlian, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { register, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pass all fields to register
    const success = await register({
      Name,
      PhoneNumber,
      Email,
      Keahlian,
      Password,
    });

    if (success) {
      // Clear form
      setName("");
      setPhone("");
      setRole("");
      setEmail("");
      setPassword("");
      onSuccess();
    }
  };
  const handleSwitchForm = () => {
    clearError();
    onSwitchToLogin();
  };

  return (
    /* 
      Updated Structure:
      1. Wrapper: h-full, bg-white, overflow-y-auto (allows scrolling)
      2. Inner: min-h-full, flex flex-col justify-center (centers vertically if space allows)
    */
    <div className="h-full bg-white overflow-y-auto scrollbar-hide">
      <div className="min-h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-10">
        <div className="flex flex-col mb-8 text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M1.5 9.75a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H2.25a.75.75 0 01-.75-.75zm18 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75zM12 8.25a5.25 5.25 0 015.25 5.25v2.628a2.625 2.625 0 01-2.625 2.625h-5.25a2.625 2.625 0 01-2.625-2.625V13.5A5.25 5.25 0 0112 8.25zM6.75 13.5a3.75 3.75 0 017.5 0v2.628a1.125 1.125 0 01-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125V13.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-black tracking-wide">MEDICORE HIS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Create Account</h1>
          <p className="text-sm text-neutral-500 mt-1">Staff registration for Hospital Information System.</p>
        </div>

        <div className="grid gap-6">
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {/* Full Name */}
              <Input id="name" label="Full Name" placeholder="Dr. Jane Doe" type="text" required value={Name} onChange={(e) => setName(e.target.value)} />

              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <Input id="phone" label="Phone" placeholder="+62..." type="tel" required value={PhoneNumber} onChange={(e) => setPhone(e.target.value)} />

                {/* Role */}
                <Input id="role" label="Role / Title" placeholder="Nurse, etc." type="text" required value={Keahlian} onChange={(e) => setRole(e.target.value)} />
              </div>

              {/* Email */}
              <Input id="signup-email" label="Work Email" placeholder="name@hospital.com" type="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />

              {/* Password */}
              <Input id="signup-password" label="Password" placeholder="••••••••••••" type="password" required value={Password} onChange={(e) => setPassword(e.target.value)} />

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full text-base bg-black hover:bg-neutral-800">
                  {loading ? "Creating Account..." : "Register"}
                </Button>
              </div>
            </div>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-2">
            Already have an account?{" "}
            <Button variant="link" onClick={handleSwitchForm} className="text-black font-bold p-0 ml-1">
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
