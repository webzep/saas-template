<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import SignOut from "@/components/SignOut.svelte"
  import { Icon, SideMenu, TwoColumnLayout, type NavGroup } from "@repo/ui"
  import type { Snippet } from "svelte"

  type Props = {
    children: Snippet
  }

  let { children }: Props = $props()

  let drawerOpen = $state(false)

  const navGroups: NavGroup[] = [
    {
      label: "",
      items: [
        { label: "Profile", path: "/settings/profile", icon: "user" },
        { label: "Preferences", path: "/settings/preferences", icon: "gear" },
        {
          label: "Subscriptions",
          path: "/settings/subscriptions",
          icon: "credit-card",
        },
      ],
    },
  ]

  const handleGoBack = () => {
    goto("/dashboard")
  }

  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleGoBack()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
</script>

<TwoColumnLayout bind:drawerOpen>
  <div class="close-container">
    <button class="close" onclick={handleGoBack}>
      <Icon bold name="x" />
    </button>
    <span>ESC</span>
  </div>

  {#snippet menu()}
    <div class="sidemenu-container">
      <SideMenu
        activeUrl={page.url}
        {navGroups}
        onClose={() => (drawerOpen = false)}
        onItemClick={(path: string) => goto(path)}
      >
        {#snippet footer()}
          <SignOut />
        {/snippet}
      </SideMenu>
    </div>
  {/snippet}

  <div class="content-container">
    {@render children?.()}
  </div>
</TwoColumnLayout>

<style>
  .close-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    opacity: 0.4;
    position: fixed;
    right: var(--spacing-4);
    top: var(--spacing-4);
  }

  .close-container span {
    color: var(--on-surface-1);
    font-size: 0.6rem;
    font-weight: bold;
  }

  .close {
    align-items: center;
    border-radius: var(--radius-infinity);
    background-color: transparent;
    border: 2px solid var(--on-surface-1);
    color: var(--on-surface-1);
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: var(--spacing-2);
    z-index: 1;
  }

  .content-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: var(--spacing-4);
  }

  .sidemenu-container {
    background: var(--surface-dark);
    height: 100%;
    padding: var(--spacing-4);
  }

  @media (max-width: 640px) {
    .content-container {
      padding: var(--spacing-2);
    }
  }
</style>
