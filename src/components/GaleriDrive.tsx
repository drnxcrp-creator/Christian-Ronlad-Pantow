import React, { useState, useEffect, useRef } from "react";
import { 
  Cloud, 
  Upload, 
  Folder, 
  FileImage, 
  FileText, 
  Video, 
  File, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Lock, 
  LogOut, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Search,
  Calendar,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageCode } from "../utils/translations";
import { 
  googleSignIn, 
  googleSignOut, 
  initGoogleAuth,
  getOrCreateFolder,
  listDriveFiles,
  uploadToDrive,
  renameDriveFile,
  deleteDriveFile,
  DriveFile,
  getCachedToken
} from "../lib/googleDriveService";
import { subscribeTripDocumentations, TripDocumentation } from "../lib/dbService";

interface GaleriDriveProps {
  lang: LanguageCode;
}

export default function GaleriDrive({ lang }: GaleriDriveProps) {
  const [galleryTab, setGalleryTab] = useState<"public" | "private">("public");
  const [publicDocs, setPublicDocs] = useState<TripDocumentation[]>([]);
  const [searchDocKeyword, setSearchDocKeyword] = useState<string>("");

  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [folderId, setFolderId] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Controls for file renaming local states
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Localization resources mapped by lang selection
  const texts = {
    id: {
      title: "Galeri & Penyimpanan Cloud",
      desc: "Simpan, atur, dan cadangkan semua foto wisata, tiket orisinal, dan draf administrasi Desa Wisata Talawaan langsung ke akun Google Drive pribadi Anda dengan aman.",
      signInBtn: "Masuk dengan Google",
      signOutBtn: "Keluar Sesi",
      authRequired: "Otentikasi Diperlukan",
      authRequiredDesc: "Silakan masuk menggunakan Google untuk memberikan izin akses file ke folder khusus 'Wisata Desa Talawaan' Anda.",
      folderLabel: "Folder Aktif di Google Drive:",
      uploadAreaTitle: "Seret & Tepuk Berkas untuk Memulai Unggahan",
      uploadAreaSubtitle: "Mendukung berkas foto (JPG, PNG), video (MP4), dokumen PDF, kuintansi bukti, dll.",
      selectFileBtn: "Pilih File Manual",
      fileListTitle: "Album Wisata Pribadi Anda",
      noFiles: "Belum ada file di folder ini. Mulai unggah foto petualangan Anda!",
      renamePlaceholder: "Tulis nama baru berkas...",
      saveBtn: "Simpan",
      cancelBtn: "Batal",
      confirmDelete: "Apakah Anda yakin ingin menghapus file ini dari Google Drive pribadi Anda secara permanen? Tindakan ini tidak dapat dibatalkan.",
      viewOnDrive: "Buka di Drive",
      toastUploadSuccess: "File berhasil dicadangkan ke Google Drive!",
      toastDeleteSuccess: "File sukses dihapus dari Drive.",
      toastRenameSuccess: "Nama file berhasil diubah.",
      fetchingStatus: "Menghubungkan layanan Drive...",
      emptyLibrary: "Ruang Penyimpanan Kosong",
      size: "Ukuran",
      created: "Dibuat"
    },
    en: {
      title: "Drive & Cloud Storage",
      desc: "Securely save, organize, and backup all your tourism photos, tickets, and official village documents directly to your personal Google Drive account.",
      signInBtn: "Sign in with Google",
      signOutBtn: "Sign Out",
      authRequired: "Authentication Required",
      authRequiredDesc: "Please sign in using Google to grant file permissions for your dedicated 'Wisata Desa Talawaan' folder.",
      folderLabel: "Active Folder on Google Drive:",
      uploadAreaTitle: "Drag & Drop Files or Tap to Upload",
      uploadAreaSubtitle: "Supports travel photos (JPG, PNG), video clips (MP4), PDFs, receipt captures, etc.",
      selectFileBtn: "Choose File Manually",
      fileListTitle: "Your Personal Tourism Backups",
      noFiles: "No files saved in this folder yet. Start backup of your adventure photos!",
      renamePlaceholder: "Enter new file name...",
      saveBtn: "Save",
      cancelBtn: "Cancel",
      confirmDelete: "Are you sure you want to permanently delete this file from your personal Google Drive? This action cannot be undone.",
      viewOnDrive: "Open in Drive",
      toastUploadSuccess: "File successfully backed up to your Google Drive!",
      toastDeleteSuccess: "File successfully removed from Drive.",
      toastRenameSuccess: "File renamed successfully.",
      fetchingStatus: "Connecting Drive directory...",
      emptyLibrary: "Storage Space Empty",
      size: "Size",
      created: "Created"
    },
    zh: {
      title: "云相册与存储空间",
      desc: "安全地将所有旅游相片、门票和村庄官方文件直接保存、整理和备份到您的个人 Google 云端硬盘中。",
      signInBtn: "谷歌账号登录",
      signOutBtn: "退出登录",
      authRequired: "需要身份验证",
      authRequiredDesc: "请登录谷歌账号以授予对您专用‘Wisata Desa Talawaan’文件夹的访问权限。",
      folderLabel: "Google Drive 上的活动文件夹：",
      uploadAreaTitle: "拖拽或点击此处上传文件",
      uploadAreaSubtitle: "支持旅游相片 (JPG, PNG)、视频、门票收据 PDF 等。",
      selectFileBtn: "手动选择文件",
      fileListTitle: "您的专属旅游备份",
      noFiles: "此文件夹中尚无文件。开始备份您的探险照片吧！",
      renamePlaceholder: "输入新文件名...",
      saveBtn: "保存",
      cancelBtn: "取消",
      confirmDelete: "您确定要从个人 Google 云端硬盘中永久删除此文件吗？此操作无法撤销。",
      viewOnDrive: "在云端硬盘中打开",
      toastUploadSuccess: "文件成功备份到您的 Google 云端硬盘！",
      toastDeleteSuccess: "文件成功从云端硬盘中删除。",
      toastRenameSuccess: "文件名修改成功。",
      fetchingStatus: "正在连接云端硬盘服务...",
      emptyLibrary: "存储空间为空",
      size: "大小",
      created: "时间"
    },
    ko: {
      title: "드라이브 및 클라우드 저장소",
      desc: "모든 투어 사진, 예약 티켓 및 빌리지 서류를 개인 Google 드라이브 계정에 안전하게 저장, 보관 및 백업하세요.",
      signInBtn: "Google 계정 로그인",
      signOutBtn: "로그아웃",
      authRequired: "인증 필요",
      authRequiredDesc: "전용 'Wisata Desa Talawaan' 폴더 파일 액세스 권한을 부여하려면 Google 계정으로 로그인해 주세요.",
      folderLabel: "Google 드라이브의 활성 폴더:",
      uploadAreaTitle: "여기로 파일 드래그 & 드롭 또는 클릭하여 업로드",
      uploadAreaSubtitle: "여행 사진 (JPG, PNG), 비디오 파일, 영수증 캡처 PDF 등을 지원합니다.",
      selectFileBtn: "수동 파일 선택",
      fileListTitle: "개인 여행 백업 덤프",
      noFiles: "이 폴더에 저장된 파일이 아직 없습니다. 모험 사진을 백업해 보세요!",
      renamePlaceholder: "새 파일 이름...",
      saveBtn: "저장",
      cancelBtn: "취소",
      confirmDelete: "Google 드라이브에서 이 파일을 영구적으로 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
      viewOnDrive: "드라이브에서 열기",
      toastUploadSuccess: "Google 드라이브에 안전하게 백업되었습니다!",
      toastDeleteSuccess: "드라이브 파일이 정상적으로 삭제되었습니다.",
      toastRenameSuccess: "파일 이름이 변경되었습니다.",
      fetchingStatus: "드라이브 연동 로딩 중...",
      emptyLibrary: "저장소 비어 있음",
      size: "용량",
      created: "생성일"
    },
    vi: {
      title: "Thư Viện Ảnh & Lưu Trữ Đám Mây",
      desc: "Lưu trữ, sắp xếp và sao lưu an toàn mọi ảnh chụp kỳ nghỉ, vé điện tử hay hồ sơ hành chính trực tiếp vào tài khoản Google Drive cá nhân của bạn.",
      signInBtn: "Đăng nhập Google",
      signOutBtn: "Đăng Xuất",
      authRequired: "Yêu Cầu Xác Thực",
      authRequiredDesc: "Vui lòng đăng nhập Google để cấp quyền duyệt và lưu trữ tệp tin trong thư mục 'Wisata Desa Talawaan' của bạn.",
      folderLabel: "Thư mục hoạt động trên Google Drive:",
      uploadAreaTitle: "Kéo thả tệp tin hoặc Click vào đây để chọn tệp",
      uploadAreaSubtitle: "Hỗ trợ ảnh trải nghiệm (JPG, PNG), video (MP4), hóa đơn hay tệp PDF du lịch.",
      selectFileBtn: "Chọn Tệp Thủ Công",
      fileListTitle: "Tệp Tin Sao Lưu Của Bạn",
      noFiles: "Chưa có cuộc sao lưu nào tại đây. Hãy tải lên tấm hình thám hiểm đầu tiên!",
      renamePlaceholder: "Nhập tên mới của tệp...",
      saveBtn: "Lưu",
      cancelBtn: "Hủy",
      confirmDelete: "Bạn có chắc chắn muốn xóa tệp này vĩnh viễn khỏi Google Drive cá nhân không? Hành động này không thể hoàn tác.",
      viewOnDrive: "Xem trên Drive",
      toastUploadSuccess: "Tệp tin đã được sao lưu vào Google Drive thành công!",
      toastDeleteSuccess: "Đã xóa tệp tin khỏi ổ đĩa.",
      toastRenameSuccess: "Đổi tên tệp thành công.",
      fetchingStatus: "Đang kết nối lưu trữ Drive...",
      emptyLibrary: "Bộ nhớ trống",
      size: "Kích thước",
      created: "Ngày tạo"
    },
    la: {
      title: "Tabularium et Arca Nubila",
      desc: "Servate, ordinate, et fulcite omnes imagines peregrinationum vestrarum, tesseras digitales et chartas monumentorum in Google Drive privatum vestrum secure.",
      signInBtn: "Inire cum Google",
      signOutBtn: "Abire",
      authRequired: "Auctoritas Necessaria Est",
      authRequiredDesc: "Quaesumus inite cum Google ut potestatem librariae 'Wisata Desa Talawaan' concedatis.",
      folderLabel: "Armarium activum in Google Drive:",
      uploadAreaTitle: "Trahe & Depone Scatulas hic aut tange",
      uploadAreaSubtitle: "Imagines peregrinationis (JPG, PNG), pelliculas, tesseras digitalas PDF fovet.",
      selectFileBtn: "Elige Librum",
      fileListTitle: "Acta Peregrinatoris Privata",
      noFiles: "Nihil libri in arca est. Primo fulcite imagines itineris vestri!",
      renamePlaceholder: "Scribite novum nomen scrinii...",
      saveBtn: "Serva",
      cancelBtn: "Demitte",
      confirmDelete: "Esne certus te hanc chartam ex Google Drive in perpetuum delere velle? Haec actio irritari non potest.",
      viewOnDrive: "Aperi in Drive",
      toastUploadSuccess: "Scrinium secure servatum est in Google Drive!",
      toastDeleteSuccess: "Scrinium deletum est ex arca.",
      toastRenameSuccess: "Nomen chartae mutatum est.",
      fetchingStatus: "Iungens tabularium Drive...",
      emptyLibrary: "Tabularium vacuum est",
      size: "Magnitudo",
      created: "Creatum"
    }
  };

  const t = texts[lang] || texts["id"];

  // Initialize listener
  useEffect(() => {
    const unsub = initGoogleAuth(
      (currentUser, activeToken) => {
        setUser(currentUser);
        setToken(activeToken);
        setLoading(false);
        loadFolderAndFiles(activeToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );

    // Check if token already loaded in-memory
    const activeToken = getCachedToken();
    if (activeToken) {
      setToken(activeToken);
      loadFolderAndFiles(activeToken);
    }

    return () => {
      unsub();
    };
  }, []);

  // Subscribe to public trip documentations in real-time
  useEffect(() => {
    const unsub = subscribeTripDocumentations((data) => {
      setPublicDocs(data);
    });
    return () => {
      unsub();
    };
  }, []);

  const loadFolderAndFiles = async (authToken: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get or create dedicated folder Wisata Desa Talawaan
      const folderId = await getOrCreateFolder(authToken, "Wisata Desa Talawaan");
      setFolderId(folderId);

      // List files inside folder
      const fileList = await listDriveFiles(authToken, folderId);
      setFiles(fileList);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to sync folder storage.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        await loadFolderAndFiles(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      const errStr = (err?.code || err?.message || "").toLowerCase();
      if (errStr.includes("popup-closed-by-user") || errStr.includes("cancelled") || errStr.includes("closed")) {
        const cancelTexts = {
          id: "Proses masuk dibatalkan atau jendela ditutup. Silakan coba tekan tombol masuk sekali lagi jika ingin mencadangkan berkas.",
          en: "The sign-in window was closed or cancelled. Please try clicking the sign-in button again if you wish to back up files.",
          zh: "登录窗口已关闭或已取消。如果您需要备份文件，请再次尝试点击登录按钮。",
          ko: "로그인 창이 닫혔거나 취소되었습니다. 파일을 백업하려면 로그인 버튼을 다시 클릭해 주세요.",
          vi: "Cửa sổ đăng nhập đã bị đóng hoặc hủy. Vui lòng nhấp vào nút đăng nhập lại để sao lưu các tệp.",
          la: "Fenestra inundi clausa vel cancellata est. Quaesumus preme inire button iterum si documenta servare vis."
        };
        setError(cancelTexts[lang] || cancelTexts["id"]);
      } else {
        setError(err?.message || "Oauth Login window closed or blocked.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleSignOut = async () => {
    setActionLoading(true);
    try {
      await googleSignOut();
      setUser(null);
      setToken(null);
      setFiles([]);
      setFolderId("");
    } catch (err: any) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Helper formatting for file size
  const formatBytes = (bytesStr?: string) => {
    if (!bytesStr) return "N/A";
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes) || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Drag and Drop files upload controls Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processUploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processUploadFiles(e.target.files);
    }
  };

  const processUploadFiles = async (fileList: FileList) => {
    if (!token) return;
    setActionLoading(true);
    setError(null);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        await uploadToDrive(token, file, folderId);
      }
      
      // Refresh list
      const updatedList = await listDriveFiles(token, folderId);
      setFiles(updatedList);
      alert(t.toastUploadSuccess);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error occurred during file upload.");
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Rename trigger
  const handleStartRename = (file: DriveFile) => {
    setEditingFileId(file.id);
    setEditNameValue(file.name);
  };

  const handleSaveRename = async (fileId: string) => {
    if (!token || !editNameValue.trim()) return;
    setActionLoading(true);
    setError(null);

    try {
      await renameDriveFile(token, fileId, editNameValue.trim());
      setEditingFileId(null);
      
      // Refresh list
      const updatedList = await listDriveFiles(token, folderId);
      setFiles(updatedList);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to commit renamed file.");
    } finally {
      setActionLoading(false);
    }
  };

  // Action: Delete trigger (Requires explicit user confirmation alert as mandated!)
  const handleDeleteClick = async (fileId: string) => {
    if (!token) return;
    const isApproved = window.confirm(t.confirmDelete);
    if (!isApproved) return;

    setActionLoading(true);
    setError(null);

    try {
      await deleteDriveFile(token, fileId);
      
      // Refresh list
      const updatedList = await listDriveFiles(token, folderId);
      setFiles(updatedList);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "File removal process encountered an error.");
    } finally {
      setActionLoading(false);
    }
  };

  const triggerManualFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <FileImage className="h-6 w-6 text-emerald-600" />;
    } else if (mimeType.startsWith("video/")) {
      return <Video className="h-6 w-6 text-blue-600" />;
    } else if (mimeType.includes("pdf") || mimeType.includes("word") || mimeType.includes("document")) {
      return <FileText className="h-6 w-6 text-red-600" />;
    }
    return <File className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="google-drive-integration-viewport">
      {/* Upper header section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-forest-900 flex items-center justify-center sm:justify-start space-x-3">
          <Cloud className="h-8 w-8 text-forest-600" />
          <span>{t.title}</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="space-y-6 animate-fade-in" id="guest-public-documentations-library">
          {/* Public Guest Search Field */}
          <div className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-gray-950 flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-gold-500" />
              <span>{lang === "id" ? "Temukan Dokumentasi Liburan Anda" : "Retrieve Your Tour Highlights"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl">
              {lang === "id" 
                ? "Masukkan nama lengkap Anda, nama rombongan, atau tanggal kunjungan wisata untuk mengunduh seluruh file foto & video kenangan trip secara publik tanpa login."
                : "Enter your family group name, visit date, or package title below to access full high-definition trip media instantly, registration-free."}
            </p>
            <div className="relative max-w-xl w-full pt-2">
              <Search className="absolute left-4 top-5.5 h-4.5 w-4.5 text-gray-400" />
              <input
                type="text"
                value={searchDocKeyword}
                onChange={(e) => setSearchDocKeyword(e.target.value)}
                placeholder={lang === "id" ? "Cari nama rombongan, tanggal trip, atau paket..." : "Search family name, visit date, package name..."}
                className="w-full pl-11 pr-5 py-3.5 bg-sand-50 hover:bg-sand-100/50 border border-sand-200 focus:bg-white focus:border-forest-500 focus:ring-1 focus:ring-forest-500 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder-gray-400 font-mono"
              />
            </div>
          </div>

          {/* Results Block */}
          {publicDocs.length === 0 ? (
            <div className="bg-white border border-sand-200 rounded-3xl p-16 text-center shadow-sm space-y-4">
              <Sparkles className="h-8 w-8 text-gold-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-gray-950">{lang === "id" ? "Belum Ada Dokumentasi Publik" : "No Albums Available"}</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                {lang === "id" 
                  ? "Belum ada link folder dokumentasi yang disematkan oleh admin desa saat ini."
                  : "Administration has not loaded any tourist outing directories today."}
              </p>
            </div>
          ) : (
            (() => {
              const filteredDocs = publicDocs.filter(d => 
                d.guestName.toLowerCase().includes(searchDocKeyword.toLowerCase()) ||
                d.packageName.toLowerCase().includes(searchDocKeyword.toLowerCase()) ||
                d.tripDate.includes(searchDocKeyword)
              );

              if (filteredDocs.length === 0) {
                return (
                  <div className="bg-white border border-sand-200 rounded-3xl p-16 text-center shadow-sm space-y-4 animate-fade-in">
                    <HelpCircle className="h-8 w-8 text-gray-400 mx-auto animate-bounce" />
                    <h3 className="font-serif text-lg font-bold text-gray-950">{lang === "id" ? "Tidak Ditemukan" : "No Outings Found"}</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                      {lang === "id" 
                        ? `Tidak ada dokumentasi trip dengan kata kunci "${searchDocKeyword}". Pastikan ejaan nama rombongan atau tanggal wisata benar.`
                        : `No folders correspond to keywords "${searchDocKeyword}". Retry details.`}
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {filteredDocs.map((docItem, idx) => (
                    <motion.div
                      key={docItem.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-sand-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Package Badge */}
                        <div className="flex items-center justify-between">
                          <span className="bg-gold-50 text-gold-700 hover:bg-gold-100 border border-gold-200/50 py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                            {docItem.id}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-300" />
                            <span>{docItem.tripDate}</span>
                          </span>
                        </div>

                        {/* Title Info */}
                        <div className="space-y-1">
                          <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">
                            {lang === "id" ? "Paket Wisata" : "Toured Booking"}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-gray-950">
                            {docItem.packageName}
                          </h3>
                        </div>

                        {/* Guest / Group Details */}
                        <div className="space-y-1">
                          <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">
                            {lang === "id" ? "Nama Rombongan Tamu" : "Group Client Name"}
                          </span>
                          <p className="font-serif text-base sm:text-lg font-bold text-forest-800 leading-snug">
                            {docItem.guestName}
                          </p>
                        </div>

                        {/* Optional notes */}
                        {docItem.notes && (
                          <div className="bg-sand-50/60 border border-sand-150 p-3 rounded-xl text-xs text-gray-500 leading-relaxed italic">
                            <span>"{docItem.notes}"</span>
                          </div>
                        )}
                      </div>

                      {/* Download Button */}
                      <div className="mt-6 pt-4 border-t border-sand-150">
                        <a
                          href={docItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-forest-750 hover:bg-forest-850 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-xl shadow transition-all flex items-center justify-center space-x-2 cursor-pointer border border-forest-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>{lang === "id" ? "Unduh / Akses Foto & Dokumentasi ↗" : "Get Media & Photos ↗"}</span>
                        </a>
                        <p className="text-[10px] text-gray-400 text-center mt-2.5 leading-relaxed font-medium">
                          {lang === "id" 
                            ? "*Link cloud folder publik resmi aman. Klik untuk buka, tonton, & unduh langsung tanpa login." 
                            : "*A completely secure open-access cloud folder. Enjoy direct streaming and downloads registration-free."}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      {false && (
        <>
          {/* Primary loading indicator */}
          {loading && !user && (
            <div className="bg-white border border-sand-200 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 text-forest-600 animate-spin" />
              <p className="mt-4 text-xs font-semibold text-gray-500 tracking-wider uppercase font-mono">{t.fetchingStatus}</p>
            </div>
          )}

      {/* ERROR CARRIER BANNER */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3 text-red-700 text-xs sm:text-sm animate-fade-in">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="grow">
            <span className="font-extrabold block">Transaction Encountered Issue:</span>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="font-bold hover:underline select-none cursor-pointer">dismiss</button>
        </div>
      )}

      {/* ACTIONS PROGRESS BANNER */}
      {actionLoading && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest-900 text-sand-50 py-3 px-5 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-bounce">
          <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
          <span>Syncing with Google Cloud servers...</span>
        </div>
      )}

      {/* UNAUTHORIZED / LOGIN PLACEHOLDER PAGE CARD */}
      {!loading && !user && (
        <div className="bg-white border border-sand-200 rounded-3xl p-8 sm:p-12 text-center shadow-lg max-w-2xl mx-auto py-16 flex flex-col items-center">
          <div className="h-16 w-16 bg-forest-50 text-forest-700 rounded-2xl flex items-center justify-center mb-6 border border-forest-100">
            <Lock className="h-8 w-8 text-forest-600" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-2">
            {t.authRequired}
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            {t.authRequiredDesc}
          </p>

          {/* Elegant Sign-In buttons */}
          <button
            onClick={handleSignIn}
            disabled={actionLoading}
            id="drive-sign-in-gsi"
            className="flex items-center space-x-3.5 bg-white hover:bg-sand-50 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-xl px-5 py-3 shadow-md transition-all hover:shadow-lg disabled:opacity-50 select-none cursor-pointer"
          >
            <div className="h-5 w-5 flex items-center justify-center shrink-0">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">{t.signInBtn}</span>
          </button>
        </div>
      )}

      {/* AUTHORIZED WORKPLACE VIEW PANEL */}
      {!loading && user && (
        <div className="space-y-8 animate-fade-in" id="authorized-drive-dashboard">
          
          {/* Active User Board Details */}
          <div className="bg-white border border-sand-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
            
            <div className="flex items-center space-x-3.5 self-start sm:self-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "Google User Profile"} 
                  className="h-12 w-12 rounded-full border border-sand-300 shadow-inner"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-12 w-12 bg-forest-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-inner">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className="block text-sm font-bold text-gray-950 leading-tight">
                  {user.displayName || "Google Kawanua Reader"}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Folder Indicator detail */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-forest-50/50 rounded-xl border border-sand-200 max-w-full truncate text-[11px] sm:text-xs">
              <Folder className="h-4 w-4 text-forest-600 shrink-0" />
              <span className="text-gray-500 shrink-0">{t.folderLabel}</span>
              <span className="text-forest-800 font-bold font-mono">Wisata Desa Talawaan</span>
            </div>

            {/* Reload and Logout Action Control Buttons */}
            <div className="flex items-center space-x-2.5 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-sand-100">
              <button
                onClick={() => loadFolderAndFiles(token!)}
                disabled={actionLoading}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white text-gray-700 hover:text-forest-700 border border-sand-200 shadow-sm hover:bg-sand-100/50 transition duration-200 grow sm:grow-0 select-none cursor-pointer"
                title="Refresh Folder Contents"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${actionLoading ? "animate-spin text-forest-600" : ""}`} />
                <span className="inline sm:hidden lg:inline">Refresh</span>
              </button>

              <button
                onClick={handleSignOut}
                disabled={actionLoading}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-700 hover:bg-red-100/60 border border-red-100 transition duration-200 grow sm:grow-0 select-none cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t.signOutBtn}</span>
              </button>
            </div>
          </div>

          {/* ACTIVE DRAG AND DROP UPLOADER CONTAINER */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerManualFileInput}
            className={`cursor-pointer border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 relative group select-none ${
              dragActive 
                ? "border-forest-600 bg-forest-50/20 scale-[0.99] shadow-inner" 
                : "border-sand-300 bg-white hover:bg-sand-50/40 hover:border-forest-400"
            }`}
            id="drag-drop-drive-uploader"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple 
              className="hidden" 
              accept="image/*,video/*,application/pdf"
            />
            
            <div className={`mx-auto h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-115 ${
              dragActive ? "bg-forest-100 text-forest-800" : "bg-sand-100 text-gray-500"
            }`}>
              <Upload className={`h-8 w-8 ${dragActive ? "animate-bounce text-forest-600" : "text-gray-500"}`} />
            </div>

            <h3 className="text-base sm:text-lg font-bold font-display text-gray-900 group-hover:text-forest-800 transition-colors">
              {t.uploadAreaTitle}
            </h3>
            <p className="mt-1 text-xs text-gray-500 max-w-md mx-auto">
              {t.uploadAreaSubtitle}
            </p>
            
            <button
              type="button"
              className="mt-5 inline-flex items-center px-4 py-2 text-xs font-bold rounded-xl border border-sand-300 bg-white text-gray-700 hover:text-forest-700 shadow-sm transition-all cursor-pointer"
            >
              {t.selectFileBtn}
            </button>
          </div>

          {/* ALBUM COMPULSORY SUBVIEW */}
          <div className="bg-white border border-sand-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Folder className="h-5 w-5 text-forest-600 mr-2" />
              <span>{t.fileListTitle}</span>
              <span className="ml-2.5 bg-sand-100 text-gray-600 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                {files.length}
              </span>
            </h2>

            {/* List emptiness check */}
            {files.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center border border-dashed border-sand-100 rounded-2xl">
                <Cloud className="h-12 w-12 text-sand-300 mb-3" />
                <h3 className="text-sm font-bold text-gray-800">{t.emptyLibrary}</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm">
                  {t.noFiles}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="drive-album-grid-layout">
                {files.map((file) => {
                  const isEditing = editingFileId === file.id;

                  return (
                    <div 
                      key={file.id} 
                      className="bg-sand-50/40 border border-sand-200 hover:border-sand-300 rounded-2xl overflow-hidden p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200"
                      id={`drive-file-card-${file.id}`}
                    >
                      <div>
                        {/* Thumbnail or File placeholder */}
                        <div className="h-36 bg-white border border-sand-100 rounded-xl flex items-center justify-center relative overflow-hidden group shadow-inner">
                          {file.thumbnailLink ? (
                            <img 
                              src={file.thumbnailLink.replace("=s220", "=s400")} 
                              alt={file.name} 
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              {getFileIcon(file.mimeType)}
                              <span className="block text-[9px] text-gray-400 mt-2 tracking-wide uppercase font-mono truncate max-w-[140px]">
                                {file.mimeType.split("/")[1] || "File"}
                              </span>
                            </div>
                          )}

                          {/* Quick direct overlay for Drive links */}
                          {file.webViewLink && (
                            <a 
                              href={file.webViewLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 h-7 w-7 bg-black/50 hover:bg-black/70 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              title={t.viewOnDrive}
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>

                        {/* File detail blocks */}
                        <div className="mt-4">
                          {isEditing ? (
                            <div className="flex flex-col space-y-2">
                              <input 
                                type="text" 
                                value={editNameValue}
                                onChange={(e) => setEditNameValue(e.target.value)}
                                className="w-full bg-white border border-forest-300 rounded-xl px-2.5 py-1.5 text-xs text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-forest-500"
                                placeholder={t.renamePlaceholder}
                                autoFocus
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSaveRename(file.id)}
                                  className="px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-lg bg-forest-600 text-white hover:bg-forest-700 cursor-pointer"
                                >
                                  {t.saveBtn}
                                </button>
                                <button
                                  onClick={() => setEditingFileId(null)}
                                  className="px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-lg bg-white border border-sand-200 text-gray-600 hover:bg-sand-50 cursor-pointer"
                                >
                                  {t.cancelBtn}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between min-w-0">
                              <span className="text-xs sm:text-sm font-bold text-gray-900 truncate pr-2 block max-w-[80%]" title={file.name}>
                                {file.name}
                              </span>
                              <button
                                onClick={() => handleStartRename(file)}
                                className="text-gray-400 hover:text-forest-600 p-0.5 shrink-0 cursor-pointer"
                                title="Rename File"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Sizes / Date details */}
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 text-[10px] sm:text-xs text-gray-400 font-mono">
                            {file.size && (
                              <span>
                                {t.size}: <strong className="text-gray-600 font-sans">{formatBytes(file.size)}</strong>
                              </span>
                            )}
                            {file.createdTime && (
                              <span>
                                {t.created}: <strong className="text-gray-600 font-sans">{new Date(file.createdTime).toLocaleDateString(lang === "id" ? "id-ID" : "en-US")}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card lower action layout */}
                      <div className="mt-4 pt-3.5 border-t border-sand-100/80 flex items-center justify-between">
                        {file.webViewLink ? (
                          <a 
                            href={file.webViewLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] sm:text-xs text-forest-700 hover:text-forest-800 font-semibold flex items-center space-x-1 hover:underline cursor-pointer"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            <span>{t.viewOnDrive}</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400">Locked Asset</span>
                        )}

                        <button
                          onClick={() => handleDeleteClick(file.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg border border-transparent hover:border-red-100 transition-all cursor-pointer"
                          title="Delete File Permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )}
</div>
  );
}
