import React from "react";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "link";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 disabled:opacity-50 disabled:pointer-events-none h-11 px-6 tracking-wide";

  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 shadow-md hover:shadow-lg shadow-neutral-500/20",
    outline: "border-2 border-neutral-200 bg-transparent hover:bg-neutral-50 text-neutral-700 hover:border-black hover:text-black",
    ghost: "hover:bg-neutral-100 hover:text-black text-neutral-600",
    link: "text-black hover:text-neutral-700 underline-offset-4 hover:underline p-0 h-auto font-bold shadow-none",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", id, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`flex h-12 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500/20 focus:border-black focus:bg-white transition-all duration-200 shadow-sm ${className}`}
        {...props}
      />
    </div>
  );
};

// Error Alert Component (Monochrome)
export const ErrorAlert = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="bg-neutral-900 text-white text-sm p-4 rounded-lg flex items-start gap-3 mb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 text-white mt-0.5">
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
      <span className="leading-tight">{message}</span>
    </div>
  );
};

// Separator (Clean version)
export const SeparatorWithText = ({ text }: { text: string }) => (
  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-neutral-100" />
    </div>
    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-medium">
      <span className="bg-white px-3 text-neutral-400">{text}</span>
    </div>
  </div>
);
