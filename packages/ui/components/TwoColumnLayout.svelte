<script lang="ts">
  import Button from "./Button.svelte"
  import Drawer from "./Drawer.svelte"
  import Icon from "./Icon.svelte"
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
    drawerOpen?: boolean
    header?: Snippet
    menu?: Snippet
  }

  let { children, drawerOpen = $bindable(), header, menu }: Props = $props()
</script>

<!-- Mobile menu -->
<Drawer open={drawerOpen} onClose={() => (drawerOpen = false)}>
  {@render menu?.()}
</Drawer>

<!-- Desktop layout -->
<div class="dashboard-layout">
  <div class="hide-on-break">
    {@render menu?.()}
  </div>
  <main class="main-content">
    <header class="header">
      <div class="hamburger">
        <Button onclick={() => (drawerOpen = true)} variant="text">
          <Icon light name="list" />
        </Button>
      </div>
      {@render header?.()}
    </header>
    {@render children?.()}
  </main>
</div>

<style>
  .dashboard-layout {
    display: flex;
    height: 100vh;
  }

  .header {
    align-items: center;
    box-shadow: var(--shadow1);
    display: flex;
    height: var(--header-height);
    padding: var(--spacing-2) 0;
    gap: var(--spacing-4);
  }

  @media (max-width: 1024px) {
    .hide-on-break {
      display: none;
    }
  }

  .main-content {
    color: var(--on-surface-1);
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-4);
  }

  @media (min-width: 1024px) {
    .hamburger {
      display: none;
    }
  }
</style>
