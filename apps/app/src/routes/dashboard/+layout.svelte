<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import OpenSettingsTile from "@/components/OpenSettingsTile.svelte"
  import {
    CompanyTextLogo,
    Input,
    SideMenu,
    TwoColumnLayout,
    type NavGroup,
  } from "@repo/ui"
  import type { Snippet } from "svelte"

  type Props = {
    children?: Snippet
  }

  let { children }: Props = $props()

  let drawerOpen = $state(false)

  const navGroups: NavGroup[] = [
    {
      label: "Dashboard",
      items: [
        { label: "Overview", path: "./overview", icon: "layout" },
        { label: "Components", path: "./components", icon: "puzzle-piece" },
      ],
    },
    {
      label: "Management",
      items: [
        { label: "Products", path: "/settings", icon: "trolley" },
        { label: "Customers", path: "/settings", icon: "users" },
      ],
    },
    {
      label: "Settings",
      items: [
        { label: "Notifications", path: "/settings", icon: "user" },
        { label: "Billing", path: "/settings", icon: "credit-card" },
      ],
    },
  ]
</script>

<TwoColumnLayout bind:drawerOpen>
  {#snippet header()}
    <Input placeholder="What are you looking for?" />
  {/snippet}

  {#snippet menu()}
    <div class="sidemenu-container">
      <SideMenu
        activeUrl={page.url}
        {navGroups}
        onClose={() => (drawerOpen = false)}
        onItemClick={(path) => goto(path)}
      >
        {#snippet header()}
          <CompanyTextLogo />
        {/snippet}
        {#snippet footer()}
          <OpenSettingsTile />
        {/snippet}
      </SideMenu>
    </div>
  {/snippet}

  {@render children?.()}
</TwoColumnLayout>

<style>
  .sidemenu-container {
    background: var(--surface-dark);
    height: 100%;
    padding: var(--spacing-4);
  }
</style>
