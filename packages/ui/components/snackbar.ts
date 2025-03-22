import { writable } from "svelte/store";

export type SnackOptions = {
	text?: string;
	timeout?: number;
};

export type SnackType = "info" | "success" | "error" | "warning";

export type SnackItem = SnackOptions & {
	id: number;
	type: SnackType;
};

function createPantry() {
	const { subscribe, update } = writable<SnackItem[]>([]);

	function add(message: SnackItem) {
		if (!message.text) {
			console.warn("snackbar: message.text is required");
			return;
		}

		update((msgs) => [...msgs, message]);
		// Auto-remove after timeout (default 3000ms) unless timeout is explicitly 0.
		if (message.timeout !== 0) {
			setTimeout(() => {
				remove(message.id);
			}, message.timeout || 3000);
		}
	}

	function remove(id: number) {
		update((msgs) => msgs.filter((m) => m.id !== id));
	}

	return {
		subscribe,
		info: (opts: SnackOptions) => {
			add({ id: Date.now(), type: "info", ...opts });
		},
		success: (opts: SnackOptions) => {
			add({ id: Date.now(), type: "success", ...opts });
		},
		error: (opts: SnackOptions) => {
			add({ id: Date.now(), type: "error", ...opts });
		},
		warning: (opts: SnackOptions) => {
			add({ id: Date.now(), type: "warning", ...opts });
		},
		push: (opts: SnackOptions & { type: SnackType }) => {
			add({ id: Date.now(), ...opts });
		},
		remove
	};
}

export const snackbar = createPantry();
