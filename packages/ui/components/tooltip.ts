export function tooltip(element: HTMLElement) {
	let div: HTMLDivElement;
	let title: string | null;

	function mouseOver(event: MouseEvent): void {
		// Get and remove the title attribute.
		title = element.getAttribute("title");
		element.removeAttribute("title");

		// Create the tooltip element.
		div = document.createElement("div");
		div.textContent = title || "";
		div.style.cssText = `
			background: var(--surface-dark);
			border-radius: var(--radius-field);
			color: var(--on-surface-dark);
			padding: var(--spacing-1) var(--spacing-2);
			position: absolute;
			opacity: 0;
			z-index: 1200;
		`;
		document.body.appendChild(div);

		// Defer measurement until the tooltip is rendered.
		requestAnimationFrame(() => {
			const tooltipRect = div.getBoundingClientRect();
			const rect = element.getBoundingClientRect();
			const gap = 5; // gap between the element and the tooltip

			// Align tooltip with the left edge of the element.
			const left = rect.left + window.pageXOffset;
			const top = rect.top - tooltipRect.height - gap + window.pageYOffset;

			div.style.left = `${left}px`;
			div.style.top = `${top}px`;

			// Apply the fadeIn animation properties.
			div.style.animationName = "fadeIn";
			div.style.animationDuration = "0.2s";
			div.style.animationTimingFunction = "ease-in-out";
			div.style.animationDelay = "0.7s";
			div.style.animationFillMode = "forwards";
		});
	}

	function mouseLeave(): void {
		if (div?.parentNode) {
			document.body.removeChild(div);
		}
		if (title !== null) {
			element.setAttribute("title", title);
		}
	}

	// Remove tooltip immediately on mousedown, in case navigation or another action happens.
	function mouseDown(): void {
		mouseLeave();
	}

	element.addEventListener("mouseover", mouseOver);
	element.addEventListener("mouseleave", mouseLeave);
	element.addEventListener("mousedown", mouseDown);

	return {
		destroy() {
			element.removeEventListener("mouseover", mouseOver);
			element.removeEventListener("mouseleave", mouseLeave);
			element.removeEventListener("mousedown", mouseDown);
		}
	};
}
