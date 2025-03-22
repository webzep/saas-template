import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const initFirebase = () => {
	if (!process.env.FIREBASE_PRIVATE_KEY) {
		console.error("FIREBASE_PRIVATE_KEY is not defined");
		return false;
	}

	if (getApps().length === 0) {
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
	}

	return true;
};
initFirebase();

export const firestore = getFirestore();
export const storage = getStorage();
