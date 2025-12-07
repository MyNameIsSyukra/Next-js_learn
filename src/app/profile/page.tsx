// app/profile/page.tsx

import ProtectedRoute from "@/components/protected-route";
import ProfilePage from "@/app/profile/profile-page";

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
