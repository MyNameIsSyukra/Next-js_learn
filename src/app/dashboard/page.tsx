"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, User, LogOut, Edit, Trash2, ChevronLeft, ChevronRight, X, Plus } from "lucide-react";

export default function PatientDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [patients, setPatients] = useState([
    { id: 1, name: "Ahmad Wijaya", age: 35, gender: "Laki-laki", phone: "081234567890", address: "Jakarta Selatan" },
    { id: 2, name: "Siti Nurhaliza", age: 28, gender: "Perempuan", phone: "082345678901", address: "Bandung" },
    { id: 3, name: "Budi Santoso", age: 42, gender: "Laki-laki", phone: "083456789012", address: "Surabaya" },
    { id: 4, name: "Dewi Lestari", age: 31, gender: "Perempuan", phone: "084567890123", address: "Yogyakarta" },
    { id: 5, name: "Rudi Hartono", age: 55, gender: "Laki-laki", phone: "085678901234", address: "Medan" },
    { id: 6, name: "Ani Kusuma", age: 29, gender: "Perempuan", phone: "086789012345", address: "Semarang" },
    { id: 7, name: "Hendra Setiawan", age: 38, gender: "Laki-laki", phone: "087890123456", address: "Malang" },
    { id: 8, name: "Rina Melati", age: 26, gender: "Perempuan", phone: "088901234567", address: "Denpasar" },
    { id: 9, name: "Yanto Prasetyo", age: 47, gender: "Laki-laki", phone: "089012345678", address: "Makassar" },
    { id: 10, name: "Maya Sari", age: 33, gender: "Perempuan", phone: "081123456789", address: "Palembang" },
    { id: 11, name: "Agus Salim", age: 41, gender: "Laki-laki", phone: "082234567890", address: "Bogor" },
    { id: 12, name: "Linda Wijayanti", age: 30, gender: "Perempuan", phone: "083345678901", address: "Tangerang" },
  ]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = patients.slice(startIndex, endIndex);

  const handleEdit = (patient) => {
    setSelectedPatient({ ...patient });
    setIsEditOpen(true);
  };

  const handleDelete = (patient) => {
    setSelectedPatient(patient);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setPatients(patients.filter((p) => p.id !== selectedPatient.id));
    setIsDeleteOpen(false);
    setSelectedPatient(null);
  };

  const saveEdit = () => {
    setPatients(patients.map((p) => (p.id === selectedPatient.id ? selectedPatient : p)));
    setIsEditOpen(false);
    setSelectedPatient(null);
  };

  const addPatient = () => {
    const newId = Math.max(...patients.map((p) => p.id)) + 1;
    setPatients([...patients, { id: newId, ...newPatient, age: parseInt(newPatient.age) }]);
    setIsAddOpen(false);
    setNewPatient({ name: "", age: "", gender: "", phone: "", address: "" });
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
              <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pasien
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">No</th>
                    <th className="text-left p-4 font-medium">Nama</th>
                    <th className="text-left p-4 font-medium">Usia</th>
                    <th className="text-left p-4 font-medium">Jenis Kelamin</th>
                    <th className="text-left p-4 font-medium">Telepon</th>
                    <th className="text-left p-4 font-medium">Alamat</th>
                    <th className="text-right p-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPatients.map((patient, index) => (
                    <tr key={patient.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">{startIndex + index + 1}</td>
                      <td className="p-4 font-medium">{patient.name}</td>
                      <td className="p-4">{patient.age}</td>
                      <td className="p-4">{patient.gender}</td>
                      <td className="p-4">{patient.phone}</td>
                      <td className="p-4">{patient.address}</td>
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
                  <Label htmlFor="edit-name">Nama</Label>
                  <Input id="edit-name" value={selectedPatient.name} onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Usia</Label>
                  <Input id="edit-age" type="number" value={selectedPatient.age} onChange={(e) => setSelectedPatient({ ...selectedPatient, age: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Jenis Kelamin</Label>
                  <Input id="edit-gender" value={selectedPatient.gender} onChange={(e) => setSelectedPatient({ ...selectedPatient, gender: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telepon</Label>
                  <Input id="edit-phone" value={selectedPatient.phone} onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Alamat</Label>
                  <Input id="edit-address" value={selectedPatient.address} onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })} />
                </div>
              </div>
            )}
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button onClick={saveEdit}>Simpan</Button>
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
              <button onClick={() => setIsDeleteOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Hapus
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
                <Label htmlFor="add-name">Nama</Label>
                <Input id="add-name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Masukkan nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-age">Usia</Label>
                <Input id="add-age" type="number" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} placeholder="Masukkan usia" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-gender">Jenis Kelamin</Label>
                <Input id="add-gender" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} placeholder="Laki-laki / Perempuan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-phone">Telepon</Label>
                <Input id="add-phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-address">Alamat</Label>
                <Input id="add-address" value={newPatient.address} onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} placeholder="Masukkan alamat lengkap" />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Batal
              </Button>
              <Button onClick={addPatient}>Tambah Pasien</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
