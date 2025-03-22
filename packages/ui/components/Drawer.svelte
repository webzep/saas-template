<script lang="ts">
  import Button from "./Button.svelte"
  import Icon from "./Icon.svelte"
  import type { Snippet } from "svelte"
  import { fade, fly } from "svelte/transition"

  type Props = {
    ariaLabel?: string
    children?: Snippet
    onClose?: () => void
    open?: boolean
    position?: "left" | "right"
    title?: string
  }

  let {
    ariaLabel = "Drawer",
    children,
    open = false,
    position = "left",
    title = "",
    onClose,
  }: Props = $props()

  const drawerTitleId = `drawer-title-${Math.floor(Math.random() * 100000)}`

  function closeDrawer() {
    open = false
    onClose?.()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!open) return
    if (event.key === "Escape") {
      closeDrawer()
    }
  }
</script>

{#if open}
  <!-- Backdrop: click to close -->
  <div
    aria-hidden="true"
    class="drawer-backdrop"
    onclick={closeDrawer}
    transition:fade={{ duration: 200 }}
  ></div>

  <aside
    aria-label={title ? null : ariaLabel}
    aria-labelledby={title ? drawerTitleId : null}
    class:drawer--left={position === "left"}
    class:drawer--right={position === "right"}
    class="drawer"
    transition:fly={{ x: position === "left" ? -100 : 100, duration: 300 }}
  >
    <div class="drawer-header">
      <div class="drawer-close">
        <Button variant="text" onclick={closeDrawer}>
          <Icon light name="x" size="md" />
        </Button>
      </div>
    </div>
    <div class="drawer-content">
      <div class="drawer-body">
        {@render children?.()}
      </div>
    </div>
  </aside>
{/if}

<!-- Place svelte:window at the top level -->
<svelte:window onkeydown={handleKeydown} />

<style>
  .drawer-backdrop {
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
  .drawer {
    background: var(--surface-dark);
    bottom: 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 80%;
    overflow-y: auto;
    position: fixed;
    top: 0;
    width: 300px;
    z-index: 1001;
  }
  .drawer--left {
    left: 0;
  }
  .drawer--right {
    right: 0;
  }
  .drawer-content {
    display: flex;
    flex: 1;
  }
  .drawer-header {
    display: flex;
    height: 0;
    justify-content: flex-end;
    z-index: 1;
  }
  .drawer-close {
    color: var(--on-surface-dark);
    margin: var(--spacing-4);
  }
  .drawer-body {
    flex: 1;
    width: 100%;
  }
  @media (max-width: 600px) {
    .drawer {
      max-width: 100%;
      width: 100%;
    }
  }
</style>
