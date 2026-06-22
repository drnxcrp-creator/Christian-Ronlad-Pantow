import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Safely evaluate whether real credentials have been supplied
export const isFirebaseActive = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId);

let app;
let db: any = null;
let auth: any = null;

if (isFirebaseActive) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    // CRITICAL: The application will break if the database ID property is omitted during construction
    db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || "(default)");
    auth = getAuth(app);
  } catch (error) {
    console.warn("Failed to initialize Firebase with configured JSON:", error);
  }
}

export { app, db, auth };

// Explicit required operation type enum from skill
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Mandatory custom error handler of the Firebase Integration Skill
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.currentUser?.uid || null,
      email: currentAuth?.currentUser?.email || null,
      emailVerified: currentAuth?.currentUser?.emailVerified || null,
      isAnonymous: currentAuth?.currentUser?.isAnonymous || null,
      tenantId: currentAuth?.currentUser?.tenantId || null,
      providerInfo: currentAuth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Permission Error Context: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
