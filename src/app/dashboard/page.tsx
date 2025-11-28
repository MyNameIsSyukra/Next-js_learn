"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, User, LogOut, Edit, Trash2, ChevronLeft, ChevronRight, X, Plus, Loader2 } from "lucide-react";
import { patientService } from "@/services/api/patient";

// Interface untuk data pasien di component
interface PatientData {
  id: string;
  name: string;
  gender: string;
  phone: string;
  status: boolean;
}

export default function PatientDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    gender: "",
    phone: "",
  });
  const [patients, setPatients] = useState<PatientData[]>([]);

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsFetching(true);
      setError(null);
      const response = await patientService.getPatients();

      if (response.status && response.data) {
        // Transform API data to match component structure
        const transformedData = response.data.map((patient) => ({
          id: patient.pasienid,
          name: patient.nama,
          gender: patient.gender === "Male" ? "Laki-laki" : "Perempuan",
          phone: patient.phoneNumber,
          status: patient.status,
        }));
        setPatients(transformedData);
      }
    } catch (err) {
      setError("Gagal memuat data pasien. Silakan coba lagi.");
      console.error("Error fetching patients:", err);
    } finally {
      setIsFetching(false);
    }
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = patients.slice(startIndex, endIndex);

  const handleEdit = (patient: PatientData) => {
    setSelectedPatient({ ...patient });
    setIsEditOpen(true);
  };

  const handleDelete = (patient: PatientData) => {
    setSelectedPatient(patient);
    setIsDeleteOpen(true);
  };

  const saveEdit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedPatient || !selectedPatient.name || !selectedPatient.gender || !selectedPatient.phone) {
        setError("Semua field harus diisi");
        return;
      }

      // Transform gender to API format
      const genderApi = selectedPatient.gender.toLowerCase() === "laki-laki" || selectedPatient.gender.toLowerCase() === "male" ? "Male" : "Female";

      const payload = {
        pasienid: selectedPatient.id,
        Name: selectedPatient.name,
        Gender: genderApi as "Male" | "Female",
        PhoneNumber: selectedPatient.phone,
      };

      await patientService.updatePatient(payload);

      // Refresh patient list after successful update
      await fetchPatients();
      setIsEditOpen(false);
      setSelectedPatient(null);
    } catch (err) {
      setError("Gagal mengupdate pasien. Silakan coba lagi.");
      console.error("Error updating patient:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedPatient) return;

      await patientService.deletePatient(selectedPatient.id);

      // Refresh patient list after successful delete
      await fetchPatients();
      setIsDeleteOpen(false);
      setSelectedPatient(null);
    } catch (err) {
      setError("Gagal menghapus pasien. Silakan coba lagi.");
      console.error("Error deleting patient:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addPatient = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate input
      if (!newPatient.name || !newPatient.gender || !newPatient.phone) {
        setError("Semua field harus diisi");
        return;
      }

      // Transform gender to API format
      const genderApi = newPatient.gender.toLowerCase() === "laki-laki" || newPatient.gender.toLowerCase() === "male" ? "Male" : "Female";

      const payload = {
        Name: newPatient.name,
        Gender: genderApi as "Male" | "Female",
        PhoneNumber: newPatient.phone,
      };

      const response = await patientService.addPatient(payload);

      if (response.message) {
        // Refresh patient list after successful add
        await fetchPatients();
        setIsAddOpen(false);
        setNewPatient({ name: "", gender: "", phone: "" });
      }
    } catch (err) {
      setError("Gagal menambahkan pasien. Silakan coba lagi.");
      console.error("Error adding patient:", err);
    } finally {
      setIsLoading(false);
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
          <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground mb-2">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted mb-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </a>
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted w-full text-destructive">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Pasien</h1>
          <p className="text-muted-foreground">Kelola data pasien rumah sakit</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Daftar Pasien</CardTitle>
              <Button onClick={() => setIsAddOpen(true)} disabled={isFetching}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pasien
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

            {isFetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Memuat data pasien...</span>
              </div>
            ) : patients.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Belum ada data pasien.</p>
                <p className="text-sm mt-2">Klik tombol "Tambah Pasien" untuk menambahkan data baru.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">No</th>
                        <th className="text-left p-4 font-medium">Nama</th>
                        <th className="text-left p-4 font-medium">Jenis Kelamin</th>
                        <th className="text-left p-4 font-medium">Telepon</th>
                        <th className="text-right p-4 font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.map((patient, index) => (
                        <tr key={patient.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{startIndex + index + 1}</td>
                          <td className="p-4 font-medium">{patient.name}</td>
                          <td className="p-4">{patient.gender}</td>
                          <td className="p-4">{patient.phone}</td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(patient)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(patient)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {startIndex + 1} - {Math.min(endIndex, patients.length)} dari {patients.length} pasien
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)}>
                        {page}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Edit Data Pasien</h2>
                <p className="text-sm text-muted-foreground mt-1">Perbarui informasi pasien di bawah ini</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {selectedPatient && (
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">
                    Nama <span className="text-destructive">*</span>
                  </Label>
                  <Input id="edit-name" value={selectedPatient.name} onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">
                    Jenis Kelamin <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="edit-gender"
                    value={selectedPatient.gender}
                    onChange={(e) => setSelectedPatient({ ...selectedPatient, gender: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">
                    Telepon <span className="text-destructive">*</span>
                  </Label>
                  <Input id="edit-phone" value={selectedPatient.phone} onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })} />
                </div>
              </div>
            )}
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>
                Batal
              </Button>
              <Button onClick={saveEdit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Hapus Data Pasien</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Apakah Anda yakin ingin menghapus data pasien <strong>{selectedPatient?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <button onClick={() => setIsDeleteOpen(false)} className="text-muted-foreground hover:text-foreground" disabled={isLoading}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  "Hapus"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Tambah Pasien Baru</h2>
                <p className="text-sm text-muted-foreground mt-1">Masukkan informasi pasien baru</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">
                  Nama <span className="text-destructive">*</span>
                </Label>
                <Input id="add-name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Masukkan nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-gender">
                  Jenis Kelamin <span className="text-destructive">*</span>
                </Label>
                <select
                  id="add-gender"
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-phone">
                  Telepon <span className="text-destructive">*</span>
                </Label>
                <Input id="add-phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddOpen(false)} disabled={isLoading}>
                Batal
              </Button>
              <Button onClick={addPatient} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Tambah Pasien"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
