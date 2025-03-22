<script lang="ts">
  import type { Component, Snippet } from "svelte"
  import type { HTMLButtonAttributes } from "svelte/elements"
  import Loader from "./Loader.svelte"

  export type Props = {
    /** Align content */
    align?: "start" | "end" | "center"
    /** Make the text bold */
    bold?: boolean
    /** Button content */
    children?: Snippet
    /** Disable the button */
    disabled?: boolean
    /** Full width */
    fullWidth?: boolean
    /** Icon on the left side */
    iconLeft?: Component | Snippet | null
    /** Icon on the right side */
    iconRight?: Component | Snippet | null
    /** Loading state */
    loading?: boolean
    /** For a big button */
    mega?: boolean
    /** Opacity */
    opacity?: number
    /** Outlined style */
    outlined?: boolean
    /** Selected only works for text variant */
    selected?: boolean
    /** Button variant */
    variant?:
      | "primary"
      | "secondary"
      | "ghost"
      | "text"
      | "success"
      | "danger"
      | "warning"
      | "info"
  } & HTMLButtonAttributes

  const {
    align = "center",
    bold = false,
    children,
    disabled = false,
    fullWidth = false,
    loading = false,
    mega = false,
    opacity = 1,
    outlined = false,
    selected = false,
    variant = "primary",
    ...rest
  }: Props = $props()

  let classes = $derived(
    [
      ...(rest.class ? [rest.class] : []),
      "btn",
      `btn--${variant}`,
      align,
      bold ? "bold" : "",
      mega ? "mega" : "",
      outlined ? "outlined" : "",
      selected ? "selected" : "",
      loading ? "loading" : "",
      fullWidth ? "full-width" : "",
    ]
      .filter(Boolean)
      .join(" "),
  )

  let styles = $derived([`opacity: ${opacity}`].filter(Boolean).join(";"))

  const isIconSnippet = (icon: any): icon is Snippet =>
    typeof icon === "function" && icon.$$render

  const leftIconIsSnippet = isIconSnippet(rest.iconLeft)
  const rightIconIsSnippet = isIconSnippet(rest.iconRight)
</script>

<!-- render as an anchor tag -->
<button class={classes} style={styles} disabled={disabled || loading} {...rest}>
  {#if loading}
    <Loader size="sm" />
  {:else}
    {#if rest.iconLeft && !leftIconIsSnippet}
      <span class="icon-left">
        <rest.iconLeft />
      </span>
    {/if}

    {#if rest.iconLeft && leftIconIsSnippet}
      <span class="icon-left">{@render (rest.iconLeft as Snippet)()}</span>
    {/if}

    {@render children?.()}

    {#if rest.iconRight && !rightIconIsSnippet}
      <span class="icon-right">
        <rest.iconRight />
      </span>
    {/if}

    {#if rest.iconRight && rightIconIsSnippet}
      <span class="icon-right">{@render (rest.iconRight as Snippet)()}</span>
    {/if}
  {/if}
</button>

<style>
  /* Base button */
  :global(.btn) {
    align-items: center;
    border-radius: var(--radius-field);
    border: none;
    cursor: pointer;
    display: inline-flex;
    flex: 1;
    font-size: 1rem;
    font-weight: 500;
    height: 2.5rem;
    justify-content: center;
    padding: var(--spacing-2) var(--spacing-4);
    transition: all 0.2s ease;
  }

  :global(.btn.mega) {
    font-size: 1.5rem;
    height: 3.5rem;
    padding: var(--spacing-3) var(--spacing-6);
  }

  :global(.btn.bold) {
    font-weight: 700;
  }

  /* Align start */
  :global(.btn.start) {
    justify-content: flex-start;
  }

  /* Align end */
  :global(.btn.end) {
    justify-content: flex-end;
  }

  /* Align center */
  :global(.btn.center) {
    justify-content: center;
  }

  /* Hover effect for all variants */
  :global(.btn:not(.btn--text):not(:disabled):hover) {
    filter: brightness(1.1);
  }

  /* Disabled state */
  :global(.btn:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* --- Variants (solid) --- */
  :global(.btn--primary) {
    /* Use your primary color and a dark text for contrast */
    background-color: var(--primary);
    color: var(--on-primary);
  }

  :global(.btn--secondary) {
    background-color: var(--secondary);
    color: var(--on-secondary);
  }

  :global(.btn--success) {
    background-color: var(--success);
    color: var(--on-success);
  }

  :global(.btn--danger) {
    background-color: var(--danger);
    color: var(--on-danger);
  }

  :global(.btn--warning) {
    background-color: var(--warning);
    color: var(--on-warning);
  }

  :global(.btn--info) {
    background-color: var(--info);
    color: var(--on-info);
  }

  /* 'Ghost' is transparent with a light border by default */
  :global(.btn--ghost) {
    background-color: transparent;
    border: 1px solid var(--on-surface-1);
    color: var(--on-surface-1);
  }

  /* 'Text' has no border/background; text color is light by default */
  :global(.btn--text) {
    background-color: transparent;
    color: currentColor;
  }

  /* Hover for text */
  :global(.btn--text:not(:disabled):hover) {
    background-color: color-mix(in srgb, currentColor 10%, transparent);
  }

  /* Selected */
  :global(.btn--text.selected) {
    background-color: color-mix(in srgb, currentColor 10%, transparent);
  }

  /* --- Outlined Styles ---
     Make background transparent, text/border match the variant color
  */
  .outlined {
    background-color: transparent;
    border: 1px solid currentColor;
  }

  /* Outlined + primary => orange text & border */
  :global(.btn--primary.outlined) {
    border-color: var(--primary);
    color: var(--primary);
  }

  /* Outlined + secondary => purple text & border */
  :global(.btn--secondary.outlined) {
    border-color: var(--secondary);
    color: var(--secondary);
  }

  /* Outlined + success => green text & border */
  :global(.btn--success.outlined) {
    border-color: var(--success);
    color: var(--success);
  }

  /* Outlined + danger => red text & border */
  :global(.btn--danger.outlined) {
    border-color: var(--danger);
    color: var(--danger);
  }

  /* Outlined + warning => yellow text & border */
  :global(.btn--warning.outlined) {
    border-color: var(--warning);
    color: var(--warning);
  }

  /* Outlined + info => blue text & border */
  :global(.btn--info.outlined) {
    border-color: var(--info);
    color: var(--info);
  }

  /* If ghost or text is outlined, it's already transparent, but we'll keep this for consistency */
  :global(.btn--ghost.outlined) {
    border-color: var(--on-surface-1);
    color: var(--on-surface-1);
  }

  :global(.btn--text.outlined) {
    border-color: var(--on-surface-1);
    color: var(--on-surface-1);
  }

  /* Icon spacing */
  .icon-left {
    align-items: center;
    display: inline-flex;
    margin-right: var(--spacing-2);
  }
  .icon-right {
    align-items: center;
    display: inline-flex;
    margin-left: var(--spacing-2);
  }

  /* Focus only on keyboard navigation */
  button:focus {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }
  button:focus:not(:focus-visible) {
    outline: none;
  }

  /* Loading state */
  :global(.btn.loading) {
    position: relative;
    cursor: wait;
    pointer-events: none; /* Prevent any interactions while loading */
  }

  :global(.btn.loading:disabled) {
    opacity: 0.8;
  }

  /* Full width */
  :global(.btn.full-width) {
    width: 100%;
  }
</style>
