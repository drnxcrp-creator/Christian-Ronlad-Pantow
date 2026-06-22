import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { isFirebaseActive, db, handleFirestoreError, OperationType } from "./firebase";

export interface Reservation {
  id: string;
  packageName: string;
  packageCategory?: string;
  guestName: string;
  guestPhone: string;
  date: string;
  guests: number;
  addons: {
    airport: boolean;
    documentation: boolean;
    extraKlap: boolean;
  };
  duration?: string;
  grandTotal: number;
  status: "pending" | "verified" | "rejected";
  timestamp: number;
}

const DEFAULT_RESERVATIONS: Reservation[] = [
  {
    id: "TLW-937210",
    guestName: "Ariel Tumundo",
    guestPhone: "0812-4455-8822",
    packageName: "Paket Petualangan Air Terjun Tunan",
    packageCategory: "petualangan",
    date: "2026-07-10",
    guests: 3,
    addons: { airport: true, documentation: true, extraKlap: false },
    duration: "4 - 5 Jam",
    grandTotal: 550000,
    status: "pending",
    timestamp: Date.now() - 3600000 * 5 // 5 hours ago
  },
  {
    id: "TLW-842109",
    guestName: "Christina Mandey",
    guestPhone: "0853-9988-1122",
    packageName: "Paket Edukasi Masak Klappertaart",
    packageCategory: "edukasi",
    date: "2026-07-15",
    guests: 2,
    addons: { airport: false, documentation: false, extraKlap: true },
    duration: "3 Jam",
    grandTotal: 220000,
    status: "verified",
    timestamp: Date.now() - 3600000 * 24 // 1 day ago
  },
  {
    id: "TLW-710492",
    guestName: "Daniel Kaseger",
    guestPhone: "0821-8899-7755",
    packageName: "Paket Budaya Mapalus & Pembuatan Kopra",
    packageCategory: "budaya",
    date: "2026-07-22",
    guests: 5,
    addons: { airport: true, documentation: false, extraKlap: false },
    duration: "5 Jam",
    grandTotal: 650000,
    status: "verified",
    timestamp: Date.now() - 3600000 * 48 // 2 days ago
  }
];

// Initialize and Retrieve Reservations from Sandbox or Firestore
export async function getReservations(): Promise<Reservation[]> {
  if (isFirebaseActive && db) {
    const path = "reservations";
    try {
      const q = query(collection(db, path), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const resList: Reservation[] = [];
      querySnapshot.forEach((docSnap) => {
        resList.push(docSnap.data() as Reservation);
      });
      return resList;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  } else {
    // LocalStorage Fallback Engine
    const saved = localStorage.getItem("talawaan_package_reservations");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_RESERVATIONS;
      }
    } else {
      localStorage.setItem("talawaan_package_reservations", JSON.stringify(DEFAULT_RESERVATIONS));
      return DEFAULT_RESERVATIONS;
    }
  }
}

// Store a booking document
export async function saveReservation(reservation: Reservation): Promise<void> {
  if (isFirebaseActive && db) {
    const path = `reservations/${reservation.id}`;
    try {
      await setDoc(doc(db, "reservations", reservation.id), reservation);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  } else {
    // LocalStorage Sync
    const current = await getReservations();
    const updated = [reservation, ...current.filter((item) => item.id !== reservation.id)];
    localStorage.setItem("talawaan_package_reservations", JSON.stringify(updated));
  }
}

// Admin Moderation Audit
export async function updateReservationStatus(id: string, status: "verified" | "rejected"): Promise<void> {
  if (isFirebaseActive && db) {
    const path = `reservations/${id}`;
    try {
      await updateDoc(doc(db, "reservations", id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  } else {
    // LocalStorage Sync
    const current = await getReservations();
    const updated = current.map((item) => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });
    localStorage.setItem("talawaan_package_reservations", JSON.stringify(updated));
  }
}

// Delete booking logs
export async function deleteReservation(id: string): Promise<void> {
  if (isFirebaseActive && db) {
    const path = `reservations/${id}`;
    try {
      await deleteDoc(doc(db, "reservations", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  } else {
    // LocalStorage Sync
    const current = await getReservations();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem("talawaan_package_reservations", JSON.stringify(updated));
  }
}

// PUBLIC TRIP DOCUMENTATION LINKS MANAGEMENT (TANPA LOGIN UNTUK TAMU)

export interface TripDocumentation {
  id: string;
  packageName: string;
  tripDate: string;
  guestName: string;
  url: string;
  notes?: string;
  timestamp: number;
}

const DEFAULT_DOCUMENTATIONS: TripDocumentation[] = [
  {
    id: "DOC-9921",
    packageName: "Paket Petualangan Air Terjun Tunan",
    tripDate: "2026-06-15",
    guestName: "Rombongan Bpk. Michael (Jakarta)",
    url: "https://drive.google.com/drive/folders/16_62Xf7g-Fm8-mH9F5O6X7z9",
    notes: "Sesi foto berenang di air terjun dan makan siang kuliner Minahasa.",
    timestamp: Date.now() - 3600000 * 24 * 5
  },
  {
    id: "DOC-9922",
    packageName: "Paket Edukasi Gula Aren & Cap Tikus",
    tripDate: "2026-06-18",
    guestName: "Ibu Amanda & Teman-teman",
    url: "https://drive.google.com/drive/folders/17_73Yg8h-Gn9-nI0G6P7Y8a0",
    notes: "Kegiatan memeras nira aren di kebun dan demo memasak nira murni.",
    timestamp: Date.now() - 3600000 * 24 * 2
  }
];

export async function getTripDocumentations(): Promise<TripDocumentation[]> {
  if (isFirebaseActive && db) {
    const path = "documentations";
    try {
      const q = query(collection(db, path), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const docsList: TripDocumentation[] = [];
      querySnapshot.forEach((docSnap) => {
        docsList.push(docSnap.data() as TripDocumentation);
      });
      return docsList;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return [];
    }
  } else {
    // LocalStorage Sync
    const saved = localStorage.getItem("talawaan_trip_documentations");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_DOCUMENTATIONS;
      }
    } else {
      localStorage.setItem("talawaan_trip_documentations", JSON.stringify(DEFAULT_DOCUMENTATIONS));
      return DEFAULT_DOCUMENTATIONS;
    }
  }
}

// Active subscription listeners for LocalStorage fallback
const docListeners: ((docs: TripDocumentation[]) => void)[] = [];

function notifyDocListeners(docs: TripDocumentation[]) {
  docListeners.forEach((listener) => {
    try {
      listener(docs);
    } catch (e) {
      console.error("Local listener notification error:", e);
    }
  });
}

export function subscribeTripDocumentations(callback: (docs: TripDocumentation[]) => void): () => void {
  if (isFirebaseActive && db) {
    const path = "documentations";
    const q = query(collection(db, path), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const docsList: TripDocumentation[] = [];
        querySnapshot.forEach((docSnap) => {
          docsList.push(docSnap.data() as TripDocumentation);
        });
        callback(docsList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return unsub;
  } else {
    // LocalStorage real-time implementation
    docListeners.push(callback);
    
    // Initial fetch
    getTripDocumentations().then((docs) => {
      callback(docs);
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "talawaan_trip_documentations") {
        getTripDocumentations().then((docs) => {
          callback(docs);
        });
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      const index = docListeners.indexOf(callback);
      if (index > -1) {
        docListeners.splice(index, 1);
      }
      window.removeEventListener("storage", handleStorageChange);
    };
  }
}

export async function saveTripDocumentation(docItem: TripDocumentation): Promise<void> {
  if (isFirebaseActive && db) {
    const path = `documentations/${docItem.id}`;
    try {
      await setDoc(doc(db, "documentations", docItem.id), docItem);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  } else {
    // LocalStorage Sync
    const current = await getTripDocumentations();
    const updated = [docItem, ...current.filter((item) => item.id !== docItem.id)];
    localStorage.setItem("talawaan_trip_documentations", JSON.stringify(updated));
    notifyDocListeners(updated);
  }
}

export async function deleteTripDocumentation(id: string): Promise<void> {
  if (isFirebaseActive && db) {
    const path = `documentations/${id}`;
    try {
      await deleteDoc(doc(db, "documentations", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  } else {
    // LocalStorage Sync
    const current = await getTripDocumentations();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem("talawaan_trip_documentations", JSON.stringify(updated));
    notifyDocListeners(updated);
  }
}

