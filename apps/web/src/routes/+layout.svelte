<script lang="ts">
  import { afterNavigate } from "$app/navigation"
  import "@/app.css"
  import Footer from "@/components/Footer.svelte"
  import Navbar from "@/components/Navbar.svelte"
  import "@phosphor-icons/web/bold"
  import "@phosphor-icons/web/fill"
  import "@phosphor-icons/web/light"
  import type { Snippet } from "svelte"
  import type { LayoutProps } from "./$types"

  type Props = LayoutProps & {
    children?: Snippet
  }

  let { children, data }: Props = $props()
  const { appURL, websiteURL } = data

  let containerRef: HTMLDivElement | null = null

  afterNavigate(() => {
    // Reset the scroll position - yeah this kinda sucks.
    if (containerRef) containerRef.scrollTop = 0
  })
</script>

<div class="container" bind:this={containerRef}>
  <Navbar baseURL={websiteURL} signInURL={`${appURL}/signin`} />
  {@render children?.()}
  <Footer />
</div>

<style>
  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: scroll;
    height: 100dvh;
    width: 100dvw;
  }

  :global(:root) {
    --font-scale: 1.6;

    /* Spacing scale */
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-5: 1.25rem;
    --spacing-6: 1.5rem;
    --spacing-7: 1.75rem;
    --spacing-8: 2rem;
    --spacing-9: 2.25rem;

    --radius-selector: 0.5rem;
    --radius-field: 0.25rem;
    --radius-box: 1rem;
    --radius-infinity: 99rem;

    --primary: #ff6b6b;
    --secondary: #4ecdc4;

    --on-primary: #ffffff;
    --on-secondary: #202020;

    --surface-1: #ffffff;
    --surface-2: #f0f0f0;
    --surface-3: #e5e5e5;
    --surface-dark: #2c3e50;

    --on-surface-1: #333333;
    --on-surface-2: #333333;
    --on-surface-3: #333333;
    --on-surface-dark: #ecf0f1;

    --border-1: #d3d3d3;
    --border-2: #bebebe;
    --border-3: #a0a0a0;

    --focus-outline: 2px solid var(--primary);
    --focus-outline-offset: 0.1rem;

    --success: #28a745;
    --on-success: #ffffff;
    --danger: #dc3545;
    --on-danger: #ffffff;
    --warning: #ffc107;
    --on-warning: #333333;
    --info: #17a2b8;
    --on-info: #ffffff;
  }

  :global(html[data-theme="dark"]) {
    --primary: #ff6b6b;
    --secondary: #4ecdc4;

    --surface-1: #1f1f2e;
    --surface-2: #191922;
    --surface-3: #14141a;
    --surface-dark: #0f0f15;

    --on-surface-1: #ecf0f1;
    --on-surface-2: #ecf0f1;
    --on-surface-3: #ecf0f1;

    --border-1: #2c2c3d;
    --border-2: #242435;
    --border-3: #1e1e2d;
  }

  /* Reset */
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Global base styles */
  :global(html),
  :global(body) {
    background: var(--surface-1);
    height: 100%;
    width: 100%;
  }

  :global(html) {
    background-color: var(--surface-1);
    font-size: calc(62.5% * var(--font-scale));
  }

  :global(body) {
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      "Noto Sans",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji";
    color: var(--on-surface-1);
  }

  :global(h1),
  :global(h2),
  :global(h3) {
    font-weight: 600;
    line-height: 1.2;
    margin: var(--spacing-5) 0 var(--spacing-3);
    text-wrap: pretty;
  }

  :global(h1) {
    font-size: 2rem;
  }

  :global(h2) {
    font-size: 1.75rem;
  }

  :global(h3) {
    font-size: 1.5rem;
  }

  :global(p) {
    line-height: 1.5rem;
    margin-bottom: var(--spacing-4);
  }

  :global(hr) {
    border: 1px solid var(--surface-2);
    margin: var(--spacing-6) 0;
  }
</style>
