import { firestore } from "./firestore";
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
		const doc = await firestore.collection(collection).doc(id).get();
		if (!doc.exists) throw new Error("Document not found");

		const data = doc.data();
		if (!data) throw new Error("Document data not found");

		return data as T;
	},
	async findWhere(field: string, value: string) {
		const snapshot = await firestore.collection(collection).where(field, "==", value).get();
		if (snapshot.empty) return [];

		const data = snapshot.docs.map((doc) => doc.data());
		return data as T[];
	},
	async set<K extends DocumentData>(id: string, data: K) {
		const now = new Date().toISOString();
		const documentData = {
			...data,
			created_at: data.created_at || now,
			updated_at: now
		};

		await firestore
			.collection(collection)
			.doc(id)
			.set(documentData)
			.catch((error) => {
				throw new Error(`Error writing document: ${error}`);
			});
		return true;
	},
	async update(id: string, data: DeepPartial<T>) {
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
		await firestore
			.collection(collection)
			.doc(id)
			.update({ [field]: FieldValue.delete() });
	},
	async createEmpty() {
		const doc = firestore.collection(collection).doc();
		return doc.id;
	}
});
