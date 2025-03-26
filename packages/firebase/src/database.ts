import { getFirestoreInstance } from "./firestore";
import type { DocumentData } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export enum Collection {
	NEWSLETTER = "newsletter",
	UPLOADS = "uploads",
	USERS = "users"
}

export const db = <T>(collection: Collection) => ({
	async find(id: string) {
		try {
			const firestore = getFirestoreInstance();
			const doc = await firestore.collection(collection).doc(id).get();
			if (!doc.exists) return undefined;

			const data = doc.data();
			if (!data) return undefined;

			return data as T;
		} catch (error) {
			console.warn(`Error finding document in ${collection}/${id}:`, error);
			return undefined;
		}
	},
	async findWhere(field: string, value: string) {
		try {
			const firestore = getFirestoreInstance();
			const snapshot = await firestore.collection(collection).where(field, "==", value).get();
			if (snapshot.empty) return [];

			const data = snapshot.docs.map((doc) => doc.data());
			return data as T[];
		} catch (error) {
			console.warn(`Error finding documents in ${collection} where ${field} == ${value}:`, error);
			return [];
		}
	},
	async set<K extends DocumentData>(id: string, data: K) {
		const firestore = getFirestoreInstance();

		const now = new Date().toISOString();
		const documentData = {
			...data,
			created_at: data.created_at || now,
			updated_at: now
		};

		return await firestore
			.collection(collection)
			.doc(id)
			.set(documentData)
			.catch((error) => {
				console.warn(`Error writing document: ${error}`);
				return false;
			})
			.then(() => true);
	},
	async update(id: string, data: DeepPartial<T>) {
		const firestore = getFirestoreInstance();
		const updateData = {
			...data,
			updated_at: new Date().toISOString()
		};

		await firestore
			.collection(collection)
			.doc(id)
			.set(updateData, { merge: true })
			.catch((error) => {
				throw new Error(`Error updating document: ${error}`);
			});
		return true;
	},
	async delete(id: string) {
		const firestore = getFirestoreInstance();
		await firestore
			.collection(collection)
			.doc(id)
			.delete()
			.catch((error) => {
				throw new Error(`Error deleting document: ${error}`);
			});
		return true;
	},
	async deleteField(id: string, field: keyof T) {
		const firestore = getFirestoreInstance();
		await firestore
			.collection(collection)
			.doc(id)
			.update({ [field]: FieldValue.delete() });
	},
	async createEmpty() {
		const firestore = getFirestoreInstance();
		const doc = firestore.collection(collection).doc();
		return doc.id;
	}
});
