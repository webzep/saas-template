import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

// Lazy initialization helpers
let _firestore: Firestore | null = null;
let _storage: Storage | null = null;

const initFirebase = () => {
	if (!process.env.FIREBASE_PRIVATE_KEY) {
		console.error("FIREBASE_PRIVATE_KEY is not defined");
		return false;
	}

	if (getApps().length === 0) {
		try {
			const config = {
				credential: cert({
					clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
					privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
					projectId: process.env.FIREBASE_PROJECT_ID
				}),
				databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
				storageBucket: process.env.FIREBASE_STORAGE_BUCKET
			};

			initializeApp(config);
		} catch (error) {
			console.error("Error initializing Firebase:", error);
			return false;
		}
	}

	return true;
};

// Lazy getters that initialize only when needed
export const getFirestoreInstance = (): Firestore => {
	if (_firestore === null) {
		if (initFirebase()) {
			_firestore = getFirestore();
		} else {
			throw new Error("Firebase initialization failed");
		}
	}
	return _firestore;
};

export const getStorageInstance = (): Storage => {
	if (_storage === null) {
		if (initFirebase()) {
			_storage = getStorage();
		} else {
			throw new Error("Firebase initialization failed");
		}
	}
	return _storage;
};

// Backward compatibility
export const firestore = getFirestoreInstance;
export const storage = getStorageInstance;
