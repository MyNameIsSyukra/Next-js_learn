// components/ui/error-alert.tsx

import { cn } from "@/lib/utils";

interface ErrorAlertProps {
  message: string;
  className?: string;
}

export function ErrorAlert({ message, className }: ErrorAlertProps) {
  return <div className={cn("p-3 bg-red-100 text-red-700 rounded-md text-sm", className)}>{message}</div>;
}
