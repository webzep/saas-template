import Confirm from "./Confirm.svelte";
import { mount, unmount } from "svelte";

export interface ConfirmOptions {
	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
}

/**
 * Programmatically renders a confirmation dialog.
 * Resolves with true if the user confirms; false if cancelled.
 */
export function confirm(opts: ConfirmOptions = {}): Promise<boolean> {
	return new Promise((resolve) => {
		// Mount the ConfirmDialog component programmatically.
		const component = mount(Confirm, {
			target: document.body,
			props: {
				open: true,
				title: opts.title ?? "Confirm Action",
				message: opts.message ?? "Are you sure you want to proceed?",
				confirmText: opts.confirmText ?? "Yes",
				cancelText: opts.cancelText ?? "Cancel",
				onConfirm: () => {
					resolve(true);
					unmount(component);
				},
				onCancel: () => {
					resolve(false);
					unmount(component);
				}
			}
		});
	});
}
