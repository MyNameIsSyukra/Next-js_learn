import React, { useState } from "react";
import { Button, Input, ErrorAlert } from "./ui/Elements";
import { useAuth } from "../hooks/use-auth";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleSwitchForm = () => {
    clearError();
    onSwitchToSignup();
  };

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide">
      <div className="min-h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-10">
        {/* Header */}
        <div className="flex flex-col mb-8 text-left">
          <div className="h-12 w-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-6 text-black shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a6.953 6.953 0 00-.303 2.526c.033.313.12.625.289.876.18.268.53.564 1.25.564.719 0 1.069-.297 1.25-.564.168-.251.255-.563.289-.876a6.954 6.954 0 00-.304-2.527c-.108-.214-.396-.633-.935-.633zm5.25 0c-.539 0-.828.419-.936.634a6.953 6.953 0 00-.303 2.526c.033.313.12.625.289.876.18.268.53.564 1.25.564.72 0 1.07-.297 1.25-.564.169-.251.256-.563.29-.876a6.954 6.954 0 00-.304-2.527c-.108-.214-.396-.633-.936-.633z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-500 text-sm md:text-base">Please authenticate to access the HIS portal.</p>
        </div>

        <div className="grid gap-6">
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5">
              <Input id="login-email" label="Email" placeholder="doctor@medicore.com" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                    Password
                  </label>
                </div>
                <Input id="login-password" placeholder="••••••••••••" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full text-base bg-black text-white hover:bg-neutral-800">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-neutral-100"></div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-neutral-500">Don't have an account?</p>
            <Button variant="outline" onClick={handleSwitchForm} className="w-full border-neutral-200 hover:border-black">
              Register as Staff
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
