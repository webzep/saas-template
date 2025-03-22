<script lang="ts">
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
    className?: string
    variant?: "info" | "success" | "warning" | "danger"
    collapsed?: boolean
  }

  const {
    variant = "info",
    className = "",
    children,
    collapsed = false,
  }: Props = $props()
</script>

<div class="alert {variant} {className} {collapsed ? 'collapsed' : ''}">
  {@render children?.()}
</div>

<style>
  .alert {
    align-items: center;
    border-radius: var(--radius-box);
    display: flex;
    gap: var(--spacing-2);
    height: auto;
    overflow: hidden;
    padding: var(--spacing-4);
    transition:
      height 200ms ease,
      padding 200ms ease;
  }

  .info {
    background-color: var(--info-light);
    color: var(--info);
    border: 1px solid var(--info);
  }

  .success {
    background-color: var(--success-light);
    color: var(--success);
    border: 1px solid var(--success);
  }

  .warning {
    background-color: var(--warning-light);
    color: var(--warning);
    border: 1px solid var(--warning);
  }

  .danger {
    background-color: var(--danger-light);
    color: var(--danger);
    border: 1px solid var(--danger);
  }

  .collapsed {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-width: 0;
  }
</style>
