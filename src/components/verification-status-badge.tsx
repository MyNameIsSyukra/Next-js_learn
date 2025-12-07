"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

interface VerificationStatusBadgeProps {
  isVerified: boolean;
  email: string;
  variant?: "sidebar" | "inline";
}

export default function VerificationStatusBadge({ isVerified, email, variant = "sidebar" }: VerificationStatusBadgeProps) {
  if (variant === "sidebar") {
    return (
      <div className="p-4 border-t border-border">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg ${
            isVerified ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
          }`}
        >
          {isVerified ? <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />}
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium ${isVerified ? "text-green-800 dark:text-green-200" : "text-yellow-800 dark:text-yellow-200"}`}>{isVerified ? "Akun Terverifikasi" : "Belum Terverifikasi"}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{email}</p>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isVerified ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      }`}
    >
      {isVerified ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5" />
          Terverifikasi
        </>
      ) : (
        <>
          <AlertCircle className="w-3.5 h-3.5" />
          Belum Terverifikasi
        </>
      )}
    </span>
  );
}
