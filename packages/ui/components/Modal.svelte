<!-- Modal.svelte -->
<script lang="ts">
  import type { Snippet } from "svelte"
  import Icon from "./Icon.svelte"

  type Props = {
    /** Main modal content */
    children: Snippet
    /** Optional header content */
    header?: Snippet
    /** Optional footer content */
    footer?: Snippet
    /** Whether the modal is open */
    open: boolean
    /** Function to call when closing the modal */
    onClose?: () => void
    size?: "sm" | "md" | "lg" | "xl"
  }

  let { open, onClose, header, footer, children, size = "md" }: Props = $props()
</script>

{#if open}
  <!-- Background overlay as a full-screen button -->
  <button
    aria-label="Close modal"
    class="modal-overlay"
    onclick={() => onClose && onClose()}
    type="button"
  >
    <!-- This button is visually hidden behind the modal container -->
  </button>

  <!-- Modal container rendered above the overlay -->
  <div class="modal-container {size}" role="dialog" aria-modal="true">
    <button
      aria-label="Close modal"
      class="modal-close"
      onclick={() => onClose && onClose()}
      type="button"
    >
      <Icon bold name="x" />
    </button>
    {#if header}
      <div class="modal-header">
        {@render header?.()}
      </div>
    {/if}
    <div class="modal-content">
      {@render children?.()}
    </div>
    {#if footer}
      <div class="modal-footer">
        {@render footer?.()}
      </div>
    {/if}
  </div>
{/if}

<style>
  /* Full-screen overlay button acting as the modal backdrop */
  .modal-overlay {
    appearance: none;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    height: 100vh;
    left: 0;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;
  }
  /* Modal container centered above the overlay */
  .modal-container {
    background-color: var(--surface-1);
    border-radius: var(--radius-field);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: var(--on-surface-1);
    left: 50%;
    max-height: 90dvh;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    z-index: 1100;
    display: flex;
    flex-direction: column;
  }
  .modal-close {
    background: none;
    border: none;
    color: var(--on-surface-1);
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    right: var(--spacing-4);
    top: var(--spacing-4);
  }
  .modal-header {
    padding: var(--spacing-6) var(--spacing-6) var(--spacing-2);
    border-bottom: 1px solid var(--border-2);
  }
  .modal-content {
    overflow-y: auto;
    padding: 0 var(--spacing-6);
  }
  .modal-footer {
    padding: var(--spacing-2) var(--spacing-6) var(--spacing-6);
    border-top: 1px solid var(--border-2);
    margin-top: var(--spacing-4);
    text-align: right;
  }

  /* Size variants */
  .modal-container.sm {
    max-width: 400px;
  }
  .modal-container.md {
    max-width: 600px;
  }
  .modal-container.lg {
    max-width: 800px;
  }
  .modal-container.xl {
    max-width: 1000px;
  }
</style>
