import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from "firebase/auth";
import { app, auth, isFirebaseActive } from "./firebase";

// Instantiating standard provider with needed scopes
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive");
provider.addScope("https://www.googleapis.com/auth/drive.file");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize Google OAuth listener
export const initGoogleAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  if (!isFirebaseActive || !auth) {
    if (onAuthFailure) onAuthFailure();
    return () => {};
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in via Popup window
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (!isFirebaseActive || !auth) {
    throw new Error("Firebase auth system is not fully active. Check connection parameters.");
  }
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get Google OAuth access token from popup response.");
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Popup Sign in Error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Log out and wipe cached session details
export const googleSignOut = async () => {
  if (auth) {
    await signOut(auth);
  }
  cachedAccessToken = null;
};

export const getCachedToken = (): string | null => {
  return cachedAccessToken;
};

// GOOGLE DRIVE API UTILITIES

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  size?: string;
  createdTime?: string;
  iconLink?: string;
}

// 1. Check/Retrieve or Create a target album folder on user's Google Drive
export async function getOrCreateFolder(token: string, folderName: string = "Wisata Desa Talawaan"): Promise<string> {
  try {
    // Search if folder already exists
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(folderName)}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id)`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!searchRes.ok) {
      let errorDetail = "";
      try {
        const errorJson = await searchRes.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${searchRes.status} (${searchRes.statusText || "No Status Description"})`;
      }
      throw new Error(`Google Drive Search Failed: ${errorDetail}`);
    }

    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }

    // Create folder if not found
    const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: folderName,
        mimeType: "application/vnd.google-apps.folder"
      })
    });

    if (!createRes.ok) {
      let errorDetail = "";
      try {
        const errorJson = await createRes.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${createRes.status} (${createRes.statusText || "No Status Description"})`;
      }
      throw new Error(`Failed to create folder: ${errorDetail}`);
    }

    const folder = await createRes.json();
    return folder.id;
  } catch (error) {
    console.error("Error creating/acquiring Drive folder:", error);
    throw error;
  }
}

// 2. Clear listing of files inside a folder (or any file if no folder ID is supplied)
export async function listDriveFiles(token: string, folderId?: string): Promise<DriveFile[]> {
  try {
    let q = "trashed = false";
    if (folderId) {
      q += ` and '${folderId}' in parents`;
    }

    const fields = "files(id,name,mimeType,thumbnailLink,webViewLink,size,createdTime,iconLink)";
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&orderBy=createdTime desc&pageSize=50&fields=${fields}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      let errorDetail = "";
      try {
        const errorJson = await res.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${res.status} (${res.statusText || "No Status Description"})`;
      }
      throw new Error(`Failed to inventory files: ${errorDetail}`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("Error listing Drive files:", error);
    throw error;
  }
}

// 3. Upload a file to a specific Drive folder (using the Multipart FormData protocol)
export async function uploadToDrive(token: string, file: File, folderId?: string): Promise<DriveFile> {
  try {
    const metadata: any = {
      name: file.name
    };
    if (folderId) {
      metadata.parents = [folderId];
    }

    const formData = new FormData();
    formData.append(
      "metadata", 
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("file", file);

    const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,thumbnailLink,webViewLink,size,createdTime,iconLink";
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      let errorDetail = "";
      try {
        const errorJson = await res.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${res.status} (${res.statusText || "No Status Description"})`;
      }
      throw new Error(`Upload transaction failed: ${errorDetail}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error committing upload to Drive:", error);
    throw error;
  }
}

// 4. Update file metadata (Rename file)
export async function renameDriveFile(token: string, fileId: string, newName: string): Promise<DriveFile> {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    });

    if (!res.ok) {
      let errorDetail = "";
      try {
        const errorJson = await res.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${res.status} (${res.statusText || "No Status Description"})`;
      }
      throw new Error(`File rename failed: ${errorDetail}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error renaming Drive file:", error);
    throw error;
  }
}

// 5. Delete file (Permanently remove or trash)
export async function deleteDriveFile(token: string, fileId: string): Promise<void> {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      let errorDetail = "";
      try {
        const errorJson = await res.json();
        errorDetail = errorJson.error?.message || JSON.stringify(errorJson);
      } catch (_) {
        errorDetail = `HTTP ${res.status} (${res.statusText || "No Status Description"})`;
      }
      throw new Error(`File delete transaction failed: ${errorDetail}`);
    }
  } catch (error) {
    console.error("Error deleting Drive file:", error);
    throw error;
  }
}
