<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  type Props = {
    /** A snippet for header content (e.g. title, controls) */
    header?: Snippet
    /** A snippet for footer content (e.g. actions, metadata) */
    footer?: Snippet
    /** URL for an optional image displayed at the top */
    image?: string | null
    /** The main card content */
    children?: Snippet
    /** Style variant for the card */
    variant?: "default" | "elevated" | "outlined"
  } & HTMLAttributes<HTMLDivElement>

  const {
    header,
    footer,
    image = null,
    children,
    variant = "default",
    ...rest
  }: Props = $props()
</script>

<div class={`card card--${variant}`} {...rest}>
  {#if image}
    <img src={image} alt="Card banner" class="card-image" />
  {/if}

  {#if header}
    <div class="card-header">
      {@render header?.()}
    </div>
  {/if}

  <div class="card-body">
    {@render children?.()}
  </div>

  {#if footer}
    <div class="card-footer">
      {@render footer?.()}
    </div>
  {/if}
</div>

<style>
  .card {
    background-color: var(--surface-2);
    border-radius: var(--radius-box);
    color: var(--on-surface-2);
    padding: var(--spacing-4) var(--spacing-6);
  }

  /* Elevated variant: a stronger shadow */
  .card--elevated {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  /* Outlined variant: transparent background and a border */
  .card--outlined {
    background-color: transparent;
    border: 1px solid var(--surface-3);
    box-shadow: none;
  }

  .card-image {
    width: 100%;
    object-fit: cover;
    border-top-left-radius: var(--spacing-1);
    border-top-right-radius: var(--spacing-1);
    margin-bottom: var(--spacing-4);
  }

  .card-header {
    font-weight: 600;
    margin-bottom: var(--spacing-2);
  }

  :global(.card-header > h1),
  :global(.card-header > h2),
  :global(.card-header > h3) {
    margin-top: 0.5rem;
  }

  .card-body {
    margin-bottom: var(--spacing-2);
  }

  .card-footer {
    border-top: 1px solid var(--surface-3);
    margin-top: var(--spacing-2);
    padding-top: var(--spacing-2);
    font-size: 1rem;
    color: var(--on-surface-3);
  }
</style>
