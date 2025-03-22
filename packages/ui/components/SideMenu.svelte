<script lang="ts">
  import type { Snippet } from "svelte"
  import Button from "./Button.svelte"
  import Flex from "./Flex.svelte"
  import Icon from "./Icon.svelte"
  import type { NavGroup } from "./types"

  type Props = {
    activeUrl: URL
    footer?: Snippet
    header?: Snippet
    navGroups: NavGroup[]
    onClose?: () => void
    onItemClick?: (path: string) => void
  }

  let { activeUrl, footer, header, navGroups, onClose, onItemClick }: Props =
    $props()

  const handleItemClick = (path: string) => {
    onItemClick?.(path)
    onClose?.()
  }
</script>

<aside class="sidebar">
  {@render header?.()}
  <nav class="sidebar-nav">
    {#each navGroups as { label, items }}
      <Flex column gap="sm">
        <span class="group-header">{label}</span>
        {#each items as { label, path, icon }}
          <Button
            align="start"
            bold
            onclick={() => handleItemClick(path)}
            opacity={activeUrl.pathname.endsWith(path.slice(1)) ? 1 : 0.6}
            role="link"
            selected={activeUrl.pathname.endsWith(path.slice(1))}
            variant="text"
          >
            {#snippet iconLeft()}
              {#if icon}
                <Icon size="xs" name={icon} />
              {/if}
            {/snippet}
            {label}
          </Button>
        {/each}
      </Flex>
    {/each}

    <div class="footer-container">
      {@render footer?.()}
    </div>
  </nav>
</aside>

<style>
  .footer-container {
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 0;
  }

  .sidebar {
    background: var(--surface-dark);
    color: var(--on-surface-dark);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
    height: 100%;
    min-width: 200px;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
    height: 100%;
  }

  .group-header {
    font-size: 0.8em;
    font-weight: bold;
    margin: var(--spacing-2) 0 var(--spacing-2);
    padding: 0 var(--spacing-4);
  }
</style>
