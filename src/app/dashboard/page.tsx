// app/dashboard/page.tsx

import ProtectedRoute from "@/components/protected-route";
import PatientDashboard from "@/app/dashboard/patient-dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <PatientDashboard />
    </ProtectedRoute>
  );
}
