import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  User, 
  Phone, 
  Shield, 
  LogOut, 
  MapPin, 
  Sparkles,
  DollarSign,
  Clock,
  Check,
  X,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  getReservations, 
  saveReservation, 
  updateReservationStatus, 
  deleteReservation as dbDeleteReservation,
  getTripDocumentations,
  subscribeTripDocumentations,
  saveTripDocumentation,
  deleteTripDocumentation,
  Reservation,
  TripDocumentation
} from "../lib/dbService";

interface AdminPortalProps {
  lang: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminPortal({ lang, setActiveTab }: AdminPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"semua" | "pending" | "verified" | "rejected">("semua");

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  
  // Manual adding state
  const [newGuestName, setNewGuestName] = useState<string>("");
  const [newGuestPhone, setNewGuestPhone] = useState<string>("");
  const [newPackageSelect, setNewPackageSelect] = useState<string>("tunan-adventure");
  const [newDate, setNewDate] = useState<string>("2026-07-25");
  const [newGuestsCount, setNewGuestsCount] = useState<number>(2);
  const [newAddonAirport, setNewAddonAirport] = useState<boolean>(false);
  const [newAddonDoc, setNewAddonDoc] = useState<boolean>(false);
  const [newAddonKlap, setNewAddonKlap] = useState<boolean>(false);

  // Available packages list for manual adding
  const availablePackages = [
    { id: "tunan-adventure", title: "Paket Petualangan Air Terjun Tunan", price: 75000, duration: "4 - 5 Jam", category: "petualangan" },
    { id: "mapalus-culture", title: "Paket Budaya Mapalus & Pembuatan Kopra", price: 100000, duration: "5 Jam", category: "budaya" },
    { id: "klappertaart-baking", title: "Paket Edukasi Masak Klappertaart", price: 85000, duration: "3 Jam", category: "edukasi" }
  ];

  const [adminSubTab, setAdminSubTab] = useState<"reservations" | "documentations">("reservations");
  const [documentations, setDocumentations] = useState<TripDocumentation[]>([]);
  const [showAddDocModal, setShowAddDocModal] = useState<boolean>(false);
  
  // New documentation form state
  const [newDocPackage, setNewDocPackage] = useState<string>("Paket Petualangan Air Terjun Tunan");
  const [newDocDate, setNewDocDate] = useState<string>("2026-06-21");
  const [newDocGuestName, setNewDocGuestName] = useState<string>("");
  const [newDocUrl, setNewDocUrl] = useState<string>("");
  const [newDocNotes, setNewDocNotes] = useState<string>("");

  // Initialize data and real-time subscription
  useEffect(() => {
    // Check if logged in
    const loggedInSession = localStorage.getItem("talawaan_admin_logged_in");
    if (loggedInSession === "true") {
      setIsLoggedIn(true);
    }

    // Load reservations asynchronously on mount
    const loadReservationsData = async () => {
      try {
        const resData = await getReservations();
        setReservations(resData);
      } catch (err) {
        console.error("Failed to load reservations:", err);
      }
    };
    loadReservationsData();

    // Subscribe to public documentations in real-time
    const unsubDocs = subscribeTripDocumentations((docData) => {
      setDocumentations(docData);
    });

    return () => {
      unsubDocs();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("talawaan_admin_logged_in", "true");
    } else {
      setLoginError(lang === "id" ? "Username atau password salah!" : "Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("talawaan_admin_logged_in");
  };

  const autofillDemo = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  // Update status (Verify or Reject)
  const updateStatus = async (id: string, newStatus: "verified" | "rejected") => {
    try {
      await updateReservationStatus(id, newStatus);
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete booking record
  const deleteReservation = async (id: string) => {
    if (window.confirm(lang === "id" ? `Apakah Anda yakin ingin menghapus reservasi ${id}?` : `Are you sure you want to delete reservation ${id}?`)) {
      try {
        await dbDeleteReservation(id);
        const data = await getReservations();
        setReservations(data);
      } catch (err) {
        console.error("Failed to delete reservation:", err);
      }
    }
  };

  // Format IDR Price
  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculate pricing for manual addition
  const calculateManualTotal = () => {
    const pkg = availablePackages.find((p) => p.id === newPackageSelect);
    if (!pkg) return 0;
    const base = pkg.price * newGuestsCount;
    let addons = 0;
    if (newAddonAirport) addons += 150000;
    if (newAddonDoc) addons += 100000 * newGuestsCount;
    if (newAddonKlap) addons += 35000 * newGuestsCount;
    return base + addons;
  };

  // Submit manual reservation
  const handleAddReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestPhone.trim()) {
      alert(lang === "id" ? "Nama dan Nomor Telepon wajib diisi!" : "Name and Phone Number are required!");
      return;
    }

    const selectedPkg = availablePackages.find((p) => p.id === newPackageSelect);
    if (!selectedPkg) return;

    const newRes: Reservation = {
      id: "TLW-M" + Math.floor(10000 + Math.random() * 90000),
      guestName: newGuestName,
      guestPhone: newGuestPhone,
      packageName: selectedPkg.title,
      packageCategory: selectedPkg.category,
      date: newDate,
      guests: newGuestsCount,
      addons: {
        airport: newAddonAirport,
        documentation: newAddonDoc,
        extraKlap: newAddonKlap
      },
      duration: selectedPkg.duration,
      grandTotal: calculateManualTotal(),
      status: "verified", // Manually added by admin defaults to verified
      timestamp: Date.now()
    };

    try {
      await saveReservation(newRes);
      const data = await getReservations();
      setReservations(data);

      // Reset Form
      setNewGuestName("");
      setNewGuestPhone("");
      setNewGuestsCount(2);
      setNewAddonAirport(false);
      setNewAddonDoc(false);
      setNewAddonKlap(false);
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to save manual reservation:", err);
    }
  };

  // Submit manual trip public documentation link
  const handleAddDocumentation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocGuestName.trim() || !newDocUrl.trim()) {
      alert(lang === "id" ? "Nama Tamu / Rombongan dan Link Dokumen wajib diisi!" : "Guest Name / Group and Document Link are required!");
      return;
    }

    const newDoc: TripDocumentation = {
      id: "DOC-" + Math.floor(1000 + Math.random() * 9000),
      packageName: newDocPackage,
      tripDate: newDocDate,
      guestName: newDocGuestName,
      url: newDocUrl.trim(),
      notes: newDocNotes.trim(),
      timestamp: Date.now()
    };

    // Store previous state for safe rollback if backend fails
    const previousDocs = [...documentations];

    // Optimistically update the local state immediately
    setDocumentations((prev) => [newDoc, ...prev]);

    // Reset inputs immediately so user sees and feels instant feedback
    setNewDocGuestName("");
    setNewDocUrl("");
    setNewDocNotes("");
    setShowAddDocModal(false);

    try {
      await saveTripDocumentation(newDoc);
    } catch (err) {
      console.error("Failed to save public documentation link:", err);
      // Rollback to previous state on failure
      setDocumentations(previousDocs);
      alert(lang === "id" ? "Gagal menyimpan tautan dokumentasi." : "Failed to save documentation link.");
    }
  };

  const handleDeleteDocumentation = async (id: string) => {
    if (window.confirm(lang === "id" ? `Apakah Anda yakin ingin menghapus dokumen trip ${id}?` : `Are you sure you want to delete documentation ${id}?`)) {
      // Store previous state for rollback
      const previousDocs = [...documentations];

      // Optimistically remove the item from local state immediately
      setDocumentations((prev) => prev.filter((item) => item.id !== id));

      try {
        await deleteTripDocumentation(id);
      } catch (err) {
        console.error("Failed to delete documentation:", err);
        // Rollback to previous state on failure
        setDocumentations(previousDocs);
        alert(lang === "id" ? "Gagal menghapus dokumentasi." : "Failed to delete documentation.");
      }
    }
  };

  // Filter & Search logic
  const filteredReservations = reservations.filter((res) => {
    const matchesSearch = 
      res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "semua" || res.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const statTotalBookings = reservations.length;
  const statPending = reservations.filter((r) => r.status === "pending").length;
  const statVerified = reservations.filter((r) => r.status === "verified").length;
  const statRevenue = reservations
    .filter((r) => r.status === "verified")
    .reduce((sum, r) => sum + r.grandTotal, 0);

  return (
    <div className="bg-sand-50 min-h-screen py-10 sm:py-16 md:px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-sand-200/80 pb-6 gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-gold-600 uppercase tracking-widest bg-gold-100 border border-gold-200/40 px-3 py-1.5 rounded-full inline-block mb-3">
              {lang === "id" ? "Portal Administrasi Desa" : "Village Administration Portal"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-gray-900 font-extrabold tracking-tight">
              {lang === "id" ? "Verifikasi Reservasi Paket Wisata" : "Verify Tour Reservations"}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-2xl">
              {lang === "id" 
                ? "Manajemen, monitoring, dan validasi tiket rekreasi & edukasi Desa Wisata Talawaan."
                : "Manage, monitor, and validate recreation & educational tickets of Talawaan."}
            </p>
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 px-4 rounded-xl text-xs font-semibold border border-red-200/60 transition-colors self-start cursor-pointer shadow-sm md:self-auto"
            >
              <LogOut className="h-4 w-4" />
              <span>{lang === "id" ? "Keluar Admin" : "Logout Admin"}</span>
            </button>
          )}
        </div>

        {!isLoggedIn ? (
          /* LOGIN COMPONENT */
          <div className="max-w-md mx-auto my-12" id="admin-login-card">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-sand-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-100/30 to-transparent rounded-full pointer-events-none" />
              
              <div className="flex justify-center mb-6">
                <div className="bg-forest-50 p-4 rounded-2xl border border-forest-150 inline-block text-forest-700">
                  <Shield className="h-8 w-8 text-forest-700" />
                </div>
              </div>

              <h2 className="text-center font-serif text-2xl text-gray-900 font-bold tracking-tight">
                {lang === "id" ? "Masuk Portal Admin" : "Admin Portal Login"}
              </h2>
              <p className="text-center text-xs text-gray-500 mt-1.5 leading-relaxed">
                {lang === "id" 
                  ? "Silakan masukkan kredensial untuk memverifikasi pesanan turis."
                  : "Please input credentials to verify customer reservation tickets."}
              </p>

              {loginError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center space-x-2 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full pl-10 pr-4 py-2.5 bg-sand-50 hover:bg-sand-100/50 focus:bg-white border border-sand-200 focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {lang === "id" ? "Kata Sandi" : "Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-sand-50 hover:bg-sand-100/50 focus:bg-white border border-sand-200 focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest-700 hover:bg-forest-850 text-white font-semibold text-sm py-3 rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Unlock className="h-4 w-4" />
                  <span>{lang === "id" ? "Masuk Sekarang" : "Sign In"}</span>
                </button>
              </form>

              {/* Quick Fill / Demo Help */}
              <div className="mt-6 pt-5 border-t border-sand-150 text-center space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  {lang === "id" ? "Akun Demo Pengujuan" : "Developer Testing Access"}
                </span>
                <button
                  onClick={autofillDemo}
                  className="inline-flex items-center space-x-1 text-xs text-gold-600 hover:text-gold-700 font-bold bg-gold-50 hover:bg-gold-100/85 border border-gold-200/50 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>{lang === "id" ? "Isi Otomatis Kredensial" : "Autofill Demo Credentials"}</span>
                </button>
                <div className="text-[10px] text-gray-400 select-all font-mono">
                  User: <span className="font-bold text-gray-500">admin</span> / Pass: <span className="font-bold text-gray-500">admin123</span>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* ADMIN PORTAL PANEL */
          <div className="space-y-8" id="admin-main-grid">
            
            {/* SUB-TAB TOGGLES */}
            <div className="flex flex-col sm:flex-row gap-2 border-b border-sand-200 pb-4">
              <button
                type="button"
                onClick={() => setAdminSubTab("reservations")}
                className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  adminSubTab === "reservations"
                    ? "bg-forest-700 text-white border-forest-800 shadow"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-sand-100 border-sand-200"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>{lang === "id" ? "Reservasi Tiket Tamu" : "Booking Reservations"}</span>
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab("documentations")}
                className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  adminSubTab === "documentations"
                    ? "bg-forest-700 text-white border-forest-800 shadow"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-sand-100 border-sand-200"
                }`}
              >
                <Sparkles className="h-4 w-4 text-gold-500" />
                <span>{lang === "id" ? "Dokumentasi Publik" : "Public Documentation"}</span>
              </button>
            </div>

            {adminSubTab === "reservations" ? (
              <>
                {/* KPI STATS CARD ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Bookings KPI */}
              <div className="bg-white border border-sand-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    {lang === "id" ? "Total Reservasi" : "Total Bookings"}
                  </span>
                  <span className="text-3xl font-mono font-extrabold text-gray-900 block">
                    {statTotalBookings}
                  </span>
                </div>
                <div className="h-12 w-12 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
              </div>

              {/* Expected Revenue KPI */}
              <div className="bg-white border border-sand-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    {lang === "id" ? "Keuangan Terverifikasi" : "Verified Revenue"}
                  </span>
                  <span className="text-xl font-mono font-extrabold text-emerald-600 truncate max-w-[170px] block">
                    {formatPrice(statRevenue)}
                  </span>
                </div>
                <div className="h-12 w-12 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              {/* Pending Verifications */}
              <div className="bg-white border border-sand-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    {lang === "id" ? "Menunggu Verifikasi" : "Pending Actions"}
                  </span>
                  <span className={`text-3xl font-mono font-extrabold ${statPending > 0 ? "text-amber-500 animate-pulse" : "text-gray-900"} block`}>
                    {statPending}
                  </span>
                </div>
                <div className="h-12 w-12 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center text-amber-500 shrink-0 animate-pulse">
                  <Clock className="h-5 w-5" />
                </div>
              </div>

              {/* Verified Count */}
              <div className="bg-white border border-sand-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                    {lang === "id" ? "Tiket Terverifikasi" : "Verified Tickets"}
                  </span>
                  <span className="text-3xl font-mono font-extrabold text-forest-700 block">
                    {statVerified}
                  </span>
                </div>
                <div className="h-12 w-12 bg-forest-50 rounded-2xl border border-forest-150 flex items-center justify-center text-forest-700 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* TAB FILTER & ACTIONS CONTROL HEAD */}
            <div className="bg-white border border-sand-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={lang === "id" ? "Cari nama, ID tiket, atau paket..." : "Search tourist name, ID, package..."}
                    className="w-full pl-10 pr-4 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 rounded-xl text-xs transition-colors outline-none"
                  />
                </div>

                {/* Right Action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Create Manual Reservation Button */}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-1.5 bg-forest-700 hover:bg-forest-850 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow transition-all cursor-pointer border border-forest-800"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{lang === "id" ? "Tambah Manual" : "Add Manually"}</span>
                  </button>

                  {/* Seed / Default Button */}
                  <button
                    onClick={async () => {
                      if (window.confirm(lang === "id" ? "Muat ulang data sampel default?" : "Reload default sample bookings?")) {
                        localStorage.removeItem("talawaan_package_reservations");
                        try {
                          const data = await getReservations();
                          setReservations(data);
                        } catch (err) {
                          console.error(err);
                        }
                      }
                    }}
                    className="bg-white hover:bg-sand-50 text-gray-700 hover:text-forest-700 py-2.5 px-3 border border-sand-200 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    title="Load original mock data"
                  >
                    {lang === "id" ? "Reset Data Sampel" : "Restore Samples"}
                  </button>
                </div>
              </div>

              {/* Status categories tab togglers */}
              <div className="flex flex-wrap border-b border-sand-150 pt-2 gap-1" id="filter-wrapper">
                {(["semua", "pending", "verified", "rejected"] as const).map((tab) => {
                  const isActive = statusFilter === tab;
                  const count = tab === "semua" 
                    ? reservations.length 
                    : reservations.filter((r) => r.status === tab).length;

                  let label = "";
                  switch(tab) {
                    case "semua": label = lang === "id" ? "Semua Reservasi" : "All Bookings"; break;
                    case "pending": label = lang === "id" ? "Menunggu" : "Pending Approval"; break;
                    case "verified": label = lang === "id" ? "Terverifikasi" : "Verified"; break;
                    case "rejected": label = lang === "id" ? "Ditolak" : "Rejected"; break;
                  }

                  return (
                    <button
                      key={tab}
                      id={`tab-filter-${tab}`}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-2 border-b-2 text-xs font-semibold transition-all duration-200 cursor-pointer -mb-[1px] ${
                        isActive 
                          ? "border-forest-600 text-forest-700 font-bold" 
                          : "border-transparent text-gray-500 hover:text-forest-600 hover:border-sand-300"
                      }`}
                    >
                      <span>{label}</span>
                      <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive 
                          ? "bg-forest-100 text-forest-700" 
                          : "bg-sand-100 text-gray-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RESERVATIONS TABLE / STACK CONTAINER */}
            <div className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm" id="table-canvas">
              {filteredReservations.length === 0 ? (
                <div className="p-16 text-center space-y-4">
                  <div className="bg-sand-50 p-4 rounded-full inline-block border border-sand-200 text-gray-400">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-950">
                    {lang === "id" ? "Tidak Ada Data Reservasi" : "No Bookings Found"}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    {lang === "id" 
                      ? "Pencarian atau filter filter aktif tidak menghasilkan data apapun. Anda dapat memesan paket baru di tab 'Paket Wisata' atau menambahkan reservasi manual."
                      : "No record matches current search query or filter. Create some orders from 'Tour Packages' page or click manual insertion."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Table Desktop Mode */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-sand-50/80 border-b border-sand-200 text-gray-400 uppercase tracking-wider font-mono font-bold">
                          <th className="py-4 px-6">{lang === "id" ? "ID / Turis" : "ID & Guest"}</th>
                          <th className="py-4 px-6">{lang === "id" ? "Paket Rekreasi" : "Selected Package"}</th>
                          <th className="py-4 px-6 font-medium">{lang === "id" ? "Tanggal & Pax" : "Date & Size"}</th>
                          <th className="py-4 px-6">{lang === "id" ? "Total Biaya" : "Grand Total"}</th>
                          <th className="py-4 px-6 text-center">Status</th>
                          <th className="py-4 px-6 text-right">{lang === "id" ? "Tindakan" : "Actions"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand-150">
                        {filteredReservations.map((res) => {
                          const isPending = res.status === "pending";
                          const isVerified = res.status === "verified";
                          const isRejected = res.status === "rejected";

                          return (
                            <tr key={res.id} className="hover:bg-sand-50/30 transition-colors" id={`row-${res.id}`}>
                              {/* ID & Customer Information */}
                              <td className="py-4 px-6 space-y-1">
                                <span className="font-mono font-extrabold text-gold-600 block">
                                  {res.id}
                                </span>
                                <div className="space-y-0.5">
                                  <span className="font-bold text-gray-900 block text-xs md:text-sm">
                                    {res.guestName}
                                  </span>
                                  <span className="text-[10px] text-gray-500 flex items-center">
                                    <Phone className="h-3 w-3 mr-1 text-gray-400 shrink-0" />
                                    {res.guestPhone}
                                  </span>
                                </div>
                              </td>

                              {/* Package Category & Addons */}
                              <td className="py-4 px-6 max-w-xs space-y-1">
                                <span className="font-bold text-gray-900 block leading-tight">
                                  {res.packageName}
                                </span>
                                <div className="flex flex-wrap gap-1 pt-0.5">
                                  {res.addons.airport && (
                                    <span className="text-[9px] bg-sky-50 text-sky-700 font-bold px-1.5 py-0.5 rounded border border-sky-100">
                                      Antar-Jemput
                                    </span>
                                  )}
                                  {res.addons.documentation && (
                                    <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded border border-purple-100">
                                      Dokumentasi Drone
                                    </span>
                                  )}
                                  {res.addons.extraKlap && (
                                    <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-100">
                                      Oleh-oleh Klap
                                    </span>
                                  )}
                                  {!res.addons.airport && !res.addons.documentation && !res.addons.extraKlap && (
                                    <span className="text-[9px] text-gray-400 font-medium">
                                      {lang === "id" ? "Tanpa Layanan Tambahan" : "No addons"}
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Date and Guests Count */}
                              <td className="py-4 px-6 space-y-1">
                                <span className="font-mono font-bold text-gray-900 block flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" />
                                  {res.date}
                                </span>
                                <span className="text-gray-500 block text-[10px]">
                                  {res.guests} {lang === "id" ? "Kamar / Peserta" : "Guests"}
                                </span>
                              </td>

                              {/* Total Price */}
                              <td className="py-4 px-6">
                                <span className="font-mono font-extrabold text-gray-900 block md:text-sm">
                                  {formatPrice(res.grandTotal)}
                                </span>
                              </td>

                              {/* Action Status Badges */}
                              <td className="py-4 px-6 text-center">
                                {isPending && (
                                  <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-200/50 px-2 my-0.5 py-1 rounded-full font-bold text-[9px] leading-none uppercase tracking-wider animate-pulse">
                                    <Clock className="h-2.5 w-2.5 mr-1 shrink-0 animate-spin" />
                                    {lang === "id" ? "Menunggu" : "Pending"}
                                  </span>
                                )}
                                {isVerified && (
                                  <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 my-0.5 py-1 rounded-full font-bold text-[9px] leading-none uppercase tracking-wider">
                                    <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-emerald-600 shrink-0" />
                                    {lang === "id" ? "Terverifikasi" : "Verified"}
                                  </span>
                                )}
                                {isRejected && (
                                  <span className="inline-flex items-center bg-red-50 text-red-700 border border-red-200/50 px-2 my-0.5 py-1 rounded-full font-bold text-[9px] leading-none uppercase tracking-wider">
                                    <XCircle className="h-2.5 w-2.5 mr-1 text-red-600 shrink-0" />
                                    {lang === "id" ? "Ditolak" : "Rejected"}
                                  </span>
                                )}
                              </td>

                              {/* Verification Action Buttons */}
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end space-x-1">
                                  {isPending && (
                                    <>
                                      {/* Verify Handler Button */}
                                      <button
                                        onClick={() => updateStatus(res.id, "verified")}
                                        className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                                        title={lang === "id" ? "Verifikasi Booking" : "Verify Booking"}
                                        id={`btn-verify-${res.id}`}
                                      >
                                        <Check className="h-4 w-4" />
                                      </button>
                                      {/* Reject Handler Button */}
                                      <button
                                        onClick={() => updateStatus(res.id, "rejected")}
                                        className="h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                                        title={lang === "id" ? "Tolak Booking" : "Reject Booking"}
                                        id={`btn-reject-${res.id}`}
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </>
                                  )}
                                  
                                  {/* Delete controller */}
                                  <button
                                    onClick={() => deleteReservation(res.id)}
                                    className="h-8 w-8 bg-white hover:bg-red-50 hover:text-red-700 border border-sand-200 text-gray-500 rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                                    title={lang === "id" ? "Hapus Catatan" : "Delete Booking"}
                                    id={`btn-delete-${res.id}`}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Mobile Stack/Cards Layout */}
                  <div className="block md:hidden divide-y divide-sand-150">
                    {filteredReservations.map((res) => {
                      const isPending = res.status === "pending";
                      const isVerified = res.status === "verified";
                      const isRejected = res.status === "rejected";

                      return (
                        <div key={res.id} className="p-4 space-y-4 text-left hover:bg-sand-50/10 transition-colors" id={`mobile-card-${res.id}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-extrabold text-xs text-gold-600">
                              {res.id}
                            </span>
                            
                            {/* Status indicator badge */}
                            {isPending && (
                              <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider animate-pulse">
                                <Clock className="h-2.5 w-2.5 mr-1 shrink-0" />
                                {lang === "id" ? "Menunggu" : "Pending"}
                              </span>
                            )}
                            {isVerified && (
                              <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider">
                                <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-emerald-600 shrink-0" />
                                {lang === "id" ? "Terverifikasi" : "Verified"}
                              </span>
                            )}
                            {isRejected && (
                              <span className="inline-flex items-center bg-red-50 text-red-700 border border-red-200/50 px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider">
                                <XCircle className="h-2.5 w-2.5 mr-1 text-red-600 shrink-0" />
                                {lang === "id" ? "Ditolak" : "Rejected"}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-gray-950 leading-tight">
                              {res.guestName}
                            </h4>
                            <p className="text-xs font-semibold text-gray-700 leading-snug">
                              {res.packageName}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-y-2 text-[11px] font-mono border-t border-b border-sand-150/40 py-2.5">
                            <div>
                              <span className="text-gray-400 block uppercase font-sans text-[8px] tracking-wider mb-0.5">Teleton</span>
                              <span className="font-bold text-gray-800">{res.guestPhone}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block uppercase font-sans text-[8px] tracking-wider mb-0.5">Tanggal</span>
                              <span className="font-bold text-gray-800">{res.date}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block uppercase font-sans text-[8px] tracking-wider mb-0.5">Jumlah Wisatawan</span>
                              <span className="font-bold text-gray-800">{res.guests} Orang</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block uppercase font-sans text-[8px] tracking-wider mb-0.5">Total Harga</span>
                              <span className="font-extrabold text-forest-800 text-xs">{formatPrice(res.grandTotal)}</span>
                            </div>
                          </div>

                          {/* Mobile Services Add-ons */}
                          <div className="flex flex-wrap gap-1">
                            {res.addons.airport && (
                              <span className="text-[8px] bg-sky-50 text-sky-700 font-bold px-1.5 py-0.5 rounded border border-sky-100">
                                Antar-Jemput
                              </span>
                            )}
                            {res.addons.documentation && (
                              <span className="text-[8px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded border border-purple-100">
                                Dokumentasi Drone
                              </span>
                            )}
                            {res.addons.extraKlap && (
                              <span className="text-[8px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-100">
                                Oleh-oleh Klap
                              </span>
                            )}
                            {!res.addons.airport && !res.addons.documentation && !res.addons.extraKlap && (
                              <span className="text-[8.5px] text-gray-400">
                                {lang === "id" ? "Tanpa Layanan Tambahan" : "No addons selected"}
                              </span>
                            )}
                          </div>

                          {/* Mobile controllers row */}
                          <div className="flex items-center justify-between pt-1 border-t border-sand-150/30">
                            <span className="text-[10px] text-gray-400 font-mono">
                              {new Date(res.timestamp).toLocaleDateString()}
                            </span>
                            
                            <div className="flex items-center space-x-1.5">
                              {isPending && (
                                <>
                                  <button
                                    onClick={() => updateStatus(res.id, "verified")}
                                    className="bg-emerald-600 text-white rounded-lg py-1.5 px-3 text-[10px] font-bold shadow-sm cursor-pointer flex items-center space-x-0.5"
                                  >
                                    <Check className="h-3 w-3" />
                                    <span>Verifikasi</span>
                                  </button>
                                  <button
                                    onClick={() => updateStatus(res.id, "rejected")}
                                    className="bg-red-500 text-white rounded-lg py-1.5 px-2.5 text-[10px] font-bold shadow-sm cursor-pointer flex items-center space-x-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                    <span>Tolak</span>
                                  </button>
                                </>
                              )}
                              
                              <button
                                onClick={() => deleteReservation(res.id)}
                                className="bg-white border border-sand-200 text-gray-500 rounded-lg p-1.5 cursor-pointer hover:bg-red-50 hover:text-red-700"
                                title="Hapus"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-fade-in" id="admin-documentations-panel">
                
                {/* Header Card */}
                <div className="bg-white border border-sand-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-left">
                    <h2 className="text-xl font-bold font-display text-gray-900 flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-gold-500 animate-pulse" />
                      <span>{lang === "id" ? "Portal Unggah Dokumentasi Publik" : "Public Trip Documentation Uploads"}</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
                      {lang === "id" 
                        ? "Sematkan link folder cloud (Google Drive, OneDrive, dll.) agar tamu bisa mengakses dokumentasi trip mereka secara instan tanpa login. Formulir pengunggahan terintegrasi langsung di bawah ini."
                        : "Embed cloud linkages (Google Drive, OneDrive, etc.) so travelers find family outing documentation securely by date - completely login-free."}
                    </p>
                  </div>
                </div>

                {/* Two Column Layout: Left Column Form, Right Column list */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* FORM UNGGAH PERTAMA */}
                  <div className="lg:col-span-4 bg-white border border-sand-200 rounded-3xl p-6 shadow-sm h-fit space-y-4">
                    <div className="text-left border-b border-sand-150 pb-3">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-forest-700 bg-forest-50 px-2 py-1 rounded-md inline-block mb-1">
                        {lang === "id" ? "Unggah Link Dokumentasi" : "Upload Cloud Link"}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-gray-950">
                        {lang === "id" ? "Tambah Link Baru" : "Add New Link"}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Sematkan folder cloud Anda dan publikasikan ke halaman pencarian dokumentasi tamu secara real-time.
                      </p>
                    </div>

                    <form onSubmit={handleAddDocumentation} className="space-y-4 text-left">
                      
                      {/* Name of group */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Nama Tamu / Rombongan / Grup" : "Guest / Group Name"}
                        </label>
                        <input
                          type="text"
                          required
                          value={newDocGuestName}
                          onChange={(e) => setNewDocGuestName(e.target.value)}
                          placeholder={lang === "id" ? "Contoh: Rombongan Christina (Semarang)" : "E.g. Hasan Family"}
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none"
                        />
                      </div>

                      {/* Package Select */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Pilih Paket Wisata" : "Select Tour Package"}
                        </label>
                        <select
                          value={newDocPackage}
                          onChange={(e) => setNewDocPackage(e.target.value)}
                          className="w-full px-3 py-2.5 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none cursor-pointer"
                        >
                          <option value="Paket Petualangan Air Terjun Tunan">Paket Petualangan Air Terjun Tunan</option>
                          <option value="Paket Budaya Mapalus & Pembuatan Kopra">Paket Budaya Mapalus & Pembuatan Kopra</option>
                          <option value="Paket Edukasi Masak Klappertaart">Paket Edukasi Masak Klappertaart</option>
                          <option value="Paket Edukasi Gula Aren & Cap Tikus">Paket Edukasi Gula Aren & Cap Tikus</option>
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Tanggal Kegiatan Trip" : "Trip Activity Date"}
                        </label>
                        <input
                          type="date"
                          required
                          value={newDocDate}
                          onChange={(e) => setNewDocDate(e.target.value)}
                          className="w-full px-3 py-2 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none"
                        />
                      </div>

                      {/* Link URL */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Link Dokumentasi (Google Drive / OneDrive / Dropbox)" : "Shared Folder URL Link"}
                        </label>
                        <input
                          type="url"
                          required
                          value={newDocUrl}
                          onChange={(e) => setNewDocUrl(e.target.value)}
                          placeholder="https://drive.google.com/drive/folders/..."
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none font-mono"
                        />
                      </div>

                      {/* Optional Notes */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Catatan / Deskripsi Singkat (Opsional)" : "Notes (Optional)"}
                        </label>
                        <textarea
                          value={newDocNotes}
                          onChange={(e) => setNewDocNotes(e.target.value)}
                          placeholder={lang === "id" ? "Sesi foto drone, petualangan air terjun..." : "Drone sessions, etc."}
                          rows={2}
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 bg-forest-700 hover:bg-forest-850 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer border border-forest-805"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{lang === "id" ? "Simpan & Publikasikan" : "Publish & Save Link"}</span>
                      </button>

                    </form>
                  </div>

                  {/* ACTIVE LINKS TABLE */}
                  <div className="lg:col-span-8 bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4">
                    <div className="text-left">
                      <h3 className="font-serif text-lg font-bold text-gray-950">
                        {lang === "id" ? "List Tautan Dokumentasi Aktif" : "Active Documentation Links"}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                        Menampilkan list tautan yang saat ini aktif agar bisa dicari di Galeri Drive oleh tamu.
                      </p>
                    </div>

                    {documentations.length === 0 ? (
                      <div className="p-16 text-center space-y-4 border border-dashed border-sand-200 rounded-2xl bg-sand-50/50">
                        <div className="bg-sand-100 p-4 rounded-full inline-block text-gray-400">
                          <Sparkles className="h-8 w-8 text-gold-400" />
                        </div>
                        <h4 className="font-serif text-md font-bold text-gray-950">
                          {lang === "id" ? "Belum Ada Link Terdaftar" : "No Registered Links"}
                        </h4>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                          Gunakan formulir disamping untuk mengunggah link dokumentasi Google Drive atau OneDrive pertama Anda.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto text-left">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-sand-50/80 border-b border-sand-200 text-gray-400 uppercase tracking-wider font-mono font-bold">
                              <th className="py-4 px-6">{lang === "id" ? "ID / Rombongan" : "ID / Tourist Group"}</th>
                              <th className="py-4 px-6">{lang === "id" ? "Paket Wisata" : "Package Name"}</th>
                              <th className="py-4 px-6">{lang === "id" ? "Tanggal Trip" : "Trip Date"}</th>
                              <th className="py-4 px-6">{lang === "id" ? "Catatan" : "Description"}</th>
                              <th className="py-4 px-6">{lang === "id" ? "Tautan / Link" : "Shared Folder URL"}</th>
                              <th className="py-4 px-6 text-right">{lang === "id" ? "Tindakan" : "Actions"}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-sand-150">
                            {documentations.map((docItem) => (
                              <tr key={docItem.id} className="hover:bg-sand-50/30 transition-colors">
                                <td className="py-4 px-6">
                                  <span className="font-mono font-extrabold text-gold-600 block">{docItem.id}</span>
                                  <span className="font-bold text-gray-900 block text-xs sm:text-sm">{docItem.guestName}</span>
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900">{docItem.packageName}</td>
                                <td className="py-4 px-6 font-mono text-gray-600">{docItem.tripDate}</td>
                                <td className="py-4 px-6 text-gray-500 max-w-xs truncate">{docItem.notes || "-"}</td>
                                <td className="py-4 px-6">
                                  <a
                                    href={docItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-forest-700 hover:text-forest-900 hover:underline font-bold inline-flex items-center space-x-1"
                                  >
                                    <span>{lang === "id" ? "Buka Link ↗" : "Get Link ↗"}</span>
                                  </a>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDocumentation(docItem.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                                    title={lang === "id" ? "Hapus" : "Delete"}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* MANUAL PORTAL CREATING MODAL */}
            <AnimatePresence>
              {showAddModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
                  >
                    {/* Close action button */}
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="absolute top-4 right-4 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-sand-50 border border-sand-200/50 rounded-full flex items-center justify-center cursor-pointer"
                      title="Close dialog"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <h3 className="font-serif text-xl sm:text-2xl text-gray-900 font-extrabold tracking-tight text-left">
                      {lang === "id" ? "Tambah Reservasi Manual" : "Add Manual Booking"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm text-left leading-relaxed">
                      {lang === "id" 
                        ? "Daftarkan reservasi tamu via telfon atau reservasi langsung (walk-in) ke sistem desa secara instan."
                        : "Directly document custom booking details for phone or offline clients."}
                    </p>

                    <form onSubmit={handleAddReservation} className="mt-6 space-y-4 text-left">
                      
                      {/* Guest Name & Tel */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "Nama Lengkap" : "Guest Full Name"}
                          </label>
                          <input
                            type="text"
                            required
                            value={newGuestName}
                            onChange={(e) => setNewGuestName(e.target.value)}
                            placeholder="Ariel Mandagi"
                            className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "No. HP / WhatsApp" : "Phone Address"}
                          </label>
                          <input
                            type="text"
                            required
                            value={newGuestPhone}
                            onChange={(e) => setNewGuestPhone(e.target.value)}
                            placeholder="0812-4455-XXX"
                            className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none"
                          />
                        </div>
                      </div>

                      {/* Package Select & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "Pilih Paket" : "Select Package"}
                          </label>
                          <select
                            value={newPackageSelect}
                            onChange={(e) => setNewPackageSelect(e.target.value)}
                            className="w-full px-3 py-2.5 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none cursor-pointer"
                          >
                            {availablePackages.map((pkg) => (
                              <option key={pkg.id} value={pkg.id}>
                                {pkg.title} ({formatPrice(pkg.price)}/pax)
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "Tanggal Kunjungan" : "Visit Date"}
                          </label>
                          <input
                            type="date"
                            required
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full px-3 py-2 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none"
                          />
                        </div>
                      </div>

                      {/* Guests count multiplier count */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Jumlah Wisatawan (Pax)" : "Number of Guests (Pax)"}
                        </label>
                        <div className="flex items-center space-x-3.5">
                          <button
                            type="button"
                            onClick={() => setNewGuestsCount(Math.max(1, newGuestsCount - 1))}
                            className="h-10 w-10 bg-sand-100/80 hover:bg-sand-200 text-gray-700 rounded-xl font-extrabold flex items-center justify-center border border-sand-300 transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-mono text-lg font-extrabold text-forest-800 w-10 text-center">
                            {newGuestsCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setNewGuestsCount(Math.min(25, newGuestsCount + 1))}
                            className="h-10 w-10 bg-sand-100/80 hover:bg-sand-200 text-gray-700 rounded-xl font-extrabold flex items-center justify-center border border-sand-300 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Addon checkboxes */}
                      <div className="space-y-2 pt-2 border-t border-sand-150">
                        <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Tambahan Layanan Ekstra" : "Add-on Extra Services"}
                        </span>
                        
                        {/* Antar jemput */}
                        <label className="flex items-center space-x-3 bg-sand-50 hover:bg-sand-100/40 p-2.5 rounded-xl border border-sand-200/60 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={newAddonAirport}
                            onChange={(e) => setNewAddonAirport(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-gray-905 block">Antar Jemput Bandara Sam Ratulangi (Rp 150.000)</span>
                            <span className="text-[10px] text-gray-500">Flat rate mobil AC pribadi satu grup</span>
                          </div>
                        </label>

                        {/* Dokumentasi */}
                        <label className="flex items-center space-x-3 bg-sand-50 hover:bg-sand-100/40 p-2.5 rounded-xl border border-sand-200/60 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={newAddonDoc}
                            onChange={(e) => setNewAddonDoc(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-gray-905 block">Fotografer Profesion & Drone (Rp 100.000 / orang)</span>
                            <span className="text-[10px] text-gray-500">File foto HD dikirim lewat Google Drive</span>
                          </div>
                        </label>

                        {/* Oleh oleh klappertaart */}
                        <label className="flex items-center space-x-3 bg-sand-50 hover:bg-sand-100/40 p-2.5 rounded-xl border border-sand-200/60 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={newAddonKlap}
                            onChange={(e) => setNewAddonKlap(e.target.checked)}
                            className="rounded text-forest-600 focus:ring-forest-500 h-4.5 w-4.5"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-gray-905 block">Oleh-oleh Klappertaart Jumbo (Rp 35.000 / kotak)</span>
                            <span className="text-[10px] text-gray-500">Panggang segar langsung dari dapur wisata</span>
                          </div>
                        </label>
                      </div>

                      {/* Summary Grand total */}
                      <div className="bg-sand-100/85 rounded-2xl p-4 flex items-center justify-between border border-sand-200 mt-4 h-16">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          {lang === "id" ? "Total Estimasi Biaya" : "Grand Total Price"}
                        </span>
                        <span className="text-lg sm:text-xl font-mono font-extrabold text-forest-800">
                          {formatPrice(calculateManualTotal())}
                        </span>
                      </div>

                      {/* Modal Footer Controls */}
                      <div className="flex justify-end pt-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowAddModal(false)}
                          className="bg-white hover:bg-sand-100/80 text-gray-600 border border-sand-200 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                        >
                          {lang === "id" ? "Batal" : "Cancel"}
                        </button>
                        <button
                          type="submit"
                          className="bg-forest-700 hover:bg-forest-850 text-white font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer border border-forest-805 shadow-md"
                        >
                          {lang === "id" ? "Verifikasi & Simpan" : "Approve & Save"}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* PUBLIC DOCUMENTATION ADD MODAL */}
            <AnimatePresence>
              {showAddDocModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
                  >
                    {/* Close action button */}
                    <button
                      type="button"
                      onClick={() => setShowAddDocModal(false)}
                      className="absolute top-4 right-4 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-sand-50 border border-sand-200/50 rounded-full flex items-center justify-center cursor-pointer"
                      title="Close dialog"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <h3 className="font-serif text-xl sm:text-2xl text-gray-900 font-extrabold tracking-tight text-left">
                      {lang === "id" ? "Tambah Link Dokumentasi Publik" : "Add Public Documentation Link"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm text-left leading-relaxed">
                      Sematkan link folder cloud (OneDrive, Drive, dll.) agar tamu bisa mengakses dokumentasi trip mereka secara instan tanpa login.
                    </p>

                    <form onSubmit={handleAddDocumentation} className="mt-6 space-y-4 text-left">
                      
                      {/* Guest/Group name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Nama Tamu / Rombongan / Grup" : "Guest / Group Name"}
                        </label>
                        <input
                          type="text"
                          required
                          value={newDocGuestName}
                          onChange={(e) => setNewDocGuestName(e.target.value)}
                          placeholder="Contoh: Rombongan Ibu Christina (Semarang) / Grup Keluarga Hasan"
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none"
                        />
                      </div>

                      {/* Package Select & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "Pilih Paket" : "Select Package"}
                          </label>
                          <select
                            value={newDocPackage}
                            onChange={(e) => setNewDocPackage(e.target.value)}
                            className="w-full px-3 py-2.5 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none cursor-pointer"
                          >
                            <option value="Paket Petualangan Air Terjun Tunan">Paket Petualangan Air Terjun Tunan</option>
                            <option value="Paket Budaya Mapalus & Pembuatan Kopra">Paket Budaya Mapalus & Pembuatan Kopra</option>
                            <option value="Paket Edukasi Masak Klappertaart">Paket Edukasi Masak Klappertaart</option>
                            <option value="Paket Edukasi Gula Aren & Cap Tikus">Paket Edukasi Gula Aren & Cap Tikus</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === "id" ? "Tanggal Kegiatan Trip" : "Trip Activity Date"}
                          </label>
                          <input
                            type="date"
                            required
                            value={newDocDate}
                            onChange={(e) => setNewDocDate(e.target.value)}
                            className="w-full px-3 py-2 bg-sand-50 border border-sand-200 focus:border-forest-500 rounded-xl text-xs outline-none"
                          />
                        </div>
                      </div>

                      {/* URL */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Link Dokumentasi (Google Drive / OneDrive / Dropbox / iCloud)" : "Shared Folder URL Link"}
                        </label>
                        <input
                          type="url"
                          required
                          value={newDocUrl}
                          onChange={(e) => setNewDocUrl(e.target.value)}
                          placeholder="https://drive.google.com/drive/folders/..."
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none font-mono"
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          {lang === "id" ? "Catatan / Deskripsi Singkat (Opsional)" : "Short Notes / Descriptions (Optional)"}
                        </label>
                        <textarea
                          value={newDocNotes}
                          onChange={(e) => setNewDocNotes(e.target.value)}
                          placeholder="Sesi foto berenang di bawah air terjun, penyerahan klappertaart jumbo, dll."
                          rows={2}
                          className="w-full px-3.5 py-2.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs transition-colors outline-none resize-none"
                        />
                      </div>

                      {/* Modal Footer Controls */}
                      <div className="flex justify-end pt-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowAddDocModal(false)}
                          className="bg-white hover:bg-sand-100/80 text-gray-600 border border-sand-200 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer"
                        >
                          {lang === "id" ? "Batal" : "Cancel"}
                        </button>
                        <button
                          type="submit"
                          className="bg-forest-700 hover:bg-forest-850 text-white font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer border border-forest-805 shadow-md"
                        >
                          {lang === "id" ? "Simpan Link" : "Save Link"}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}

      </div>
    </div>
  );
}
