/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface WisataItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: "air-terjun" | "budaya" | "alam" | "edukasi";
  image: string;
  ticketPrice: number;
  facilities: string[];
  distanceFromAirport: string; // duration/duration text
  bestTime: string;
}

export interface KulinerItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  tips: string;
}

export interface AdminLetterData {
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pekerjaan: string;
  alamat: string;
  keperluan: string;
  suratType: "domisili" | "pengantar-nikah" | "usaha";
  namaUsaha?: string;
  jenisUsaha?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
