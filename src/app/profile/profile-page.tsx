// app/profile/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, User, LogOut, Loader2, MessageCircle, CheckCircle2, AlertCircle, Edit2, Save, X } from "lucide-react";
import { profileService } from "@/services/api/profile";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/api/auth";
import VerificationStatusBadge from "@/components/verification-status-badge";

interface ProfileFormData {
  name: string;
  phoneNumber: string;
  email: string;
  keahlian: string;
}

export default function ProfilePage() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingQR, setIsLoadingQR] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    phoneNumber: "",
    email: "",
    keahlian: "",
  });

  const [editedData, setEditedData] = useState<ProfileFormData>({
    name: "",
    phoneNumber: "",
    email: "",
    keahlian: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      setError(null);
      const response = await profileService.getProfile();

      if (response.status && response.data) {
        const data = {
          name: response.data.name,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          keahlian: response.data.keahlian,
        };
        setProfileData(data);
        setEditedData(data);
        setUserId(response.data.user_id);
        setIsVerified(response.data.isVerified);
      }
    } catch (err) {
      setError("Gagal memuat data profil. Silakan coba lagi.");
      console.error("Error fetching profile:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Validation
      if (!editedData.name || !editedData.phoneNumber || !editedData.email || !editedData.keahlian) {
        setError("Semua field harus diisi");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editedData.email)) {
        setError("Format email tidak valid");
        return;
      }

      // Phone validation
      if (!/^08\d{8,11}$/.test(editedData.phoneNumber)) {
        setError("Nomor telepon harus diawali 08 dan terdiri dari 10-13 digit");
        return;
      }

      const payload = {
        Name: editedData.name,
        PhoneNumber: editedData.phoneNumber,
        Email: editedData.email,
        Keahlian: editedData.keahlian,
      };

      await profileService.updateProfile(payload);

      // Update local state
      setProfileData({ ...editedData });
      setIsEditing(false);
      setSuccess("Profil berhasil diperbarui!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui profil. Silakan coba lagi.");
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    try {
      setIsLoadingQR(true);
      setError(null);
      setIsQRModalOpen(true);

      const response = await authService.getqr();

      setTimeout(() => {
        setQrCodeData(response.data);
        setIsLoadingQR(false);
      }, 1500);
    } catch (err) {
      setError("Gagal memuat QR Code. Silakan coba lagi.");
      console.error("Error loading QR code:", err);
      setIsLoadingQR(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold">Healthcare</h2>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted mb-2">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground mb-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </a>
          <button onClick={handleConnectWhatsApp} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted mb-2 w-full text-left">
            <MessageCircle className="w-5 h-5" />
            <span>Connect WhatsApp</span>
          </button>
        </nav>

        {/* Verification Status Badge */}
        <VerificationStatusBadge isVerified={isVerified} email={profileData.email} variant="sidebar" />

        <div className="p-4 border-t border-border">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted w-full text-destructive">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profil Saya</h1>
          <p className="text-muted-foreground">Kelola informasi profil Anda</p>
        </div>

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Memuat profil...</span>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl">
            {/* Alert Messages */}
            {error && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{success}</p>
              </div>
            )}

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informasi Profil</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Data pribadi dan informasi akun Anda</p>
                  </div>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profil
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleCancel} variant="outline" disabled={isLoading}>
                        <X className="w-4 h-4 mr-2" />
                        Batal
                      </Button>
                      <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User ID (Read Only) */}
                <div className="space-y-2">
                  <Label htmlFor="user-id" className="text-muted-foreground text-xs">
                    User ID
                  </Label>
                  <Input id="user-id" value={userId} disabled className="bg-muted font-mono text-sm" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap {isEditing && <span className="text-destructive">*</span>}</Label>
                    <Input id="name" value={isEditing ? editedData.name : profileData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} disabled={!isEditing} placeholder="Masukkan nama lengkap" />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon {isEditing && <span className="text-destructive">*</span>}</Label>
                    <Input id="phone" value={isEditing ? editedData.phoneNumber : profileData.phoneNumber} onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })} disabled={!isEditing} placeholder="08xxxxxxxxxx" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email {isEditing && <span className="text-destructive">*</span>}</Label>
                    <Input id="email" type="email" value={isEditing ? editedData.email : profileData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} disabled={!isEditing} placeholder="email@example.com" />
                  </div>

                  {/* Keahlian */}
                  <div className="space-y-2">
                    <Label htmlFor="keahlian">Keahlian {isEditing && <span className="text-destructive">*</span>}</Label>
                    <Input
                      id="keahlian"
                      value={isEditing ? editedData.keahlian : profileData.keahlian}
                      onChange={(e) => setEditedData({ ...editedData, keahlian: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Contoh: penyakit dalam"
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Status Verifikasi</Label>
                      <p className="text-sm text-muted-foreground mt-1">{isVerified ? "Akun Anda telah terverifikasi" : "Akun Anda belum terverifikasi"}</p>
                    </div>
                    <VerificationStatusBadge isVerified={isVerified} email={profileData.email} variant="inline" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Tambahan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tips Keamanan Akun</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pastikan email Anda aktif dan dapat diakses</li>
                      <li>• Gunakan nomor telepon yang valid untuk notifikasi</li>
                      <li>• Perbarui informasi profil secara berkala</li>
                      <li>• Jangan bagikan kredensial akun Anda kepada siapapun</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      {/* WhatsApp QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Connect WhatsApp</h2>
                <p className="text-sm text-muted-foreground mt-1">Scan QR code dengan WhatsApp Anda</p>
              </div>
              <button
                onClick={() => {
                  setIsQRModalOpen(false);
                  setQrCodeData(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {isLoadingQR ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Memuat QR Code...</p>
                </div>
              ) : qrCodeData ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <img src={qrCodeData} alt="WhatsApp QR Code" className="w-64 h-64 object-contain" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium">Langkah-langkah:</p>
                    <ol className="text-sm text-muted-foreground text-left space-y-1">
                      <li>1. Buka WhatsApp di ponsel Anda</li>
                      <li>
                        2. Tap <strong>Menu</strong> atau <strong>Settings</strong>
                      </li>
                      <li>
                        3. Pilih <strong>Linked Devices</strong>
                      </li>
                      <li>
                        4. Tap <strong>Link a Device</strong>
                      </li>
                      <li>5. Arahkan ponsel ke layar ini untuk scan QR code</li>
                    </ol>
                  </div>
                  <Button variant="outline" onClick={handleConnectWhatsApp} className="w-full">
                    Refresh QR Code
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Gagal memuat QR Code</p>
                  <Button onClick={handleConnectWhatsApp} className="mt-4">
                    Coba Lagi
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
