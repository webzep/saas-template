import type { Theme } from "@repo/models";

// Determines the effective theme based on the user's choice and system settings.
function getEffectiveTheme(theme: Theme) {
	if (theme === "system" && window.matchMedia) {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}
	return theme === "dark" ? "dark" : "light";
}

/**
 * Applies the theme by setting the document’s data-theme attribute.
 * If the theme is "system", a media query listener is added to update the attribute
 * when the system preference changes.
 *
 * Returns a cleanup function to remove any listeners.
 */
export function applyTheme(theme: Theme): () => void {
	const updateAttr = () =>
		document.documentElement.setAttribute("data-theme", getEffectiveTheme(theme));

	// Set it immediately
	updateAttr();

	let mediaQuery: MediaQueryList | null = null;
	let removeListener = () => {};

	if (theme === "system" && window.matchMedia) {
		mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => updateAttr();
		mediaQuery.addEventListener("change", handleChange);
		removeListener = () => {
			mediaQuery?.removeEventListener("change", handleChange);
		};
	}

	return removeListener;
}

export function applyFontScale(font_scale: number): () => void {
	document.documentElement.style.setProperty("--font-scale", font_scale.toString());
	return () => {};
}
